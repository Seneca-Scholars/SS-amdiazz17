import './App.css';

function App() {
  function loadData(){
    const dataUrl = "https://jsonplaceholder.typicode.com/users"
    fetch(dataUrl)
    .then(handleResponse)
    .then(handleUrlData);
  }
  function handleResponse(response){
    return response.json();
  }

  function load(){
    loadData();
  }

  window.onload = load;








  return (
    <div className="app">
      <header className="app-header">
        Next Project
      </header>
      <body>
      <div className="main">
        <table id="">
          <thead>
            <tr>
              <th>Numbers</th>
              <th>Letters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1234</td>
              <td>abcd</td>
            </tr>
            <tr>
              <td>1234</td>
              <td>abcd</td>
            </tr>
            <tr>
              <td>1234</td>
              <td>abcd</td>
            </tr>
            <tr>
              <td>1234</td>
              <td>abcd</td>
            </tr>
          </tbody>
        </table>
      </div>
      </body>
    </div>
  );
}
export default App;