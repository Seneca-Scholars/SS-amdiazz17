// Import the CSS file for styling the component
import './App.css';
// Import React and the necessary hooks from the React library
import React, { useState, useEffect } from 'react';

// Define the main functional component for the application
function App() {
  // Initialize state to store the list of items fetched from the server
  const [data, setData] = useState([]);
  // Initialize state to manage form data, starting with an empty ID, name, phone, and address
  const [formData, setFormData] = useState({
    id: null, // Track the ID of the item being edited (null if adding a new item)
    name: '', // Field for the item's name
    phone: '', // Field for the item's phone number
    address: '', // Field for the item's address
  });

  // useEffect hook to perform side effects when the component mounts
  useEffect(() => {
    // Fetch data from the server API endpoint
    fetch("/api/users")
      .then(response => {
        // Check if the response from the server is successful
        if (!response.ok) {
          // If not successful, throw an error with a message
          throw new Error('Network response was not ok');
        }
        // Convert the response data to JSON format
        return response.json();
      })
      .then(fetchedData => {
        // Update the state with the fetched data from the server
        setData(fetchedData);
      })
      .catch(error => {
        // Log any errors that occur during data fetching
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  // Function to handle changes in the form input fields
  const handleChange = (event) => {
    // Destructure name and value from the event target (input field)
    const { name, value } = event.target;
    // Update the formData state with the new value of the input field
    setFormData(prevFormData => ({
      ...prevFormData, // Spread operator to retain previous form data
      [name]: value // Update the specific field with the new value
    }));
  };

  // Function to handle form submission (add or update item)
  const handleSubmit = (event) => {
    // Prevent the default form submission behavior which reloads the page
    event.preventDefault();

    // Check if we are updating an existing item or adding a new one
    if (formData.id) {
      // If formData.id exists, it means we are editing an existing item
      fetch(`/api/users/${formData.id}`, {
        method: 'PUT', // Use PUT method to update the existing item
        headers: {
          'Content-Type': 'application/json', // Set content type of the request body
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }), // Send the updated data in JSON format
      })
      .then(response => {
        // Check if the response from the server is successful
        if (!response.ok) {
          // If not successful, throw an error with a message
          throw new Error('Network response was not ok');
        }
        // Convert the response data to JSON format
        return response.json();
      })
      .then(updatedUser => {
        // Update the state with the updated item ()
        setData(prevData => prevData.map(user => user.id === updatedUser.id ? updatedUser : user));
        // Clear the form data
        setFormData({ id: null, name: '', phone: '', address: '' });
      })
      .catch(error => {
        // Log any errors that occur during the update
        console.error('Error updating data:', error);
      });
    } else {
      // If formData.id does not exist, we are adding a new item
      fetch('/api/users', {
        method: 'POST', // Use POST method to add a new item
        headers: {
          'Content-Type': 'application/json', // Set content type of the request body
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }), // Send the new item data in JSON format
      })
      .then(response => {
        // Check if the response from the server is successful
        if (!response.ok) {
          // If not successful, throw an error with a message
          throw new Error('Network response was not ok');
        }
        // Convert the response data to JSON format
        return response.json();
      })
      .then(newUser => {
        // Update the state with the new item
        setData(prevData => [...prevData, newUser]);
        // Clear the form data
        setFormData({ id: null, name: '', phone: '', address: '' });
      })
      .catch(error => {
        // Log any errors that occur during the addition
        console.error('Error posting data:', error);
      });
    }
  };

  // Function to handle deleting an item by its ID
  const handleDelete = (id) => {
    fetch(`/api/users/${id}`, {
      method: 'DELETE', // Use DELETE method to remove the item
    })
    .then(response => {
      // Check if the response from the server is successful
      if (!response.ok) {
        // If not successful, throw an error with a message
        throw new Error('Network response was not ok');
      }
      // Convert the response data to JSON format
      return response.json();
    })
    .then(() => {
      // Update the state to remove the deleted item
      setData(prevData => prevData.filter(user => user.id !== id));
    })
    .catch(error => {
      // Log any errors that occur during deletion
      console.error('Error deleting item:', error);
    });
  };

  // Function to handle editing an item
  const handleEdit = (user) => {
    // Set the formData state with the item's current details
    setFormData({
      id: user.id, // Set the ID of the item being edited
      name: user.name, // Set the name of the item being edited
      phone: user.phone, // Set the phone number of the item being edited
      address: user.address, // Set the address of the item being edited
    });
  };

  // Render the component
  return (
    <div className="container">
      <h1>Personal Contact List</h1>
      {/* Render the table to display the list of items */}
      <table>
        <thead>
          <tr>
            <th>ID</th> {/* Column header for item IDs */}
            <th>Name</th> {/* Column header for item names */}
            <th>Phone</th> {/* Column header for item phone numbers */}
            <th>Address</th> {/* Column header for item addresses */}
            <th>Actions</th> {/* Column header for action buttons */}
          </tr>
        </thead>
        <tbody>
          {/* Iterate over the data array to create table rows for each item */}
          {data.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{user.id}</td> {/* Display the item's ID */}
              <td>{user.name}</td> {/* Display the item's name */}
              <td>{user.phone}</td> {/* Display the item's phone number */}
              <td>{user.address}</td> {/* Display the item's address */}
              <td>
                {/* Button to edit the item, triggers handleEdit with the item's data */}
                <button onClick={() => handleEdit(user)}>Edit</button>
                {/* Button to delete the item, triggers handleDelete with the item's ID */}
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form to add or edit items */}
      <form onSubmit={handleSubmit} class='form'>
        <div>
          <label>
            Name:
            <input 
              type='text' // Input type is text
              name='name' // Name of the input field, used to update formData
              value={formData.name} // Controlled value of the input field
              onChange={handleChange} // Function to call when the input value changes
              required // Make this field mandatory for form submission
            />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input 
              type='text' // Input type is text
              name='phone' // Name of the input field, used to update formData
              value={formData.phone} // Controlled value of the input field
              onChange={handleChange} // Function to call when the input value changes
              required // Make this field mandatory for form submission
            />
          </label>
        </div>
        <div>
          <label>
            Home Address:
            <input 
              type='text' // Input type is text
              name='address' // Name of the input field, used to update formData
              value={formData.address} // Controlled value of the input field
              onChange={handleChange} // Function to call when the input value changes
              required // Make this field mandatory for form submission
            />
          </label>
        </div>
        {/* Submit button text changes based on whether editing or adding */}
        <input type="submit" value={formData.id ? "Update" : "Submit"} />
      </form>
    </div>
  );
}

// Export the App component for use in other parts of the application
export default App;
