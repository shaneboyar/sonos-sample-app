import React from "react";
import { Component } from "react";
import HelperControls from "../../Controls/playerControls";
import PlayBackMetadata from "../../Controls/PlayBackMetadata";
import ImageComponent from "./ImageComponent";
import { SocketContext, socket } from "../../WebSokcet/socket";
import PlayBackMetaDataEvent from "../../WebSokcet/playBackMetaDataEvent";

class PlayBackMetaDataComponent extends Component {
  constructor() {
    super();
    this.ControlOptions = new HelperControls();
    this.volumeSlider = React.createRef();
    this.state = {
      getPlayBackMetaDataFlag: true,
      trackName: null,
      albumName: null,
      trackImage: null,
    };
  }

  playBackMetadataHandler = (flag, trackName, albumName, trackImage) => {
    this.setState({
      getPlayBackMetaDataFlag: flag,
      trackName: trackName,
      albumName: albumName,
      trackImage: trackImage,
    });
  };

  getImage = () => {
    if (this.state.trackImage === undefined || this.state.trackImage === "") {
      return require("../../../images/sonos.png");
    } else {
      return this.state.trackImage;
    }
  };

  receiveEventsHandler = (response) => {
    console.log(response);
    if (this.state.trackName !== response["trackName"]) {
      this.setState({
        trackName: response["trackName"],
        albumName: response["albumName"],
        trackImage: response["trackImage"],
      });
    }
  };

  render() {
    return (
      <div>
        <SocketContext.Provider value={socket}>
          <PlayBackMetaDataEvent handler={this.receiveEventsHandler} />
        </SocketContext.Provider>

        {this.state.getPlayBackMetaDataFlag && (
          <PlayBackMetadata
            group_id={this.props.groupID}
            playBackMetadataHandler={this.playBackMetadataHandler}
            museClientConfig = {this.props.museClientConfig}
          />
        )}
        <div className="track_details">
          <div className="track_image">
            <ImageComponent
              src={this.getImage()}
              width="300"
              height="250"
              alt="Song being played"
            />
            <div className="track_name">{this.state.trackName}</div>
            <div className="album_name">{this.state.albumName}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayBackMetaDataComponent;
