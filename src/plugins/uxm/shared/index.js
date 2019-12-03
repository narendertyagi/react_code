import axios from 'axios';

import _config from './config'
import Api from './api'
import * as Components from './components'

export default class UxmShared {
	constructor(config = {}) {
		this.config = Object.assign({}, _config, config||{});
		this.Api = new Api({
			apiHost: Sapp.config.apiHost
		})	
		this.Components = Components
		
	}

	async init() {
		// await this.TranslationC.fetchAndSetOptions()
	}

	grecaptchaExecute() {
		return new Promise(function(resolve, reject) {
			grecaptcha.ready(function() {
				grecaptcha.execute('6LdG5nsUAAAAADta5qckGzDRgUIdi6FtbF6vsN_R', {action: 'action_name'})
				.then(function(token) {
					// console.log(token)
					// Verify the token on the server.
					resolve(token)
				})
			});
		})
	}
}