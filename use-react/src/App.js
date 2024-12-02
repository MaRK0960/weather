import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

function CurrentWeather() {
  const { isPending, error, data } = useQuery({
    queryKey: ['currentWeather'],
    queryFn: () =>
      fetch('https://api.weatherapi.com/v1/forecast.json?key=ce9fa4640f164e42a61200442241910&q=Ismailia&days=1&aqi=no&alerts=no')
        .then(res => res.json())
        .then(res => {
          const day = res.forecast.forecastday[0].day;
          return { current: res.current.temp_c, min: day.mintemp_c, max: day.maxtemp_c }
        })
  });

  if (isPending) {
    return 'Loading...';
  }

  if (error) {
    return 'Error occured: ' + error;
  }

  return (
    <div>
      <p>{data.current}°C</p>
      <p>{data.min}°C/{data.max}°C</p>
    </div>
  );
}

function Subscribe() {
  const mutation = useMutation({
    mutationFn: newEmail => {
      return fetch("https://localhost:7000/subscribe",
        {
          method: 'POST',
          body: newEmail
        }
      )
    }
  })

  const [email, setEmail] = useState('');

  function subscribe() {
    mutation.mutate(email);
  }

  return (
    <div>
      <input id="email" type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />

      <button id="subscribe" role="none" onClick={subscribe}>Subscribe</button>
    </div>
  );
}

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