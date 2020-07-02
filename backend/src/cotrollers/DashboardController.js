const Event = require("../models/Event");
const jwt = require('jsonwebtoken')

module.exports = {
	// Get Event By Event Id
	getEventById(req, res) {
		jwt.verify(req.token,'secret',async(err,authData)=>{
			if (err) {
				res.sendStatus(401)
			} else {
				const { eventId } = req.params;
				try {
					const event = await Event.findById(eventId);

					if (event) {
						return res.json({event,authData});
					}
				} catch (error) {
					return res.status(400).json({ message: "EventId does not exist!" });
				}
			}
		})
		
	},
	// Get All Event By Type
	 getAllEvents(req, res) {
		jwt.verify(req.token,'secret',async(err,authData)=>{
			if(err) {
				res.sendStatus(401);
			} else {
				const { sport } = req.params;
				const query = sport ? { sport } : {};
				try {
					const events = await Event.find(query);

					if (events) {
						return res.json({events,authData});
					}
				} catch (error) {
					return res.status(400).json({ message: "We dont have any events yet!" });
				}
			}
		})
		
	},
	//Get event by user ID
	 getEventByUserId(req, res) {
		jwt.verify(req.token,'secret',async(err,authData)=>{
			if (err) {
				res.sendStatus(401);
			} else {
				const  user_id  = authData._id;
		try {
			const events = await Event.find({ user: user_id })

			if (events) {
				return res.json({events,authData});
			}
		} catch (error) {
			return res.status(400).json({ message: `we do have any events in ${user_id}` });
		}
			}
		})
		
	},
};
