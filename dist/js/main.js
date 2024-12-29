import { setLocationObject, getHomeLocation } from "./dataFunctions.js";
import {addSpinner, displayError} from "./domFunctions.js";
import CurrentLocation from "./CurrentLocation.js"
const currentLoc = new CurrentLocation();

const initApp = () => {
    //add listeners
    //document.addEventListener("DOMContentLoaded", () => {
      //  console.log("DOM fully loaded and parsed");
        //initApp();
    //});
    //console.log("initApp called");
    const geoButton = document.getElementById("getLocation");
    //console.log("Geo Button:", geoButton);
    //console.log("Event listener added to Geo Button");
    //geoButton.addEventListener("click", () => console.log("Geo Button clicked!"));
    //geoButton.addEventListener("click", (event) => getGeoWeather(event));

    geoButton.addEventListener("click", getGeoWeather);
    const homeButton = document.getElementById("home");
    homeButton.addEventListener("click", loadWeather);
    const saveButton = document.getElementById("Save Location")

    //set up 


    //load weather
    loadWeather();

}

document.addEventListener("DOMContentLoaded", initApp);

const getGeoWeather = (event) => {
    //console.log("getGeoWeather function reference:", getGeoWeather);

    if (event && event.type === "click") {
            //add spiny thingy\
            const mapIcon = document.querySelector(".fa-map-pin");
            addSpinner(mapIcon);
    }

    if (!navigator.geolocation) return geoError(); 
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};

const geoError = (errObj) => {
    //console.log("geo error called loser");
    const errMsg = errObj ? errObj.message: "Geolocation not supported";
    displayError(errMsg, errMsg);
};

const geoSuccess = (position) => {
    console.log("geo success called");
    const myCoordsObj = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
        name: 'Lat: ${position.coords.latitude} Long: ${position.coords.longitude}'
    };

    //console.log("Coordinates Object:", myCoordsObj);
    //set locatio object
    setLocationObject(currentLoc, myCoordsObj);
    //update data  and display
    updateDataAndDisplay(currentLoc);
};

const loadWeather = (event) => {
    const savedLocation = getHomeLocation();
    if (!savedLocation && !event) return getGeoWeather();
    if (!savedLocation && event.type === "click") {
      displayError(
        "No Home Location Saved.",
        "Sorry. Please save your home location first."
      );
    } else if (savedLocation && !event) {
      displayHomeLocationWeather(savedLocation);
    } else {
      const homeIcon = document.querySelector(".fa-home");
      addSpinner(homeIcon);
      displayHomeLocationWeather(savedLocation);
    }
};

const displayHomeLocationWeather = (home) => {
    //console.log("display called");
    if (typeof home === "string") {
        const locationJson = JSON.parse(home);
        const myCoordsObj = {
            lat: locationJson.lat,
            long : locationJson.long,
            name : locationJson.name,
            unit : locationJson.unit,
        };
        setLocationObject(currentLoc, myCoordsObj);
        updateDataAndDisplay(currentLoc);
    }
}
const updateDataAndDisplay = async (locationObj) => {
    console.log("update and display called: ", locationObj);

    //const weatherJson = await getWeatherFromCoords(locationObj);
    //if (weatherJson) updateDisplay(weatherJson, locationObj);
};