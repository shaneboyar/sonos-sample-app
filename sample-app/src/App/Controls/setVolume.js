import config from "../../config.json";
import Helper from "../Utility/helper";
import { METHOD_POST } from "../Utility/constants";

export default function SetVolume(volume, deviceId, deviceType) {

  const helper = new Helper();

  let url =
  deviceType === "GROUP" 
      ? helper.getGroupsURL()
      : config.api_end_points.volume_api_end_point;
  let name_space = deviceType === "GROUP" ? "/groupVolume" : "/playerVolume";

  const endPoint = url + deviceId + name_space;
    
  const headers = helper.getHeaderBearer()

  const data = { volume: volume };

  helper.apiCall(endPoint, headers, METHOD_POST, data)
  .then((res) => {
    console.debug("Set Volume to: ", volume);
  })
  .catch(function (error) {
    helper.logError(error);
  });

}
