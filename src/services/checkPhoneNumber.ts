import axios from 'axios';

export const checkPhoneNumberSuccess = async (phoneNumber: string) => {
  try {
    const response = await axios.post(
      'https://mpbc14a6455b029f8379.free.beeceptor.com/check-phone/success',
      {
        https: phoneNumber,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error checking phone number:', error);
    return {status: 'error', message: 'Error checking phone number'};
  }
};

export const checkPhoneNumberError = async (phoneNumber: string) => {
  try {
    const response = await axios.post(
      'https://mpbc14a6455b029f8379.free.beeceptor.com/check-phone/error',
      {
        phoneNumber,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error checking phone number:', error);
    return {status: 'error', message: 'Invalid phone number'};
  }
};
