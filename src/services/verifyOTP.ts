import axios from 'axios';

const verifyOTP = async (phoneNumber: string, code: string) => {
  try {
    const response = await axios.post(
      'https://mpbc14a6455b029f8379.free.beeceptor.com/verify-otp',
      {
        phoneNumber,
        otp: code,
      },
    );

    if (response.data.success) {
      return {success: true};
    } else {
      return {success: false};
    }
  } catch (error) {
    console.error('Error when checking OTP:', error);
    throw error;
  }
};

export default verifyOTP;
