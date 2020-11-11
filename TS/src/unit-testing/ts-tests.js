"use strict";
exports.__esModule = true;
exports.Sum = exports.Functions = void 0;
var axios_1 = require("axios");
var functions = {
    add: function (a, b) { return a + b; },
    createObject: function () {
        return { firstName: 'Zeeshan', lastName: 'Ahmed' };
    },
    httpCall: function (url) { return axios_1["default"].get(url)
        .then(function (res) { return res.data; })["catch"](function (err) { return err.message; }); }
};
exports.Functions = functions;
var Sum = /** @class */ (function () {
    function Sum() {
    }
    Sum.Of = function () {
        var numbers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            numbers[_i] = arguments[_i];
        }
        var sum = 0;
        for (var _a = 0, numbers_1 = numbers; _a < numbers_1.length; _a++) {
            var n = numbers_1[_a];
            sum = n + sum;
        }
        return sum;
    };
    return Sum;
}());
exports.Sum = Sum;
