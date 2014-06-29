#!/usr/bin/env node
'use strict';
var forever = require('forever');
var Liftoff = require('liftoff');
var path = require('path');
var exec = require('child_process').exec;
var child_process = require('child_process');
var chalk = require('chalk');
var argv = require('minimist')(process.argv.slice(2));
var cli = new Liftoff({
    name: 'nogger',
    moduleName: 'nogger',
    processTitle: 'nogger'
});
var pkg = require('./../package');

var runnning = false;

var commands = {
    start: function () {
        console.log('start called', path.resolve(__dirname, '..', 'back/server.js'));

        forever.start(path.resolve(__dirname, '..', 'back/server.js'), {
            uid: 'nogger'
        });
    },
    stop: function () {
        console.log('stop called');
        //process.kill(132, 'SIGHUP');
    },
    set: function(){
        // set config
    },
    setpassword: function () {
        var password = require("./../back/password");
        console.log('setting password to "' + argv._[1] +'"');

        password.set(argv._[1], function () {
            console.log('password set');
            process.exit();
        });
    },
    unblock: function(){

    },
    help: function () {
        console.log('--- possible commands ---');
        for (var i in commands) {
            console.log(chalk.blue(i));
        }
        console.log('-------------------------');
    },
    version: function(){
        console.log(pkg.name + ' ' + pkg.version);
    }
};


cli.launch({}, function (env) {
    if (argv._.length && commands[argv._[0]]) {
        commands[argv._[0]]();
    } else {
        commands.help();
        process.exit(1);
    }
});

