import axios from 'axios';

const verifyOTP = async (phoneNumber: string, otp: string) => {
  try {
    const url = 'https://mpbc14a6455b029f8379.free.beeceptor.com/verify-otp';

    const response = await axios.post(url, {
      phoneNumber,
      otp,
    });

    console.log('API Response:', response.data);
    return {success: response.data.success};
  } catch (error) {
    console.error('Error when checking OTP:', error);
    return {success: false};
  }
};

export default verifyOTP;
