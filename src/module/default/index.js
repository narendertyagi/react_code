import React from 'react'
import { renderToString } from "react-dom/server"
import { hydrate, render } from 'react-dom'
import { StaticRouter, BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react';
// import axios from 'axios'
const Loadable = require('react-loadable');

function App () {
	return (
		<div className="text-center" style={{paddingTop:"200px"}}>
			<h2>Welcome Default</h2>
		</div>
	)
}

// Each Module will have its own configuration
const config = require('../../config/module/default')
const Config = new config()
Sapp.config = Config._config()

class ModuleDefault {

	async init() {
		if(__isBrowser__) {
			const Browser = new Sapp.Browser()
			await Browser.init()
			await Config.init()

			if(Sapp.config.ssr) {
				hydrate(
					<Provider>
						<BrowserRouter ref={router=> { global.router = router; }}>
							<App />
						</BrowserRouter>
					</Provider>,
					document.getElementById('app')
				);
			} else {
				hydrate(
					<Provider>
						<HashRouter ref={router=> { global.router = router; }}>
							<App />
						</HashRouter>
					</Provider>,
					document.getElementById('app')
				);
			}
		}
	}

	async serverMarkup(url, context) {
		await Loadable.preloadAll();
		return (
			renderToString (
				<Provider>
		            <StaticRouter location={url} context={context}>
		                <App />
		            </StaticRouter>
	            </Provider>
			)
		)
	}
}


if(__isBrowser__) { 
	let _ModuleDefault = new ModuleDefault()
	_ModuleDefault.init()
}

export default ModuleDefault
