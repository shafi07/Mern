import React, { useState } from "react";
import api from "../../services/api";
import { Button, Form, FormGroup, Input, Container, Alert } from "reactstrap";

const Register = ({ history }) => {
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const [error,setError] = useState(false);
	const [errorMessage,setErrorMessage] = useState('')

	const handleSubmit = async (evt) => {
		evt.preventDefault();

		if(email !== '' && firstName !== '' && lastName !== '' && password !== ''){

		const response = await api.post("/user/register", { email, password,firstName,lastName });
		const user = response.data.user || false;
		const user_id = response.data.user_id || false ;

		console.log(response.data)

		if (user && user_id) {
			console.log(user);
			localStorage.setItem("user", user);
			localStorage.setItem('user_id',user_id)
			history.push("/dashboard");
		}
		else  {
			const { message } = response.data;
			setError(true);
			setErrorMessage(message);
			setInterval(() => {
				setError(false);
				setErrorMessage("");
			}, 2000);
		}
	}
	else{
		setError(true);
		setErrorMessage('required field is missig');
		setTimeout(() => {
			setError(false);
			setErrorMessage("");
		}, 2000);
	}
	};

	return (
		<Container>
			<h2>Signup:</h2>
			<p>
				Please <strong>Register</strong> for a new Account
			</p>
			<Form onSubmit={handleSubmit}>
				<div className="input-group">
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
						<Input
							type="text"
							name="firstName"
							id="firstName"
							placeholder="Enter Your first name"
							onChange={(evt) => setFirstName(evt.target.value)}
						/>
					</FormGroup>
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
						<Input
							type="text"
							name="lastName"
							id="lastName"
							placeholder="Enter Your last name"
							onChange={(evt) => setLastName(evt.target.value)}
						/>
					</FormGroup>
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
						<Input
							type="email"
							name="email"
							id="exampleEmail"
							placeholder="Your Email"
							onChange={(evt) => setEmail(evt.target.value)}
						/>
					</FormGroup>
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
						<Input
							type="password"
							name="password"
							id="examplePassword"
							placeholder="Your Password"
							onChange={(evt) => setPassword(evt.target.value)}
						/>
					</FormGroup>
				</div>
				<FormGroup>
					<Button className="submit-btn">Submit</Button>
				</FormGroup>
				<FormGroup>
					<Button className="secondary-btn" onClick={() => history.push("/login")}>
						Login Instead
					</Button>
				</FormGroup>
			</Form>
			{error ? (
				<Alert className="event-validation" color="danger">
					{errorMessage}
				</Alert>
			) : ''}
		</Container>
	);
};

export default Register;
