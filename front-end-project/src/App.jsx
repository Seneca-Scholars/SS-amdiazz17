import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  //set to an empty strinng before we fetch the data
  const [data, setData] = useState([]);
    useEffect(() => {
      //fetches the data
      fetch("https://jsonplaceholder.typicode.com/users")
          .then(response => {
            //if the request was unsuccuessful it throws an error
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              //turns the data into JSON and prepares it for the next step in the chain
              return response.json();
          })
          //updates the state from eariler to the data that was fetched and parsed into JSON
          .then(data => {
            setData(data);
          })
          //console logs an error if onne occurs
          .catch(error => {
              console.error('Error fetching data:', error);
          });

  }, []);


  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {/* .map iterates over all the objects in the array to generate table rows */}
          {data.map((user, index) => (
            <tr
              className={index % 2 === 0 ? 'even-row' : 'odd-row'}
            >
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;