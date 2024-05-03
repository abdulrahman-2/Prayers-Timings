import styled from "styled-components";
import { Prayer } from "./Prayer";

export default function Prayers({ timings }) {
  return (
    <PrayersContainer>
      <Prayer image="fajr" prayerTilte="الفجر" time={timings.Fajr} />
      <Prayer image="dhhr" prayerTilte="الظهر" time={timings.Dhuhr} />
      <Prayer image="asr" prayerTilte="العصر" time={timings.Asr} />
      <Prayer image="sunset" prayerTilte="المغرب" time={timings.Maghrib} />
      <Prayer image="night" prayerTilte="العشاء" time={timings.Isha} />
    </PrayersContainer>
  );
}

const PrayersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin: 100px 0 70px;

  @media (max-width: 992px) {
    width: 70%;
    flex-direction: column;
  }
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    margin: 30px 0;
  }
`;
