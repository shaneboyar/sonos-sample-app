import React, { useState } from "react";
import HeaderComponent from "./headerComponent";
import HouseholdRoutingController from "../Controllers/householdRoutingController";

interface Household {
  id: string;
}

interface ListHouseholdsComponentProps {
  households: Household[];
  museClientConfig: any;
}

const ListHouseholdsComponent: React.FC<ListHouseholdsComponentProps> = ({ households, museClientConfig }) => {
  return (
    <div>
      <div className="main_page">
        <HeaderComponent />
        <div className="group_text">
          <p>Households</p>
        </div>
        {households.map((household, index) => (
          <HouseholdRoutingController
            key={household.id}
            household={household}
            index={index}
            museClientConfig={museClientConfig}
          />
        ))}
      </div>
    </div>
  );
};

export default ListHouseholdsComponent;
