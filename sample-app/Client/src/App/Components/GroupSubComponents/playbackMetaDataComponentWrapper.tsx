import { useRecoilState } from "recoil";
import playbackMetadataAtom from "../../Recoil/playbackMetadataAtom";
import React from "react";
import PlaybackMetaDataComponent from "./playbackMetaDataComponent";

interface PlaybackMetaDataComponentWrapperProps {
  groupId: string;
  museClientConfig: any;
}

const PlaybackMetaDataComponentWrapper: React.FC<PlaybackMetaDataComponentWrapperProps> = (props) => {
  const [playbackMetadataState, setPlaybackMetadataState] = useRecoilState(playbackMetadataAtom);

  return (
    <PlaybackMetaDataComponent
      groupId={props.groupId}
      museClientConfig={props.museClientConfig}
      state={playbackMetadataState}
      setState={setPlaybackMetadataState}
    />
  );
};

export default PlaybackMetaDataComponentWrapper;
