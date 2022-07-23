import React, { useState } from "react";
import { Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import bikeService from "../services/bikeapi.js";

function Networks(props) {
  const { networks, handleExploreStations, setZoom, setCenter } = props;

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
              <h4>
                <i>Network</i> {clickedNetwork.name}
              </h4>

              <button
                onClick={() => {
                  handleExploreStations(clickedNetwork.id);
                  setZoom(8);
                  setCenter({
                    lat: clickedNetwork.location.latitude,
                    lng: clickedNetwork.location.longitude,
                  });
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
