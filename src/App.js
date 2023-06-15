import logo from './logo.svg';
import './App.css';
import  Hello  from './components/Hello';
import Message from './components/Message';
import Profile from './components/Profile';
import Counter from './components/counter';
import FunctionEvent from './components/FunctionEvent';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Hello/>
        <Message message="this is attribut"/>
        <Profile 
          name = "thos"
        />
        <Counter/>
        <FunctionEvent></FunctionEvent>
      </header>
    </div>
  );
}

export default App;
