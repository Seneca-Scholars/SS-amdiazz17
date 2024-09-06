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
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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
async function getItems(req, res) {
  try {
    //waits to see if the promise is rejectd or resolved
    const items = await new Promise((resolve, reject) => {
      // Retrieve all items from the 'items' table empty paramters becuase we want all the data
      //sees if there is an error and puts that in the rejected part 
      db.all('SELECT * FROM items', [], (error, rows) => {
        //if error send message becuase promise was rejected
        if (error) {
          reject("Failed to get items");
          //if not the promise returns the rows of the table
        } else {
          resolve(rows);
        }
      });
    });

    // Send the retrieved items as JSON response after promise is completed aand rows is returned
    res.json(items);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: error.message });
  }
}
//post endpoint -> adds new data to the server
//req contains data sent by the client
async function addItem(req, res) {
  try{
    //retrieved the data sent to the request body
    const newItem = req.body; 
    console.log(newItem);
    //validates the data if one is missing it will run the else block
    if (newItem.name && newItem.category && newItem.order_num){
      //inserts item in my database usinng sql -> the ? are placeholders
      const insertItem = `INSERT INTO items (name, category, order_num) VALUES (?, ?, ?)`;
      //creates an array of values from the newItem varible to be inserted to the database
      //these values should be in the correct order
      const newData= [newItem.name, newItem.category, newItem.order_num];
      //runs the SQL commannd to modify the database -> in this case add data 
      db.run(insertItem, newData, function(error) {
        //sends an error message if there was one
        if (error) {
          return res.status(500).json({ error: error.message });
        }  
    //used to structure the response sent to the client after the successful insert
      const itemFormat = {
        //refers to an id of an inserted row
        id: this.lastID, 
      //using a spread opertator includes all the proerties of the new item 
        ...newItem
      };
      res.status(201).json(itemFormat);
    });
  }else{
    res.status(400).send("invaild data")
  }
  }catch(error){
   // Handle errors and send an error response
    res.status(500).json(`${error}`);
  }
};

//put endpoint -> update existing data
async function updateItem(req, res){
  //getting the string and parsing it into an integer (parseInt) 
  //finding that in my ids using req.params with the paramter being id
  const itemId = parseInt(req.params.id);
  //get the updated item data sent to the request body
  const updatedItem = req.body;
  //vaildate data 
  // if(updatedItem )
  //update object
  //return updated object

}


//delete endpoint
async function deleteItem(req, res){
  const itemId = parseInt(req.params.id, 10);
  //delting the item -> sql statement
  const sqlDelete = 'DELETE FROM items WHERE id = ?';
  db.run(sqlDelete, itemId, function(error) {
    //sends an error message if there was one
    if (error) {
      return res.status(500).json({ error: error.message });
    }

})};








app.get('/api/items', getItems);
app.post('/api/items', addItem);
app.put('/api/items/:id', updateItem)
app.delete('/api/items/:id', deleteItem)

// db.close((err) => {
//   if (err){
//     console.error("Error opening up database", err.message);
//     return;
// }
// console.log("Closed conection")
// })
