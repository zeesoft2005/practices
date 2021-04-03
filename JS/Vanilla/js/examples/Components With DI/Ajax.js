/*
This component is developed with Module Pattern
*/
var Ajax = (function ($) {
  
    var _init = function (options) {
        
        if (options) {
            this.type = options.method || 'GET';
            this.url = options.url;
            this.success = options.onSuccess;
            this.failure = options.onFailure;
            this.complete = options.onComplete;           
        }
            return this;
        };
    var _req = function (options) {
        var me = this;
         $.ajax({
          type: options && options.method || me.type,
          url: options && options.url || me.url,
          data: options && options.data,
          success: options && options.onSuccess || me.success,
          error: options && options.onFailure || me.failure,
          complete: options && options.onComplete || me.complete
        });      
    };
    
    var _save = function (options) {
        var me = this;
        var url = options && options.url || me.url;
        if (options.data && options.data.id) {
            url += options.data.id;
            options.method = 'PUT';
        } else if(options.data){
            options.method = 'POST';
        }
        options.url = url;
        _req.call(this, options);
    }
 
    var _del = function (options) {
        var me = this;
        var url = options && options.url || me.url;
        if (options && options.id) {
            url +=  options.id;
        }
        options.url = url;
        options.method = 'DELETE';
        _req.call(this, options);
    }
    
    var _get = function (options) {        
        var me = this;
        var options = options || {};
        var url = options && options.url || me.url;
        if (options && options.id) {
            url +=  options.id;
        }
        options.url = url;
        options.method = 'GET';
        _req.call(this, options);
    }

    //public data: methods and properties
    var PUBLIC_METHODS = {
        AddOrUpdate: _save,
        Delete: _del,
        Get: _get,
        GetAll: _get
    };
    //constructor function used to instantiate objects
    function ajax(options) {
  
        if (options) {           
                _init.call(this, options);            
        } 
        else {
           throw 'The component cannot be created without mandatory options';
       }
    }
    ajax.prototype = PUBLIC_METHODS;//expose methods for caller

    return ajax; //return the constructor
}($));//inject dependencies
