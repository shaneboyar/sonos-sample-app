import React, { useState, useEffect } from "react";
import HelperControls from "../ControlAPIs/playerControls";
import Subscribe from "../UserDetails/subscribe";
import PlaybackMetaDataComponentWrapper from "./GroupSubComponents/playbackMetaDataComponentWrapper";
import PlayBackStateButtonWrapper from "./GroupSubComponents/playbackStateButtonWrapper";
import VolumeComponentWrapper from "./GroupSubComponents/volumeComponentWrapper";
import PlayersController from "../Controllers/playersController";
import HeaderComponent from "./headerComponent";
import GroupGoneRoutingController from "../Controllers/groupGoneRoutingController";
import BackButton from "./backButtonComponent";
import GetGroups from "../UserDetails/getGroups";
import GroupsSubscribe from "../UserDetails/groupsSubscribe";
import FavoritesController from "../Controllers/favoritesController";
import Select from "react-select";
import PlaylistsController from "../Controllers/playlistsController";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GroupPlaybackComponentProps {
  householdId: string;
  museClientConfig: any;
  groupId: string;
  playback: any;
  groupsInfoState: any;
  state: any;
  navigate: any;
}

const GroupPlaybackComponent: React.FC<GroupPlaybackComponentProps> = (props) => {
  const ControlOptions = new HelperControls();
  const [lastClickTime, setLastClickTime] = useState(Date.now());
  const [menuState, setMenuState] = useState("PLAYERS");

  const options = [
    { value: "PLAYERS", label: "Players" },
    { value: "FAVORITES", label: "Favorites" },
    { value: "PLAYLISTS", label: "Playlists" },
  ];

  const skipToPrevious = () => {
    let elapsedTime = Date.now() - lastClickTime;

    if (props.playback.canSkipBack && (!props.playback.canSeek || elapsedTime <= 4000)) {
      ControlOptions.helperControls("playback/skipToPreviousTrack", props.groupId, {});
    } else if (props.playback.canSeek) {
      ControlOptions.helperControls("playback/seek", props.groupId, { positionMillis: 0 });
    }
    setLastClickTime(Date.now());
  };

  const skipToNext = () => {
    if (props.playback.canSkip) {
      ControlOptions.helperControls("playback/skipToNextTrack", props.groupId, {});
    }
  };

  const toggleShuffle = () => {
    if (props.playback.canShuffle) {
      ControlOptions.helperControls("playback/playMode", props.groupId, { playModes: { shuffle: !props.playback.shuffle } });
    }
  };

  const toggleRepeat = () => {
    if (props.playback.canRepeat && props.playback.canRepeatOne) {
      if (props.playback.repeatOne) {
        ControlOptions.helperControls("playback/playMode", props.groupId, { playModes: { repeatOne: false, repeat: false } });
      } else if (props.playback.repeat) {
        ControlOptions.helperControls("playback/playMode", props.groupId, { playModes: { repeatOne: true, repeat: false } });
      } else {
        ControlOptions.helperControls("playback/playMode", props.groupId, { playModes: { repeatOne: false, repeat: true } });
      }
    } else if (props.playback.canRepeat) {
      ControlOptions.helperControls("playback/playMode", props.groupId, { playModes: { repeat: !props.playback.repeat } });
    } else if (props.playback.canRepeatOne) {
      ControlOptions.helperControls("playback/playMode", props.groupId, { playModes: { repeatOne: !props.playback.repeatOne } });
    }
  };

  const handleDisplayChange = (event: any) => {
    setMenuState(event.value);
  };

  return (
    <div className="selected_group_page">
      <Subscribe museClientConfig={props.museClientConfig} groupId={props.groupId} />
      <div>
        <GroupsSubscribe householdId={props.householdId} />
      </div>
      {props.groupsInfoState.groupFlag && (
        <GetGroups
          householdId={props.householdId}
          museClientConfig={props.museClientConfig}
          setGroup={true}
          groupId={props.groupId}
          showLoadingScreen={false}
        />
      )}
      {props.state.groupGoneFlag && <GroupGoneRoutingController navigate={props.navigate} />}
      <HeaderComponent />
      <BackButton navigate={props.navigate} />
      <div className="group_name">
        <div className="group_box">
          <p>{props.state.groupName} </p>
        </div>
      </div>
      <div className="player">
        <PlaybackMetaDataComponentWrapper groupId={props.groupId} museClientConfig={props.museClientConfig} />
        <div className="group_buttons">
          <div className={(props.playback.repeatOne || props.playback.repeat) ? "repeat" : "not_repeat"} onClick={toggleRepeat}>
            {(props.playback.canRepeat || props.playback.canRepeatOne) && (!props.playback.repeatOne
              ? (<img className="pointer" src={require("../../images/repeat.png")} width="50px" height="50px" alt="Repeat" />)
              : (<img className="pointer" src={require("../../images/repeat_one.png")} width="50px" height="50px" alt="Repeat One" />)
            )}
          </div>
          <div className={!props.playback.canSkipBack && !props.playback.canSeek ? "group_prev_disabled" : "group_prev"} onClick={skipToPrevious}>
            <i className="fa fa-step-backward fa-2x"></i>
          </div>
          <PlayBackStateButtonWrapper groupId={props.groupId} museClientConfig={props.museClientConfig} />
          <div className={!props.playback.canSkip ? "group_next_disabled" : "group_next"} onClick={skipToNext}>
            <i className="fa fa-step-forward fa-2x"></i>
          </div>
          <div className={props.playback.shuffle ? "shuffled" : "not_shuffled"} onClick={toggleShuffle}>
            {props.playback.canShuffle && (
              <img className="pointer" src={require("../../images/shuffle.png")} width="50px" height="50px" alt="Shuffle" />
            )}
          </div>
        </div>
        <p className="group_volume">Group Volume:</p>
        <VolumeComponentWrapper groupId={props.groupId} museClientConfig={props.museClientConfig} />
      </div>
      <div className="dropdown_menu">
        <Select
          options={options}
          onChange={handleDisplayChange}
          defaultValue={{ label: "Players", value: "PLAYERS" }}
          className="react_select_container"
          classNamePrefix="react_select"
          isSearchable={false}
        />
      </div>
      {menuState === "FAVORITES" && (
        <FavoritesController
          museClientConfig={props.museClientConfig}
          householdId={props.householdId}
          groupId={props.groupId}
        />
      )}
      {menuState === "PLAYLISTS" && (
        <PlaylistsController
          museClientConfig={props.museClientConfig}
          householdId={props.householdId}
          groupId={props.groupId}
        />
      )}
      {menuState === "PLAYERS" && !props.groupsInfoState.groupFlag && (
        <PlayersController
          group={props.groupsInfoState.groups[props.groupId]}
          players={props.groupsInfoState.players}
          museClientConfig={props.museClientConfig}
        />
      )}
    </div>
  );
};

export default GroupPlaybackComponent;
