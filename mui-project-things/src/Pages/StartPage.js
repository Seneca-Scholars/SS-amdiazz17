import "./Display.css"
import ForestIcon from '@mui/icons-material/Forest';
export function Home() {

  return (
    <div className="spotlight-container">
    <div className="icon">
      <ForestIcon/>
    </div>
    <div className="spotlight-text">
    <h3>Current Month's Spotlight</h3>
    <h7>Orginization Name</h7>
    <p>
    Established in 1867, this is considered by many to be the first nonprofit organization in the US. The fund was created to help
     rebuild the educational system after the Civil War and to integrate formerly enslaved people and poor white people in the south.
    </p>
    </div>
    </div>
  );
}