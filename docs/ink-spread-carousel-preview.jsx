import { createRoot } from "react-dom/client";
import { InkSpreadCarousel } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   Same ten local wallpapers as the gallery demo. */
const PHOTOS = [
  { src: "./assets/wallpaper-01.jpg", alt: "霓虹雨夜都市" },
  { src: "./assets/wallpaper-02.jpg", alt: "星海孤崖" },
  { src: "./assets/wallpaper-03.jpg", alt: "樱花黄昏神社" },
  { src: "./assets/wallpaper-04.jpg", alt: "深海巨鲸" },
  { src: "./assets/wallpaper-05.jpg", alt: "冰与火之界" },
  { src: "./assets/wallpaper-06.jpg", alt: "天空浮岛" },
  { src: "./assets/wallpaper-07.jpg", alt: "雨夜末班车" },
  { src: "./assets/wallpaper-08.jpg", alt: "极光镜湖" },
  { src: "./assets/wallpaper-09.jpg", alt: "苍绿巨神" },
  { src: "./assets/wallpaper-10.jpg", alt: "焰羽之舞" },
];

createRoot(document.getElementById("root")).render(<InkSpreadCarousel options={{ images: PHOTOS }} />);
