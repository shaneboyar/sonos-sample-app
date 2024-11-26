import React, { useEffect } from "react";
import PlayBackMetadata from "../../ControlAPIs/playbackMetadata";
import ImageComponent from "./imageComponent";
import ServiceLogoComponent from "./serviceLogoComponent";
import { useRecoilState } from "recoil";
import playbackMetadataAtom from "../../Recoil/playbackMetadataAtom";

interface PlaybackMetaDataComponentProps {
  groupId: string;
  museClientConfig: any;
}

const PlaybackMetaDataComponent: React.FC<PlaybackMetaDataComponentProps> = ({ groupId, museClientConfig }) => {
  const [state, setState] = useRecoilState(playbackMetadataAtom);

  useEffect(() => {
    setState({
      getPlayBackMetaDataFlag: true,
      trackName: null,
      trackImage: null,
      artistName: null,
      containerName: null,
      serviceId: null,
      serviceName: null,
    });
  }, [setState]);

  const getImage = () => {
    if (!state.trackImage) {
      return require("../../../images/sonos.png");
    } else {
      return state.trackImage;
    }
  };

  return (
    <div className="play_back_metadata">
      {state.getPlayBackMetaDataFlag && (
        <PlayBackMetadata groupId={groupId} museClientConfig={museClientConfig} />
      )}
      <div className="track_details">
        <div className="track_image">
          <ImageComponent src={getImage()} alt="Song being played" />
        </div>
        <div className="track_name">{state.trackName}</div>
        <div className="track_artist">{state.artistName}</div>
        <div className="track_container">{state.containerName}</div>
        <ServiceLogoComponent serviceId={state.serviceId} serviceName={state.serviceName} />
      </div>
    </div>
  );
};

export default PlaybackMetaDataComponent;
