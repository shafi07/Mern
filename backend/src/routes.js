const express = require("express");
const multer = require("multer");

const UserController = require("./cotrollers/UserController");
const EventController = require("./cotrollers/EventController");
const DashboardController = require("./cotrollers/DashboardController");
const LoginController = require("./cotrollers/LoginController");
const RegistrationController = require("./cotrollers/RegistrationController");
const ApprovalController = require("./cotrollers/ApprovalController");
const RejectionController = require("./cotrollers/RejectionController");
const uploadConfig = require("./config/upload");
const verifyToken = require("./config/verifyToken");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get("/", (req, res) => {
	res.send({ status: 200 });
});

// Registration
routes.post("/registration/:eventId", RegistrationController.create);
routes.get("/registration/:registrationId", RegistrationController.getRegistration);
routes.get("/registration/:registrationId/approvals", ApprovalController.approval);
routes.get("/registration/:registrationId/rejections", RejectionController.rejection);

//Login Router
routes.post("/login", LoginController.store);

//Dashboard routes
routes.get("/dashboard/:sport", verifyToken, DashboardController.getAllEvents);
routes.get("/dashboard", verifyToken, DashboardController.getAllEvents);
routes.get("/user/events", verifyToken, DashboardController.getEventByUserId);
routes.get("/dashboard/:eventId", verifyToken, DashboardController.getEventById);

//Event routes
routes.post("/event", verifyToken, upload.single("thumbnail"), EventController.createEvent);
//routes.get("/event/:eventId", EventController.getEventById);
routes.delete("/event/:eventId", verifyToken, EventController.delete);

//user routes
routes.post("/user/register", UserController.createUser);
routes.get("/user/:userId", UserController.getUserById);

module.exports = routes;
