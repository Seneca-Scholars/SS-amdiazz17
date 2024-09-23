// This line imports the CSS file that styles our page.
import './App.css';
// This imports the React library and some tools to help manage our page's state and effects.
import React, { useState, useEffect, useRef } from 'react';
// This imports tools to show an OpenStreetMap using Leaflet.
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// Import Leaflet CSS for proper styling.
import 'leaflet/dist/leaflet.css';
// Fix marker icon issue.
import L from 'leaflet';
// import useGoogleMaps from './useGoogleMaps'; // You can remove this if it's only for Google Maps.

function App() {
  // State for holding the list of friends.
  const [data, setData] = useState([]);

  // State for the current friend's info being added or edited.
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    phone: '',
    address: '',
    email: ''
  });

  // State for map center coordinates.
  const [mapCenter, setMapCenter] = useState({ lat: 38.7946, lng: -106.5348 });

  // Ref for the input field.
  const inputRef = useRef(null);

  // Fetch the list of friends on initial load.
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

  // Handle form input changes.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  // Look up an address in the table when clicked.
  const handleAddressLookup = (address) => {
    // Implement a geocoding solution to convert address to lat/lng
    // You can use an external API like Nominatim (OpenStreetMap) for geocoding
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setMapCenter({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          });
          inputRef.current.value = address; // Prefill the input with the address
          setFormData(prevFormData => ({ ...prevFormData, address }));
        } else {
          console.error('No results found for the address.');
        }
      })
      .catch(error => console.error('Error with geocoding:', error));
  };

  // Handle form submission for adding or updating a user.
  const handleSubmit = (event) => {
    event.preventDefault();

    const url = formData.id ? `/api/users/${formData.id}` : '/api/users';
    const method = formData.id ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        email: formData.email,
      }),
    })
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
      .then(user => {
        if (formData.id) {
          setData(prevData => prevData.map(existingUser => existingUser.id === user.id ? user : existingUser));
        } else {
          setData(prevData => [...prevData, user]);
        }
        // Reset the form data after submission.
        setFormData({ id: null, name: '', phone: '', address: '', email: '' });
      })
      .catch(error => console.error('Error handling data:', error));
  };

  // Handle user deletion.
  const handleDelete = (id) => {
    fetch(`/api/users/${id}`, { method: 'DELETE' })
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
      .then(() => {
        setData(prevData => prevData.filter(user => user.id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  // Pre-fill the form for editing a user.
  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address,
      email: user.email,
    });
    setMapCenter({
      lat: parseFloat(user.latitude) || 0,
      lng: parseFloat(user.longitude) || 0,
    });
  };

  // Fix the default marker icon
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.prototype._getIconUrl = function (name) {
    const ices = {
      iconUrl: new URL('path/to/marker-icon.png', import.meta.url).href,
      shadowUrl: new URL('path/to/marker-shadow.png', import.meta.url).href,
    };
    return ices[name];
  };

  return (
    <div className="container">
      <h1>Personal Contact List</h1>
      <h2>Address Look-up</h2>
      <div className="search-bar">
        <input
          ref={inputRef}
          id="autocomplete-input"
          type="text"
          placeholder="Search for a place"
          style={{ width: '97%', padding: '8px', fontSize: '16px' }}
        />
      </div>

      <MapContainer center={mapCenter} zoom={10} style={{ height: "300px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map(user => (
          <Marker
            key={user.id}
            position={{ lat: parseFloat(user.latitude), lng: parseFloat(user.longitude) }}
          >
            <Popup>{user.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddressLookup(user.address);
                  }}
                >
                  {user.address}
                </a>
              </td>
              <td>
                <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">{user.email}</a>
              </td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <h2>{formData.id ? 'Edit' : 'Add'} Contact</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">{formData.id ? 'Update' : 'Add'} Contact</button>
      </form>
    </div>
  );
}

export default App; // Export the App component for use in other files.
