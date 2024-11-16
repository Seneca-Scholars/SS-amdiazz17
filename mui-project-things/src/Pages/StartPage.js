import "./Display.css"
import ForestIcon from '@mui/icons-material/Forest';
export function Home() {

  return (
    <div className="body">
      <div className="begining-container">
        <h1>Volunteer Sphere</h1>
      </div>









    <div className="spotlight-container">
    <div className="spotlight-icon">
      <ForestIcon style={{ fontSize:"200px" }}/>
    </div>
    <div className="spotlight-text">
    <h2>Current Month's Spotlight</h2>
    <h3>Orginization Name</h3>
    <p>
    Established in 1867, this is considered by many to be the first nonprofit organization in the US. The fund was created to help
     rebuild the educational system after the Civil War and to integrate formerly enslaved people and poor white people in the south.
    </p>
    </div>
    </div>
    <div className="events-container">
    <div className="event-cards">
      <div className="event-date">
      <h3>Novemeber 15th @ 4PM</h3>
      </div>
      <div className="event-description">
      <h3>Title of Event</h3>
      <p>Enjoy the best of Winnipeg's food scene at our one-day popup
        on February 13th, held in Cozy Carl's Grocery from 10 AM to 2
        PM. Vendors from all over the city will be in attendance,
        so you can enjoy everything from craft beer to poutine to Valentine’s
        Day goodies. Tickets are $10 for adults and $5 for children under 13, which gets you entry
       into the event and one free drink.</p>
       </div>
    </div>
    <div className="event-cards">
    <div className="event-date">
      <h3>Novemeber 15th @ 4PM</h3>
      </div>
      <div className="event-description">
      <h3>Title of Event</h3>
      <p>Enjoy the best of Winnipeg's food scene at our one-day popup
        on February 13th, held in Cozy Carl's Grocery from 10 AM to 2
        PM. Vendors from all over the city will be in attendance,
        so you can enjoy everything from craft beer to poutine to Valentine’s
        Day goodies. Tickets are $10 for adults and $5 for children under 13, which gets you entry
       into the event and one free drink.</p>
       </div>
    </div>
    <div className="event-cards">
    <div className="event-date">
      <h3>Novemeber 15th @ 4PM</h3>
      </div>
      <div className="event-description">
      <h3>Title of Event</h3>
      <p>Enjoy the best of Winnipeg's food scene at our one-day popup
        on February 13th, held in Cozy Carl's Grocery from 10 AM to 2
        PM. Vendors from all over the city will be in attendance,
        so you can enjoy everything from craft beer to poutine to Valentine’s
        Day goodies. Tickets are $10 for adults and $5 for children under 13, which gets you entry
       into the event and one free drink.</p>
       </div>
    </div>
    </div>
    </div>
  );
}