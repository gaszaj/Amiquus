const {verify} = require('hcaptcha');

const secret = 'c70272ba-00ec-4cc0-8a5e-459c3d34dc58';
const token = 'token from widget';

verify(secret, token)
  .then((data) => {
    if (data.success === true) {
      console.log('success!', data);
    } else {
      console.log('verification failed');
    }
  })
  .catch(console.error);