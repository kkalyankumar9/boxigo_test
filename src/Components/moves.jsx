import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaCarSide } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import { IoMdHome } from 'react-icons/io';
import { TiPencil } from 'react-icons/ti';
import { TbInfoTriangle } from 'react-icons/tb';

import ExpandDetpage from './expandDet';

const MyMoves = () => {
  const [moves, setMoves] = useState([]);
  const [expandedMove, setExpandedMove] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://test.api.boxigo.in/sample-data/')
      .then(response => response.json())
      .then(data => {
        setMoves(data.Customer_Estimate_Flow);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleToggle = (estimate_id) => {
    setExpandedMove(expandedMove === estimate_id ? null : estimate_id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"></div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="font-bold text-xl mb-4">My Moves</h1>
      {moves.map(move => (
        <div key={move.estimate_id} className="p-5 shadow-md border mb-4">
          <div className="flex items-center mb-2">
            <span className="font-bold text-sm">From: </span>
            <span className="text-sm ml-2">{move.moving_from}</span>
            <FaArrowRight className="mx-2 text-red-500" />
            <span className="font-bold text-sm">To: </span>
            <span className="text-sm ml-2">{move.moving_to}</span>
            <span className="font-bold text-sm ml-8">Request#: </span>
            <span className="text-red-500 ml-2">{move.estimate_id}</span>
          </div>
          <div className="flex mb-2">
            <IoMdHome className="mx-2 text-red-500" />
            <span>{move.property_size}</span>
            <GiPathDistance className="mx-6 text-red-500" />
            <span>{move.distance}</span>
            <FaCarSide className="mx-6 text-red-500" />
            <span>{move.moving_on}</span>
            <div className="flex items-center ml-6">
              <TiPencil />
              <input type="checkbox" className="ml-2" defaultChecked />
              <span className="ml-2">is flexible</span>
            </div>
          </div>
          <div className="flex mb-4">
            <button className="text-red-500 border border-red-500 px-4 py-2 rounded" onClick={() => handleToggle(move.estimate_id)}>
              {expandedMove === move.estimate_id ? 'Hide Details' : 'View move details'}
            </button>
            <button className="bg-red-500 text-white ml-2 px-4 py-2 rounded">Quotes Awaiting</button>
          </div>
          <div className="flex items-center mt-2 text-gray-500 text-sm">
            <TbInfoTriangle className="mr-2 text-red-500" />
            <span className="font-bold">Disclaimer: </span>
            <span className="ml-2">Please update your move date before two days of shifting</span>
          </div>
          {expandedMove === move.estimate_id && (
            <div className="mb-4 mt-10">
              <div className="flex justify-between">
                <h2 className="font-bold mb-2 mt-2">Additional Information</h2>
                <button className="text-red-500 border border-red-500 px-4 py-2 rounded">Edit Additional Info</button>
              </div>
              <span className="text-sm">Test Data</span>
              <div className="flex justify-between">
                <h2 className="font-bold mt-4">House Details</h2>
                <button className="text-red-500 border border-red-500 px-4 py-2 rounded mt-4">Edit House Details</button>
              </div>
              <h3 className="mt-4 text-red-500 font-bold">Existing House Details</h3>
              <div className="flex justify-between font-bold">
                <span>Floor No. </span>
                <span className="mr-8">Elevator Available: </span>
                <span className="mr-60">Distance from Elevator / Staircase to truck: </span>
              </div>
              <div className="flex justify-between">
                <span>{move.old_floor_no}</span>
                <span className="mr-60">{move.old_elevator_availability}</span>
                <span className="mr-80">{move.new_parking_distance}</span>
              </div>
              <h3 className="mt-4 text-red-500 font-bold">New House Details</h3>
              <div className="flex justify-between font-bold">
                <span>Floor No. </span>
                <span className="mr-8">Elevator Available: </span>
                <span className="mr-60">Distance from Elevator / Staircase to truck: </span>
              </div>
              <div className="flex justify-between">
                <span>{move.new_floor_no}</span>
                <span className="mr-60">{move.new_elevator_availability}</span>
                <span className="mr-80">{move.new_parking_distance}</span>
              </div>
              <div className="flex justify-between">
                <h2 className="font-bold mb-2 mt-4">Inventory Details</h2>
                <button className="text-red-500 border border-red-500 px-4 py-2 rounded mt-3 ml-2">Edit Inventory</button>
              </div>
              <div className="mt-4">
                <div className="accordion">
                  {move.items.inventory.map(item => (
                    <ExpandDetpage key={item.id} data={item} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyMoves;
