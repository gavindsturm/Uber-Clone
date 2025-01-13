"use client";
import React, { useContext, useEffect, useState } from 'react';
import InputItem from './InputItem';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';
import CarListOptions from '@/components/Home/CarListOptions';  // Use default import

function SearchSection() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [distance,setDistance]=useState();

  const calculateDistance=()=>{
    const dist=google.maps.geometry.spherical.computeDistanceBetween(
      {lat:source.lat,lng:source.lng},
      {lat:destination.lat,lng:destination.lng}
    )

    console.log(dist*0.000621374);
    setDistance(dist*0.000621374)
  }

  useEffect(() => {
    if (source) {
      console.log('Source:', source);
    }
    if (destination) {
      console.log('Destination:', destination);
    }
  }, [source, destination]);

  return (
    <div>
    <div className='p-2 md:pd-5 border-[2px] rounded-xl'>
      <p className='text-[20px] font-bold'>Get a ride</p>
      <InputItem type='Source' />
      <InputItem type='Destination' />

      <button className='p-3 bg-black w-full mt-5 text-white rounded-lg'
      onClick={()=>calculateDistance()}
      
      >Search</button>
    </div>
      {distance?<CarListOptions distance={distance}/>:null}
    </div>
  );
}

export default SearchSection;
