import React, { useState, useEffect } from 'react'; // Added useState, useEffect for re-rendering on auth change
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

// Simple PrivateRoute component
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    // State to help re-render Navbar when token changes
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    // Effect to listen to storage changes or use a more robust auth context for real-time updates
    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };
        // This event is for changes in other tabs/windows.
        // For changes within the same tab, the component calling login/logout should update state.
        window.addEventListener('storage', handleStorageChange);

        // A more direct way to update UI upon login/logout within the same app
        // is to use a state management solution (like Context API or Redux)
        // or pass callback functions to Login/Register components to update isAuthenticated.
        // For now, we'll rely on page navigation triggering re-renders or this simple listener.

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false); // Update state to re-render Navbar
        // Using Navigate component or navigate() hook is preferred over window.location.href for SPA feel
        // However, for a full state reset, window.location.href can be effective.
        // For this example, we'll let the Navigate component handle redirection via state update.
        // No direct navigation here, relying on route elements to redirect.
    };

    // This function could be passed to Login component to update auth state
    // const handleLoginSuccess = () => {
    //     setIsAuthenticated(true);
    // };

    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand as={Link} to="/">Expense Tracker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {isAuthenticated ? (
                                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                </>
                            )}
                        </Nav>
                        {isAuthenticated && (
                            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4"> {/* Increased top margin slightly */}
                <Routes>
                    {/* Pass handleLoginSuccess to Login component if direct state update is desired */}
                    {/* <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} /> */}
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                    <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
                        }
                    />
                    {/* Basic 404 Not Found Route */}
                    <Route path="*" element={
                        <div className="text-center mt-5">
                            <h2>404 - Not Found</h2>
                            <p>The page you are looking for does not exist.</p>
                            <Link to="/">Go to Homepage</Link>
                        </div>
                    } />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
