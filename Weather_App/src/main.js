import {getWeather} from './js/api.js'
import {updateWeb, clearCityInfo, updateCityInfo} from './js/ui.js'


const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', async () => {
    try {
        const data = await getWeather();
        clearCityInfo();
        updateWeb(data);
    } catch (error) {
        clearCityInfo();
    }
});
