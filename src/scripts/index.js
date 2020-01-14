
const findLocalIp = (logInfo = true) => new Promise( (resolve, reject) => {
  window.RTCPeerConnection = window.RTCPeerConnection 
                          || window.mozRTCPeerConnection 
                          || window.webkitRTCPeerConnection;

  if ( typeof window.RTCPeerConnection == 'undefined' )
      return reject('WebRTC not supported by browser');

  let pc = new RTCPeerConnection();
  let ips = [];

  pc.createDataChannel("");
  pc.createOffer()
   .then(offer => pc.setLocalDescription(offer))
   .catch(err => reject(err));
  pc.onicecandidate = event => {
      if ( !event || !event.candidate ) {
          // All ICE candidates have been sent.
          if ( ips.length == 0 )
              return reject('WebRTC disabled or restricted by browser');

          return resolve(ips);
      }

      let parts = event.candidate.candidate.split(' ');
      let ip = parts[4];

      if ( ! ips.some(e => e == ip) )
          ips.push(ip);

      if ( ! logInfo )
          return;

      return ip
  };
} );


module.exports = findLocalIp