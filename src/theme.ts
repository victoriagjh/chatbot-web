import { extendTheme, ThemeConfig } from "@chakra-ui/react";
const colors = {
  yellow: {
    500: "#DBFF85",
  },
  green: {
    200: "#6EFFAA", // Button 기본색 추후 제거
    300: "#6EFFAA", // Button hover색 추후 제거
    500: "#6EFFAA",
    600: "#59E493",
    700: "#15C17F",
  },
  gray: {
    50: "#F1F1F1",
    100: "#E3E3E3",
    200: "#CBCBCB",
    300: "#ABABAB",
    400: "#878787",
    500: "#6C6C6C",
    600: "#404040",
    700: "#2F2F2F",
    800: "#242424",
    900: "#1E1E1E",
  },
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: {
    body: {
      bg: "black",
      color: "white",
    }
  },
};

const theme = extendTheme({
  config,
  styles,
  colors,
});

export default theme;
