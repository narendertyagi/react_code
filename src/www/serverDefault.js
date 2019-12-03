const config = require('../config/server/index.js')
var express = require('express');

const serialize =  require("serialize-javascript")
const www = require('../plugins/core/www')

let Www = new www({
	port: config.module.default.port
})

let eApp = Www.app

eApp.use(express.static("public"))

// const ModuleDefault = require('../../public/dist/m_default.cjs.js').default
// let md = new ModuleDefault()
// md.serverMarkup('/', {}).then((res) => {
//     console.log(res)
// })


if(config.module.default.ssr) {
    const ModuleDefault = require('../../public/dist/m_default.cjs.js').default
    let md = new ModuleDefault()
    eApp.get("*", (req, res, next) => {
        let _promise = async (req, activeRoute) => {
            let markup = await md.serverMarkup('/', {})
    
            return {
                markup: markup
            }
        }
       // const activeRoute = routes.find((route) => matchPath(req.path, route)) || {}
         // console.log(req.path)
        // console.log(req.query)
        // console.log(activeRoute)
        // let markup = null
      
        // const promise = activeRoute.fetchInitialData
        //     ? activeRoute.fetchInitialData({req, activeRoute})
        //     : Promise.resolve()
    
        // const promise = Promise.resolve()
    
        _promise(req, '/').then((data) => {
            const context = { 
                // data
            }
            res.render('server', {
                title: config.module.default.title,
                scripts: [...config.scripts, ...config.module.default.scripts],
                cssHrefs: config.cssHrefs,
                markup: data.markup,
                bodyClass: '',
                data: serialize(data)
            });
        }).catch(next)
    })

} else {
    eApp.use('/', (req,res,next) => {
        res.render('server', {
            title: config.module.default.title,
            scripts: [...config.scripts, ...config.module.default.scripts],
            cssHrefs: config.cssHrefs,
            markup: '',
            bodyClass: '',
            data: null
        });
    });

}



Www.start()