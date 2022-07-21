import React, { useState, useEffect } from "react";
import styled from "styled-components";
import bikeService from "../services/bikeapi";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerClusterer,
  InfoBox,
} from "@react-google-maps/api";

const MapsCSS = styled.main`
  width: 100vw;
  height: 100vh;

  .map-marker {
    margin-bottom: 3rem;
    background-color: white;
    border-radius: 10%;
    padding: 0.2rem;
  }
`;

function Map() {
  const [zoom, setZoom] = useState(5);
  const [position, setPosition] = useState({ lat: 38.732716, lng: -9.151577 });
  const [networks, setNetworks] = useState([]);
  const [oneNetwork, setOneNetwork] = useState([]);
  const [markers, setMarkers] = useState({});
  const [stations, setStations] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_API_KEY}`,
  });

  const getAllNetworks = async () => {
    try {
      let response = await bikeService.getNetworks();
      setNetworks(response.data.networks);
      //console.log(response.data.networks);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const getAllStations = async (id) => {
    try {
      let response = await bikeService.getStations(id);
      setOneNetwork(response.data.network);
      setStations(response.data.network.stations);
      //console.log(response.data.network.stations);
      //console.log(`clicked on ${response.data.network.id}`);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNetworks();
  }, []);

  const handleOnClick = async (id) => {
    await getAllStations(id);
    return stations.map((station) => {
      console.log(station);
      return (
        <Marker
          position={{
            lat: station.latitude,
            lng: station.longitude,
          }}
        />
      );
    });
  };

  return (
    <MapsCSS>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          center={position}
          zoom={zoom}
        >
          {networks.map((network) => {
            return (
              <div key={network.id}>
                <Marker
                  onClick={() => {
                    handleOnClick(network.id);
                  }}
                  position={{
                    lat: network.location.latitude,
                    lng: network.location.longitude,
                  }}
                  options={{
                    label: {
                      text: `${network.name}`,
                      className: "map-marker",
                    },
                  }}
                />
              </div>
            );
          })}
        </GoogleMap>
      ) : (
        <>
          <p>Loading...</p>
        </>
      )}
    </MapsCSS>
  );
}

export default Map;
