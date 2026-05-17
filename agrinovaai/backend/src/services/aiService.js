import fs from "fs";
import FormData from "form-data";
import axios from "axios";

export const predictDisease = async (filePath) => {
  const url = `${process.env.AI_SERVICE_URL || "http://localhost:8000"}/predict`;
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));
  const { data } = await axios.post(url, form, {
    headers: form.getHeaders(),
    timeout: 45000,
  });
  return data;
};
