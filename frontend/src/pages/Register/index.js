import React, { useState } from "react";
import api from "../../services/api";
import { Button, Form, FormGroup, Input, Container } from "reactstrap";

const Register = ({ history }) => {
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		console.log(email, password, firstName,lastName);

		const response = await api.post("/user/register", { email, password,firstName,lastName });
		const userId = response.data._id || false;

		if (userId) {
			console.log(userId);
			localStorage.setItem("user", userId);
			history.push("/dashboard");
		} else {
			const { message } = response.data;
			console.log(message);
		}
	};

	return (
		<Container>
			<h2>Signup:</h2>
			<p>
				Please <strong>Register</strong> for a new Account
			</p>
			<Form onSubmit={handleSubmit}>
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
				<Button>Submit</Button>
			</Form>
		</Container>
	);
};

export default Register;
