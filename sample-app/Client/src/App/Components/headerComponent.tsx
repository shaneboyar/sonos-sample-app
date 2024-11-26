import React from "react";
import ImageComponent from "./GroupSubComponents/imageComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HeaderComponentProps {}

const HeaderComponent: React.FC<HeaderComponentProps> = () => {
  const logout = async () => {
    await AsyncStorage.clear();
    window.location.reload();
  };

  return (
    <div className="logo_logout">
      <div className="logo">
        <ImageComponent src={require("../../images/logo.png")} />
      </div>
      <div className="logout">
        <a onClick={logout}>
          <ImageComponent src={require("../../images/logout.png")} />
        </a>
      </div>
    </div>
  );
};

export default HeaderComponent;
