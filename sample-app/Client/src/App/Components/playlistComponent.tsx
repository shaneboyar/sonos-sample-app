import React from "react";
import { Container } from "reactstrap";
import HelperControls from "../ControlAPIs/playerControls";

interface PlaylistComponentProps {
  state: {
    id: string;
    name: string;
  };
  groupId: string;
}

const PlaylistComponent: React.FC<PlaylistComponentProps> = ({ state, groupId }) => {
  const ControlOptions = new HelperControls();

  const loadPlaylistHandler = () => {
    const data = { playlistId: state.id };
    ControlOptions.helperControls("playlists", groupId, data);
  };

  return (
    <div>
      <Container>
        <a onClick={loadPlaylistHandler}>
          <p className="playback_item">{state.name}</p>
        </a>
      </Container>
    </div>
  );
};

export default PlaylistComponent;
