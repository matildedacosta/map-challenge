import React, { useState, useEffect } from "react";

import styled from "styled-components";
import bgPic from "../assets/pictures/bikebg.jpg";

import bikeService from "../services/bikeapi";

import Networks from "../components/Networks";
import Stations from "../components/Stations";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const MapsCSS = styled.main`
  * {
    margin: 0;
    padding: 0;
  }

  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("${bgPic}");
  background-repeat: no-repeat;
  background-size: cover;

  h1 {
    margin: 2rem 0 1rem;
    color: blue;
    font-size: 3rem;
  }

  .button {
    margin: 1rem;
    border-radius: 5px;
    padding: 0.4rem;
    background-color: green;
    color: white;
    border: none;
    font-size: 0.9rem;
  }

  .button:hover {
    background-color: blue;
    color: white;
  }
`;

function MapPage() {
  /* STATES */
  //INFORMATION RELATED TO MAP
  const [zoom, setZoom] = useState(5);
  const position = { lat: 38.732716, lng: -9.151577 };
  //SAVING INFORMATION FROM API
  const [countries, setCountries] = useState([]);
  const [networks, setNetworks] = useState([]);
  const [stations, setStations] = useState([]);
  //TOGGLE FOR DIFFERENT LAYERS
  const [showNetworks, setShowNetworks] = useState(false);
  const [showStations, setShowStations] = useState(false);

  /* MAP */
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_API_KEY}`,
  });

  /* NETWORKS */
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

  useEffect(() => {
    getAllNetworks();
  }, []);

  /* STATIONS */
  const getAllStations = async (id) => {
    try {
      let response = await bikeService.getStations(id);
      setStations(response.data.network.stations);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const handleExploreStations = async (id) => {
    setShowStations(true);
    setShowNetworks(false);
    await getAllStations(id);
  };

  return (
    <MapsCSS>
      <h1>Welcome to the Bike Map</h1>
      {showStations && (
        <button
          className="button"
          onClick={() => {
            setShowStations(false);
            setShowNetworks(true);
            setZoom(5);
          }}
        >
          See Networks
        </button>
      )}
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "70vw",
            height: "70vh",
            border: "1px solid blue",
          }}
          center={position}
          zoom={zoom}
        >
          {showNetworks && (
            <Networks
              networks={networks}
              handleExploreStations={handleExploreStations}
              setZoom={setZoom}
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
