export type RootStackParamList = {
  Welcome: undefined;
  Registration: undefined;
  PhoneOTP: {phoneNumber: string; otp?: number};
  Login: undefined;
};

export interface OTPResponse {
  phoneNumber: string;
  otp: number;
  expirationTime: string;
}
