import React, { useState } from "react";
import { Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";

function Networks(props) {
  const { networks, handleExploreStations, setZoom } = props;

  const [clicked, setClicked] = useState(false);

  return (
    <>
      {networks.map((network) => {
        return (
          <div key={network.id}>
            <Marker
              onClick={() => {
                setClicked(true);
              }}
              position={{
                lat: network.location.latitude,
                lng: network.location.longitude,
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
                    <h4>
                      <i>Network</i> {network.name}
                    </h4>
                    <button
                      onClick={() => {
                        handleExploreStations(network.id);
                        setZoom(8);
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
