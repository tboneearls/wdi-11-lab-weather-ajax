// api key 0be79249f227a66a98e1a175d8e89000

$("#forecast").on("click", function() {
	const zipcode = $("input").val();
	// console.log(zipcode);
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=0be79249f227a66a98e1a175d8e89000",
		type: "GET",
		dataType: "json",
		success: function (data) {
			displayForecast(data);	
			},
		fail: function (error) {
			console.error(error);
		}
	})
});

function displayForecast (data) {
	console.log(data);
	const cityName = (data.name);
	$("#city").text(cityName);
	const tempHigh = ("High: " + kelvinToFahrenheit(data.main.temp_max) + " degrees F");
	$("#high").text(tempHigh);
	const tempLow = ("Low: " + kelvinToFahrenheit(data.main.temp_min) + " degrees F");
	$("#low").text(tempLow);
	const description = (data.weather["0"].description);
	$("#description").text(description);
	const date = getDate(data.dt);
	$("#date").text(date);
	const wind = "The wind is blowing " + degToCard(data.wind.deg) + " at " + metersSecToMPH(data.wind.speed) + " mph.";
	$("#wind").text(wind);
}








const kelvinToFahrenheit = (temp) => {
	const fahrenheit = Math.round(1.8 * (temp - 273.15) + 32);
	return fahrenheit;
}
const getDate = (unix) => {
	const normDate = new Date (unix * 1000)
	const condensedDate = normDate.toString().substr(0,15);
	return condensedDate;
}
// for wind speed
const metersSecToMPH = (metersPerSec) => {
	const speed = metersPerSec * 2.236936292054402;
    return (Math.round(speed));
};
// for wind direction
const degToCard = (degrees) => {
    // set condition if degrees is over 360
    if (degrees >= 360) {
        degrees -= 360;
    } else if (22.5 < degrees < 67.5) {
        return "NE";
    } else if (67.5 < degrees < 112.5) {
        return "E";
    } else if (112.5 < degrees < 157.5) {
        return "SE";
    } else if (157.5 < degrees < 202.5) {
        return "S";
    } else if (202.5 < degrees < 247.5) {
        return "SW";
    } else if (247.5 < degrees < 292.5) {
        return "W";
    } else if (292.5 < degrees < 337.5) {
        return "NW";
    } else {
         // decided to do N last so I don't have to set more conditions
         // since it switches at 0 degrees
        return "N";
    }
};