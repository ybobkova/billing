var require = {
  baseUrl: "/root/src/js",

	paths: {
	  'jquery': "lib/jquery-2.0.2.min",
	  'bootstrap': "lib/bootstrap.min",
	  'knockout': "lib/knockout-2.2.1",
	  'handlebars': "lib/handlebars"
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    }
  }
}
