var path = require('path');

module.exports = {
	www: {

	},
	title: 'UXM',
	bodyClass: 'uxm',
	scripts: [
		'/bower/jquery/dist/jquery.min.js',
		'/popper.js',
		'/bower/bootstrap/dist/js/bootstrap.js',
		'https://www.google.com/recaptcha/api.js?render=6LdG5nsUAAAAADta5qckGzDRgUIdi6FtbF6vsN_R',
		'https://checkout.stripe.com/checkout.js'
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
		market: {
			ssr: true,
			// port: 6002,
			domain: 'https://theuxm.com',
			scripts: [
				'/dist/market/vendor.js',
				'/dist/market/main.js',
				'/dist/market/runtime~main.js'
				
			],
			cssHrefs: [
				'/dist/market/vendor.css',
				'/dist/market/main.css'
			],
			title: 'UXM - Buy Sell Prosper',
			www: {
				port: 6002,
				enableHelmet: true,
				enableCsp: true,
				csp: {
                    // Specify directives as normal.
                    directives: {
                      frameSrc: ["*"],
                      defaultSrc: ["'self'", 'api.theuxm.com'],
                      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'",
						            "https://*.stripe.com https://*.google.com https://*.gstatic.com https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google-analytics.com"],
                      styleSrc: ["'self' 'unsafe-inline'"],
                      fontSrc: ["data: 'self'"],
                      imgSrc: ['*', 'data:'],
                      // sandbox: ['allow-forms', 'allow-scripts'],
                      // reportUri: '/report-violation',
                      objectSrc: ["'none'"],
                      baseUri: ["'none'"],
                      formAction:["'self'"],
                      frameAncestors: ["'self'"],
                      objectSrc: ["'self'"],
                      upgradeInsecureRequests: true,
                      workerSrc: false  // This is not set.
                    },
                }
			},
			headStartCustomCode: `<!-- Global site tag (gtag.js) - Google Analytics -->
				<script async src="https://www.googletagmanager.com/gtag/js?id=UA-78773750-6"></script>
				<script>
				  window.dataLayer = window.dataLayer || [];
				  function gtag(){dataLayer.push(arguments);}
				  gtag('js', new Date());
				  gtag('config', 'UA-78773750-6');
				</script>`
		},

		admin: {
			port: 6003,
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

		seller: {
			port: 6004,
			scripts: [
				'/dist/seller/vendor.js',
				'/dist/seller/main.js',
				'/dist/seller/runtime~main.js',
			],
			cssHrefs: [
				'/dist/seller/vendor.css',
				'/dist/seller/main.css'
			],
			title: 'Seller - UXM - Buy Sell Prosper '
		}
	}
}