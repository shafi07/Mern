const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
	async createUser(req, res) {
		try {
			const { firstName, lastName, password, email } = req.body;
			const existingUser = await User.findOne({ email });
			if (!existingUser) {
				const hashPassword = await bcrypt.hash(password, 10);
				const user = new User({
					firstName,
					lastName,
					password: hashPassword,
					email,
				});
				await user.save();
				res.json(user);
			} else res.status(400).json({ message: "user already exist" });
		} catch (error) {
			throw Error(`Error while regestering user: ${error}`);
		}
	},

	async getUserById(req, res) {
		const { userId } = req.params;
		try {
			const user = await User.findById(userId);
			res.send(user);
		} catch (error) {
			res.status(400).json({
				message: "user doesnot exist",
			});
		}
	},
};
