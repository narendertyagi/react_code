const config = require('../config/server/index.js')
var express = require('express');
const serialize =  require("serialize-javascript")

const www = require('../plugins/core/www')
let Www = new www({
	port: config.module.admin.port
})

let eApp = Www.app

eApp.use(express.static("public"))

eApp.use('/', (req,res,next) => {
    res.render('server', {
        siteName: config.module.admin.title,
        scripts: [...config.scripts, ...config.module.admin.scripts],
        cssHrefs: [...config.cssHrefs, ...config.module.admin.cssHrefs],
        markup: '',
        bodyClass: '',
        data: serialize({}),
        meta: {
            title: config.module.admin.title,
            description: '',
            url: config.module.admin.domain + req.path
        },
        headStartCustomCode: ''
    });

});

Www.start()