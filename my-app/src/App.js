import './App.css';

function App() {

console.log(98)

const x = ["Happy", "Sad", "Angry"]
for (let emotions=0; emotions < x.length; emotions++){
  console.log(x[emotions])
}
const ava = {
  height: "tall"
}



  return (
    <div className="App">
      <h1 className="H1">Plants</h1>
      <table className="table-of-something">
  <caption>  </caption>
  <thead>
    <tr>
      <th scope="col">Plant</th>
      <th scope="col">Species</th>
      <th scope="col">Growth in Inches</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Plant One</th>
      <td>Inchplant</td>
      <td>1 in</td>
    </tr>
    <tr>
      <th scope="row">Plant Two</th>
      <td>Tillandsia</td>
      <td>3 in</td>
    </tr>
    <tr>
      <th scope="row">Plant Three</th>
      <td>Sunflowers</td>
      <td>10 in</td>
    </tr>
    <tr>
      <th scope="row">Plant Four</th>
      <td>Parennials</td>
      <td>4 in</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="2">Average Growth</th>
      <td>4.5 in</td>
    </tr>
  </tfoot>
</table>
    <ol className="fruit-list">
      <li>Grapes</li>
      <li>Watermelon</li>
    </ol>
    <ul className="Smurf list">
      <li>Papa Smurf</li>
      <li>Sleepy Smurf</li>
    </ul>
    <img className="img" src="../flower.png"/>
    <br></br>
  <a href= "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button">
  <button className = "but" >CLICK</button>
   </a>
<br></br>
<br></br>
<div>
  {ava.height}
</div>
<div className = "drop-down">

</div>

<selector>
  <option selected = "">
    Select
    </option>


</selector>
</div>


 );

}




export default App;
