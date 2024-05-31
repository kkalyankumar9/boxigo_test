import React from "react";
import { FaTruckArrowRight } from "react-icons/fa6";
import { TbBlockquote } from "react-icons/tb";
import { RiLogoutCircleFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const sidebarItems = [
  {
    key: 1,
    icon: <FaTruckArrowRight className=" w-8 h-11" />,
    label: "MY MOVES",
  },
  { key: 2, icon: <CgProfile className="w-8 h-11" />, label: "MY PROFILE" },
  { key: 3, icon: <TbBlockquote className="w-8 h-11" />, label: "SET QUOTE" },
  {
    key: 4,
    icon: <RiLogoutCircleFill className="w-8 h-11" />,
    label: "LOGOUT",
  },
];

const SideBarsec = () => {
  return (
    <div className="ml-20 mt-20 text-1xl font-bold w-44">
      {sidebarItems.map((item) => (
        <div
          key={item.key}
          className="flex items-center gap-2 hover:border-l-8  hover:border-orange-500 p-2"
        >
          {item.icon}
          <p>
            <link rel="stylesheet" href="/" />
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SideBarsec;
