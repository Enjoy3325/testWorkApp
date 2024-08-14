import axios from 'axios';
import {useState} from 'react';
import {OTPResponse} from '../types';

const useOTP = () => {
  const [otp, setOtp] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateOTP = (): number => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const calculateExpirationTime = (): string => {
    return new Date(Date.now() + 5 * 60 * 1000).toISOString();
  };

  const sendOTP = async (phoneNumber: string) => {
    setLoading(true);
    setError(null);
    try {
      const newOtp = generateOTP();
      const expirationTime = calculateExpirationTime();

      await axios.post<OTPResponse>(
        'https://mpbc14a6455b029f8379.free.beeceptor.com/send-otp',
        {phoneNumber, otp: newOtp, expirationTime},
      );

      setOtp(newOtp);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to send OTP. Please try again later.';
      setError(errorMessage);
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  return {otp, sendOTP, loading, error};
};

export default useOTP;
