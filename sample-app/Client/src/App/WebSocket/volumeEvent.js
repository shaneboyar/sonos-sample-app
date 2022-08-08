import { useState, useContext, useEffect } from "react";
import { SocketContext } from "./Socket";
import ProcessRequest from "../Eventing/ProcessEvents";

export default function VolumeEvent(props) {
  const socket = useContext(SocketContext);
  const [MBEResponse, SetMBEResponse] = useState(false);

  useEffect(() => {
    if (socket !== undefined) {
      // Receive the events via websocket connection established
      socket.on("message from server", (data) => {
        if (data.headers !== undefined) {
          const processRequest = new ProcessRequest();
          const res = processRequest.loadRequest(data);
          SetMBEResponse(res);
        }
      });
    }
  });

  const eventResponse = JSON.parse(MBEResponse);
  if (eventResponse.method === "volumeControl"){
      props.handler(eventResponse["data"]);
  }
}
