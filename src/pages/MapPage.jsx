import React, { useState, useEffect } from "react";
import styled from "styled-components";
import bikeService from "../services/bikeapi";

import Networks from "../components/Networks";
import Stations from "../components/Stations";

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
    background-color: #fff;
    border-radius: 10%;
    padding: 0.2rem;
  }
`;

function MapPage() {
  const [zoom, setZoom] = useState(5);
  const [position, setPosition] = useState({ lat: 38.732716, lng: -9.151577 });

  const [countries, setCountries] = useState([]);

  const [networks, setNetworks] = useState([]);
  const [oneNetwork, setOneNetwork] = useState([]);
  const [stations, setStations] = useState([]);

  const [networkId, setNetworkId] = useState("");

  const [showNetworks, setShowNetworks] = useState(false);
  const [showStations, setShowStations] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_API_KEY}`,
  });

  const getAllNetworks = async () => {
    try {
      let response = await bikeService.getNetworks();
      setNetworks(response.data.networks);
      setShowNetworks(true);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  /*   const createClusters = (response) => {
    const countries = {};
    response.forEach((network) => {
      const { country } = network.location;
      if (!countries[network.location.country]) {
        countries[country] = {
          code: country,
          networks: [network],
        };
      } else {
        countries[country].networks = [...countries[country].networks, network];
      }
    });
    return Object.values(countries);
  };
 */
  const getAllStations = async (id) => {
    try {
      let response = await bikeService.getStations(id);
      setOneNetwork(response.data.network);
      setStations(response.data.network.stations);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  useEffect(() => {
    /*  const initialize = async () => {
      const response = await getAllNetworks();
      setCountries(createClusters(response));
      console.log(response);
    };

    initialize(); */
    getAllNetworks();
  }, []);

  const handleOnClick = async (id) => {
    await getAllStations(id);
  };

  return (
    <MapsCSS>
      {showStations && (
        <button
          onClick={() => {
            setShowStations(false);
            setShowNetworks(true);
          }}
        >
          See Networks
        </button>
      )}
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          center={position}
          zoom={zoom}
        >
          {showNetworks && (
            <Networks
              networks={networks}
              setNetworkId={setNetworkId}
              setShowStations={setShowStations}
              setShowNetworks={setShowNetworks}
              handleOnClick={handleOnClick}
              setOneNetwork={setOneNetwork}
              networkId={networkId}
            />
          )}
          {showStations && <Stations stations={stations} />}
        </GoogleMap>
      ) : (
        <>
          <p>Loading...</p>
        </>
      )}
    </MapsCSS>
  );
}

export default MapPage;
