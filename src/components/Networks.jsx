import React, { useState } from "react";
import {
  Marker,
  MarkerClusterer,
  InfoBox,
  InfoWindow,
} from "@react-google-maps/api";

function Networks(props) {
  const {
    networks,
    showStations,
    handleOnClick,
    setNetworkId,
    setShowStations,
    setShowNetworks,
  } = props;
  const [clicked, setClicked] = useState(false);

  /*   const onLoad = (infoWindow) => {
    console.log("infoWindow: ", infoWindow);
  }; */

  const handleInfoView = () => {
    setClicked(true);
  };

  const handleExploreStations = (network) => {
    setNetworkId(network.id);
    setShowStations(true);
    setShowNetworks(false);
    console.log(showStations);
  };

  return (
    <>
      {networks.map((network) => {
        return (
          <div key={network.id}>
            <Marker
              onClick={() => {
                handleInfoView();
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
