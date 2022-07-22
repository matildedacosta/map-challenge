import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";

function Stations(props) {
  const { stations } = props;
  const [clicked, setClicked] = useState(false);

  const handleInfoView = () => {
    setClicked(true);
  };

  return (
    <div>
      {stations.map((station) => {
        console.log(station);
        return (
          <Marker
            onClick={() => {
              handleInfoView();
            }}
            position={{
              lat: station.latitude,
              lng: station.longitude,
            }}
          >
            {clicked && (
              <InfoWindow
                position={{
                  lat: station.latitude,
                  lng: station.longitude,
                }}
              >
                <div>
                  <h6>{station.name}</h6>
                </div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </div>
  );
}

export default Stations;
