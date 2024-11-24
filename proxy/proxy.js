const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON requests

// Proxy endpoint to Google Apps Script
app.post("/proxy", async (req, res) => {
  try {
    const googleAppsScriptURL = "https://script.google.com/macros/s/AKfycby5-8oWzT0_CUVMSj49fPTeF6h-6DczB_X_eOZ5aSJx1pBY0pc85McO5f-gvXWsJDT8/exec";

    // Forward the request to the Google Apps Script
    const response = await axios.post(googleAppsScriptURL, req.body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Send the response from the Google Apps Script back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error forwarding request to Google Apps Script:", error.message);
    res.status(500).json({
      status: "error",
      message: "Failed to communicate with Google Apps Script.",
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`CORS Proxy running at http://localhost:${PORT}`);
});
