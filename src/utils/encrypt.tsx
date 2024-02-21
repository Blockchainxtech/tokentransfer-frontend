import CryptoJS from 'crypto-js';

export const encrypt = (value: string) => {
    return CryptoJS.AES.encrypt(JSON.stringify(value), import.meta.env.VITE_SECRET_KEY).toString();
};
