async function getWeather(location) {
    try{
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units='+unit+'&appid='+api_key+'', {mode: 'cors'});
    const data = await response.json();
  
    return data;
    
    }
    catch(err){
        alert(error);
    }
    
}

async function getForecast(location) {
    try{
    const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&units='+unit+'&appid='+api_key+'', {mode: 'cors'});
    const data = await response.json();
  
    return data;
    
    }
    catch(err){
        alert(error);
    }
    
}
async function assignValue(){
    let data=await getWeather(location);
    let forecast=await getForecast(location);
    console.log(forecast);
    console.log(data);
    if ((data.cod)!=200){
        alert("City is not valid");
        return;
    }
    console.log(forecast);
    try{
        precipitation=((forecast.list[0].rain["3h"]*100)/10)+" cm";
    }
    catch{
        precipitation="0 cm";
        console.log("not present");
    }
    data=data;
    city=data.name;
    temp=data.main.temp+"°";
    highest=data.main.temp_max+"°";
    lowest=data.main.temp_min+"°";
    humidity=data.main.humidity+"%";
    feelsLike=data.main.feels_like+"°";
    pressure=data.main.pressure+"hPa";
    windSpeed=data.wind.speed+"4 km/hr";
    sunrise=convertTime(data.sys.sunrise);
    
    console.log(Sunrise);
    sunset=convertTime(data.sys.sunset);
    
    visibility=(data.visibility/1000)+"KM";
    condition=data.weather[0].main;

    Sunrise.innerHTML=sunrise;
    Sunset.innerHTML=sunset
    Temperature.innerHTML=temp;
    Condition.innerHTML=condition;
    wind.innerHTML=windSpeed;
    Pressure.innerHTML=pressure;
    Humidity.innerHTML=humidity;
    Precipitation.innerHTML=precipitation;
    Visibility.innerHTML=visibility;
    Highest.innerHTML="H: "+highest;
    Lowest.innerHTML="L: "+lowest;
    cityName.innerHTML=city;

    console.log(condition,visibility,city,temp,highest,lowest,windSpeed,sunrise);
    let children=parent.children;
    for(let i=0;i<16;i++){
        let newChild=children[i];
        newChild.innerHTML=names[i]+eval(variables[i]);
    }
    

}

function convertTime(unixTime){
    let dt = new Date(unixTime * 1000)
    let h = dt.getHours()
    let m = "0" + dt.getMinutes()
    let t = h + ":" + m.substr(-2);
    return t
}

let celsiusToggle=document.querySelector('#celsius');
celsiusToggle.addEventListener('click',changeCelsius);
let farenheitToggle=document.querySelector('#farenheit');
farenheitToggle.addEventListener('click',changeFarenheit);
let tempInfo=document.querySelector('#typetemp');
tempInfo.innerHTML="°C";
let cityName=document.querySelector('#city');


let location="kerala";
let unit="metric";
let api_key="479260f47102ee4e0cedf7a0022efdda";
let data=getWeather(location);

let city="";
let temp="0°";

let highest="0°";
let lowest="0°";
let humidity="0%";
let feelsLike="0°";
let windSpeed="0 km/hr";
let sunrise="5:01";
let sunset="17:55";

let pressure="0 hPa";
let visibility="1KM";
let condition="Cloudy";
let precipitation="0 cm"

let variables=["temp","feelsLike","highest","lowest","humidity","windSpeed","sunrise","sunset","pressure","visibility","condition","precipitation"];
let names=["Temperature: ","FeelsLike: ","Highest: ","Lowest: ","Humidity:  ","WindSpeed: ","Sunrise: ","Sunset: ","Pressure: ","Visibility: ","Condition: ","Precipitation: "];




let Sunrise=document.querySelector('#Sunrise');
Sunrise.innerHTML=sunrise;

let Sunset=document.querySelector('#Sunset');
Sunset.innerHTML=sunset;

let Temperature=document.querySelector('#temperature');
Temperature.innerHTML=temp;

let Condition=document.querySelector('#condition');
Condition.innerHTML=condition;

let wind=document.querySelector('#wind');
wind.innerHTML=windSpeed;

let Pressure=document.querySelector('#pressure');
Pressure.innerHTML=pressure;

let Humidity=document.querySelector('#humidity');
Humidity.innerHTML=humidity;

let Precipitation=document.querySelector('#precipitation');
Precipitation.innerHTML=precipitation;

let Visibility=document.querySelector('#visibility');
Visibility.innerHTML=visibility;

let Highest=document.querySelector('#highest');
Highest.innerHTML="H: "+highest;

let Lowest=document.querySelector('#lowest');
Lowest.innerHTML="L: "+lowest;

cityName.innerHTML=city;

assignValue();
let placeButton=document.querySelector('#placebutton');
placeButton.addEventListener('click',changePlace);


let parent=document.querySelector(".parent");
for(let i=0;i<16;i++){
    let newChild=document.createElement('div');
    newChild.innerHTML=names[i]+eval(variables[i]);
    parent.appendChild(newChild);
}


function changePlace(){
    console.log(1);
    location=document.querySelector('#place').value;
    assignValue();
}

function changeCelsius(){
    unit="metric";
    assignValue();
    celsiusToggle.style.border="5px solid red";
    farenheitToggle.style.border="2px solid black";
    tempInfo.innerHTML="°C";
    
}
function changeFarenheit(){
    unit="imperial";
   
    assignValue();
    farenheitToggle.style.border="5px solid red";
    celsiusToggle.style.border="2px solid black";
    tempInfo.innerHTML="°F";
   
}

