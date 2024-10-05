import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [id, setid]= useState('');
  const [formInput, setformInput]= useState({
    id: null,
    name: "",
    category: ""
  })

  const addData = () => {
    if (formInput.id){
    fetch(`api/items/${formInput.id}`,{
    'method': 'PUT',
    'headers':{
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify({
      name: formInput.name,
      category: formInput.category
    }),
    })
    .then(response => {
      return response.json
    })
    .then(updateItem =>{
      setData(prevData => prevData.map()
    )})
    .catch(error => console.log(error));
  }else{

  }
};
// const handleChange = (e) = {
//   const {name, value} = e.target
//   setformInput{
//     ...formInput,
//   }

}






  //set to an empty strinng before we fetch the data
  const [data, setData] = useState([]);
    useEffect(() => {
      //fetches the data
      fetch("/api/items")
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
            <th>Category</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {/* .map iterates over all the objects in the array to generate table rows */}
          {data.map((items, index) => (
            <tr
              className={index % 2 === 0 ? 'even-row' : 'odd-row'}
            >
              <td>{items.name}</td>
              <td>{items.category}</td>
              <button>Edit</button>
              <button>Delete</button>

            </tr>
          ))}
        </tbody>
      </table>
      <form className='form'>
      <div>
      <label>
            Enter a Game Here:
      </label>
            <input
            type="text"
            name= "name"
            required
            handlechange={handleChange}
            value= {formInput.name}
            />
      </div>
      <div>
        <label>
          Enter Categroy Here:
        </label>
        <input
        type="text"
        name= "category"
        required
        handlechange={handleChange}
        value= {formInput.category}
        />
      </div>
      </form>
      </div>
  );


export default App;