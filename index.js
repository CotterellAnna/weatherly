$(function(){
    $("#input-form").submit(function(e){
        e.preventDefault()
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
                    $("#input-container").css("backgroundImage",`url(https://open.mapquestapi.com/staticmap/v4/getmap?key=UtdZoRly3u38HB9RSlLNJd2cAD82KsYK&size=600,400&zoom=13&center=${data.coord.lat},${data.coord.lon})`)
                    $("#city-el").html(city)
                }else{
                    alert("Place not found")
                }
            }
        })
    }
    weatherUpdate($("#city").val())
})