const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const getGuestyAccessToken = require('./access'); // Import the access.js file
const request = require('request'); // Make sure you have 'request' module installed

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API route to get the Guesty access token
app.get('/api/getGuestyAccessToken', (req, res) => {
    getGuestyAccessToken((error, token) => {
        if (error) {
            return res.status(500).send('Error obtaining access token');
        }
        res.json({ access_token: token });
    });
});

// API route to get the last 10 reservations
app.get('/api/reservations', (req, res, next) => {
    //newFunction();
    // First, get the Guesty access token
    getGuestyAccessToken((error, accessToken) => {
        if (error) {
            return res.status(500).send('Error obtaining access token');
        }

        // Use the access token to fetch the last 10 reservations
        const options = {
            method: 'GET',
            url: 'https://open-api.guesty.com/v1/reservations',
            headers: {
                'Authorization': `Bearer ${accessToken}`,  // Use the access token in the Authorization header
                'expires_in': 86400,
                'Accept': 'application/json'
            },
            qs: {
                limit: 10, // Fetch only the last 10 reservations
                sort: '-createdAt' // Sort by creation date in descending order (newest first)
            }
        };

        // Make the request to Guesty API
        request(options, (error, response, body) => {
            if (error) {
                return res.status(500).send('Error fetching reservation data');
            }

            // Send the reservation data back to the frontend
            res.json(JSON.parse(body));
        });
    });

    //function newFunction() {
    //    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    //    next();
    //}
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});