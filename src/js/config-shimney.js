/* globals requirejs */
requirejs.config({
  packages: [
    {
      name: 'jquery',
      location: 'lib/shimney/jquery'
    },
    {
      name: 'JSON',
      location: 'lib/shimney/JSON'
    },
    {
      name: 'knockout',
      location: 'lib/shimney/knockout'
    },
    {
      name: 'knockout-mapping',
      location: 'lib/shimney/knockout-mapping'
    },
    {
      name: 'lodash',
      location: 'lib/shimney/lodash'
    },
    {
      name: 'hogan',
      location: 'lib/shimney/hogan'
    }
  ]
});
