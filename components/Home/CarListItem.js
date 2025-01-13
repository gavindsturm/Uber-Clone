import React from 'react';
import Image from 'next/image'; // Ensure you import Image from next/image
import { FaUser } from "react-icons/fa";

function CarListItem({car,distance}) {
  return (
    <div>
      <div className='flex items-center justify-between mt-5'>
        <div className='flex items-center gap-5'>
        {/* Ensure the image path is correct and includes a valid path */}
          <Image
            src={car.image}  // Update to use the correct property `image`
            alt={car.name}  // It's good practice to use descriptive alt text
            width={100}
            height={100}
          />
          <div>
            <h2 className='font-semibold text-[18px] flex gap-3 items-center'>{car.name}
              <span className='flex gap-2 font-normal items-center
              text-[14px]'>
                <FaUser/>{car.seat}
              </span>
            </h2>
            <p className='text-[14px]'>{car.desc}</p>
          </div>
        </div>
        <h2 className='text-[18px] font-semibold'>
          ${(car.amount*distance).toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default CarListItem;
