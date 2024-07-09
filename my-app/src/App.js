import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="H1">HTML Elements</h1>
      <h2>Headers</h2>
      <span><b>something left </b></span>
      <span className='pra-inline'><b>something right</b></span>
      <br />
      <span className='pra-inline-b'><b>something tall</b></span>
      <p>What is Lorem Ipsum?
        <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <table className="table-of-something">
  <caption> Something </caption>
  <thead>
    <tr>
      <th scope="col">Person</th>
      <th scope="col">Most interest in</th>
      <th scope="col">Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Chris</th>
      <td>HTML tables</td>
      <td>22</td>
    </tr>
    <tr>
      <th scope="row">Dennis</th>
      <td>Web accessibility</td>
      <td>45</td>
    </tr>
    <tr>
      <th scope="row">Sarah</th>
      <td>JavaScript frameworks</td>
      <td>29</td>
    </tr>
    <tr>
      <th scope="row">Karen</th>
      <td>Web performance</td>
      <td>36</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="2">Average age</th>
      <td>33</td>
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
  </div>


  );
}

export default App;
