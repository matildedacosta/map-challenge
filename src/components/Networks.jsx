import React, { useState } from "react";
import { Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";

import bikeService from "../services/bikeapi.js";

function Networks(props) {
  const { networks, setOneNetwork, handleExploreStations, setZoom, setCenter } =
    props;

  const [clickedNetwork, setClickedNetwork] = useState(null);

  const getById = async (id) => {
    try {
      let response = await bikeService.getStations(id);
      setClickedNetwork(response.data.network);
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
                  setOneNetwork(network);
                }}
                key={network.id}
                position={{
                  lat: network.location.latitude,
                  lng: network.location.longitude,
                }}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>
      )}

      {clickedNetwork && (
        <Marker>
          <InfoWindow
            position={{
              lat: clickedNetwork.location.latitude,
              lng: clickedNetwork.location.longitude,
            }}
          >
            <div>
              <h4>{clickedNetwork.name}</h4>
              <h6>
                📍 {clickedNetwork.location.city},
                {clickedNetwork.location.country}
              </h6>
              <button
                className="info-button"
                onClick={() => {
                  handleExploreStations(clickedNetwork.id);
                  setZoom(10);
                  setCenter({
                    lat: clickedNetwork.location.latitude,
                    lng: clickedNetwork.location.longitude,
                  });
                }}
              >
                View stations
              </button>
            </div>
          </InfoWindow>
        </Marker>
      )}
    </>
  );
}

export default Networks;
