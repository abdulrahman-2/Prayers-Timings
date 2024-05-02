import "./App.css";
import Container from "@mui/material/Container";
import { PrayerTimings } from "./componets/PrayerTimings";
import { createTheme, ThemeProvider } from "@mui/material";
import { PrayerProvider } from "./context/PrayerContext";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

function App() {
  return (
    <>
      <Container maxWidth="xl">
        <ThemeProvider theme={theme}>
          <PrayerProvider>
            <PrayerTimings />
          </PrayerProvider>
        </ThemeProvider>
      </Container>
    </>
  );
}

export default App;
