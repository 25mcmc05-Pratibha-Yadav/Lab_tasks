var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = "2aff0dfe675beebb415d63ecda83b668";
const weatherReport = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (city.trim().length == 0) {
            return {
                type: "user-error",
                message: "City can not be empty",
            };
        }
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = yield response.json();
        if (!response.ok) {
            return {
                type: "api-error",
                cod: data.cod,
                message: data.message,
            };
        }
        return {
            type: "success",
            coord: data.coord,
            weather: data.weather,
            main: data.main,
        };
    }
    catch (error) {
        return {
            type: "user-error",
            message: `${error}`,
        };
    }
});
const getWeather = (city) => __awaiter(void 0, void 0, void 0, function* () {
    if (!result) {
        return;
    }
    const response = yield weatherReport(city);
    if (response.type == "api-error") {
        result.innerHTML = `
        <p> COD:${response.cod}</p>
        <p>Message:${response.message}</p>
        `;
    }
    else if (response.type == "success") {
        result.innerHTML = `
        <p> COORDINATES:${response.coord.lon} ${response.coord.lat}</p>
        <p> WEATHER: ${response.weather[0].description}</p>
        <p> TEMPERATURE: ${response.main.temp}</p>
        <p> HUMIDITY: ${response.main.humidity}</p>
        `;
    }
    else {
        result.innerHTML = `
        <p> MESSAGE: ${response.message}</p>        `;
    }
});
const city = document.querySelector("#city");
const weather = document.querySelector("#btn");
const result = document.querySelector("#display");
if (weather && city) {
    weather.addEventListener("click", () => {
        getWeather(city.value);
    });
}
export {};
//# sourceMappingURL=index.js.map