import React from "react";

//Dashboard will show the all events 	
const Dashboard = () => {
	const user_id =localStorage.getItem('user');
	console.log(user_id);
	return <div> Hello from Dashboard</div>;
};

export default Dashboard;
