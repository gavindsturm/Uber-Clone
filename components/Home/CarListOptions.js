"use client";
import React, { useEffect, useState } from "react"; // Make sure useState is imported
import { CarListData } from "@/utils/CarListData";
import CarListItem from "./CarListItem"; // default import
import { useRouter } from "next/navigation";


// Define the component
function CarListOptions({distance}) {
  const [activeIndex, setActiveIndex] = useState(null); // Initialize with null or a default value
  const [selectedCar, setSelectedCar] = useState(null); // Initialize with null or a default value
  const router=useRouter();
  

  return (
    <div className="mt-5 p-5 overflow-auto h-[250px]">
      <h2 className="text-[22px] font-bold">Recommended</h2>
      {CarListData.map((item, index) => (
        <div
          key={item.id} // Add key for list item
          className={`cursor-pointer p-2 px-4 rounded-md border-black ${activeIndex === index ? "border-[3px]" : ""}`} // Use strict equality (===)
          onClick={() => {setActiveIndex(index);
          setSelectedCar(item)}} // Set activeIndex onClick
        >
          <CarListItem car={item} distance={distance}/>
        </div>
      ))}

    {selectedCar?.name?  <div className="flex justify-between fixed
      bottom-5 bg-white p-3 shadow-xl rounded-lg
      w-full md:w-[30%] border-[1px] items-center">
        <h2>Make Payment For</h2>
        <button className="p-3 bg-black text-white rounded-lg
        text-center"
        onClick={()=>router.push('/payment?amount='+(selectedCar.amount*distance).toFixed(2))}
        >Request {selectedCar.name}</button>
      </div>:null}
    </div>
  );
}

// Export it as a default export
export default CarListOptions;
