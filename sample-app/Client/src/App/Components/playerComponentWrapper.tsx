import React from "react";
import { useRecoilState } from "recoil";
import playerVolumeAtomFamily from "../Recoil/playerVolumeAtomFamily";
import PlayerComponent from "./playerComponent";

interface PlayerComponentWrapperProps {
  playerId: string;
  inGroup: boolean;
  group: any;
  playerName: string;
  museClientConfig: any;
}

const PlayerComponentWrapper: React.FC<PlayerComponentWrapperProps> = (props) => {
  const [playerVolumeState, setPlayerVolumeState] = useRecoilState(playerVolumeAtomFamily(props.playerId));

  return (
    <PlayerComponent
      playerId={props.playerId}
      inGroup={props.inGroup}
      group={props.group}
      playerName={props.playerName}
      museClientConfig={props.museClientConfig}
      state={playerVolumeState}
      setState={setPlayerVolumeState}
    />
  );
};

export default PlayerComponentWrapper;
