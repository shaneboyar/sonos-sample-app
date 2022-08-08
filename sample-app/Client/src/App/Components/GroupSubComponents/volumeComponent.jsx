import React from "react";
import { Component } from "react";
import GetVolume from "../../Controls/getVolume";
import SetVolume from "../../Controls/setVolume";
import HelperControls from "../../Controls/PlayerControls";
import { SocketContext, socket } from "../../WebSocket/Socket";
import VolumeEvent from "../../WebSocket/VolumeEvent";

class VolumeComponent extends Component {
  constructor() {
    super();
    this.ControlOptions = new HelperControls();
    this.volumeSlider = React.createRef();
    this.state = {
      volumeVal: 40,
      getStartVolumeFlag: true,
    };
  }

  onSetVolume = () => {
    const volume = this.volumeSlider.current.value;
    SetVolume(volume, this.props.groupID, "GROUP", this.props.museClientConfig);
    this.setState({ volumeVal: volume });
  };

  getVolumeHandler = (flag, volumeAtStart) => {
    this.setState({ getStartVolumeFlag: flag, volumeVal: volumeAtStart });
  };

  receiveEventsHandler = (response) => {
    console.log(response);
    const newVolume = response["volume"];
    if (this.state.volumeVal !== newVolume)
      this.setState({ volumeVal: newVolume });
  };

  render() {
    return (
      <div className="slider_container">
        <SocketContext.Provider value={socket}>
          <VolumeEvent handler={this.receiveEventsHandler} />
        </SocketContext.Provider>

        {this.state.getStartVolumeFlag && (
          <GetVolume
            deviceId={this.props.groupID}
            deviceType={"GROUP"}
            getVolumeHandler={this.getVolumeHandler}
            museClientConfig = {this.props.museClientConfig}
          />
        )}

        <i className="fa fa-volume-down"></i>
        <input
          type="range"
          min="1"
          max="100"
          value={this.state.volumeVal}
          step="1"
          ref={this.volumeSlider}
          className="groupVolumeSlider"
          onChange={this.onSetVolume}
        />
        <i className="fa fa-volume-up"></i>
      </div>
    );
  }
}

export default VolumeComponent;
