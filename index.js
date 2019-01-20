'use strict'

const fp        = require('fastify-plugin');
const Datastore = require('nedb');

function nedbPlugin(fastify, options, next) {

    const filename      = options.filename;
    const timestampData = options.timestampData || false;
    const autoload      = options.autoload || true;
    const onload        = options.onload;
    const inMemoryOnly  = options.inMemoryOnly;

    let nedbOpts = {
        filename     : filename,
        timestampData: timestampData,
        autoload     : autoload,
        onload       : onload,
        inMemoryOnly : inMemoryOnly
    }
   
    let nedb = new Datastore(nedbOpts);

    fastify.decorate('nedb', nedb);

    next();
}


module.exports = fp(nedbPlugin, {
    fastify: '>=1.0.0',
    name   : 'fastify-nedb'
})