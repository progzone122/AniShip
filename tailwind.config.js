/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        dark: {
          "accent": "#ff1e6f",
          /* Left Menu */
          ".leftMenu": {
            "background": "#090909",
            "border-radius": "8px"
          },
          /* */
          "body": {
            "background": "#000000",
            // "overflow-y": "scroll"
          },
          /* Buttons */
          ".btn": {
            "border-radius": "1.5em"

          },
          /* BigBanner */
          ".bigBannerWatchButton": {
            "border": "0.3em solid rgba(238,0,86,0.42)"
            // background: "rgba(238,0,86,0.82)"
          },
          ".bigBannerAnimeH1": {
            "color": "white"
          },
          ".bigBannerAnimeP": {
            "color": "white"
          },
          /* AnimeCard */
          ".animeCard": {
            "border-radius": "8px"
          },
          /* Text */
          ".textH4": {
            "color": "white",
            "font-size": "24px",
            "font-weight": "bold"
          },
          ".textP": {
            "color": "white",
            "font-size": "16px"
          },
          ".textP2": {
            "color": "white",
            "font-size": "18px"
          },
          /* ModalSearchAnimes */
          ".searchAnimes": {
            "margin-top": "5em",
            "border-radius": "0.4em"
          },
          /* Watch */
          ".watchButton": {
            "background": "#08a813",
            "font-size": "18px",
            "font-weight": "600",
            "color": "white"
          },
          ".watchButton:hover": {
            "background": "#037e0d"
          },
          /* colors */
          ".bgColor1": {
            "background": "#090909"
          },
          ".bgColor2": {
            "background": "#1c1b1b"
          }
        }
      }
    ]
  }
}
