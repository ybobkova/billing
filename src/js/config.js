var require = {
    baseUrl: "/root/src/js",

	paths: {
	    'jquery': "libs/jquery-2.0.2.min",
	    'bootstrap': "libs/bootstrap.min",
	    'knockout': "libs/knockout-2.2.1",
	    'handlebars': "libs/handlebars"
  },
  shim: {
    'bootstrap': {
       deps: ['jquery']
    }
}
}
