import * as crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = 'MyNestjsSecretKey1234567890demo1'; //must 32 characters long
const iv = crypto.randomBytes(16); 

const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

const encryptedData = encrypt('12345678');


