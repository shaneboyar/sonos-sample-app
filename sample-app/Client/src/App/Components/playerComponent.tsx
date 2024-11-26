import React, { useRef, useState, useEffect } from "react";
import SetVolume from "../ControlAPIs/setVolume";
import GetPlayerVolume from "../ControlAPIs/getPlayerVolume";
import HelperControls from "../ControlAPIs/playerControls";
import PlayerVolumeSubscribe from "../UserDetails/playerVolumeSubscribe";
import { debounce } from "lodash";

interface PlayerComponentProps {
  state: {
    getStartVolumeFlag: boolean;
    volumeVal: number;
  };
  setState: React.Dispatch<React.SetStateAction<{
    getStartVolumeFlag: boolean;
    volumeVal: number;
  }>>;
  inGroup: boolean;
  group: {
    id: string;
  };
  playerId: string;
  museClientConfig: any;
  playerName: string;
}

const PlayerComponent: React.FC<PlayerComponentProps> = (props) => {
  const volumeSlider = useRef<HTMLInputElement>(null);
  const ControlOptions = new HelperControls();

  const debouncedSetVolume = debounce((volume: number) => {
    SetVolume(volume, props.playerId, "PLAYER", props.museClientConfig);
  }, 300);

  const onSetVolume = () => {
    const volume = volumeSlider.current?.value;
    if (volume) {
      props.setState({
        getStartVolumeFlag: props.state.getStartVolumeFlag,
        volumeVal: parseInt(volume),
      });
      debouncedSetVolume(parseInt(volume));
    }
  };

  const handleGroupChange = () => {
    const data = {
      playerIdsToAdd: [],
      playerIdsToRemove: [],
    };

    if (!props.inGroup) {
      data.playerIdsToAdd = [props.playerId];
    } else {
      data.playerIdsToRemove = [props.playerId];
    }

    ControlOptions.helperControls("groups/modifyGroupMembers", props.group.id, data);
  };

  useEffect(() => {
    props.setState({
      getStartVolumeFlag: true,
      volumeVal: props.state.volumeVal,
    });
  }, [props]);

  return (
    <div className="player_component">
      <div>
        {props.state.getStartVolumeFlag && (
          <GetPlayerVolume
            playerId={props.playerId}
            museClientConfig={props.museClientConfig}
          />
        )}
      </div>
      <div className="playerVolumeSubscribe">
        {props.inGroup && (
          <PlayerVolumeSubscribe
            museClientConfig={props.museClientConfig}
            playerId={props.playerId}
          />
        )}
      </div>
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            checked={props.inGroup}
            onChange={handleGroupChange}
          />
          <span>{props.playerName}</span>
        </label>
      </div>
      {props.inGroup && (
        <div className="player_slider_container">
          <i className="fa fa-volume-down"></i>
          <input
            type="range"
            min="0"
            max="100"
            value={props.state.volumeVal}
            step="1"
            ref={volumeSlider}
            className="volumeSlider"
            onChange={onSetVolume}
          />
          <i className="fa fa-volume-up"></i>
        </div>
      )}
      <br />
    </div>
  );
};

export default PlayerComponent;
