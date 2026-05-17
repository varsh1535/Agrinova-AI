import axios from "axios";

export const getWeather = async (city = process.env.DEFAULT_CITY || "Bengaluru") => {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) {
    return {
      city,
      temperature: 27,
      condition: "Partly cloudy",
      humidity: 68,
      wind: 11,
      rainfallChance: 42,
      advisory: "Good window for foliar spray after 4 PM. Watch for fungal pressure if humidity rises overnight.",
      source: "demo-weather",
    };
  }

  const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: { q: city, appid: key, units: "metric" },
    timeout: 10000,
  });
  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    condition: data.weather?.[0]?.description || "Clear",
    humidity: data.main.humidity,
    wind: data.wind.speed,
    rainfallChance: data.clouds?.all || 30,
    advisory: data.main.humidity > 75 ? "High humidity: scout for fungal symptoms." : "Field conditions are stable for routine crop care.",
    source: "openweather",
  };
};

export const getMarketPrices = () => [
  { crop: "Tomato", mandi: "Kolar", price: 2650, trend: "+8.4%" },
  { crop: "Paddy", mandi: "Mandya", price: 2240, trend: "+2.1%" },
  { crop: "Maize", mandi: "Davanagere", price: 2195, trend: "-1.3%" },
  { crop: "Cotton", mandi: "Raichur", price: 7050, trend: "+4.7%" },
];
