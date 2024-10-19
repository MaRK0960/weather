window.onload = async () => {

    const forcast =
        await fetch("http://api.weatherapi.com/v1/forecast.json?key=ce9fa4640f164e42a61200442241910&q=Ismailia&days=1&aqi=no&alerts=no")
            .then(res => res.json())
            .then(res => {
                const day = res.forecast.forecastday[0].day;
                return { min: day.mintemp_c, max: day.maxtemp_c }
            });

    console.log(forcast);

};
