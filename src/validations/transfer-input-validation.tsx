import * as yup from 'yup';

export const schema = yup.object().shape({
  address: yup.string().matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid wallet address').required('Wallet address is required'),
  value: yup.number().typeError('Amount must be a number').positive('Amount must be positive').required('Amount is required'),
});
