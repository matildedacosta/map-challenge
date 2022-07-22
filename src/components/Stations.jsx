import React from "react";
import { Marker, InfoBox } from "@react-google-maps/api";

function Stations(props) {
  const { stations } = props;
  return (
    <div>
      {stations.map((station) => {
        console.log(station);
        return (
          <Marker
            position={{
              lat: station.latitude,
              lng: station.longitude,
            }}
          />
        );
      })}
    </div>
  );
}

export default Stations;
