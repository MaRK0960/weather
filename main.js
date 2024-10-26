window.onload = async () => {

    const forcast =
        await fetch("https://api.weatherapi.com/v1/forecast.json?key=ce9fa4640f164e42a61200442241910&q=Ismailia&days=1&aqi=no&alerts=no")
            .then(res => res.json())
            .then(res => {
                const day = res.forecast.forecastday[0].day;
                return { min: day.mintemp_c, max: day.maxtemp_c }
            });

    const forcastElement = document.createElement("h3");
    forcastElement.append(`Min: ${forcast.min}\tMax: ${forcast.max}`);

    document.body.prepend(forcastElement);

    document.getElementById("subscribe").onclick = () => {
        const email = document.getElementById("email").value;

        fetch("***REMOVED***", {
            method: 'POST',
            body: email,
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS"
            }
        })
    }

};