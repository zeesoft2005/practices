/**
* Interface to any chat client exposing methods for pub/sub
*/
export interface IChatClient
{
    connect(payload: any): void;
    Subscribe(payload: SubscribePayload): void;
    Publish(payload: PublishPayload): void;
}

/**
* JSON options passed to create a chat client
*/
export interface ClientArgs
{
    connect(args: any): void;
    subscribe(): void;
    publish(): void;
    connectArgs: any;
    client: any;
}

/**
 * JSON payload structures allowed for pub/sub operations
 */
export interface Callbacks {
    onSuccess(opt: any): void;
    onFailure(opt: any): void; 
}
export interface SubscribePayload extends Callbacks {
    channels: string[];
}
export interface PublishPayload extends Callbacks {
    channel: string;
    onReceive(opt: any): void;
}

/**
* A chat client proxu object which connects and wires up pub/sub calls
*/
export class BaseChatClient implements IChatClient{

    constructor(public readonly options: ClientArgs) {
        this.connect();
    }
    connect(): void {
        this.options.connect.call(this.options.client, this.options.connectArgs);
       
    }
    public Subscribe(payload: SubscribePayload): void {
        this.options.subscribe.call(this.options.client, payload);
    }
    public Publish(payload: PublishPayload): void {
        this.options.publish.call(this.options.client, payload);
    }
}

//------------------ Test ------------------
let sub: SubscribePayload = {
    channels: ['/test1'],
    onSuccess: (arg) => console.log('sub-success'),
    onFailure: (arg) => console.log('sub-failure')
};
let pub: PublishPayload = {
    channel: '/test2',
    onSuccess: (arg) => console.log('pub-success'),
    onFailure: (arg) => console.log('sub-failure'),
    onReceive: (arg) => console.log('pub-receive')
};
let clientArgs = {
    connect: () => console.log('connected'),
    subscribe: () => console.log('subscribed'),
    publish: () => console.log('published'),
    connectArgs: {
        //websync related config for the client here
    },
    client: {
        //websync client instance here
    }
};
const client = new BaseChatClient(clientArgs);
client.Subscribe(sub);
client.Publish(pub);
