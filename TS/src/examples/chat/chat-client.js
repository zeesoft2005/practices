"use strict";
exports.__esModule = true;
exports.ChatClient = void 0;
/**
* A chat client proxu object which connects and wires up pub/sub calls
*/
var ChatClient = /** @class */ (function () {
    function ChatClient(options) {
        this.options = options;
        this.connect();
    }
    ChatClient.prototype.connect = function () {
        this.options.connect.call(this.options.client, this.options.connectArgs);
    };
    ChatClient.prototype.Subscribe = function (payload) {
        this.options.subscribe.call(this.options.client, payload);
    };
    ChatClient.prototype.Publish = function (payload) {
        this.options.publish.call(this.options.client, payload);
    };
    return ChatClient;
}());
exports.ChatClient = ChatClient;
//------------------ Test ------------------
var sub = {
    channels: ['/test1'],
    onSuccess: function (arg) { return console.log('sub-success'); },
    onFailure: function (arg) { return console.log('sub-failure'); }
};
var pub = {
    channel: '/test2',
    onSuccess: function (arg) { return console.log('pub-success'); },
    onFailure: function (arg) { return console.log('sub-failure'); },
    onReceive: function (arg) { return console.log('pub-receive'); }
};
var clientArgs = {
    connect: function () { return console.log('connected'); },
    subscribe: function () { return console.log('subscribed'); },
    publish: function () { return console.log('published'); },
    connectArgs: {
    //websync related config for the client here
    },
    client: {
    //websync client instance here
    }
};
var client = new ChatClient(clientArgs);
client.Subscribe(sub);
client.Publish(pub);
