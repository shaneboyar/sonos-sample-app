import React from "react";
import { useNavigate } from "react-router-dom";
import GroupRoutingController from "../Controllers/groupRoutingController";
import HeaderComponent from "./headerComponent";
import BackButton from "./backButtonComponent";

interface ListGroupsComponentProps {
  navigate: any;
  groups: { [key: string]: any };
  players: any[];
  householdId: string;
}

const ListGroupsComponent: React.FC<ListGroupsComponentProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="main_page">
        <HeaderComponent />
        <BackButton navigate={navigate} />
        <div className="group_text">
          <p>Groups</p>
        </div>
        {Object.keys(props.groups).map((key) => (
          <GroupRoutingController
            key={key}
            householdId={props.householdId}
            group={props.groups[key]}
            players={props.players}
          />
        ))}
      </div>
    </div>
  );
};

export default ListGroupsComponent;
