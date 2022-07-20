import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerClusterer,
  InfoBox,
} from "@react-google-maps/api";
import useSupercluster from "use-supercluster";

import bikeService from "../services/bikeapi";

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

const position = { lat: 38.732716, lng: -9.151577 };

function Map() {
  const [networks, setNetworks] = useState([]);
  const [stations, setStations] = useState({});
  const [zoom, setZoom] = useState(5);
  const [bounds, setBounds] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_API_KEY}`,
  });

  const getNetworks = async () => {
    try {
      let response = await bikeService.getNetworks();
      setNetworks(response.data.networks);
      console.log(response.data.networks);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getNetworks();
  }, []);

  const points = networks.map((network) => ({
    type: "Feature",
    properties: {
      cluster: false,
      networkId: network.id,
      name: network.name,
    },
    geometry: {
      type: "Point",
      coordinates: [network.location.longitude, network.location.latitude],
    },
  }));

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  console.log(clusters);

  return (
    <MapsCSS>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          center={position}
          zoom={5}
        >
          {/*  <Marker
            position={position}
            options={{
              label: { text: `Procimo`, className: "map-marker" },
            }}
          /> */}

          {networks.map((network) => {
            return (
              <div key={network.id}>
                <Marker
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
        <></>
      )}
    </MapsCSS>
  );
}

export default Map;
