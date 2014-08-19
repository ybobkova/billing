/* globals requirejs */
var require = {

  baseUrl: "/root/src/js",

  // override paths especially for dev, define everything with /root in front to allow the bootstrap.js for mocha to alter it
  paths: {
    "bootstrap": "lib/bootstrap.min",
    "KnockoutSync": "lib/KnockoutSync",
    "Amplify": "lib/amplify.core"
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    }
  }

  // do shims and common paths in config_live.js

};

if (typeof(requirejs) === "function") {
  requirejs.config(require);
}