import NeatBackground from "./HeaderComponent";

export default function HeaderGradiantComponent() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <NeatBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
      </div>
    </div>
  );
}
