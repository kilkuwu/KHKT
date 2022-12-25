import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  CircleMarker,
  Circle,
} from "react-leaflet";

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

export default function LeafletMap({ position }) {
  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{
        height: "80vh",
      }}
    >
      <ChangeView center={position} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker center={position}>
        <Popup>Đây là vị trí hiện tại của bạn.</Popup>
        <Circle radius={100} center={position}></Circle>
      </CircleMarker>
    </MapContainer>
  );
}
