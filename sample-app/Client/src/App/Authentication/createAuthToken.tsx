import config from "../../config.json";
import Helper from "../Utility/helper";

interface CreateAuthTokenProps {
  code: string;
  isLoggedInHandler: (isLoggedIn: boolean, data: any) => void;
}

interface AuthResponse {
  data: any;
}

export default function CreateAuthToken(props: CreateAuthTokenProps) {
  const helper = new Helper();
  const endPoint = config.apiEndPoints.createRefreshAuthTokenURL;
  const headers = helper.getHeadersBasic();

  const data = {
    grant_type: "authorization_code",
    code: props.code,
    redirect_uri: helper.getRedirectURL(),
  };

  const dataKeyVal = Object.keys(data)
    .map((key, index) => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");

  helper.apiCall(endPoint, headers, "POST", dataKeyVal).then((authResponse: AuthResponse) => {
    props.isLoggedInHandler(true, authResponse.data);
  });
}
