import React, { useContext, useEffect, useState } from 'react';
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

function GoogleMapSection() {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.5,
  };

  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const [map, setMap] = useState(null);
  const [directionRoutePoints,setDirectionRoutePoints]=useState([]);

  useEffect(() => {
    if (source && source.lat && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
    if(source.length!=[]&&destination.length!=[]){
      directionRoute();
    }
  }, [source, map]); // Depend on `source` and `map` only

  useEffect(() => {
    if (destination && destination.lat && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }
    if(source.length!=[]&&destination.length!=[]){
      directionRoute();
    }
  }, [destination, map]); // Depend on `destination` and `map`

  const directionRoute=()=>{
    const DirectionService=new google.maps.DirectionsService();
    DirectionService.route({
      origin:{lat:source.lat, lng:source.lng},
      destination:{lat:destination.lat, lng:destination.lng},
      travelMode:google.maps.TravelMode.DRIVING
    },(result,status)=>{
      if(status===google.maps.DirectionsStatus.OK){

        setDirectionRoutePoints(result)
      }else{
        console.error('Error');
      }
    })
  }

  const onLoad = React.useCallback(function callback(mapInstance) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    mapInstance.fitBounds(bounds);

    setMap(mapInstance);
  }, [center]); // Only re-run when `center` changes

  const onUnmount = React.useCallback(function callback(mapInstance) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: 'c4f6eacc980ea8a9' }}
    >
      {source && source.lat && source.lng ? (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: '/source.png',
            scaledSize: {
              width: 20,
              height: 20,
            },
          }}
        >
          <OverlayView
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[13px]">{source.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      ) : null}

      {destination && destination.lat && destination.lng ? (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: '/source.png',
            scaledSize: {
              width: 20,
              height: 20,
            },
          }}
        >
          <OverlayView
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[13px]">{destination.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      ) : null}


      <DirectionsRenderer
      directions={directionRoutePoints}
      options={{
        polylineOptions:{
          strokeColor:'#000',
          strokeWeight:4
        },
        suppressMarkers:true
      }}
      />
    </GoogleMap>
  );
}

export default GoogleMapSection;
