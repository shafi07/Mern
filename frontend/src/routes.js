import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from './pages/Register'
import EventPage from './pages/EventPage'

const Routes = ()=>{
    return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Dashboard} />
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/events" component={EventPage} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes