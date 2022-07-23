import React, { useState } from "react";
import { Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";

function Stations(props) {
  const { stations } = props;

  const [clickedStation, setClickedStation] = useState(null);

  return (
    <>
      {stations && (
        <MarkerClusterer>
          {(clusterer) =>
            stations.map((station) => (
              <Marker
                onClick={() => {
                  setClickedStation(station);
                }}
                key={station.id}
                position={{
                  lat: station.latitude,
                  lng: station.longitude,
                }}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>
      )}

      {clickedStation && (
        <Marker>
          <InfoWindow
            position={{
              lat: clickedStation.latitude,
              lng: clickedStation.longitude,
            }}
          >
            <div className="station-info">
              <h4>{clickedStation.name}</h4>
              <p>
                <b>Free bikes: </b>
                {clickedStation.free_bikes}
                <br />
                <b>Empty slots: </b>
                {clickedStation.empty_slots}
              </p>
            </div>
          </InfoWindow>
        </Marker>
      )}
    </>
  );
}

export default Stations;
