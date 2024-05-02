import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar";
moment.locale("ar");

const PrayerContext = createContext();

export const usePrayerContext = () => {
  return useContext(PrayerContext);
};

export const PrayerProvider = ({ children }) => {
  const [timings, setTimings] = useState({});
  const [date, setDate] = useState();
  const [nextPrayerName, setNextPrayerName] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [selectedCity, setSelectedCity] = useState({
    displayCity: "الدقهلية",
    apiCity: "Ad Daqahlīyah",
  });
  const availableCities = [
    {
      displayCity: "الدقهلية",
      apiCity: "Ad Daqahlīyah",
    },
    {
      displayCity: "القاهرة",
      apiCity: "Al Qāhirah",
    },
    {
      displayCity: "الاسكندرية",
      apiCity: "Al Iskandarīyah",
    },
    {
      displayCity: "الغربية",
      apiCity: "Al Gharbīyah",
    },
  ];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const basicPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity.apiCity}&country=EG`
        );
        setTimings(response.data.data.timings);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError("Failed to fetch data. Please try again later.");
      }
    };
    fetchData();
  }, [selectedCity]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setupCountDownTimer();
    }, 1000);

    return () => clearInterval(timerInterval);
  });

  useEffect(() => {
    setInterval(() => {
      setDate(moment().format("LL | LT"));
    }, 1000);
  }, []);

  const setupCountDownTimer = () => {
    const now = moment(); // الوقت الحالي
    const prayerTimes = basicPrayers.map((prayer) => ({
      prayer,
      time: moment(timings[prayer], "HH:mm"), // تحويل وقت الصلاة إلى كائن moment
    }));

    // ترتيب أوقات الصلاة بحسب التواريخ الصغرى
    prayerTimes.sort((a, b) => a.time.diff(now) - b.time.diff(now));

    // الصلاة القادمة هي أول صلاة التي لم ينتهي وقتها بعد الآن
    const nextPrayer =
      prayerTimes.find(({ time }) => time.diff(now) > 0) || prayerTimes[0];

    // تحديث حالة اسم الصلاة القادمة باللغة العربية
    if (nextPrayer) {
      switch (nextPrayer.prayer) {
        case "Fajr":
          setNextPrayerName("الفجر");
          break;
        case "Dhuhr":
          setNextPrayerName("الظهر");
          break;
        case "Asr":
          setNextPrayerName("العصر");
          break;
        case "Maghrib":
          setNextPrayerName("المغرب");
          break;
        case "Isha":
          setNextPrayerName("العشاء");
          break;
        default:
          setNextPrayerName("");
      }
    } else {
      setNextPrayerName("");
    }

    // حساب الوقت المتبقي على الصلاة القادمة
    if (nextPrayer) {
      const diff = nextPrayer.time.diff(now); // الفارق الزمني بالميلي ثانية
      const formattedTime = moment.utc(diff).format("HH:mm:ss");
      setRemainingTime(formattedTime);
    } else {
      setRemainingTime("");
    }
  };

  return (
    <PrayerContext.Provider
      value={{
        timings,
        date,
        nextPrayerName,
        availableCities,
        remainingTime,
        selectedCity,
        setSelectedCity,
        loading,
        error,
      }}
    >
      {children}
    </PrayerContext.Provider>
  );
};
