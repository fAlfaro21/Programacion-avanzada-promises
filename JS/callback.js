// Un ApiKey es una llave para usar una api de internet, algunas son de pago y otras son gratuitas
// Sirven para limitar el número de peticiones por desarrollador
// Para conseguir un API KEY visita: https://home.openweathermap.org/api_keys
const WEATHER_API_KEY = "2ef4736524c61cfd8c6401064fd6feb0";
//"4eac8a918bb0409de66e6050896e2c57"

/**
 * This function will always return a `Promise` which will resolve to a `JSON` of weather data and reject an Error
 *
 * For using this function, you must provide an `API KEY` on line 4 of `/JS/callback.js` for using the function
 * @typedef {object} weatherDataJSON json defined on their documentation: https://openweathermap.org/api/one-call-api
 * @param {number} lat The Latitude you want info from
 * @param {number} lon The Longitude you want info from
 * @param {(error: (Error | null), weatherData: (weatherDataJSON | null)) => any} callback A callback function which will be called when the API provides data
 *
 */
function getWeather(lat, lon, callback) {
	if (!WEATHER_API_KEY) {
      let error = new Error("An API KEY must be provided on /JS/callback.js line 4 for function getQuestions to work");
      
      callback(error, null);
    } else if (!lat || !lon)
			callback(new Error("You must provide latitue and longitude", null));
		else {
			fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${WEATHER_API_KEY}&units=metric`)
        .then(response => response.json())
        .then(weatherData => callback(null, weatherData))
        .catch(error => {
          callback(error, null)
        });
		}
}

// getWeather(40.4165, -3.70256, (error, data) => {
//   if(error !== null) { // KO
//     console.error(error);
//   }
//   else { // OK
//     console.log(data);
//   }
// });

//************************************************************************************************
function getWeatherPromise(lat, lon) {
  return new Promise((resolve, reject) => {
    if (!WEATHER_API_KEY) {
      let error = new Error("An API KEY must be provided on /JS/callback.js line 4 for function getQuestions to work");

      reject(error);
    } else if (!lat || !lon)
      reject(new Error("You must provide latitude and longitude"));
    else {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${WEATHER_API_KEY}&units=metric`)
        .then(response => response.json())
        .then(weatherData => resolve(weatherData))
        .catch(error => {
          reject(error)
        });
    }
  });
}

let minTempArrayData = [];
let maxTempArrayData = [];

getWeatherPromise(40.4165, -3.70256)
  .then(data => {
	  console.log(data);
	  data.daily.map(element => {
		minTempArrayData.push(element.temp.min);
		maxTempArrayData.push(element.temp.max);		  
	  })
	})	
  .then (() => paintGraphic(minTempArrayData, maxTempArrayData))
  .catch(error => console.error(error));

// async function getWeatherAsync(lat, lon) {
//   let data = await getWeatherPromise(lat, lon);
  
//   console.log(data);
// }
// getWeatherAsync(40.4165, -3.70256);
//****************************************************************

//****************************************************************

function paintGraphic(minTempArrayData, maxTempArrayData){

graphicData = {
	//labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
	labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'],
	series: [
		minTempArrayData,
		maxTempArrayData
			]
	};
	//console.log(graphicData);

//setTimeout(() => {	
	new Chartist.Line('.ct-chart', graphicData);
//}, 3000);
	
}