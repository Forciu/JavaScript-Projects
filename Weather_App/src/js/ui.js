const selectedCity = document.querySelector('#selected-city');
const currentTime = document.querySelector('#current-date-data');
const currentWeatherContainer = document.querySelector('.current-weather');

export const updateWeb = (data) => {
    updateCityInfo(data);
    updateWeatherInformation(data.currentConditions);
}

export const updateCityInfo = (data) => {
    selectedCity.innerHTML = data?.address ?? 'Error';
    currentTime.innerHTML = data?.currentConditions.datetime.slice(0, 5) ?? 'We can\'t find selected City or Country'
}

export const clearCityInfo = () => {
    selectedCity.innerHTML = '';
    currentTime.innerHTML = '';

    // TODO
    //Clear current Day info
    //Clear current day Hours info
    updateCityInfo();
}

export const updateWeatherInformation = (currentConditions) => {
    createCurrentWeatherInformationIcon(currentConditions)
    createCurrentWeatherInformationInfo(currentConditions)
}


const createCurrentWeatherInformationIcon = (currentConditions) => {
    const imgElement = document.createElement('img');

    imgElement.id = 'current-weather-icon';
    imgElement.setAttribute('src', `./assets/weather/${currentConditions.icon}.svg`);
    currentWeatherContainer.appendChild(imgElement);
}

const createCurrentWeatherInformationInfo = (currentConditions) => {
    const currentWeatherInfoContainer = document.createElement('div');
    const divWeatherTemp = document.createElement('div');
    const divWeatherWindSpeed = document.createElement('div');
    const weatherTempIcon = document.createElement('img');
    const weatherWindSpeedIcon = document.createElement('img');

    const weatherTempValue = document.createElement('p');
    const weatherWindSpeedValue = document.createElement('p');

    currentWeatherInfoContainer.id = 'current-weather-info';
    divWeatherTemp.id = 'current-weather-temp';
    divWeatherWindSpeed.id = 'current-weather-windSpeed';

    currentWeatherContainer.appendChild(currentWeatherInfoContainer);
    currentWeatherInfoContainer.appendChild(divWeatherTemp);
    currentWeatherInfoContainer.appendChild(divWeatherWindSpeed);

    divWeatherTemp.appendChild(weatherTempIcon);
    divWeatherTemp.appendChild(weatherTempValue);

    divWeatherWindSpeed.appendChild(weatherWindSpeedIcon);
    divWeatherWindSpeed.appendChild(weatherWindSpeedValue);

    weatherTempValue.innerHTML = `${currentConditions.temp} °C`;
    weatherWindSpeedValue.innerHTML = currentConditions.windspeed;
    weatherTempIcon.src = './assets/information/temp.png';
    weatherWindSpeedIcon.src = './assets/information/wind.png';


}