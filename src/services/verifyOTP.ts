import axios from 'axios';
interface VerifyOTPResponse {
  phoneNumber: string;
  otp: string;
  status: 'success' | 'error';
}

const verifyOTP = async (
  phoneNumber: string,
  otp: string,
): Promise<{success: boolean}> => {
  try {
    const response = await axios.post<VerifyOTPResponse>(
      'https://mpbc14a6455b029f8379.free.beeceptor.com/verify-otp',
      {
        phoneNumber,
        otp,
      },
    );

    const {status} = response.data;

    return {success: status === 'success'};
  } catch (error) {
    console.error('Error when checking OTP:', error);
    return {success: false};
  }
};

export default verifyOTP;
