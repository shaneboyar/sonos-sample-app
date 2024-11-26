import React, { useState, useEffect, useRef } from "react";
import GetPlaybackState from "../../ControlAPIs/getPlaybackState";
import HelperControls from "../../ControlAPIs/playerControls";

interface PlayBackStateButtonProps {
  state: any;
  setState: any;
  groupId: string;
  museClientConfig: any;
}

const PlayBackStateButton: React.FC<PlayBackStateButtonProps> = ({ state, setState, groupId, museClientConfig }) => {
  const ControlOptions = new HelperControls();
  const playpauseBtn = useRef(null);

  useEffect(() => {
    setState({
      isPlaying: false,
      getStateFlag: true,
      canSkip: false,
      canSkipBack: false,
      canSeek: false,
    });
  }, [setState]);

  const playModeClass = () => {
    const playClass = "fa fa-play-circle fa-5x";
    const pauseClass = "fa fa-pause-circle fa-5x";
    return state.isPlaying ? pauseClass : playClass;
  };

  const toggleMusic = () => {
    ControlOptions.helperControls("playback/togglePlayPause", groupId, {});
    setState({
      isPlaying: !state.isPlaying,
      getStateFlag: state.getStateFlag,
      canSkip: state.canSkip,
      canSkipBack: state.canSkipBack,
      canSeek: state.canSeek,
    });
  };

  return (
    <div>
      <div>
        {state.getStateFlag && (
          <GetPlaybackState groupId={groupId} museClientConfig={museClientConfig} />
        )}
      </div>
      <div ref={playpauseBtn} className="playpause_track" onClick={toggleMusic}>
        <i className={playModeClass()}></i>
      </div>
    </div>
  );
};

export default PlayBackStateButton;
