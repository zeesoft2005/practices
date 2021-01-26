/*
A library to create C# like namespaces in Js and create register a type/class with that namespace
*/
(function (NamespaceJS) {
    NS.createNS = function (fqName, cls) {
        var nsparts = fqName.split('.');
        var parent = window;
        // we want to be able to include or exclude the root namespace
        // So we strip it if it's in the namespace
        if (nsparts[0] === 'window') {
            nsparts = nsparts.slice(1);
        }
        // check if we have to only create ns or ns+cls=a fully qualified class name
        var modulesCount = cls !== undefined ? nsparts.length - 1 : nsparts.length;
        // loop through the parts and create
        // a nested namespace if necessary
        for (var i = 0; i < modulesCount; i++) {
            var partname = nsparts[i];
            // check if the current parent already has
            // the namespace declared, if not create it
            if (typeof parent[partname] === 'undefined') {
                parent[partname] = {};
            }
            // get a reference to the deepest element
            // in the hierarchy so far
            parent = parent[partname];
        }
        // the parent is now completely constructed
        // with empty namespaces and can be used.
        if (cls !== undefined) { // finally add class to ns if cls found
            parent[nsparts[modulesCount]] = cls;
        }
        return parent;
    };
}(window.NS = window.NS || {}));

/**
 * A Pub-Sub event-cache
 * Pre-req: the using class must have this.key property defined    
 */
 NS.createNS('Core.PubSub', {
    pub: function () {//expects something like: 'asdf' OR {event: 'abc', data:{}} OR {origin: 'abc', state:'xyz' data:{}} 
        // Turn arguments object into a real array  
        var args = Array.prototype.slice.call(arguments, 0);
        // Extract the first argument, the event object
         var e = args.shift();
         debugger
        var cache = window.event_cache || (window.event_cache = {});       
        var evt = typeof e === "string"? e: (typeof e === "object"?(e.event? e.event: e.origin + e.state): e);
        for (var key in cache) {
            var cache_item = cache[key];//get each cache item
            if (cache_item) {
                var handlers = cache_item[evt];//get this event's subscriptions in a cache
                if (handlers) {
                    handlers.forEach(function (cb) {//call every callback attached with this event
                        var _args = e.data ? e.data : e.value;
                        cb(_args); //run callback with event data passed in
                    });
                }
            }
        }
        return this;
    },
     sub: function (event /*string*/, callback) {
         if (!this.key) {
             throw 'The class must have a property named "key"';
        }
        var cache = window.event_cache || (window.event_cache = {});
        var cache_item = cache[this.key] || (cache[this.key] = {});       
        (cache_item[event] || (cache_item[event] = [])).push(callback);
        return this;
    },
    clearSubscriptions: function () {
        window.event_cache[this.key] = {};
    },
    allSubscriptions: function () {
        return window.event_cache;
    },
    subscriptions: function (key) {
        return window.event_cache[key?key:this.key];
    },
    eventSubscriptions: function (evt) {//returns list of events subscribed or list of callback for the evt specified
        var cache = window.event_cache || (window.event_cache = {});
        var cache_item = cache[this.key] || (cache[this.key] = {});
        if (evt) {
            return cache_item[evt];
        }
        var events = [];
        for (var prop in cache_item) {
            events.push(cache_item[prop]);
        }
        return events;
    }
});

/* Simple JavaScript Inheritance
* By John Resig https://johnresig.com/
* MIT Licensed.
*/
// Inspired by base2 and Prototype
(function () {
    var initializing = false, fnTest = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/;
    // The base Class implementation (does nothing)
    this.JSClass = function () { };
    // Create a new Class that inherits from this class
    JSClass.extend = function (prop) {
        var _super = this.prototype;
        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;
        // Copy the properties over onto the new prototype
        for (var propName in prop) {
            // Check if we're overwriting an existing function
            prototype[propName] = typeof prop[propName] == 'function' &&
              typeof _super[propName] == 'function' && fnTest.test(prop[propName]) ?
              (function (name, fn) {
                  return function () {
                      var tmp = this._super;
                      // Add a new ._super() method that is the same method
                      // but on the super-class
                      this._super = _super[name];
                      // The method only need to be bound temporarily, so we
                      // remove it when we're done executing
                      var ret = fn.apply(this, arguments);
                      this._super = tmp;
                      return ret;
                  };
              })(propName, prop[propName]) : prop[propName];
        }
        // The dummy class constructor
        function JSClass() {
            // All construction is actually done in the init method
            if (!initializing && this.init) {
                if (arguments == null || arguments[1] == null || arguments[1] == false) {
                    this.init.apply(this, arguments);
                }
            }
        }
        // Populate our constructed prototype object
        JSClass.prototype = prototype;
        // Enforce the constructor to be what we expect
        JSClass.prototype.constructor = JSClass;
        // And make this class extendable
        JSClass.extend = arguments.callee;
        return JSClass;
    };

     //register this class
    NS.createNS('Core.Class', this.JSClass);
    //attach pubsub
    JSClass.prototype.publish = function (e) {
        Core.PubSub.pub.call(this, e);
    };
    JSClass.prototype.subscribe = function (e, h) {
        Core.PubSub.sub.call(this, e, h);
    };
    JSClass.prototype.subscriptions = function () {
        return Core.PubSub.subscriptions.call(this);
    };
    JSClass.prototype.eventSubscriptions = function (evt) {
        return Core.PubSub.eventSubscriptions.call(this, evt);
    };
    JSClass.prototype.clearAllSubscriptions = function () {
        return Core.PubSub.clearSubscriptions.call(this);
    };
   
})();
