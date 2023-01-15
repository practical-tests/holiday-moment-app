import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

module.exports = {
  name: "holiday-moment",
  slug: "holiday-moment",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  jsEngine: "hermes",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    package: "lsbelini.holiday.moment",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    BASE_URL_API: "http://dadosbr.github.io/feriados/",
    eas: {
      projectId: "4c9d401b-f7d9-4332-9b43-6aec15650489",
    },
  },
};
