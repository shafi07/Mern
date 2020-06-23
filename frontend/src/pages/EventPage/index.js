import React from "react";
import { useState, useMemo } from "react";
import { Button, Form, FormGroup, Input, Container, Label, Alert } from "reactstrap";
import cameraIcon from "../../assets/camera.png";
import api from "../../services/api";
import "./index.css";

//Event page will show all the events

const EventPage = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [thumbnail, setThumbnail] = useState(null);
	const [sport, setSport] = useState("");
	const [date, setDate] = useState("");
	const [errorMessage, setErrorMessage] = useState(false);

	const preview = useMemo(() => {
		return thumbnail ? URL.createObjectURL(thumbnail) : null;
	}, [thumbnail]);

	// console.log(title, description, price, sport, date);

	const submitHandler = async (evt) => {
		evt.preventDefault();
		const user_id = localStorage.getItem("user");

		const eventData = new FormData();

		eventData.append("thumbnail", thumbnail);
		eventData.append("sport", sport);
		eventData.append("title", title);
		eventData.append("price", price);
		eventData.append("description", description);
		eventData.append("date", date);

		try {
			if (
				title !== "" &&
				sport !== "" &&
				price !== "" &&
				description !== "" &&
				date !== "" &&
				thumbnail !== null
			) {
				//console.log("Event has been sent");
				await api.post("/event", eventData, { headers: { user_id } });
				//console.log(eventData);
				//console.log("Event hasbeen sent");
			} else {
				setErrorMessage(true);
				setTimeout(() => {
					setErrorMessage(false);
				}, 2000);

				//console.log('Missing require data');
			}
		} catch (error) {
			Promise.reject(error);
			console.log(error);
		}
	};

	return (
		<Container>
			<h2>Create your event</h2>
			<Form onSubmit={submitHandler}>
				<FormGroup>
					<Label>Upload Image:</Label>
					<Label
						id="thumbnail"
						style={{ backgroundImage: `url(${preview})` }}
						className={thumbnail ? `has-thumbnail` : ""}
					>
						<Input type="file" name="thumbnail" onChange={(evt) => setThumbnail(evt.target.files[0])} />
						<img src={cameraIcon} style={{ maxWidth: "50px" }} alt="upload icon" />
					</Label>
				</FormGroup>
				<FormGroup>
					<Label>Sport:</Label>
					<Input
						type="text"
						id="sport"
						placeholder="Sport name"
						value={sport}
						onChange={(evt) => setSport(evt.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Title:</Label>
					<Input
						type="text"
						id="title"
						placeholder="Event title"
						value={title}
						onChange={(evt) => setTitle(evt.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Event Description:</Label>
					<Input
						type="text"
						id="description"
						placeholder="Event Description"
						value={description}
						onChange={(evt) => setDescription(evt.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Event Price:</Label>
					<Input
						type="text"
						id="price"
						placeholder="Event price"
						value={price}
						onChange={(evt) => setPrice(evt.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Event Date:</Label>
					<Input
						type="date"
						id="date"
						placeholder="Event Date"
						value={date}
						onChange={(evt) => setDate(evt.target.value)}
					/>
				</FormGroup>
				<Button  type="submit">Create Event</Button>
			</Form>
			{errorMessage ? (<Alert className= 'evnet-validation'color='danger'>Required fieled is missing</Alert>):''}
		</Container>
	);
};

export default EventPage;
