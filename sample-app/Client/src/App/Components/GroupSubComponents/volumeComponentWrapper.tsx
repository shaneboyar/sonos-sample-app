import VolumeComponent from "./volumeComponent";
import { useRecoilState } from "recoil";
import volumeAtom from "../../Recoil/volumeAtom";
import React from "react";

interface VolumeComponentWrapperProps {
  groupId: string;
  museClientConfig: any;
}

const VolumeComponentWrapper: React.FC<VolumeComponentWrapperProps> = (props) => {
  const [volumeState, setVolumeState] = useRecoilState(volumeAtom);

  return (
    <VolumeComponent
      groupId={props.groupId}
      museClientConfig={props.museClientConfig}
      state={volumeState}
      setState={setVolumeState}
    />
  );
};

export default VolumeComponentWrapper;
