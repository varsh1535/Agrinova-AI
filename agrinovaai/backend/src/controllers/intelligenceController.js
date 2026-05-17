import { getMarketPrices, getWeather } from "../services/weatherService.js";

export const weather = async (req, res, next) => {
  try {
    res.json({ weather: await getWeather(req.query.city) });
  } catch (error) {
    next(error);
  }
};

export const market = (_req, res) => {
  res.json({ prices: getMarketPrices() });
};
