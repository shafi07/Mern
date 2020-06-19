const Event = require("../models/Event");
const User = require("../models/User");

module.exports = {
	// Create a Event
	async createEvent(req, res) {
		const { title, description, price, sport, thumbnail } = req.body;
		const { user_id } = req.headers;
		const { filename } = req.file;

		const user = await User.findById(user_id);

		if (!user) {
			return res.status(400).json({ message: "user does not exist" });
		}
		const event = await Event.create({
			title,
			description,
			price,
			sport,
			user: user_id,
			thumbnail: filename,
		});
		res.json(event);
	},
	// Get Event By Event Id
	async getEventById(req, res) {
		const { eventId } = req.params;
		try {
			const event = await Event.findById(eventId);
 
			if (event) {
				return res.json(event);
			}
		} catch (error) {
			return res.status(400).json({ message: "EventId does not exist!" });
		}
	},
	// Get All Events
	async getAllEvents(req, res) {
		try {
			const events = await Event.find({});

			if (events) {
				return res.json(events);
			}
		} catch (error) {
			return res.status(400).json({ message: "We dont have any events yet!" });
		}
	},
	// Get All Event By Type
	async getAllEventsBySport(req, res) {
		const { sport } = req.params;
		const query = { sport } || {};
		try {
			const events = await Event.find(query);

			if (events) {
				return res.json(events);
			}
		} catch (error) {
			return res.status(400).json({ message: "We dont have any events yet!" });
		}
	},
};
