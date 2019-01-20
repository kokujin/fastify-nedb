'use strict'

const t           = require('tap');
const test        = t.test;
const Fastify     = require('fastify');
const rimraf      = require('rimraf');
const fastifyNedb = require('./index');


t.tearDown(() => {
    rimraf('./test', err => {
        if (err) throw err
    })
})

test('nedb namespace should exist', t => {
    t.plan(2);

    const fastify = Fastify();
    fastify
        .register(fastifyNedb, { filename: 'test/test.db' })
        .ready(err => {
            t.error(err);
            t.ok(fastify.nedb);
        })
})

test('Create in-memory nedb database', t => {
    t.plan(3);
    const fastify = Fastify();
    let   doc     = { hello: 'world' };

    fastify
        .register(fastifyNedb, {})
        .ready(err => {
            t.error(err);

            fastify.nedb.insert(doc, function (err, newDoc) {   // Callback is optional
                t.ok(newDoc);
                t.equal(newDoc.hello, 'world');
            });
        })
})

test('Create nedb database with timestamps', t => {
    t.plan(3);
    const fastify = Fastify();
    let   doc     = { hello: 'world' };

    fastify
        .register(fastifyNedb, { timestampData: true, filename: 'test/testtimestamp.db' })
        .ready(err => {
            t.error(err);

            fastify.nedb.insert(doc, function (err, newDoc) {
                t.ok(newDoc);
                t.equal(newDoc.hello, 'world');
            });
        })
})

test('nedb should support nedb operations', t => {
    t.plan(3);
    const fastify = Fastify();
    let   doc     = { hello: 'world' };

    fastify
        .register(fastifyNedb, { filename: 'test/testop.db' })
        .ready(err => {
            t.error(err);

            fastify.nedb.insert(doc, function (err, newDoc) {
                t.ok(newDoc);
                t.equal(newDoc.hello, 'world');
            });
        })
})
