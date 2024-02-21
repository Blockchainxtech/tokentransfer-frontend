import CryptoJS from 'crypto-js';

export const decrypt = (encryptedValue: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, import.meta.env.VITE_SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};