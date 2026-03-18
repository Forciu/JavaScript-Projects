import {getWeather} from './js/api.js'
import {updateWeb, clearWeatherInfo} from './js/ui.js'


const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', async () => {
    try {
        const data = await getWeather();
        clearWeatherInfo();
        updateWeb(data);
    } catch (error) {
        console.error(error);
        clearWeatherInfo();
    }
});
