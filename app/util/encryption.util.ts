/**
 * @description holds encryption util
 */

import CryptoJS from 'crypto-js';

export class CommonEncryptionUtil {
  /**
   * encrpyts object
   * @param obj object
   */
  encrypt = (obj: any, secret: string) => {
    let encJson = CryptoJS.AES.encrypt(JSON.stringify(obj), secret).toString();
    let encData = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(encJson)
    );
    return encData;
  };

  /**
   * decrypts object
   * @param encrypted_text
   */
  decrypt = (encrypted_text: string, secret: string) => {
    let decData = CryptoJS.enc.Base64.parse(encrypted_text).toString(
      CryptoJS.enc.Utf8
    );
    let bytes = CryptoJS.AES.decrypt(decData, secret).toString(
      CryptoJS.enc.Utf8
    );
    return JSON.parse(bytes);
  };
}
