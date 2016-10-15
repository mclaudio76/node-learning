
let mysql = require('mysql');

interface SQLHandler {
    (data, ...otherParams);
}

interface ConnectionParams {
    host: string;
    user: string;
    password : string;
    database: string;
}


class SQLQuery {

    private _query: string;
    private _parameters : any[];
    private _innerConnection;
    private firstParamSet: boolean = true;
    
    private _querySucceeded : SQLHandler;
    private _queryFailed    : SQLHandler;
   
    public constructor(baseQuery:string, credentials : ConnectionParams) {
        this._query = baseQuery;
        this._parameters = [];
        this._innerConnection = mysql.createConnection(credentials);
    }        

   
    public addConstraint(fieldName:string, operator:string, pValue:any) : SQLQuery {
        if(this.firstParamSet) {
            this.firstParamSet = false;
            this._query += " WHERE 1 = 1";
        }
        this._query += " AND "+fieldName+" "+operator+" ? ";
        this._parameters.push(pValue);
        return this;
    }

    public onSuccess(handler: SQLHandler) : SQLQuery{
        this._querySucceeded  = handler;
        return this;
    }

    public onFailure(handler: SQLHandler) : SQLQuery {
        this._queryFailed  = handler;
        return this;
    }


    public execute() {
         let self : SQLQuery = this;
         this._innerConnection.query(this.getQuery(), this._parameters, function(error,rows,fields) {
             if(error) {
                 self._queryFailed(error);
             }
             else {
                 self._querySucceeded(rows);
             }
         });
    }

    private getQuery() : string {
        return this._query;
    }

   

}

export {SQLQuery,SQLHandler};


