import axios from 'axios';

const registerUser = async (
  name: string,
  lastName: string,
  phoneNumber: string,
) => {
  try {
    const otp: number = Math.floor(100000 + Math.random() * 900000);
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    const response = await axios.post(
      'https://mpbc14a6455b029f8379.free.beeceptor.com/register',
      {
        name,
        lastName,
        phoneNumber,
        otp,
        expirationTime,
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Server responded with an error:', error.response.data);
    } else if (error.request) {
      console.error('No response received from the server:', error.request);
    } else {
      console.error('Error in setting up the request:', error.message);
    }
    throw new Error('Registration failed');
  }
};

export default registerUser;
