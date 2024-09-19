// This line imports the CSS file that styles our page.
import './App.css';
// This imports the React library and some tools to help manage our page's state and effects.
import React, { useState, useEffect, useRef } from 'react'; 
// This imports tools to show a Google Map on our page.
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// This imports a custom hook to help us load the Google Maps API.
import useGoogleMaps from './useGoogleMaps';

// This is our secret key to use the Google Maps API. (Got this from Brianna's Repo)
const apiKey = 'AIzaSyC1HOdITdS-2b4X5L_nV9-Ziyg0sErFkzA';

function App() {
  // This box will hold all our list of friends.
  const [data, setData] = useState([]);

  // This box holds the current friend's info we're adding or editing.
  const [formData, setFormData] = useState({
    id: null, // This is like a special number for each friend.
    name: '', // This is where we put the friend's name.
    phone: '', // This is where we put the friend's phone number.
    address: '', // This is where we put the friend's home address.
  });

  // This tells where the map should start looking.
  const [mapCenter, setMapCenter] = useState({ lat: 38.7946, lng: -106.5348 });

  // This is like a bookmark for the autocomplete search tool.
  const autocompleteRef = useRef(null);

  // This checks if our map is ready to use.
  const isGoogleMapsLoaded = useGoogleMaps(apiKey);

  // This runs once when the page first loads to get the list of friends.
  useEffect(() => {
    fetch("/api/users")
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
      .then(fetchedData => {
        setData(fetchedData);
        if (fetchedData.length > 0) {
          setMapCenter({
            lat: parseFloat(fetchedData[0].latitude) || 0,
            lng: parseFloat(fetchedData[0].longitude) || 0,
          });
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // This runs when the map is ready.
  useEffect(() => {
    if (isGoogleMapsLoaded) {
      const google = window.google; // Access the Google Maps library.
      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete-input'), // Reference to the input field for address search.
        { types: ['geocode'] } // Specify the type of places to search for.
      );

      // This listener activates when a place is selected.
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        // If the place has geometry, update the map center.
        if (place.geometry && place.geometry.location) {
          setMapCenter({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        }
      });

      // Store the autocomplete reference for later use.
      autocompleteRef.current = autocomplete;
    }
  }, [isGoogleMapsLoaded]);

  // This function updates the form data when we type in the form.
  const handleChange = (event) => {
    const { name, value } = event.target; // Get the name and value from the event target.
    setFormData(prevFormData => ({ ...prevFormData, [name]: value })); // Update the form data.
  };

  // New function to handle address geocoding.
  const handleAddressSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission.
    const address = formData.address; // Get the address from form data.
    if (address) {
      const geocoder = new window.google.maps.Geocoder(); // Create a new Geocoder instance.
      geocoder.geocode({ address }, (results, status) => {
        // If geocoding is successful, update the map center.
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          setMapCenter({
            lat: location.lat(),
            lng: location.lng(),
          });
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  };

  // This function handles form submission for adding or updating a user.
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission.

    if (formData.id) { // Check if we're updating an existing user.
      fetch(`/api/users/${formData.id}`, {
        method: 'PUT', // Use PUT method to update the user.
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }),
      })
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
      .then(updatedUser => {
        // Update the local state with the updated user.
        setData(prevData => prevData.map(user => user.id === updatedUser.id ? updatedUser : user));
        // Reset the form data after submission.
        setFormData({ id: null, name: '', phone: '', address: '' });
      })
      .catch(error => console.error('Error updating data:', error));
    } else { // If no ID, we're adding a new user.
      fetch('/api/users', {
        method: 'POST', // Use POST method to add a new user.
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }),
      })
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
      .then(newUser => {
        // Update the local state with the new user.
        setData(prevData => [...prevData, newUser]);
        // Reset the form data after submission.
        setFormData({ id: null, name: '', phone: '', address: '' });
      })
      .catch(error => console.error('Error posting data:', error));
    }
  };

  // This function handles user deletion.
  const handleDelete = (id) => {
    fetch(`/api/users/${id}`, { method: 'DELETE' }) // Send a DELETE request.
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
      .then(() => {
        // Update the local state by filtering out the deleted user.
        setData(prevData => prevData.filter(user => user.id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  // This function pre-fills the form for editing a user.
  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address,
    });
    // Update the map center to the user's location.
    setMapCenter({
      lat: parseFloat(user.latitude) || 0,
      lng: parseFloat(user.longitude) || 0,
    });
  };

  return (
    <div className="container">
      <h1>Personal Contact List</h1>
      <h2>Address Look-up</h2>
      {/* Search bar for finding places */}
      <div className="search-bar">
        <input
          id="autocomplete-input"
          type="text"
          placeholder="Search for a place"
          style={{ width: '97%', padding: '8px', fontSize: '16px' }}
        />
      </div>

      {/* Render the Google Map */}
      <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
        <GoogleMap
          mapContainerStyle={{ height: "300px", width: "100%" }} // Style for the map container.
          center={mapCenter} // Center of the map.
          zoom={10} // Initial zoom level.
        >
          {data.map(user => (
            <Marker
              key={user.id} // Unique key for each marker.
              position={{ lat: parseFloat(user.latitude), lng: parseFloat(user.longitude) }} // Position for the marker.
              title={user.name} // Title that appears on hover.
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Render the table to display the list of items */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button> {/* Button to edit user */}
                <button onClick={() => handleDelete(user.id)}>Delete</button> {/* Button to delete user */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the form for adding or editing an item */}
      <form onSubmit={handleSubmit}>
        <h2>{formData.id ? 'Edit' : 'Add'} Contact</h2>
        <label>
          Name:
          <input
            type="text"
            name="name" // Name field in the form.
            value={formData.name} // Current value of the name input.
            onChange={handleChange} // Handle input change.
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone" // Phone field in the form.
            value={formData.phone} // Current value of the phone input.
            onChange={handleChange} // Handle input change.
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address" // Address field in the form.
            value={formData.address} // Current value of the address input.
            onChange={handleChange} // Handle input change.
          />
        </label>
        <button type="submit">{formData.id ? 'Update' : 'Add'} Contact</button> {/* Submit button */}
      </form>
    </div>
  );
}

export default App; // Export the App component for use in other files.
