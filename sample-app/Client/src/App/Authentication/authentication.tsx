import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AccessToken {
  token: string;
  refresh_token: string;
  token_type: string;
  expiry: number;
  tokenTimestamp: number;
}

interface AuthenticationProps {}

const Authentication: React.FC<AuthenticationProps> = () => {
  const [accessToken, setAccessToken] = useState<AccessToken | null>(null);

  const getAccessTokenState = async (): Promise<string> => {
    const storedAccessToken = await AsyncStorage.getItem("accessToken");

    if (!storedAccessToken) {
      return "DOES NOT EXIST";
    } else {
      const parsedAccessToken: AccessToken = JSON.parse(storedAccessToken);
      const curTime = Math.floor(Date.now() / 1000);

      if (!checkAccessTokenExpired(curTime, parsedAccessToken)) {
        return "VALID";
      } else {
        return "EXPIRED";
      }
    }
  };

  const isAccessTokenValid = async (): Promise<boolean> => {
    return (await getAccessTokenState()) === "VALID";
  };

  const getAccessToken = async (): Promise<string | null> => {
    const storedAccessToken = await AsyncStorage.getItem("accessToken");
    return storedAccessToken ? JSON.parse(storedAccessToken).token : null;
  };

  const checkAccessTokenExpired = (curTime: number, accessToken: AccessToken): boolean => {
    return curTime - accessToken.tokenTimestamp >= accessToken.expiry;
  };

  return null;
};

export default Authentication;
