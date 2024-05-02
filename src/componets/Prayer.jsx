import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const Prayer = ({ prayerTilte, image, time }) => {
  return (
    <PrayerContainer>
      <Card className="card">
        <CardMedia
          sx={{ height: 200 }}
          image={`/public/images/${image}.png`}
          title="green iguana"
        />
        <CardContent style={{ textAlign: "right" }}>
          <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
            {prayerTilte}
          </Typography>
          <Typography
            sx={{ fontSize: 50, marginTop: "30px", fontWeight: "bold" }}
          >
            {time}
          </Typography>
        </CardContent>
      </Card>
    </PrayerContainer>
  );
};

const PrayerContainer = styled.div`
  width: 100%;

  /* @media (max-width: 992px) {
    .card {
      width: 300px;
    }
  } */
`;
