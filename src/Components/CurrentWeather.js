import { useQuery } from "@tanstack/react-query";

export default function CurrentWeather() {
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
        <div>
            <p>{data.current}°C</p>
            <p>{data.min}°C/{data.max}°C</p>
        </div>
    );
}