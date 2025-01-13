"use client";
import React, { useState, useContext } from 'react';
import Image from 'next/image';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const { setSource } = useContext(SourceContext);
  const { setDestination } = useContext(DestinationContext);

  const getLatAndLng = (place, type) => {
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({ placeId }, (place, status) => {
      if (status === 'OK' && place.geometry && place.geometry.location) {
        console.log(place.geometry.location.lng());

        const locationData = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.formatted_address,
          label: place.name,
        };

        if (type === 'Source') {
          setSource(locationData);
        } else {
          setDestination(locationData);
        }
      }
    });
  };

  return (
    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
      <Image
        src={type === 'Source' ? '/source.svg' : '/destination.png'}
        width={15}
        height={15}
        alt='icon'
      />
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: (place) => {
            getLatAndLng(place, type);
            setValue(place);
          },
          placeholder: type === 'Source' ? 'Pickup Location' : 'Destination Location',
          isClearable: true,
          className: 'w-full',
          components: {
            DropdownIndicator: false,
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: '#00ffff00',
              border: 'none',
            }),
          },
        }}
      />
    </div>
  );
}

export default InputItem;
