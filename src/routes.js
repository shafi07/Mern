const express = require("express");
const multer = require('multer')

const UserController = require("./cotrollers/UserController");
const EventController = require('./cotrollers/EventController');
const uploadConfig = require('./config/upload')

const routes = express.Router();
const upload = multer(uploadConfig)

routes.get("/", (req, res) => {
	res.send({ status: 200 });
});


//Event routes
routes.get("/events/:sport", EventController.getAllEventsBySport);
routes.get('/events', EventController.getAllEvents)
routes.get('/event/:eventId', EventController.getEventById)
routes.post('/event',upload.single('thumbnail'),EventController.createEvent)


//user routes
routes.post("/user/register", UserController.createUser);
routes.get("/user/:userId", UserController.getUserById);

module.exports = routes;
