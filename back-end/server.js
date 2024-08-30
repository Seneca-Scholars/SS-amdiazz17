const express = require('express'); //imports the express module
const sqlite3 = require('sqlite3').verbose(); 
const app = express(); //initializes a new express apllication
const port = 3003;


//intailzing the database
const db = new sqlite3.Database("./backendb.db", (err) =>{
    if (err){
        console.error("Error opening up database", err.message);
        return;
    }
    console.log("Connected to the backend DB")
  })
//creating a table if it does not exist already using sql 
//db.run is an async funtion
db.run(`
  CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      order_num INTEGER
      )`
), (err) => {
  if (err){
    console.error("Error creating the table", err)
  }
} 

//opens on the correct port
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})

app.use(express.json()); // This is used to parse JSON bodies.


//get endpoint -> fetches data from the server
async function getItems(req, res){
  try {
    // Retrieve all items from the 'items' table
    const items = await db.all('SELECT * FROM items');

    // Send the retrieved items as JSON response
    res.json(items);
} catch (error) {
    // Handle errors and send an error response
    res.status(500).json(`${error}`);
}
}
//post endpoint -> adds new data to the server
app.post('/api/items', (req, res) => {
    const newItem = req.body; // Data sent in the request body.
    res.send(`Item added: ${newItem.name}`);
  });

//put endpoint -> update existing data
app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id; // Access URL parameter.
    res.send(`Item with ID ${itemId} updated`);
  });

//delete endpoint
app.delete('/api/items/:id', (req, res) => {
    const itemId = req.params.id; 
    res.send(`Item with ID ${itemId} deleted`);
  });
app.get('/api/items', getItems);

// db.close((err) => {
//   if (err){
//     console.error("Error opening up database", err.message);
//     return;
// }
// console.log("Closed conection")
// })
