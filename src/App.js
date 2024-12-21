import logo from './logo.svg';
import './App.css';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather';
import Subscribe from './Components/Subscribe/Subscribe';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Welcome to our <code>Khtfa Weather App</code>
        </p>

      </header>
        <CurrentWeather></CurrentWeather>

        <Subscribe></Subscribe>
    </div>
  );
}