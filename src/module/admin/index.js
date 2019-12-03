import React from 'react'
import { renderToString } from "react-dom/server"
import { hydrate, render } from 'react-dom'
import { StaticRouter, BrowserRouter, HashRouter } from 'react-router-dom'
const Browser = require('../../www/browser')
import { Provider } from 'mobx-react';
// import axios from 'axios'
const Loadable = require('react-loadable');

import axios from 'axios';
import StoreClass from './store'
Sapp.Store = StoreClass

// Each Module will have its own configuration
const config = require('../../config/module/admin')
const Config = new config()
Sapp.config = Config._config()


import App from './App'
import routes from './routes'
import UxmAdmin from '../../plugins/uxm/admin'
import UxmShared from '../../plugins/uxm/shared/'


import MarketCss from './assets/index'
class ModuleSeller {
	async init() {
		global.axios = axios
		const BrowserC = new Browser()
		await BrowserC.init()
		await Config.init()

		Sapp.Route.addMultiple(routes)

		Sapp['UxmAdmin'] = new UxmAdmin({})
		Sapp['UxmShared'] = new UxmShared({})
		await Sapp['UxmShared'].init()


		axios.defaults.headers.common['Authorization'] = Sapp.Auth.getAuthorizationHeader()

		this.MenuPrimary = new Sapp.Menu('Primary')

		await this.MenuPrimary.buildFromRoutes()

		await Sapp.Hook.Action.do('beforeModuleInit')

		hydrate(
			<Provider {...Sapp.Store}>
				<HashRouter ref={router=> { global.router = router; }}>
					<App />
				</HashRouter>
			</Provider>,
			document.getElementById('app')
		);
	}
}


if(__isBrowser__) { 
	Sapp['ModuleSeller'] = new ModuleSeller()
	Sapp.ModuleSeller.init()
}

export default ModuleSeller
