const axios = require('axios');

let Places = async (req, res) => {
    try {
        const { location, radius, type } = req.query;
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location,
                radius,
                type,
                key: process.env.GOOGLE_PLACES_API_KEY
            }
        });
        
        return res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = Places