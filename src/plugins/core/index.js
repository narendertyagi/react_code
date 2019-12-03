const util = require('./util')
const hook = require('./hook')
const auth = require('./auth')
const route = require('./route')
const menu = require('./menu')

export default class CorePlugin {
	constructor() {

	}

	getClass = (c) => {
		const ClassNew = c.__esModule ? c.default : c
		return ClassNew
	}

	async init() {

		Sapp.Util = util

		Sapp.Hook = new hook()

		Sapp.Route = new route()

		Sapp.Menu = menu
		
        Sapp.Auth = new auth()
		await Sapp.Auth.init()
		
	}

}