import React, { useState } from "react";
import { Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";

function Networks(props) {
  const {
    networks,
    handleOnClick,
    setNetworkId,
    setShowStations,
    setShowNetworks,
    setOneNetwork,
    oneNetwork,
    networkId,
  } = props;

  const [clicked, setClicked] = useState(false);

  /*  const handleInfoView = (network) => {
    setClicked(true);
    setNetworkId(network.id);
  };
 */
  const handleExploreStations = (network) => {
    setNetworkId(network.id);
    setShowStations(true);
    setShowNetworks(false);
  };

  return (
    <>
      {networks.map((network) => {
        return (
          <div key={network.id}>
            <Marker
              onClick={() => {
                handleOnClick(network.id);
                setClicked(true);
                setOneNetwork(network);
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
            >
              {clicked && (
                <InfoWindow
                  position={{
                    lat: network.location.latitude,
                    lng: network.location.longitude,
                  }}
                >
                  <div>
                    <h6>{network.name}</h6>
                    <button
                      onClick={() => {
                        handleExploreStations(network);
                      }}
                    >
                      Explore stations
                    </button>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          </div>
        );
      })}
    </>
  );
}

export default Networks;

{
  /*    <MarkerClusterer>
            {(clusterer) =>
              networks.map((network) => (
                <Marker
                  key={network.id}
                  position={{
                    lat: network.location.latitude,
                    lng: network.location.longitude,
                  }}
                  clusterer={clusterer}
                />
              ))
            }
          </MarkerClusterer> */
}
