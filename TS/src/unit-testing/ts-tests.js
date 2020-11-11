"use strict";
exports.__esModule = true;
exports.Functions = void 0;
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
