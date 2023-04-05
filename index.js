$(function(){
    let cityName = null;
    let lon = null;
    let lat = null;

    const successCallback = (position) => {
        lat = position.coords.latitude
        lon = position.coords.longitude

        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=cad7ec124945dcfff04e457e76760d90`)
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                cityName = data[0].name
                $("#city").val(cityName)
                weatherUpdate(cityName);
            })
            .catch(err=>{
                console.log("unable to get location", err)
            })
      };
      
    const errorCallback = (error) => {
        console.log(error);
        weatherUpdate($("#city").val())
    };
      
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    $("#input-form").submit(function(e){
        e.preventDefault()
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${$("#city").val()}&appid=cad7ec124945dcfff04e457e76760d90`)
            .then(res =>{
                return res.json()
            })
            .then(data =>{
                console.log(data);
                lat = data[0].lat;
                lon = data[0].lon;
            })
            .catch(err=>{
                console.log(err);
            })
        weatherUpdate($("#city").val())
    })
    function weatherUpdate(city){
        $.ajax({
            url:`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cad7ec124945dcfff04e457e76760d90&units=metric`,
            complete: function(res, status){
                
                if(status=="success"){
                    let data = res.responseJSON
                    $("#windspeed-el").html((data.wind.speed*3.6).toFixed(2)+`km/h`)
                    $("#temp-el").text(`${Math.round(data.main.temp)}°C`)
                    $("#humid-el").html(`${data.main.humidity}%`)
                    $("#pressure-el").text(`${data.main.pressure}hPa`)
                    $("#input-container").css("backgroundImage",`url(https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${lon},${lat},10,20/600x600?access_token=pk.eyJ1Ijoib2JhbGFyaSIsImEiOiJjbGZ4dnhnN3QwOWN3M3Byb3JkcDc3OHFoIn0.XrSTe4bSHLcIa09p1cowpA)`)

                    $("#city-el").html(city)
                }else{
                    alert("Place not found")
                }
            }
        })
    }
    // weatherUpdate($("#city").val())
})