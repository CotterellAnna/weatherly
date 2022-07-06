let windspeedEl = document.getElementById("windspeed-el")
let tempEl = document.getElementById("temp-el")
let humidEl = document.getElementById("humid-el")
let pressureEl = document.getElementById("pressure-el")
let city = document.getElementById("city")
let input = document.getElementById("input-form")
let inputContainer = document.getElementById("input-container")

input.onsubmit = (e) => {
    e.preventDefault()
    weatherUpdate(city.value)
}

function weatherUpdate(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cad7ec124945dcfff04e457e76760d90&units=metric`)
    .then(res => {
        if (res.status === 404){
            alert("Place not found")
            return 0
        }else if (res.status === 200){
            return (res.json())
        }
    })
    .then(response =>{
        windspeedEl.textContent = `${response.wind.speed}KT`
        tempEl.textContent = `${Math.round(response.main.temp)}°C`
        humidEl.innerHTML = `${response.main.humidity}G.m<sup>-3</sup>`
        pressureEl.textContent = `${response.main.pressure}Pa`
        inputContainer.style.backgroundImage=`url(https://open.mapquestapi.com/staticmap/v4/getmap?key=UtdZoRly3u38HB9RSlLNJd2cAD82KsYK&size=600,400&zoom=13&center=${response.coord.lat},${response.coord.lon})`

    })
}

weatherUpdate(city.value)