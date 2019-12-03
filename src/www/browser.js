if(__isBrowser__) { 
	global = window 
} else {
	global.window = {}
	global.localStorage = {
		getItem: () => null
	}
}

global.Sapp = {}

const core = require('../plugins/core')

class Browser {
	async init() {
		let CorePlugins = new core()
		await CorePlugins.init()
	}
}

// Sapp.Browser = Browser

export default Browser