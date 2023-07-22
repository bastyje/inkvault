const register = async (salt) => {
  const credentialCreationOptions = {
    publicKey: {
      challenge: new Uint8Array(4).fill(1),
      rp: {name: 'Example'},
      user: {
        id: new Uint8Array(4).fill(1),
        name: 'sebastiangorka442@gmail.com',
        displayName: 'sebastiangorka442@gmail.com'
      },
      pubKeyCredParams: [
        {type: 'public-key', alg: -7}
      ],
      authenticatorSelection: {
        userVerification: 'required'
      },
      extensions: {
        prf: {eval: {first: salt}}
      }
    }
  };
  const credential = await navigator.credentials.create(credentialCreationOptions);

  return {
    rawId: credential.rawId,
    transports: credential?.response.getTransports(),
  }
};

document.getElementById('btn').addEventListener('click', e => {
  register(new Uint8Array([9, 0, 1, 2]).buffer).then(r => {
    console.log(r);
  }).catch(r => {
    console.log(r);
  });
});