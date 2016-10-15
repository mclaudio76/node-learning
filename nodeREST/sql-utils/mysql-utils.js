"use strict";
var mysql = require('mysql');
var SQLQuery = (function () {
    function SQLQuery(baseQuery, credentials) {
        this.firstParamSet = true;
        this._query = baseQuery;
        this._parameters = [];
        this._innerConnection = mysql.createConnection(credentials);
    }
    SQLQuery.prototype.addConstraint = function (fieldName, operator, pValue) {
        if (this.firstParamSet) {
            this.firstParamSet = false;
            this._query += " WHERE 1 = 1";
        }
        this._query += " AND " + fieldName + " " + operator + " ? ";
        this._parameters.push(pValue);
        return this;
    };
    SQLQuery.prototype.onSuccess = function (handler) {
        this._querySucceeded = handler;
        return this;
    };
    SQLQuery.prototype.onFailure = function (handler) {
        this._queryFailed = handler;
        return this;
    };
    SQLQuery.prototype.execute = function () {
        var self = this;
        this._innerConnection.query(this.getQuery(), this._parameters, function (error, rows, fields) {
            if (error) {
                self._queryFailed(error);
            }
            else {
                self._querySucceeded(rows);
            }
        });
    };
    SQLQuery.prototype.getQuery = function () {
        return this._query;
    };
    return SQLQuery;
}());
exports.SQLQuery = SQLQuery;
//# sourceMappingURL=mysql-utils.js.map