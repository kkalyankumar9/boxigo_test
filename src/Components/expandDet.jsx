import React, { useState } from 'react';
import { IoIosArrowDropdownCircle } from "react-icons/io";
const ExpandDetpage = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data || !data.category || !Array.isArray(data.category)) {
    return <p>No Inventory Details Available</p>;
  }

  const category = data.category;

  const count = category.map((ele) => {
    return ele.items.reduce((acc, elem) => {
      return acc + Number(elem.qty);
    }, 0);
  });

  const total = count.reduce((acc, ele) => {
    return acc + ele;
  }, 0);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div >
      <div >
        <h2 >
        <button className="font-bold text-left text-white flex items-center justify-between bg-red-500 w-full mb-4 h-11 p-4" type="button" onClick={toggleAccordion}>
  <span className="text-white">{data.displayName}</span>
  <span className="w-6 h-6 rounded-full bg-red-700 text-white flex items-center justify-center ml-2">{total}</span>
  <IoIosArrowDropdownCircle className={`ml-2 ${isExpanded ? 'transform rotate-180' : ''}`} />
</button>

        </h2>
        {isExpanded && (
          <div >
            <div className=" pb-4">
              {total <= 0 ? (
                <p>No Items in this Category</p>
              ) : (
                <div>
                  {category.map((ele, i) => (
                    count[i] !== 0 && (
                      <div key={i} className="mb-4">
                        <p className="font-bold mb-2">{ele.displayName}</p>
                        {ele.items.map((elem, index) => (
                          elem.qty >= 1 && (
                            <div key={index} className="mb-2 flex">
                              <div>
                                <p>{elem.displayName}</p>
                                <p>Q: {elem.qty}</p>
                              </div>
                              {elem.type.length > 0 ? (
                                elem.type
                                  .filter(typeEle => typeEle.selected)
                                  .map((typeEle, typeind) => (
                                    <p key={typeind} className="ml-4">{typeEle.option}</p>
                                  ))
                              ) : (
                                <p className="ml-4"></p>
                              )}
                            </div>
                          )
                        ))}
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandDetpage;
