import React from "react";
import { Container } from "reactstrap";
import HelperControls from "../ControlAPIs/playerControls";

interface FavoriteComponentProps {
  state: {
    id: string;
    name: string;
  };
  groupId: string;
}

const FavoriteComponent: React.FC<FavoriteComponentProps> = ({ state, groupId }) => {
  const controlOptions = new HelperControls();

  const playFavoriteHandler = () => {
    const data = { favoriteId: state.id };
    controlOptions.helperControls("favorites", groupId, data);
  };

  return (
    <div>
      <Container>
        <a onClick={playFavoriteHandler}>
          <p className="playback_item">{state.name}</p>
        </a>
      </Container>
    </div>
  );
};

export default FavoriteComponent;
