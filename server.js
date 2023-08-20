import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Endpoint to generate token
app.post("/generate-token", async (_req, res) => {
  try {
    const response = await fetch("https://dev-test.cimet.io/generate-token", {
      method: "POST",
      headers: {
        "Api-key": process.env.API_KEY,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching token:", error);
    res.status(500).json({ error: "Error fetching token" });
  }
});

// Endpoint to get products
app.post("/plan-list", async (req, res) => {
  try {
    const response = await fetch("https://dev-test.cimet.io/plan-list", {
      method: "POST",
      headers: {
        "Api-key": process.env.API_KEY,
        "Auth-token": req.body.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session_id: req.body.session_id }),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
