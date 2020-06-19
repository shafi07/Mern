const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
	{
		title: String,
		description: String,
		price: Number,
		thumbnail: String,
		sport : String,
		date: Date,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);
eventSchema.virtual("thumbnail_url").get(function(){ return `http://localhost:8000/files/${this.thumbnail}`});

module.exports = mongoose.model("Event", eventSchema);
