/// <reference path="typings/modules/express/index.d.ts" />
/// <reference path="typings/globals/node/index.d.ts" />
/// <reference path="mysqldb/mysqldbmodule.ts" />
"use strict";
var express = require("express");
var mysqldbmodule_1 = require("./mysqldb/mysqldbmodule");
var RESTServer = (function () {
    function RESTServer(address, serverPort, logger) {
        this.app = express();
        this.serverPort = serverPort == null || serverPort == undefined || isNaN(serverPort) ? 8080 : serverPort;
        this.address = address == null || address == undefined ? "localhost" : address;
        this.logger = logger;
    }
    RESTServer.prototype.query = function (req, res) {
        var connParams = { host: "localhost", user: "nodeusr", password: "nodeusr", database: "nodetest" };
        var pName = req.params.name == undefined || req.params.name == null ? "" : req.params.name;
        this.logger("Received param 'Name' >>" + pName);
        var query = new mysqldbmodule_1.SQLQuery("SELECT * FROM TESTDATA", connParams)
            .addConstraint("UCASE(FIRSTNAME)", "LIKE", req.params.name + "%")
            .addConstraint("IDRECORD", ">", 0)
            .onSuccess(function (data) {
            res.send(JSON.stringify(data));
        })
            .onFailure(function (data) {
            res.send(JSON.stringify(data));
        })
            .execute();
    };
    RESTServer.prototype.GET = function (url, requestHandler) {
        var myFunction = function (req, res) {
            requestHandler(req, res);
        };
        this.app.get(url, myFunction);
        this.logger("Exposed service at URL http://" + this.address + ":" + this.serverPort + url);
    };
    RESTServer.prototype.start = function () {
        this.app.listen(this.serverPort);
        this.logger("Server running at http://" + this.address + ":" + this.serverPort + "/");
        return 0;
    };
    return RESTServer;
}());
function consoleLogger(message) {
    console.log("[LOG] >> " + message);
}
function helloWorld(req, res) {
    res.send("<html> <body> <h1> Hello, world </h1> </body> </html>");
}
function helloREST(req, res) {
    var anObject = {
        salutation: 'Mr.',
        name: 'John',
        lastName: 'Doe'
    };
    res.send(JSON.stringify(anObject));
}
var args = process.argv.slice(2);
var ip = args[0];
var port = +args[1];
var ss = new RESTServer(ip, port, consoleLogger);
ss.GET("/", helloWorld);
ss.GET("/rest", helloREST);
ss.GET("/query", ss.query);
ss.GET("/query/:name", ss.query);
ss.start();
//# sourceMappingURL=RESTServer.js.map