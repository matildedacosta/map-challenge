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
        return (
          <Marker
            key={station.id}
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
                  <h4>{station.name}</h4>
                  <p>
                    <b>Free bikes: </b>
                    {station.free_bikes}
                    <br />
                    <b>Empty slots: </b>
                    {station.empty_slots}
                  </p>
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
