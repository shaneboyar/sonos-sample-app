import React from "react";
import { useRecoilState } from "recoil";
import playbackStateAtom from "../../Recoil/playbackStateAtom";
import PlaybackStateButton from "./playbackStateButton";

interface PlaybackStateButtonWrapperProps {
  groupId: string;
  museClientConfig: any;
}

const PlaybackStateButtonWrapper: React.FC<PlaybackStateButtonWrapperProps> = (props) => {
  const [playbackState, setPlaybackState] = useRecoilState(playbackStateAtom);

  return (
    <PlaybackStateButton
      groupId={props.groupId}
      museClientConfig={props.museClientConfig}
      state={playbackState}
      setState={setPlaybackState}
    />
  );
};

export default PlaybackStateButtonWrapper;
