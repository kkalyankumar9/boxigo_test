import React from "react";
import SideBarsec from "./sideBar";
import Mymoves from "./moves";

const Home = () => {
  return (
    <div>
      <div className="flex ">
      <div>
        <SideBarsec />
      </div>
      <div className="mt-16">
        <Mymoves />
      </div>
      </div>
    </div>
  );
};

export default Home;
