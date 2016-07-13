/**
 * Created by admin on 16/3/13.
 */
"use strict";

var puremvc = require('puremvc').puremvc;
var StartupCommand = require('./controller/command/StartupCommand.js');

var AppFacade = module.exports = puremvc.define(
    // CLASS INFO
    {
        name: 'AppFacade',
        parent: puremvc.Facade,

        constructor: function (multitonKey) {
            puremvc.Facade.call(this, multitonKey);
        }
    },
    // INSTANCE MEMBERS
    {
        initializeController: function () {
            puremvc.Facade.prototype.initializeController.call(this);
            this.registerCommand(StartupCommand.NAME, StartupCommand);
        },
        initializeModel: function () {
            puremvc.Facade.prototype.initializeModel.call(this);
        },
        initializeView: function () {
            puremvc.Facade.prototype.initializeView.call(this);
        },

        startup: function () {
            this.sendNotification(StartupCommand.NAME);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function (multitonKey) {
            var instanceMap = puremvc.Facade.instanceMap;
            var instance = instanceMap[multitonKey];
            if (instance) {
                return instance;
            }
            return instanceMap[multitonKey] = new AppFacade(multitonKey);
        },
        NAME: 'AppFacade'
    }
);