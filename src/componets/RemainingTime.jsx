import Typography from "@mui/material/Typography";
import { usePrayerContext } from "../context/PrayerContext";

const RemainingTime = () => {
  const { nextPrayerName, remainingTime } = usePrayerContext();

  return (
    <div style={{ textAlign: "center" }}>
      <Typography
        sx={{
          fontSize: 22,
          color: "lightgray",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        متبقي حتي صلاة {nextPrayerName}
      </Typography>
      <Typography
        variant="h1"
        sx={{ fontSize: 60, color: "white", fontWeight: "bold" }}
      >
        {remainingTime}
      </Typography>
    </div>
  );
};

export default RemainingTime;
