const User = require("../models/User.model");

let TripCtrl = {
    addTrip: async (req, res) => {
        const { user } = req;
        const data = req.body;
        try {
            if (!data.departure || !data.destination || !data.date || !data.tripType)
                return res.status(400).json({ message: "Required fields are missing" });

            if (new Date(data?.date) < new Date()) {
                return res
                .status(400)
                .json({ message: "Trip date must be in the future" });
            }
            const traveler = await User.findById(user.id);
            if (!traveler) {
                return res.status(404).json({ message: "User not found" });
            }

            // Call the AI model and get the response
            const aiResponse = await getAITripResponse(data);

            const newTrip = { ...data, aiResponse };
            
            traveler.trips.push(newTrip);
            await traveler.save();

            res.status(200).json({
                success: true,
                message: "Trip created successfully",
                data: newTrip,
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    getTrips: async (req, res) => {
        try {
            const { user } = req;
            const trips = await User.findById(user.id).populate(
                "trips.friends",
                "username"
            );
            res.status(200).json({
                success: true,
                message: "Trips retreived successfully",
                data: trips,
            });
        } catch (error) {
            res.status(500).json({
                message: "An error occurred while fetching trips",
                error: error.message,
            });
        }
    },
    getTripById: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await User.findOne(
                { "trips._id": id },
                { "trips.$": 1 }
            ).populate("trips.friends", "username");

            if (!user || !user.trips || user.trips.length === 0) {
                return res.status(404).json({ message: "Trip not found" });
            }

            const trip = user.trips[0];
            res.status(200).json({
                success: true,
                message: "Trip retreived successfully",
                data: trip,
            });
        } catch (error) {
            res.status(500).json({
                message: "An error occurred while fetching the trip",
                error: error.message,
            });
        }
    },
    updateTrip: async (req, res) => {
        try {
            const { user } = req;
            const { id } = req.params;
            const data = req.body;

            const traveler = await User.findById(user.id);

            if (!traveler) {
                return res.status(404).json({ message: "Trip not found" });
            }

            const trip = traveler.trips.id(id);
            if (!trip) {
                return res.status(404).json({ message: "Trip not found" });
            }

            for (const key in data) {
                trip[key] = data[key];
            }

            await traveler.save();

            res.status(200).json({
                success: true,
                message: "Trip updated successfully",
                data: trip,
            });
        } catch (error) {
            res.status(500).json({
                message: "An error occurred while updating the trip",
                error: error.message,
            });
        }
    },

    deleteTrip: async (req, res) => {
        try {
            const { user } = req;
            const { id } = req.params;

            const traveler = await User.findById(user.id);
            if (!traveler) {
                return res.status(404).json({ message: "User not found" });
            }

            const tripIndex = traveler.trips.findIndex(
                (trip) => trip.id.toString() === id
            );

            if (tripIndex === -1) {
                return res.status(404).json({ message: "Trip not found" });
            }

            traveler.trips.splice(tripIndex, 1);
            await traveler.save();

            res
                .status(200)
                .json({ success: true, message: "Trip deleted successfully" });
            } catch (error) {
            res.status(500).json({
                message: "An error occurred while deleting the trip",
                error: error.message,
            });
        }
    },
};

// Function to call the AI model
const getAITripResponse = async (tripData) => {
    try {
        // Example API call to the AI model (replace with actual API call)
        const response = await axios.post('https://your-ai-model-api.com/analyze-trip', tripData);
        return response.data; // Assuming the AI model returns the data in the response's data field
    } catch (error) {
        console.error('Error calling AI model:', error.message);
        throw new Error('Failed to get AI response');
    }
};

module.exports = TripCtrl;