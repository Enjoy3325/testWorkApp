import axios from 'axios';
interface VerifyOTPResponse {
  phoneNumber: string;
  otp: string;
  status: string;
}

const verifyOTP = async (
  phoneNumber: string,
  otp: string,
  validCode: boolean = true,
): Promise<{success: boolean}> => {
  try {
    const response = await axios.post<VerifyOTPResponse>(
      'https://mpbc14a6455b029f8379.free.beeceptor.com/verify-otp',
      {
        phoneNumber,
        otp,
        validCode,
      },
    );

    const {status} = response.data;

    console.log('Verify OTP Response:', response.data);

    return {success: status === 'success'};
  } catch (error) {
    console.error('Error when checking OTP:', error);
    return {success: false};
  }
};

export default verifyOTP;
