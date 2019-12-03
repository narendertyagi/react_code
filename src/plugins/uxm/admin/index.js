import axios from 'axios';

import _config from './config'
import Api from './api'
import routes from './routes'

export default class UxmAdmin {
	constructor(config = {}) {
		
		this.config = Object.assign({}, _config, config||{});
        this.Api = new Api({
			apiHost: Sapp.config.apiHost
		})
		

		Sapp.Route.addMultiple(routes)

		// document.body.classList.toggle('uxmSeller')
	}
}