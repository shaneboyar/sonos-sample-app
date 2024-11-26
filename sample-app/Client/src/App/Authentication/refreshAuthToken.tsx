import Helper from "../Utility/helper";
import config from "../../config.json";

interface RefreshAccessTokenProps {
  accessTokenHandler: (status: string) => void;
}

interface AccessTokenResponse {
  data: {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  };
}

const RefreshAccessToken: React.FC<RefreshAccessTokenProps> = (props) => {
  const helper = new Helper();
  const storedAccessToken = window.localStorage.getItem("accessToken");

  if (!storedAccessToken) {
    props.accessTokenHandler("DOES NOT EXIST");
    return null;
  }

  const refreshToken = JSON.parse(storedAccessToken).refresh_token;
  const endPoint = config.apiEndPoints.createRefreshAuthTokenURL;
  const headers = helper.getHeadersBasic();

  const data = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };

  const dataKeyValue = Object.keys(data)
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");

  helper.apiCall(endPoint, headers, "POST", dataKeyValue)
    .then((refreshTokenResponse: AccessTokenResponse) => {
      if (refreshTokenResponse) {
        updateAccessToken(refreshTokenResponse.data);
        props.accessTokenHandler("VALID");
      }
    })
    .catch((error) => {
      console.error(error);
      props.accessTokenHandler("DOES NOT EXIST");
    });

  return null;
};

const updateAccessToken = (response: AccessTokenResponse["data"]) => {
  if (response) {
    const accessTokenData = {
      token: response.access_token,
      refresh_token: response.refresh_token,
      token_type: response.token_type,
      expiry: response.expires_in,
      tokenTimestamp: Math.floor(Date.now() / 1000),
    };

    window.localStorage.setItem("accessToken", JSON.stringify(accessTokenData));
  }
};

export default RefreshAccessToken;
