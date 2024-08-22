// Import the CSS file for styling the component
import './App.css';
// Import React and the necessary hooks from the React library
import React, { useState, useEffect } from 'react';

// Define the main functional component for the application
function App() {
  // Initialize state to store the list of items fetched from the server
  const [data, setData] = useState([]);
  // Initialize state to manage form data, starting with an empty ID and name
  const [formData, setFormData] = useState({
    id: null, // Track the ID of the item being edited (null if adding a new item)
    name: '', // Field for the item's name
  });

  // useEffect hook to perform side effects when the component mounts
  useEffect(() => {
    // Fetch data from the server API endpoint
    fetch("/api/items")
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
      fetch(`/api/items/${formData.id}`, {
        method: 'PUT', // Use PUT method to update the existing item
        headers: {
          'Content-Type': 'application/json', // Set content type of the request body
        },
        body: JSON.stringify({ name: formData.name }), // Send the updated name in JSON format
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
      .then(updatedItem => {
        // Update the state with the updated item
        setData(prevData => prevData.map(item => item.id === updatedItem.id ? updatedItem : item));
        // Clear the form data
        setFormData({ id: null, name: '' });
      })
      .catch(error => {
        // Log any errors that occur during the update
        console.error('Error updating data:', error);
      });
    } else {
      // If formData.id does not exist, we are adding a new item
      fetch('/api/items', {
        method: 'POST', // Use POST method to add a new item
        headers: {
          'Content-Type': 'application/json', // Set content type of the request body
        },
        body: JSON.stringify({ name: formData.name }), // Send the new item name in JSON format
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
      .then(newItem => {
        // Update the state with the new item
        setData(prevData => [...prevData, newItem]);
        // Clear the form data
        setFormData({ id: null, name: '' });
      })
      .catch(error => {
        // Log any errors that occur during the addition
        console.error('Error posting data:', error);
      });
    }

    // Reload the page to reflect the changes (not recommended if updating state properly)
    window.location.reload();
  };

  // Function to handle deleting an item by its ID
  const handleDelete = (id) => {
    fetch(`/api/items/${id}`, {
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
      setData(prevData => prevData.filter(item => item.id !== id));
    })
    .catch(error => {
      // Log any errors that occur during deletion
      console.error('Error deleting item:', error);
    });
  };

  // Function to handle editing an item
  const handleEdit = (name) => {
    // Set the formData state with the item's current details
    setFormData({
      id: name.id, // Set the ID of the item being edited
      name: name.name, // Set the name of the item being edited
    });
  };

  // Render the component
  return (
    <div className="container">
      {/* Render the table to display the list of items */}
      <table>
        <thead>
          <tr>
            <th>ID</th> {/* Column header for item IDs */}
            <th>Name</th> {/* Column header for item names */}
            <th>Actions</th> {/* Column header for action buttons */}
          </tr>
        </thead>
        <tbody>
          {/* Iterate over the data array to create table rows for each item */}
          {data.map((name, index) => (
            <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{name.id}</td> {/* Display the item's ID */}
              <td>{name.name}</td> {/* Display the item's name */}
              <td>
                {/* Button to edit the item, triggers handleEdit with the item's data */}
                <button onClick={() => handleEdit(name)}>Edit</button>
                {/* Button to delete the item, triggers handleDelete with the item's ID */}
                <button onClick={() => handleDelete(name.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form to add or edit items */}
      <form onSubmit={handleSubmit}>
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
        {/* Submit button text changes based on whether editing or adding */}
        <input type="submit" value={formData.id ? "Update" : "Submit"} />
      </form>
    </div>
  );
}

// Export the App component for use in other parts of the application
export default App;