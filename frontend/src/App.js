
import './App.css';
import Login from './components/Login/Login';


function App() {

  const get = async () => {
    const res = fetch('http://localhost:3000')
    console.log(res);
  }
  get()

  return (
    <div className="App">
      <p>Welcome to frontend</p>
      <Login/>
    </div>
  );
}

export default App;
