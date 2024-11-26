import { useRecoilState } from "recoil";
import React from "react";
import selectedGroupAtom from "../Recoil/selectedGroupAtom";
import GroupPlaybackComponent from "./groupPlaybackComponent";
import playbackStateAtom from "../Recoil/playbackStateAtom";
import { useNavigate } from "react-router-dom";
import groupsInfoAtom from "../Recoil/groupsInfoAtom";

interface GroupPlaybackComponentWrapperProps {
  householdId: string;
  groupId: string;
  museClientConfig: any;
}

const GroupPlaybackComponentWrapper: React.FC<GroupPlaybackComponentWrapperProps> = (props) => {
  const [groupState, setGroupState] = useRecoilState(selectedGroupAtom);
  const [groupsInfoState, setGroupsInfoState] = useRecoilState(groupsInfoAtom);
  const [playbackState, setPlaybackState] = useRecoilState(playbackStateAtom);

  const navigate = useNavigate();

  return (
    <GroupPlaybackComponent
      navigate={navigate}
      groupId={props.groupId}
      museClientConfig={props.museClientConfig}
      state={groupState}
      setState={setGroupState}
      householdId={props.householdId}
      groupsInfoState={groupsInfoState}
      playback={playbackState}
    />
  );
};

export default GroupPlaybackComponentWrapper;
