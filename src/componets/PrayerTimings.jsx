import styled from "styled-components";
import { City } from "./City";
import RemainingTime from "./RemainingTime";
import Prayers from "./Prayers";
import { usePrayerContext } from "../context/PrayerContext";

// Material-UI components
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const PrayerTimings = () => {
  const {
    timings,
    nextPrayerName,
    remainingTime,
    selectedCity,
    availableCities,
    loading,
    error,
    setSelectedCity,
  } = usePrayerContext();

  const handleCityChange = (e) => {
    const selectedCityObject = availableCities.find(
      (city) => city.apiCity === e.target.value
    );
    setSelectedCity(selectedCityObject);
  };

  return (
    <Container>
      <div className="top">
        <City />
        <RemainingTime
          nextPrayer={nextPrayerName}
          remainingTime={remainingTime}
        />
      </div>
      <Divider
        style={{ borderColor: "white", width: "100%", opacity: "0.4" }}
      />
      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="loading">{error}</p>
      ) : (
        <Prayers timings={timings} />
      )}
      <FormControl sx={{ minWidth: 300 }}>
        <InputLabel sx={{ color: "white" }} id="city-label">
          المدينة
        </InputLabel>
        <Select
          labelId="city-label"
          id="city-select"
          value={selectedCity.apiCity}
          label="المدينة"
          onChange={handleCityChange}
          sx={{
            color: "white",

            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            ".MuiSvgIcon-root ": {
              fill: "white !important",
            },
          }}
        >
          {availableCities.map((city) => (
            <MenuItem key={city.apiCity} value={city.apiCity}>
              {city.displayCity}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  flex-direction: column;
  direction: rtl;

  .top {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    padding-bottom: 20px;
  }

  .loading {
    color: white;
  }
`;
