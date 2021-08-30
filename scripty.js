let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}
//weather icon url: http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png

function success(pos){
    let crd = pos.coords
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&units=imperial`)
        .then(res => res.json())
        .then(data => {
            let t = Math.floor(data.main.temp)
            const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
            <div id = "temp">
                <img src = ${weatherIcon}>
                <p>${t}F<p>
            </div>
            <p id = "loc">${data.name}</p>
            `

        })
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
}
navigator.geolocation.getCurrentPosition(success, error, options)



function getTime() {
    let date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}
setInterval(getTime, 1000)


//fetch("https://api.unsplash.com/photos/random?orientation=landscape&query=nature")
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=dogs")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("creator").textContent = `Photo by ${data.user.name}`
    })
    .catch(err => {
        console.log("Something when wrong with the background image fetch")
        document.body.style.backgroundColor = `hsla(180, 50%, 60%, .7)`
        document.body.style.backgroundImage = `url(defaultBg.jpg)`
        document.getElementById("creator").textContent = `Unable to retrieve photo -
        Default image by Photo by Charles Deluvio
        `
    })

fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=GME%2CCACI", 
{
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
		"x-rapidapi-key": "4ba1226458msh89911bffb21e0d3p11b5f7jsn6644c14b6d5b"
	}
})
    .then(res => res.json())
    .then(data => {
        let quote1 = data.quoteResponse.result[0].ask
        let quote2 = data.quoteResponse.result[1].ask
        document.getElementById("crypto-name").innerHTML = `
        <p>$${quote1}<p>
        <p>${data.quoteResponse.result[0].beta}</p>
        <p>${data.quoteResponse.result[0].longName}</p>
        `
        document.getElementById("crypto-data").innerHTML = `
        <p>Current: $${data.market_data.current_price.usd}</p>
        <p>24h ⬆️: $${data.market_data.high_24h.usd}</p> 
        <p>24h ⬇️: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => {
        console.log("Something wet wrong with retrieving the crypto data")
        document.getElementById("crypto").textContent = `$1 = 1USD`
    })

