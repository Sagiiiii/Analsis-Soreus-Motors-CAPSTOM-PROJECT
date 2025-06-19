import React from 'react';
import { Container } from 'react-bootstrap';

const Dashboard = () => {
    // Check for token to simulate protecting the route or personalizing content
    const token = localStorage.getItem('token');

    return (
        <Container className="mt-5">
            <h2>Dashboard</h2>
            {token ? (
                <p>Welcome to your personalized dashboard! You are logged in.</p>
            ) : (
                <p>Welcome! Please login to see your personalized content.</p>
            )}
            {/* More sophisticated user info could be fetched or passed via context */}
        </Container>
    );
};

export default Dashboard;
