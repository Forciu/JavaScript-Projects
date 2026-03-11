const secretKey = '873P5CUTQMG8M3UW85EJGCVNK';

const selectedCityValue = document.getElementById('city-input');

export const getWeather = async () => {
    let selectedCity = selectedCityValue.value;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedCity}?unitGroup=metric&key=${secretKey}`;
    const response = await fetch(url);
    return await response.json();
}