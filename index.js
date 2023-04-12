$(function(){
    let cityName = null;
    let map_img = null;

    const successCallback = (position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=cad7ec124945dcfff04e457e76760d90`)
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                cityName = data[0].name
                $("#city").val(cityName)
                weatherUpdate(cityName, lon, lat);
            })
            .catch(err=>{
                console.log("unable to get location", err)
            })
      };
      
    const errorCallback = (error) => {
        console.log(error);
        weatherUpdate("Port Harcourt", lon, lat)
    };
      
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    $("#input-form").submit(function(e){
        e.preventDefault()
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${$("#city").val()}&appid=cad7ec124945dcfff04e457e76760d90`)
            .then(res =>{
                return res.json()
            })
            .then(data =>{
                let lat = data[0].lat;
                let lon = data[0].lon;
                weatherUpdate($("#city").val(), lon, lat)
            })
            .catch(err=>{
                console.log(err);
            })
    })
    function weatherUpdate(city, lon, lat){

        map_img = `https://maps.googleapis.com/maps/api/staticmap?&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyAkHBgs_vIe6266YOqSoyWLqmDbJNlVHPc&center=${lat},${lon}`

        $.ajax({
            url:`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cad7ec124945dcfff04e457e76760d90&units=metric`,
            complete: function(res, status){
                
                if(status=="success"){
                    let data = res.responseJSON
                    $("#windspeed-el").html((data.wind.speed*3.6).toFixed(2)+`km/h`)
                    $("#temp-el").text(`${Math.round(data.main.temp)}°C`)
                    $("#humid-el").html(`${data.main.humidity}%`)
                    $("#pressure-el").text(`${data.main.pressure}hPa`)
                    $("#input-container").css("backgroundImage",`url(${map_img})`)
                    $("#city-el").html(city)
                }else{
                    alert("Place not found")
                }
            }
        })
    }
    // weatherUpdate($("#city").val())
})