import io from 'socket.io-client';
const socket = io('http://localhost:3000');

function subscribeToRaid (raid, cb) {
    socket.on('tweet', raidInfo => cb(null, raidInfo));
    socket.emit('subscribe', {raid});
    
}

export {subscribeToRaid}