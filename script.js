const key="919f08106f0d9040325bd822c1858189";
const baseUrl="https://api.openweathermap.org/data/2.5/";
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

let place= document.getElementById('location');
let date= document.getElementById('date');
let temp= document.getElementById('temp');
let desc= document.getElementById('desc');
let minmax= document.getElementById('low-high'); 
//let icon=document.getElementById('image');
const search=document.getElementById('searchbar');
const button=document.getElementById('locationbtn');
let icon=document.querySelector('.icon');
weatherLocation();

search.addEventListener('keypress',setQuery);
function setQuery(event)
{
    if(event.key==="Enter")
    {
        getWeather(search.value);
        search.value='';
    }
}
function getWeather(city)
{
    fetch(`${baseUrl}weather?q=${city}&units=metric&APPID=${key}`)
    .then(weather=>{return weather.json();})
    .then(showWeather);
}
function showWeather(weather)
{
    console.log(weather);
    search.value='';
    place.innerText=`${weather.name},${weather.sys.country}`;
    let time= new Date();
    date.innerText=dateBuild(time);
    
    let id=weather.weather[0].id;
    let bodybg=document.getElementsByTagName('body')[0];
   
    if(id == 800){
        icon.innerHTML=`<img src="icons/clear.svg" alt="" id="image"></img>`;
        bodybg.style.backgroundImage="url('background/sunny.jpg')";
    }else if(id >= 200 && id <= 232){
        icon.innerHTML=`<img src="icons/storm.svg" alt="" id="image"></img>`;
        bodybg.style.backgroundImage="url('background/thunderstorm.jpg')";
    }else if(id >= 600 && id <= 622){
        icon.innerHTML=`<img src="icons/snow.svg" alt="" id="image"></img>`;
        bodybg.style.backgroundImage="url('background/snow.jpg')";
    }else if(id >= 701 && id <= 781){
        icon.innerHTML=`<img src="icons/haze.svg" alt="" id="image"></img>`;
        bodybg.style.backgroundImage="url('background/smoke.jpg')";
    }else if(id >= 801 && id <= 804){
        icon.innerHTML=`<img src="icons/cloud.svg" alt="" id="image"></img>`;
        bodybg.style.backgroundImage="url('background/cloud.jpg')";
    }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
        icon.innerHTML=`<img src="icons/rain.svg" alt="" id="image"></img>`;
        bodybg.style.backgroundImage="url('background/rain.jpg')";
    }

    temp.innerHTML=`${Math.floor(weather.main.temp)}<sup>o</sup> C`;
    desc.innerText=weather.weather[0].description;
    minmax.innerHTML=`${Math.floor(weather.main.temp_min)}<sup>o</sup> C / ${Math.floor(weather.main.temp_max)}<sup>o</sup> C`;
}
function dateBuild(d)
{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day=days[d.getDay()];
  let currentdate=d.getDate();
  let month=months[d.getMonth()];
  let year=d.getFullYear();
  return `${day} ${currentdate} ${month} ${year}`;
}


button.addEventListener("click", weatherLocation);
function weatherLocation()
{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else
    {
        alert("Your browser not support geolocation api");
    }
    
}
function onSuccess(position){
    const {latitude, longitude} = position.coords;
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${key}`;
    fetch(api)
    .then(weather=>{return weather.json();})
    .then(showWeather);
}
function onError(error){
    alert(error);
}