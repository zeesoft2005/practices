NS.create('Core.Utils', (function () { 
    //utility function for a Child class to extend a Parent class
    var _extendClass = function(Parent, Child){
        Child.prototype = Object.create(Parent.prototype);
        Object.defineProperty(Child.prototype, 'constructor', {value: Child, enumerable: false, writable: true });
    };
 
    var _isFunction = function(func){
    return typeof func === "function";
    }

    var _isWindow = function( obj ) {
        return obj != null && obj === obj.window;
    }
    /**
     * Determine if it is an object
     * @param {Object} obj
     */
    var _isPlainObject = function(obj){ // must be object                                
                /**
                                   * Because of IE, we must also check the constructor properties to ensure that node objects and window objects are not passed.
                 */
                if (!obj || typeof obj !== "object" ||  obj.nodeType || isWindow(obj)) {
                    return false;
                }
                
                try {
                                         // If obj has no constructor attribute and no obj in the prototype chain of obj returns false
                    if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                        return false;
                    }
                } 
                catch (e) {
                                         // IE8,9 will throw throw exceptions on certain host
                    return false;
                }
                
                var key;
                for (key in obj) {
                }
				/**
				  * If the key is not assigned, return fasle
				 */
                return key === undefined || hasOwn.call(obj, key);
    };

    var _getRandomInt = function(min, max) {
        var min = Math.ceil(min);
        var max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    };
    var _extend = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }
        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !_isFunction(target)) {
            target = {};
        }
        // extend jQuery itself if only one argument is passed
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }
                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (_isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && _isPlainObject(src) ? src : {};
                        }
                        // Never move original objects, clone them
                        target[name] = _$extend(deep, clone, copy);
                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // Return the modified object
        return target;
    };
    return {
        Inherit: _extendClass,
        Extend: _extend,
        isFunction: _isFunction,
        isWindow: _isWindow,
        isPlainObject: _isPlainObject,
        GetRandomInt:_getRandomInt
    }

}()));