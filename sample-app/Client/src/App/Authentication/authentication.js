import { Component } from "react";
import RefreshAuthToken from "./RefreshAuthToken";

class Authentication extends Component {
  isAccessTokenValid = () => {
    let accessToken = window.localStorage.accessToken;
    if (accessToken === undefined || accessToken === "") {
      return false;
    } else {
      let curTime = Math.floor(Date.now() / 1000);
      accessToken = JSON.parse(accessToken);
      const refreshAuthToken = new RefreshAuthToken();
      // if the access token is not expired we return true
      if (!this.checkAccessTokenExpired(curTime, accessToken)){
        return true;
      }else{
          // if the access token has expired we will call the refresh api.
          localStorage.clear();
          refreshAuthToken.refreshAccessToken();
          return false;
      }
    }
  };

  getAccessToken = () => {
    let accessToken = JSON.parse(window.localStorage.accessToken).token;
    return accessToken;
  };

  /**
   * check if the Access token is expired
   */
  checkAccessTokenExpired(curTime, accessToken){
    return ((curTime - accessToken.token_timestamp) >= accessToken.expiry);
  }
}

export default Authentication;
