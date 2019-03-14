const alertDanger = document.querySelector(".alert-danger");

document.getElementById("submiteWeather").addEventListener("click", getWeather);
document.querySelector(".close").addEventListener("click", function(e) {
  e.preventDefault();
  alertDanger.classList.remove("d-block");
  alertDanger.classList.add("d-none");
});

function getWeather(e) {
  e.preventDefault();

  const inputVal = document.getElementById("city").value;
  const apiKey = "1d35ffec5ac88d4247bbf4246529ec04";

  const xhr = new XMLHttpRequest();

  if (inputVal != "") {
    xhr.open("GET",`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=metric&APPID=${apiKey}`,true);

    xhr.onload = function() {
      if (this.status === 200) {
        alertDanger.classList.remove("d-block");
        alertDanger.classList.add("d-none");

        const weather = JSON.parse(this.responseText);
        let output = ``;

        output = `
                <img src="http://themenectar.com/docs/salient/wp-content/uploads/2016/10/basicloader.gif">
                <p class="text-primary">Molimo pricekajte,trazena informacija u obradi...</p>
                `;

        document.querySelector(".show").innerHTML = output;

        output = `
                <h3 class="text-center text-primary" style="font-size:40px;font-weight:bold">Trenutne vremenske prilike za ${weather.name}, ${weather.sys.country}</h3>
                <ul class="list-unstyled output text-center text-primary py-2 rounded" style="margin-top:20px;border:2px solid #428bca;font-size:1.5rem;">
                    <li>Vreme: <strong>${weather.weather[0].main}</strong></li>
                    <li>Opis: <img src='http://openweathermap.org/img/w/${weather.weather[0].icon}.png'>:<strong>${weather.weather[0].description}</strong></li>
                    <li>Temperatura: <strong>${weather.main.temp} &deg;C</strong></li>
                    <li>Pritisak: <strong>${weather.main.pressure}hPa</strong></li>
                    <li>Vlaznost: <strong>${weather.main.humidity} %</strong></li>
                    <li>Min. Temperatura: <strong>${weather.main.temp_min} &deg;C</strong></li>
                    <li>Max. Temperatura: <strong>${weather.main.temp_max} &deg;C</strong></li>
                    <li>Brzina vetra: <strong>${weather.wind.speed} m/s</strong></li>
                    <li>Pravac vetra: <strong>${weather.wind.deg} &deg;</strong></li>
                </ul>
                `;

        setTimeout(function() {
          document.querySelector(".show").innerHTML = output;
        }, 2000);
      } else if (this.status === 404) {
        alertDanger.innerText = 'Nema podataka za trazeni grad';
        alertDanger.classList.remove("d-none");
        alertDanger.classList.add("d-block");
        document.querySelector(".show").innerHTML = ``;
        
        setTimeout(function(){
          alertDanger.classList.remove('d-block');
          alertDanger.classList.add("d-none");
        },3000);
      }
    };

    xhr.send();
  } else {
    alertDanger.classList.remove("d-none");
    alertDanger.classList.add("d-block");
    document.querySelector(".show").innerHTML = ``;
    
    setTimeout(function(){
      alertDanger.classList.remove('d-block');
      alertDanger.classList.add("d-none");
    },3000);
  }
}