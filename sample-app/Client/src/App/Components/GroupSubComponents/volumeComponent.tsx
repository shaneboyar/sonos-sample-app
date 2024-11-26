import React, { useRef } from "react";
import { debounce } from "lodash";
import GetGroupVolume from "../../ControlAPIs/getGroupVolume";
import SetVolume from "../../ControlAPIs/setVolume";
import HelperControls from "../../ControlAPIs/playerControls";

interface VolumeComponentProps {
  state: {
    volumeVal: number;
    getStartVolumeFlag: boolean;
  };
  setState: React.Dispatch<React.SetStateAction<{
    volumeVal: number;
    getStartVolumeFlag: boolean;
  }>>;
  groupId: string;
  museClientConfig: any;
}

const VolumeComponent: React.FC<VolumeComponentProps> = (props) => {
  const volumeSlider = useRef<HTMLInputElement>(null);

  const ControlOptions = new HelperControls();

  const debouncedSetVolume = debounce((volume: number) => {
    SetVolume(volume, props.groupId, "GROUP", props.museClientConfig);
  }, 300);

  const onSetVolume = () => {
    const volume = volumeSlider.current?.value;
    if (volume) {
      props.setState({
        volumeVal: parseInt(volume),
        getStartVolumeFlag: false,
      });
      debouncedSetVolume(parseInt(volume));
    }
  };

  return (
    <div className="slider_container">
      {props.state.getStartVolumeFlag && (
        <GetGroupVolume
          groupId={props.groupId}
          museClientConfig={props.museClientConfig}
        />
      )}

      <i className="fa fa-volume-down"></i>
      <input
        type="range"
        min="0"
        max="100"
        value={props.state.volumeVal}
        step="1"
        ref={volumeSlider}
        className="groupVolumeSlider"
        onChange={onSetVolume}
      />
      <i className="fa fa-volume-up"></i>
    </div>
  );
};

export default VolumeComponent;
