import axios from 'axios';
import {removeItem, setLocalStorage} from "../../Utils/localStorage.jsx";

// Login function
const login = async (email, password) => {
  try {
    // Make an HTTP POST request to the login endpoint
    const response = await axios.post('http://localhost:5000/api/login', { email, password });

    // Assuming the server responds with a success message
    if (response.data.message === 'Login successful') {
      // Store the authentication token or session ID in browser storage or state management library
      setLocalStorage('authToken', response.data.authToken);

      // Redirect the user to the authenticated home page or any other desired route
      // window.location.href = '/';
    }
  } catch (error) {
    // Handle login error, display error message, etc.
    console.error('Login failed:', error);
  }
};

// Logout function
const logout = async () => {
  try {
    // Make an HTTP GET request to the logout endpoint
    await axios.get('http://localhost:5000/api/logout');

    // Clear the authentication token or session ID from browser storage or state management library
    removeItem('authToken');
    removeItem("User")

    // Redirect the user to the login page or any other desired route
    window.location.href = '/';
  } catch (error) {
    // Handle logout error, display error message, etc.
    console.error('Logout failed:', error);
  }
};

export { login, logout };
