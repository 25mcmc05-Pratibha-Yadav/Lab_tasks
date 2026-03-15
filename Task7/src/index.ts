const API_KEY: string = "2aff0dfe675beebb415d63ecda83b668";

interface responseSuccess {
  type: "success";
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      description: string;
      main: string;
    }
  ];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
}

interface userError {
  type: "user-error";
  message: string;
}

interface apiError {
  type: "api-error";
  cod: number;
  message: string;
}

type responseResult = responseSuccess | userError | apiError;

const weatherReport = async (city: string): Promise<responseResult> => {
  try {
    if (city.trim().length == 0) {
      return {
        type: "user-error",
        message: "City can not be empty",
      };
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
    );
    const data = await response.json();

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
  } catch (error) {
    return {
      type: "user-error",
      message: `${error}`,
    };
  }
};

const getWeather = async (city: string) => {
  if (!result) {
    return;
  }

  const response = await weatherReport(city);
  if (response.type == "api-error") {
    result.innerHTML = `
        <p> COD:${response.cod}</p>
        <p>Message:${response.message}</p>
        `;
  } else if (response.type == "success") {
    result.innerHTML = `
        <p> COORDINATES:${response.coord.lon} ${response.coord.lat}</p>
        <p> WEATHER: ${response.weather[0].description}</p>
        <p> TEMPERATURE: ${response.main.temp}</p>
        <p> HUMIDITY: ${response.main.humidity}</p>
        `;
  } else {
    result.innerHTML = `
        <p> MESSAGE: ${response.message}</p>        `;
  }
};

const city = document.querySelector<HTMLInputElement>("#city");
const weather = document.querySelector<HTMLButtonElement>("#btn");
const result = document.querySelector<HTMLDivElement>("#display");

if (weather && city) {
  weather.addEventListener("click", () => {
    getWeather(city.value);
  });
}
