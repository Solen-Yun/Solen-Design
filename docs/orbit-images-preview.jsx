import { createRoot } from "react-dom/client";
import { OrbitImages } from "../src/react/index.js";

/* The standalone preview — a tilted ellipse and an infinity track side by
   side on the dark canvas; drag the train, click a tile to bring it front. */

const images = [
  "./assets/demo-photos/photo-01.jpg",
  "./assets/demo-photos/photo-02.jpg",
  "./assets/demo-photos/photo-03.jpg",
  "./assets/demo-photos/photo-04.jpg",
  "./assets/demo-photos/photo-05.jpg",
  "./assets/demo-photos/photo-06.jpg",
  "./assets/demo-photos/photo-07.jpg",
  "./assets/demo-photos/photo-08.jpg",
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      background: "#101014",
    }}
  >
    <div style={{ width: "min(92vw, 760px)" }}>
      <OrbitImages images={images} altPrefix="环绕图片" shape="ellipse" itemSize={64} intro={false} />
    </div>
    <div style={{ width: "min(92vw, 640px)" }}>
      <OrbitImages
        images={images}
        altPrefix="环绕图片"
        shape="infinity"
        itemSize={56}
        rotation={0}
        showPath={true}
        pathColor="rgba(142,230,242,0.4)"
        duration={30}
        intro={false}
      />
    </div>
  </div>,
);
