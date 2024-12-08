import logo from './logo.svg';
import './App.css';
import CurrentWeather from './Components/CurrentWeather';
import Subscribe from './Components/Subscribe';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Welcome to our <code>Khtfa Weather App</code>!!!
        </p>

        <CurrentWeather></CurrentWeather>

        <Subscribe></Subscribe>
      </header>
    </div>
  );
}