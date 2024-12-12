
const Event = require('../models/Event');

// Get All Events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('attendees games organizer');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create an Event
exports.createEvent = async (req, res) => {
    try {
        const newEvent = new Event({ ...req.body, organizer: req.user.id });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an Event
exports.updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const updates = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, { new: true }).populate('attendees games organizer');
        res.status(200).json({ message: 'Event updated successfully', updatedEvent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an Event
exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        res.status(200).json({ message: 'Event deleted', deletedEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
