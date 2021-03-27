/*
A library to create C# like namespaces in Js and create register a type/class with that namespace
*/
(function (NamespaceJS) {
    NS.create = function (fqName, cls) {
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

NS.create('Core.Cookie', {
        set: function (name, value, days) {
            var expires;
            if (name) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                }
                else {
                    expires = "";
                }
                document.cookie = name + "=" + escape(value) + expires + "; path=/";
            }
        },
        setShort: function (name, value, seconds) {
            var expires;
            if (name) {
                if (seconds) {
                    var date = new Date();
                    date.setTime(date.getTime() + (seconds * 1000));
                    expires = "; expires=" + date.toGMTString();
                }
                else {
                    expires = "";
                }
                document.cookie = name + "=" + escape(value) + expires + "; path=/";
            }
        },
        get: function (name) {
            if (name) {
                var match = document.cookie.match(new RegExp(name + "=(.*?)(?:;|$)"));
                if (match) {
                    return unescape(match[1].replace(/\+/g, "%20"));
                }
            }
        },

        list: function () {
            var pairs = document.cookie.split(new RegExp("; "));
            if (pairs.length > 0 && pairs[0] !== "") {
                var keys = new Array(pairs.length);
                for (var i = 0; i < pairs.length; i++) {
                    keys[i] = pairs[i].match(/(.+?)=/)[1];
                }
                return keys;
            }
            return [];
        },

        // delete is a reserved word, so appending an underscore
        del: function (name) {
            this.set(name, "", -1);
        }
});

NS.create('Core.WebStorage', function (options) {
        var COOKIE_STORAGE = Core.Cookie;
        var WEB_STORAGE;
        var IS_COOKIE_ENABLED = (function () {
            var cookieEnabled = navigator.cookieEnabled;
            if (!cookieEnabled) {
                document.cookie = "testcookie";
                cookieEnabled = document.cookie.indexOf("testcookie") != -1;
            }
            return cookieEnabled;
        })();
        var IS_STORAGE_SUPPORTED = (function () {
            var uid = new Date, result;
            try {
                if (options && options.type == "session")
                    WEB_STORAGE = window.sessionStorage;
                else if (options && options.type == "local")
                    WEB_STORAGE = window.localStorage;
                else
                    WEB_STORAGE = window.localStorage;//default fall back storage IF cookie is disabled
                WEB_STORAGE.setItem(uid, uid);
                result = WEB_STORAGE.getItem(uid) == uid;
                WEB_STORAGE.removeItem(uid);
                return true;//result && WEB_STORAGE;
            } catch (e) {
                return false;
            }
        })();
        //console.log(options.type);
        var UseCookie = options && options.type == "cookie" || (!options && IS_COOKIE_ENABLED);
        //console.log(IS_COOKIE_ENABLED);
        //console.log(UseCookie);
        var UseWebStorage = !UseCookie && IS_STORAGE_SUPPORTED;
        //console.log(UseWebStorage);

        //By now we should have SET what storage to use based on User Preference AND Browser Support

        if (!UseCookie && !UseWebStorage) {
            console.log('Exceptional Case: No Cookie, No Web Storage Supported/Enabled on Browser!!!!');
        }
        var existsKey = function (key) {
            if (UseCookie)
                return COOKIE_STORAGE.get(key) != null;
            else if (UseWebStorage)
                return WEB_STORAGE.getItem(key) !== null;
            else return false;
        };
        var get = function (key) {
            if (UseCookie)
                return COOKIE_STORAGE.get(key);
            else if (UseWebStorage)
                return WEB_STORAGE.getItem(key);
            else return null;
        };
        var set = function (key, item) {
            if (UseCookie) {
                var args = arguments.length;
                if (args == 2) { COOKIE_STORAGE.set(key, item); }
                else if (args == 3) { COOKIE_STORAGE.set(key, item, arguments[2]); }

            }
            else if (UseWebStorage)
                WEB_STORAGE.setItem(key, item);
        };
        var setTemp = function (key, item) {
            //store for only 2Hours or 120min
            //if (UseCookie) { COOKIE_STORAGE.set(key, item, (1 / 144) * 12); } // 1/144 = 10min & (1/144)*12 = 2Hours

            //store for only 30min..
            if (UseCookie) { COOKIE_STORAGE.set(key, item, (1 / 144) * 3); } // 1/144 = 10min

            else if (UseWebStorage) { throw 'Not supported'; }
        };        
        var remove = function (key) {
            if (UseCookie)
                COOKIE_STORAGE.del(key);
            else if (UseWebStorage)
                WEB_STORAGE.removeItem(key);
            //confirm
            return !existsKey(key);

        };
        var remember = function (key) {
            set(key, true);
        };
        var getAllKeys = function () {
            if (UseCookie)
                return COOKIE_STORAGE.list();
            else if (UseWebStorage) {
                var arr = [];
                for (var key in WEB_STORAGE) {
                    arr.push(key);
                }
                return arr;
            }
            else return null;

        };
        return {
            Remove: remove,
            Get: get,
            Store: set,            
            StoreTemp: setTemp,
            Exists: existsKey,
            Keys: getAllKeys,
            Remember: remember
        };
    });
/**
 * A Pub-Sub event-cache
 * Pre-req: the using class must have this.key property defined    
 */
 NS.create('Core.PubSub', {
    pub: function () {//expects something like: 'asdf' OR {event: 'abc', data:{}} OR {origin: 'abc', state:'xyz' data:{}} 
        // Turn arguments object into a real array  
        var args = Array.prototype.slice.call(arguments, 0);
        // Extract the first argument, the event object
         var e = args.shift();
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
    NS.create('Core.Class', this.JSClass);
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

/**
 * A special class built like a state machine for a class:
 . to track an event on every state change
 . to specify logger used to log on every state change
 . to store state in browser cache (e.g. cookie or local/session storage)
 . to notify other codebase of state changes in a cross-iframe manner
 . to invoke callback function onStateChanged
 */
NS.create('Core.State', Core.Class.extend({

    init: function (options) {
        this.id = options.id;
        this.states = options.states || [];
        this.logger = options.logger || console;
        this.storage = options.storage;
        this.onStateChanged = options.onStateChanged;
    },
    /*
    * Method used to store state as cookie automatically; this.super() in child class methods causes this method to be invoked by base class
    * 1. log state transition
    * 2. store state value
    * 3. falsify old state
    * 4. log this state transition in history cookie/store
    * 5. save all state
    * 6. set current/new state
    */
    changeState: function (options /* _to, value, _from */) {
        if (!options.toState) { // no state specified? exit
            return;
        }
        var sourceObj = options.origin ? options.origin : this.id;
        //set widget's current state as cookie if required
        if (options.persist) {
            this.storage && this.storage.api.Store(sourceObj, options.toState);
        }
        this.currentState = options.toState;
        if (options.log) {
            this.logger && this.logger.log({ text: sourceObj + '_' + options.toState });
        }
        // finally notify cross-iframe
        this.onStateChanged && this.onStateChanged({ 'origin': sourceObj, 'state': options.toState, 'value': options.value });
    },
    addStateHandler: function (s, h) {
        this.subscribe(this.id + s, h);
    },
    persistStateValue: function (options) {

        var id = options.id ? options.id : this.id;
        var state = options.state;
        var value = options.value;
        if (!state) {
            throw 'State is mandatory';
        }
        if (value == undefined) {
            throw 'Value is mandatory';
        }
        var key = id + state;
        this.storage && this.storage.api.Store(key, value);
    },
    getStateValue: function (id, state) {//get state of a class with/without a particular state specified
        var objId = id ? id : this.id;
        // get only specified state value
        if (state) {            
            var value = this.storage.api.Get(objId + state);
            return value ? JSON.parse(value) : null;
        }
        else
            return this.storage.api.Get(objId);

        return null;
    }
}));

/*
A Generic class to create an HTML View 
Required: template 
Usages:
        var view1 = new Core.BaseView({ template:'<h2>H2 Template on body,  <#=name#>!</h2>', name:'zee'});
        var view2 = new Core.BaseView({ targetSelector: '#subscriber', template:'<h2>H2 Template in a target elem,  <#=name#></h2>!', name:'zee'});
        var view3 = new Core.BaseView({ model:{template:'<h2>H2 model template in body,  <#=name#>!</h2>', name:'zee'}});
        var view4 = new Core.BaseView({ model:{containerElemType:'span', template:'<h2>H2 model template in SPAN tag,  <#=name#>!</h2>', name:'zee'}});
        var view5 = new Core.BaseView({ rawContent:'<h2>H2, I\'m static raw html!</h2>'});
*/

NS.create('Core.BaseView', Core.Class.extend({
    init: function (options) {
        var me = this;
     
        if (!options) {
            throw 'missing options';
        }
        me.id = options.id || 'view_'+ Core.Utils.GetRandomInt(1,1000);
        me.template = options.template;
        me.parseTemplate = options.parseTemplate || Core.DomUtils.parseTemplate;
debugger
        me.rawContent = options.rawContent;
        me.context = options.context || document;
        me.afterRender = options.afterRender;
        me.beforeRender = options.beforeRender;
        me.containerSelector = options.containerSelector;
        me.targetSelector = options.targetSelector;
        
        me.emitLogs = options.emitLogs;
        me.persistState = options.persistState;
        
        me.styles = options.styles;
        me.classNames = options.classes;
        me.wrap = options.wrap;
        me.renderOninit = options.renderOninit === undefined ? true: options.renderOninit;
        me.elements = options.elements ? options.elements : [];
        me.model = options.model;

        me.state = new Core.State({
            id: this.id,
            states: ['init', 'render', 'unrender'],
            logger: options.logger ? options.logger : { name: 'window.console', log: console.log },
            storage: options.storage ? options.storage : { name: 'window.cookie', api: { Store: Core.Cookie.set, Get: Core.Cookie.get } },
            onStateChanged: function (args) {
                me.publish(args);
            }
        });
        if (me.beforeRender) {
            me.state.states.push('beforeRender');
        }
        if (me.afterRender) {
            me.state.states.push('afterRender');
        }
        if (me.renderOninit) {
            me.render(me.model ? me.model : options);
        }
    },
    /* @param {any} model
    summary: renders the view, takes decisions and completes multiple tasks. */

    render: function (model) {
        var me = this;
        model = model || me;//for subsequent render() calls 

        if (this.beforeRender) {
            this.beforeRender();
            this.state.changeState({ toState: 'beforeRender', log: this.emitLogs, persist: this.persistState });
        }
        var container = document.createElement('div');
        var target = this.targetSelector ? this.context.querySelector(this.targetSelector) : this.context.body,
            wrapper = model && model.containerElemType ? this.context.createElement(model.containerElemType) : this.context.createElement('div');
        //if model contains a template use it with model = model
        //ELSE IF options contain a template then use it with model = options.model
        //ELSE IF options.rawContent given, write it out
        //ELSE the simple view will have no inner HTML
      
         wrapper.innerHTML = model && model.template ?
                this.parseTemplate(model.template, model) :
                (this.template && this.model ? this.parseTemplate(this.template, this.model) :
                    this.rawContent ? this.rawContent : '');
           
        
        var containerId = model && model.containerId ? model.containerId : this.id;
        wrapper.setAttribute('id', containerId);
        this.elements['containerSelector'] = '#' + containerId;
        if (this.wrap) {
            container.setAttribute('id', containerId);
            container.innerHTML = wrapper.innerHTML;
            target.appendChild(container);
        } else {
            target.appendChild(wrapper);
        }
        this.state.changeState({ toState: 'render', log: this.emitLogs, persist: this.persistState });
        if (this.afterRender) {
            this.afterRender();
            this.state.changeState({ toState: 'afterRender', log: this.emitLogs, persist: this.persistState });
        }
        if (this.styles) {
            this.addStyle(this.styles);
        }
        if (this.classNames) {
            if (this.classNames.length > 0) {
                for (var i = 0; i < this.classNames.length; i++) {
                    this.addClass(this.classNames[i]);
                }
            }
        }
    },
    getContainerSelector: function () {
        return this.elements['containerSelector'];
    },
    getContainer: function () {
        var wrapper = this.context.querySelector(this.getContainerSelector());
        if (this.wrap) {
            return wrapper;
        } else if (this.targetSelector){
            wrapper = this.context.querySelector(this.targetSelector);           
        }
         return wrapper;
    },
    unrender: function (remove) {
        var wrapperContainer = this.context.getElementById(this.id);
        // if (wrapperContainer) {
        //     ApexChat.hideElement(wrapperContainer);
        // }
        //remove altogether if asked
        //if (remove === true) {
            try { this.context.body.removeChild(wrapperContainer); }
        catch (e) { }
        this.state.changeState({ toState: 'unrender', log: this.emitLogs, persist: this.persistState });
        //}
    },
    
}));