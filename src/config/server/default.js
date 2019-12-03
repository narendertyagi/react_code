var path = require('path');

module.exports = {
	www: {

	},
	title: 'Sapp Js',
	bodyClass: 'uxm',
	scripts: [
		'/bower/jquery/dist/jquery.min.js',
		'/popper.js',
		'/bower/bootstrap/dist/js/bootstrap.js',
		// '/bower/toastr/build/toastr.min.js',
		// '/dist/vendor.js',
		// '/dist/main.js',
		// '/dist/runtime~main.js'
	],
	cssHrefs: [
		// '/dist/css_vendor.css',
		// '/dist/css_style.css'
	],

	module: {
		admin: {
			port: 6012,
			scripts: [
				'/dist/admin/vendor.js',
				'/dist/admin/main.js',
				'/dist/admin/runtime~main.js',
			],
			cssHrefs: [
				'/dist/admin/vendor.css',
				'/dist/admin/main.css'
			],
			title: 'Admin'
		},

		
	}
}