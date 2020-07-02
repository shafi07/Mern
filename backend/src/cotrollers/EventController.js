const Event = require("../models/Event");
const User = require("../models/User");
const jwt = require('jsonwebtoken')

module.exports = {
	// Create a Event
	createEvent(req, res) {
		jwt.verify(req.token,'secret', async (err,authData)=>{
			if (err) {
				res.sendStatus(401);
			} else {
				const { title, description, price, sport, date, thumbnail } = req.body;
				const  user_id  = authData._id;
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
					date,
					user: user_id,
					thumbnail: filename,
				});
				res.json(event);
			}
		})
	},

	async delete(req, res) {
		const { eventId } = req.params;
		try {
			await Event.findByIdAndDelete(eventId);

			return res.status(204).send();
		} catch (error) {
			return res.status(400).json({ message: "We dont have any event with the ID" });
		}
	},
};
