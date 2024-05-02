import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { usePrayerContext } from "../context/PrayerContext";

export const City = () => {
  const { selectedCity, date } = usePrayerContext();

  return (
    <CityContainer>
      <div className="date">
        <Typography
          sx={{ fontSize: 25, marginBottom: "20px", fontWeight: "bold" }}
        >
          {date}
        </Typography>
      </div>
      <div className="city">
        <Typography
          variant="h1"
          sx={{ fontSize: 60, fontWeight: "bold", color: "white" }}
        >
          {selectedCity.displayCity}
        </Typography>
      </div>
    </CityContainer>
  );
};
const CityContainer = styled.div`
  .date {
    display: flex;
    gap: 10px;
    color: lightgray;
  }
`;
