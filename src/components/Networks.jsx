import React, { useState } from "react";
import { Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import bikeService from "../services/bikeapi.js";

function Networks(props) {
  const { networks, handleExploreStations, setZoom } = props;

  const [clickedStation, setClickedStation] = useState(null);

  const getById = async (id) => {
    try {
      let response = await bikeService.getStations(id);
      setClickedStation(response.data.network);
      console.log(response.data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {networks && (
        <MarkerClusterer>
          {(clusterer) =>
            networks.map((network) => (
              <Marker
                onClick={() => {
                  getById(network.id);
                }}
                key={network.id}
                position={{
                  lat: network.location.latitude,
                  lng: network.location.longitude,
                }}
                clusterer={clusterer}
              ></Marker>
            ))
          }
        </MarkerClusterer>
      )}
      {clickedStation && (
        <Marker>
          <InfoWindow
            position={{
              lat: clickedStation.location.latitude,
              lng: clickedStation.location.longitude,
            }}
          >
            <div>
              <h4>
                <i>Network</i> {clickedStation.name}
              </h4>

              <button
                onClick={() => {
                  handleExploreStations(clickedStation.id);
                  setZoom(8);
                }}
              >
                Explore stations
              </button>
            </div>
          </InfoWindow>
        </Marker>
      )}
    </>
  );
}

export default Networks;
