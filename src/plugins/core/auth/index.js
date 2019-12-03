// import axios from 'axios';
var jwtDecode = require('jwt-decode');
import React from 'react'
import _config from './config'
import routes from './routes'
import locale from './locale'
export default class Auth {
	constructor() {
		this.config = Object.assign({}, _config, Sapp.config.auth||{});
		Sapp.Route.addMultiple(routes)
		this.locale = locale['en']
		
	}

	init() {
		// console.log('Auth init')
		// this.lang = locale(Sapp.UxmShared.TranslationC.getLang())

		// Sapp.Hook.Action.add('beforeModuleInit', () => {
		// 	try {
		// 		// this.locale = locale[Sapp.UxmLocale.TranslationC.getLang()]
		// 	} catch (error) {
				
		// 	}
		// 	console.log(Sapp.Auth)
		// })
	}

	translate = (key) => {
		let valor = this.locale[key]
		let args = Sapp.Hook.Filter.applySync('beforeTranslateSync', {
			key: key,
			valor: valor
		})	

		// console.log(args)
		return args && args['valor'] || null
	}

	me() {
		// console.log(axios.defaults.headers.common)
		 console.log("me");
		 
		return axios({
		   method: 'post', 
		   headers: null,
		   url: Sapp.config.apiHost + "/auth/me"
	   })
   	}

	meUpdate(data) {
		return axios({
		   method: 'put',
		   headers: null,
		   data: data,
		   url: Sapp.config.apiHost + "/auth/me/update",
	   })
	}
	   
	attempt({username=null, password=null, captcha_token=null}) {
		console.log("login");
		
		var ajaxObj =  axios.post(Sapp.config.apiHost + "/auth/login", {
					username: username,
					password: password,
					captcha_token: captcha_token,
					appName: Sapp.config.appName
				})

		ajaxObj.then((response) => {
			this.login(response.data.token)
		}).catch(function (error) {
			// console.log(error);
		});

		return ajaxObj;
	}
	register(args={}) {
		// console.log('registernew');
		var ajaxObj =  axios.post(Sapp.config.apiHost + "/auth/register", args)
				
		ajaxObj.then((response) => {
			// console.log(response)
		})

		return ajaxObj;
	}


	forgotPassword({email=null,captcha_token=null}) {
		// console.log('forgotPasswordnew');
		var ajaxObj =  axios.post(Sapp.config.apiHost + "/auth/password/email", {
					email: email,
					captcha_token: captcha_token,
				})
		return ajaxObj;
	}

	resetPassword(args={}) {
		var ajaxObj =  axios.post(Sapp.config.apiHost + "/auth/password/reset", args)
		return ajaxObj;
	}
	changePassword(args={}) {
		//console.log('changePasswordnew');
		var ajaxObj =  axios.post(Sapp.config.apiHost + "/auth/password/update", args)
		return ajaxObj;
	}


	login(token=null) {
		if(!token) return "Cannot Login";
		localStorage.setItem('token', token);
		axios.defaults.headers.common['Authorization'] = this.getAuthorizationHeader()
	}

	logout() {
		localStorage.removeItem('token');
	}

	check() {
		return this.getToken() ? true : false;
	}

	getToken() {
		return localStorage.getItem('token');
	}

	getTokenDecoded() {
		var token = this.getToken()
		if(!token) return {}
		return jwtDecode(this.getToken());
	}

	is_admin() {
		const data = this.getTokenDecoded();
		return data.is_admin | data.is_sa;
	}

	getUserID() {
		const data = this.getTokenDecoded();
		return data._id;
	}


	getAuthorizationHeader() {
		return 'Bearer ' + this.getToken()
	}

	// Header which i will add to ajax request
	header() {
		return {
			'Authorization' : 'Bearer ' + this.getToken(),
			'x-access-token' : this.getToken()
		}
	}

	getTokenBearer() {
		return 'Bearer ' + this.getToken();	
	}



}