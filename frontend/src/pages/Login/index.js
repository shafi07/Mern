import React, { useState } from "react";
import api from "../../services/api";
import { Button, Form, FormGroup, Input, Container, Alert } from "reactstrap";

const Login = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("false");
	const [error, setError] = useState(false);

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		console.log(email, password);

		const response = await api.post("/login", { email, password });
		const user_Id = response.data.user_id || false;
		const user = response.data.user || false;

		try {
			if (user_Id) {
				localStorage.setItem("user_id", user_Id);
				localStorage.setItem("user", user);
				history.push("/");
			} else {
				const { message } = response.data;
				setError(true);
				setErrorMessage(message);
				setInterval(() => {
					setError(false);
					setErrorMessage("");
				}, 2000);
			}
		} catch (error) {}
	};

	return (
		<Container>
			<h2>Login:</h2>
			<p>
				Please <strong>Login</strong> to your account
			</p>
			<Form onSubmit={handleSubmit}>
				<div className= 'input-group'>
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
					<Button className="secondary-btn" onClick={()=>history.push("/register")} >New Account</Button>
				</FormGroup>
			</Form>
			{error ? (
				<Alert className="evnet-validation" color="danger">
					{errorMessage}
				</Alert>
			) : (
				""
			)}
		</Container>
	);
};

export default Login;
