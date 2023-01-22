window.addEventListener('load', () => {
  let apiKey = '8ac9e8bcf73798cffd942d2479580693';
  let lon;
  let lat;

  let temperaturaValor = document.getElementById('temperaturaValor');
  let temperaturaDesc = document.getElementById('temperaturaDesc');

  let ubicacion = document.getElementById('ubicacion');
  let iconoAnimado = document.getElementById('iconoAnimado');

  let vientoVelocidad = document.getElementById('vientoVelocidad');

  let tempMin = document.getElementById('tempMin');
  let tempMax = document.getElementById('tempMax');

  let senTermica = document.getElementById('senTermica');

  let humedad = document.getElementById('humedad');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      /* console.log(posicion.coords.latitude, posicion.coords.longitude); */
      lon = posicion.coords.longitude;
      lat = posicion.coords.latitude;

      /* Ubicacion actual */
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

      /* Ubicacion por ciudad - &units=metric => convierte la temperatura a °C */
      /* const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric&lang=es`; */

      /* console.log(url); */

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let temp = Math.round(data.main.temp);
          temperaturaValor.textContent = `${temp} °C`;

          let desc = data.weather[0].description;
          temperaturaDesc.textContent = desc.toUpperCase();

          ubicacion.textContent = data.name;

          vientoVelocidad.textContent = `${data.wind.speed} m/s`;

          tempMin.textContent = `${data.main.temp_min} °C`
          tempMax.textContent = `${data.main.temp_max} °C`

          senTermica.textContent = `${data.main.feels_like} °C`
          
          humedad.textContent = `${data.main.humidity} %`

          console.log(data.main.humidity);

          /* Uso de iconos animados */
          switch (data.weather[0].main) {
            case 'Thunderstorm':
              iconoAnimado.src = 'animated/thunder.svg';
              console.log('TORMENTA');
              break;
            case 'Drizzle':
              iconoAnimado.src = 'animated/rainy-2.svg';
              console.log('LLOVIZNA');
              break;
            case 'Rain':
              iconoAnimado.src = 'animated/rainy-7.svg';
              console.log('LLUVIA');
              break;
            case 'Snow':
              iconoAnimado.src = 'animated/snowy-6.svg';
              console.log('NIEVE');
              break;
            case 'Clear':
              iconoAnimado.src = 'animated/day.svg';
              console.log('LIMPIO');
              break;
            case 'Atmosphere':
              iconoAnimado.src = 'animated/weather.svg';
              console.log('ATMOSFERA');
              break;
            case 'Clouds':
              iconoAnimado.src = 'animated/cloudy-day-1.svg';
              console.log('NUBES');
              break;
            default:
              iconoAnimado.src = 'animated/cloudy-day-1.svg';
              console.log('por defecto');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }
});
