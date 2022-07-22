import React from "react";
import { Marker, MarkerClusterer, InfoBox } from "@react-google-maps/api";

function Networks(props) {
  const { networks, handleOnClick, setNetworkId } = props;

  return (
    <>
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
