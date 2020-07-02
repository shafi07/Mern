import React from "react";
import { useState, useMemo, useEffect } from "react";
import { Button, Form, FormGroup, Input, Container, Label, Alert, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import cameraIcon from "../../assets/camera.png";
import api from "../../services/api";
import "./index.css";

//Event page will show all the events

const EventPage = ({history}) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [thumbnail, setThumbnail] = useState(null);
	const [sport, setSport] = useState("");
	const [date, setDate] = useState("");
	const [success, setSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [dropdownOpen,setOpen] = useState(false)
	const user = localStorage.getItem('user')

	useEffect(()=>{
		if (!user) history.push('/login')
	},[])

	const toggle = () => setOpen(!dropdownOpen);

	const preview = useMemo(() => {
		return thumbnail ? URL.createObjectURL(thumbnail) : null;
	}, [thumbnail]);

	// console.log(title, description, price, sport, date);

	const submitHandler = async (evt) => {
		evt.preventDefault();

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
				await api.post("/event", eventData, { headers: { user } });
				setSuccess(true);
				setTimeout(() => {
					setSuccess(false);
					history.push('/')
				}, 2000);
			} else {
				setErrorMessage(true);
				setTimeout(() => {
					setErrorMessage(false);
				}, 2000);
			}
		} catch (error) {
			Promise.reject(error);
			console.log(error);
		}
	};

	const sportsEventHandler = (sport)=>setSport(sport)

	return (
		<Container>
			<h2>Create your event</h2>
			<Form onSubmit={submitHandler}>
				<div className="input-group">
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
					<FormGroup>
						<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
							<Button id = 'caret' value={sport} disabled >{sport}</Button> 
							<DropdownToggle caret />
							<DropdownMenu>
								<DropdownItem onClick={() => sportsEventHandler("running")}>running</DropdownItem>
								<DropdownItem onClick={() => sportsEventHandler("cycling")}>cycling</DropdownItem>
								<DropdownItem onClick={() => sportsEventHandler("swimming")}>swimming</DropdownItem>
							</DropdownMenu>
						</ButtonDropdown>
					</FormGroup>
				</div>
				<FormGroup>
					<Button type="submit" className="submit-btn">
						Create Event
					</Button>
				</FormGroup>
				<FormGroup>
					<Button className="secondary-btn" onClick={() => history.push("/")}>
						Cancel
					</Button>
				</FormGroup>
			</Form>
			{errorMessage ? (
				<Alert className="evnet-validation" color="danger">
					Required fieled is missing
				</Alert>
			) : (
				""
			)}
			{success ? (
				<Alert className="event-validation" color="success">
					The event was created successfully!
				</Alert>
			) : (
				""
			)}
		</Container>
	);
};

export default EventPage;
