import NeatBackground from "./HeaderComponent";

export default function HeaderGradiantComponent() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <NeatBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
      </div>
    </div>
  );
}
