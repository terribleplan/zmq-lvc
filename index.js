var zmq = require('zmq');

function lvcWithSockets(sub, xpub) {
    var cache = {};
    sub.on('message', function(topic, message) {
        cache[topic] = message;
        xpub.send([topic, message]);
    });
    xpub.on('message', function(data) {
        if (data[0] !== 0) {
            var topic = data.slice(1).toString();
            if (cache.hasOwnProperty(topic)) {
                this.send([topic, cache[topic]]);
            }
        }
    });
}

function createLastValueCache(subscribeTo, publishTo) {
    var sub = zmq.socket('sub');
    var xpub = zmq.socket('xpub');
    lvcWithSockets(sub, xpub);
    sub.connect(subscribeTo);
    sub.subscribe('');
    xpub.bindSync(publishTo);
}

module.exports = createLastValueCache;
module.exports.raw = lvcWithSockets;
