import React, { useState, useEffect } from "react";

import styled from "styled-components";
import bgPic from "../assets/pictures/bikebg.jpg";

import bikeService from "../services/bikeapi";

import Networks from "../components/Networks";
import Stations from "../components/Stations";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const MapsCSS = styled.main`
  * {
    margin: 0 auto;
    box-sizing: border-box;
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
    margin: 1rem 0;
    font-size: 3rem;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #008cff;
    color: #77d64b;
  }

  .button {
    margin-bottom: 1rem;
    border-radius: 5px;
    padding: 0.4rem;
    background-color: #77d64b;
    color: white;
    border: none;
    font-size: 0.9rem;
  }

  .button:hover {
    background-color: #008cff;
    color: white;
  }

  .info-button {
    margin-top: 0.5rem;
    border-radius: 5px;
    padding: 0.2rem;
    background-color: #008cff;
    color: white;
    border: none;
    font-size: 0.5rem;
  }

  .info-button:hover {
    background-color: #77d64b;
  }

  .station-info h4 {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

function MapPage() {
  /* STATES */
  //INFORMATION RELATED TO MAP
  const startCenter = { lat: 38.732716, lng: -9.151577 };
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState(startCenter);

  //SAVING INFORMATION FROM API
  const [countries, setCountries] = useState({});
  const [networks, setNetworks] = useState([]);
  const [stations, setStations] = useState([]);
  const [oneNetwork, setOneNetwork] = useState([]);

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
    }
  };

  const getCountries = async () => {
    await getAllNetworks();
    const countries = {};
    networks.forEach((network) => {
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
    setCountries(countries);
    //console.log(countries);
    return Object.values(countries);
  };

  useEffect(() => {
    getAllNetworks();
    /* const initialize = async () => {
      const response = await getAllNetworks();
      setCountries(getCountries(response));
    };

    initialize(); */
  }, []);

  /* STATIONS */
  const getAllStations = async (id) => {
    try {
      let response = await bikeService.getStations(id);
      setStations(response.data.network.stations);
    } catch (error) {
      alert(error);
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
      <button
        className="button"
        onClick={() => {
          setShowStations(false);
          setShowNetworks(true);
          setZoom(5);
          setCenter(startCenter);
        }}
      >
        See Networks
      </button>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "70vw",
            height: "70vh",
            border: "1px solid #93D2A4",
          }}
          center={center}
          zoom={zoom}
        >
          {showNetworks && (
            <Networks
              networks={networks}
              setOneNetwork={setOneNetwork}
              handleExploreStations={handleExploreStations}
              setZoom={setZoom}
              setCenter={setCenter}
            />
          )}
          {showStations && (
            <Stations stations={stations} oneNetwork={oneNetwork} />
          )}
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
