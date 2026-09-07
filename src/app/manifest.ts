import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Roacs Corporation - Tours & Travels Web Solutions",
    short_name: "Roacs Travel",
    description:
      "Launch high-converting, mobile-ready travel agency, tour operator, and holiday booking websites within 72 hours.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#fe2c6a",
    icons: [
      {
        src: "/roacs-logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
