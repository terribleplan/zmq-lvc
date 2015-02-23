zmq-lvc
=======

zmq-lvc is a super simple Latest Value Cache in node.js for ZeroMQ.

Usage
=====

```js
var lvc = require('zmq-lvc');

//Cache values from 'remote-server' and make it (cached) available at port 555
lvc("tcp://remote-server:1234", "tcp://*:555");
```

Notes
=====

There is also a nice function exported by `require('zmq-lvc').raw` that will allow you to pass in any zmq pub/sub style
socket OR any EventEmitter that sends a `message` event that has a topic and a message as the first argument.

The second argument for the raw method needs to implement `send` and a `message` event that conforms to the interface of
the xpub message event.
