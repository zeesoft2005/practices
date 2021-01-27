NS.create('Core.Utils', (function () { 
//utility function for a Child class to extend a Parent class
var _extendClass = function(Parent, Child){
    Child.prototype = Object.create(Parent.prototype);
    Object.defineProperty(Child.prototype, 'constructor', {value: Child,enumerable: false, writable: true });
};
 var _copyProps = function (dest, src) {
    for (var prop in src) {
        dest[prop] = src[prop];
    }
    return dest;
    };
    
var _getRandomInt = function(min, max) {
        var min = Math.ceil(min);
        var max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    };

    return {
        Inherit: _extendClass,
        Extend: _copyProps,
        GetRandomInt:_getRandomInt
    }

}()));