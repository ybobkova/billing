define(['knockout-mapping', './EntityModel', 'Amplify', 'lodash', 'JSON'], function(koMapping, EntityModel, amplify, _) {

  /**
   Events:

   knockout-sync.entity-saved
     triggered when an entity with an existing id was saved again
     args: [entity, entityMeta]

   knockout-sync.entity-created 
     triggered when an new entity without an id was saved. the entity has the new id applied
     args: [entity, entityMeta]
 */

  return function Backend(driver, entityModel, options) {
    var that = this;

    that.options = _.extend({},
      {
        prefixUrl: '/api/',
        putSingular: true,
        removeSingular: true
      },
      options
    );

    if (!entityModel || !(entityModel instanceof EntityModel)) {
      throw new Error('missing parameter #2 for EntityManager. Provide the entity model');
    }

    if (!driver) {
      throw new Error('missing parameter #1 for EntityManager. Provide the driver');
    }

    this.driver = driver;
    this.model = entityModel;

    /**
     * Saves/Creates an entity
     * 
     * if the entity.id() is set the entity is updated in the backend
     * if the entity.id() is not set the entity is created in the backend and the new id is put into the entity
     *
     * callback = function(failure)  if the server returns a bad response the response failure is set otherwise its undefined
     */
    this.save = function(entity, callback) {
      var method, urlPart, successCodes;
      var entityMeta = that.model.getEntityMeta(entity.fqn);

      if (entity.id() > 0) {
        method = 'put';
        urlPart = (that.options.putSingular ? entityMeta.singular : entityMeta.plural)+'/'+entity.id();
        successCodes = [200, 204]; // or 204 no content
      } else {
        method = 'post';
        urlPart = entityMeta.plural;
        successCodes = [200, 201]; // 200 or 201 created
      }

      that.dispatchRequest(method, urlPart, that.serializeEntity(entity), successCodes, function(failure, result) {
        if (!failure) {

          if (!entity.id()) {
            var data;
            if (result.id) {
              data = result;
            } else if (result[entityMeta.singular] && result[entityMeta.singular].id) {
              data = result[entityMeta.singular];
            } else {
              throw new Error("driver returned an invalid result set for a created entity "+JSON.stringify(result));
            }

            // set the new entity id
            entity.id(data.id);

            amplify.publish('knockout-sync.entity-created', entity, entityMeta);
          } else {
            amplify.publish('knockout-sync.entity-saved', entity, entityMeta);
          }
        }

        callback(failure);
      });
    };

    this.patch = function(entity, patchName, data, callback) {
      var entityMeta = that.model.getEntityMeta(entity.fqn);
      var urlPart = (that.options.putSingular ? entityMeta.singular : entityMeta.plural)+'/'+entity.id()+'/'+patchName;

      this.dispatchRequest('patch', urlPart, data, [200, 204], function (failure, result) {
        callback(failure, result);
      });
    };

    /**
     * Queries a collection of all entities returned by backend
     */
    this.cget = function(entityFQN, params, callback) {
      if (arguments.length === 2) {
        callback = params;
        params = undefined;
      }

      var entityMeta = that.model.getEntityMeta(entityFQN);

      that.dispatchRequest('GET', entityMeta.plural, params, [200], function(failure, result) {
        callback(failure, result);
      });
    };

    /**
     * Queries a single entity returned by backend
     */
    this.get = function(entityFQN, identifiers, callback) {
      var entityMeta = that.model.getEntityMeta(entityFQN);

      if (_.isPlainObject(identifiers)) {
        // maybe map to filter here
        identifiers = _.values(identifiers);
      } else if (!_.isArray(identifiers)) { // single scalars
        identifiers = [identifiers];
      }

      that.dispatchRequest('GET', entityMeta.plural+'/'+identifiers.join('/'), undefined, [200], function(failure, result) {
        if (!failure) {
          /* 
            normalize single responses to always use repsonse plural form

            like: 
            {
               "page": {
                 "id": 7
                 "slug": "start"
               }
            }

            to

            {
              "pages": [
                {
                  "id": 7,
                  "slug": "start"

                }
              ]
            }

          */
          if (result[entityMeta.singular] && !result[entityMeta.plural]) {
            result[entityMeta.plural] = [ result[entityMeta.singular] ];
            delete result[entityMeta.singular];
          }
        }

        callback(failure, result);
      });
    };

    /**
     * Removes an existing entity
     * 
     * if the entity.id() is not set the behaviour is undefined(yet)
     *
     * callback = function(failure)  if the server returns a bad response the response failure is set otherwise its undefined
     */
    this.remove = function(entity, callback) {
      if (entity.id() > 0) {
        var method, urlPart, successCodes;
        var entityMeta = that.model.getEntityMeta(entity.fqn);

        method = 'delete';
        urlPart = (that.options.removeSingular ? entityMeta.singular : entityMeta.plural)+'/'+entity.id();
        successCodes = [200, 204]; // or 204 no content

        that.dispatchRequest(method, urlPart, undefined, successCodes, function(failure) {
          if (!failure) {
            amplify.publish('knockout-sync.entity-removed', entity, entityMeta);
          }

          callback(failure);
        });
      }
    };

    /**
     * Dispatches an request to a server response with the driver
     * 
     * if returned response is one of the successCodes the body is converted (json to plain object) and returned directly in the callback
     * if the returned response is not one of the successCodes the body is tried to be converted and the callback is called with an error including the full server response
     */
    this.dispatchRequest = function(method, urlPart, body, successCodes, callback) {
      var url = this.options.prefixUrl+urlPart;

      this.driver.dispatch(method, url, body, function(error, response) {
        if (error) { // Maybe we should expand them into a third callback parameter? callback(error, failedResponse, response)
          throw error;
        }

        that.tryToConvertBody(response);

        // analyse responses
        if (_.contains(successCodes, response.code)) {
          callback(undefined, response.body);

        } else {
          var failure = {
            message: 'the server returned an unexpected response code', // maybe replace this message with the message which is set in response (if it is a correct failure response like validation?)
            expected: successCodes,
            actual: response.code,
            response: response,
            request: {
              method: method,
              url: urlPart,
              body: that.debugBody(body)
            }
          };

          callback(failure, undefined);
        }
      });
    };

    this.tryToConvertBody = function(response) {
      if (response.body && _.isString(response.body)) {
        try {
          var parsed = JSON.parse(response.body);
          if (_.isPlainObject(parsed)) {
            response.body = parsed;
          }
        } catch (jsonparserException) {} // i hope this works in older browsers
      }
    };

    this.debugBody = function(body) {
      if (body === undefined) return '<empty>';

      if (_.isString(body)) {
        if (body.length > 100) {
          return body.substr(0, 100);
        } else {
          return body;
        }
      }

      return '<body not converted to string>';
    };

    this.serializeEntity = function(entity) {
      if (typeof(entity.serialize) === 'function') {
        return entity.serialize();
      }

      return koMapping.toJS(entity);
    };
  };
});