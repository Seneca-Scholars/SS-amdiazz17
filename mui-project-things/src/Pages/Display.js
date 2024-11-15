
import "./Display.css"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

export function Table() {
  const items =[
    {"name": "Monopoly",
    "category": "Board Game",
    }, {
      "name": "Sorry",
      "category":"Board Game"
    }
  ]
  return (

    <Grid item xs={8} >
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* .map iterates over all the objects in the array to generate table rows */}
          {items.map((items, index) => (
            <tr
              className={index % 2 === 0 ? 'even-row' : 'odd-row'}
            >
              <td>{items.name}</td>
              <td>{items.category}</td>
              <Button variant="contained">Edit</Button>
              <Button variant="contained">Delete</Button>

            </tr>
          ))}
        </tbody>
      </table>
     </Grid>
  );
}