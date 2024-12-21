import { useQuery } from "@tanstack/react-query";
import "./CurrentWeather.css"
import { useEffect, useState } from "react";
export default function CurrentWeather() {
    const [currTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const { isPending, error, data } = useQuery({
        queryKey: ['currentWeather'],
        queryFn: () =>
            fetch(process.env.REACT_APP_WeatherAPI)
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
        <div className="current-weather">
            <div className="temp-card">
                <div>
                    <p>{data.current}<sup>°C</sup></p>
                    {currTime &&
                        (currTime.getHours() >= 5 && currTime.getHours() < 17) ?
                        <img src="/sun.png" /> :
                        <img className="moon" src="/moon2.png" />
                    }
                </div>
                {currTime && <p className="time">{currTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>}
            </div>
            <div className="temp-card">
                <div>
                    <div className="max-min-temp">
                        <p>{data.max}<sup>°C</sup></p>
                        <p>{data.min}<sup>°C</sup></p>
                    </div>
                    <img src="/day-and-night.png" />
                </div>
                {currTime && <p className="time">{currTime.toLocaleDateString()}</p>}
            </div>
        </div>
    );
}