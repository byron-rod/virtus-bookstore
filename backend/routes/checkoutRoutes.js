const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/create-item", async (req, res) => {
  try {
    const {
      name,
      currency,
      amount_in_cents,
      image_url,
      quantity,
      success_url,
      cancel_url,
      user_id,
    } = req.body;

    const data = {
      items: [
        {
          name,
          currency,
          amount_in_cents,
          image_url,
          quantity: quantity || 1,
        },
      ],
      success_url,
      cancel_url,
      user_id,
      metadata: {},
    };

    const config = {
      method: "post",
      url: "https://app.recurrente.com/api/checkouts",
      headers: {
        "X-PUBLIC-KEY": process.env.X_PUBLIC_KEY,
        "X-SECRET-KEY": process.env.X_SECRET_KEY,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error creating item:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: error.response ? error.response.data : "Error creating item",
    });
  }
});

module.exports = router;
