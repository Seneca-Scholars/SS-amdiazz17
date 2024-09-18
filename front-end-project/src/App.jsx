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
    fetch("/api/users") // This asks the server for a list of users.
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok')) // If we get a good answer, turn it into JSON. If not, show an error.
      .then(fetchedData => {
        setData(fetchedData); // Put the list of friends into our data box.
        if (fetchedData.length > 0) {
          // Move the map to show where the first friend lives.
          setMapCenter({
            lat: parseFloat(fetchedData[0].latitude) || 0,
            lng: parseFloat(fetchedData[0].longitude) || 0,
          });
        }
      })
      .catch(error => console.error('Error fetching data:', error)); // If there’s a problem, show an error message.
  }, []); // This runs only once when the page first loads.

  // This runs when the map is ready.
  useEffect(() => {
    if (isGoogleMapsLoaded) {
      // Create the search tool for finding places on the map.
      const google = window.google // reactjs use a linting rule that forbids unknown global variable
      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete-input'), // This is where we type to search for places.
        { types: ['geocode'] } // We’re looking for places on the Earth.
      );

      // When we choose a place from the search tool.
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace(); // Find out which place was chosen.
        if (place.geometry) {
          // Move the map to show the chosen place.
          setMapCenter({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        }
      });

      // Save the search tool for later use.
      autocompleteRef.current = autocomplete;
    }
  }, [isGoogleMapsLoaded]); // This runs when the map is ready.

  // This function updates the form data when we type in the form.
  const handleChange = (event) => {
    const { name, value } = event.target; // Get the name and value from the input field.
    setFormData(prevFormData => ({ ...prevFormData, [name]: value })); // Update the form data with the new value.
  };

  // This function runs when we submit the form.
  const handleSubmit = (event) => {
    event.preventDefault(); // This stops the page from refreshing when we submit the form.

    if (formData.id) {
      // Update an existing friend’s information.
      fetch(`/api/users/${formData.id}`, {
        method: 'PUT', // We want to update this friend’s info.
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }),
      })
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok')) // Check if the update was successful.
      .then(updatedUser => {
        setData(prevData => prevData.map(user => user.id === updatedUser.id ? updatedUser : user)); // Update the friend’s info in our list.
        setFormData({ id: null, name: '', phone: '', address: '' }); // Clear the form.
      })
      .catch(error => console.error('Error updating data:', error)); // If there’s an error, show an error message.
    } else {
      // Add a new friend.
      fetch('/api/users', {
        method: 'POST', // We want to add a new friend.
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }),
      })
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok')) // Check if adding was successful.
      .then(newUser => {
        setData(prevData => [...prevData, newUser]); // Add the new friend to our list.
        setFormData({ id: null, name: '', phone: '', address: '' }); // Clear the form.
      })
      .catch(error => console.error('Error posting data:', error)); // If there’s an error, show an error message.
    }
  };

  // This function deletes a friend from the list.
  const handleDelete = (id) => {
    fetch(`/api/users/${id}`, { method: 'DELETE' }) // We want to remove this friend from the list.
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok')) // Check if the deletion was successful.
      .then(() => {
        setData(prevData => prevData.filter(user => user.id !== id)); // Remove the friend from our list.
      })
      .catch(error => console.error('Error deleting item:', error)); // If there’s an error, show an error message.
  };

  // This function sets up the form to edit an existing friend.
  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address,
    }); // Put the friend's info into the form so we can change it.
    setMapCenter({
      lat: parseFloat(user.latitude) || 0,
      lng: parseFloat(user.longitude) || 0,
    }); // Move the map to show where this friend lives.
  };

  return (
    <div className="container"> {/* This is like a big box that holds everything on the page. */}
      <h1>Personal Contact List</h1> {/* This is the big title at the top. */}
      <h2>Address Look-up</h2> {/* This is the title for the Google Map. */}
      {/* Search bar for finding places */}
      <div className="search-bar">
        <input
          id="autocomplete-input"
          type="text"
          placeholder="Search for a place" // This is where we type to find a place on the map.
          style={{ width: '97%', padding: '8px', fontSize: '16px' }}
        />
      </div>

      {/* Render the Google Map */}
      <LoadScript googleMapsApiKey={apiKey} libraries={['places']}> {/* This loads the map magic */}
        <GoogleMap
          mapContainerStyle={{ height: "300px", width: "100%" }} // This makes the map 300px tall and full width.
          center={mapCenter} // This tells the map where to start looking.
          zoom={10} // This sets how zoomed in the map should be.
        >
          {data.map(user => (
            <Marker
              key={user.id} // This is like a special tag for each friend on the map.
              position={{ lat: parseFloat(user.latitude), lng: parseFloat(user.longitude) }} // This tells where to put the tag on the map.
              title={user.name} // This shows the friend's name when we hover over the tag.
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Render the table to display the list of items */}
      <table>
        <thead>
          <tr>
            <th>ID</th> {/* This is a header for the ID column. */}
            <th>Name</th> {/* This is a header for the Name column. */}
            <th>Phone</th> {/* This is a header for the Phone column. */}
            <th>Address</th> {/* This is a header for the Address column. */}
            <th>Actions</th> {/* This is a header for the Actions column. */}
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}> {/* This makes alternate rows look different. */}
              <td>{user.id}</td> {/* This shows the friend's ID. */}
              <td>{user.name}</td> {/* This shows the friend's name. */}
              <td>{user.phone}</td> {/* This shows the friend's phone number. */}
              <td>{user.address}</td> {/* This shows the friend's address. */}
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button> {/* This button lets us change a friend's info. */}
                <button onClick={() => handleDelete(user.id)}>Delete</button> {/* This button lets us remove a friend from the list. */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the form for adding or editing an item */}
      <form onSubmit={handleSubmit}>
        <h2>{formData.id ? 'Edit' : 'Add'} Contact</h2> {/* This shows whether we are editing or adding a new friend. */}
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange} // Update the name when we type in the input field.
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange} // Update the phone number when we type in the input field.
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange} // Update the address when we type in the input field.
          />
        </label>
        <button type="submit">{formData.id ? 'Update' : 'Add'} Contact</button> {/* This button submits the form to add or update a friend. */}
      </form>
    </div>
  );
}

export default App; // This makes our App available for use in other files.
