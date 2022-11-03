import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {
  WeatherData:any;
  my_city = 'Toronto';
  cities: any;
  listofcities = [""];
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void{
    this.WeatherData = JSON.parse('{"coord":{"lon":0,"lat":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":287.82,"feels_like":286.39,"temp_min":284.92,"temp_max":290.97,"pressure":1021,"humidity":0},"visibility":10000,"wind":{"speed":3.09,"deg":130},"clouds":{"all":75},"dt":1651775949,"sys":{"type":1,"id":718,"country":"","sunrise":1651745064,"sunset":1651796654},"timezone":-14400,"id":6167865,"name":"Enter a City","cod":200}');
    this.httpClient.get("https://portfolio-2580nav-default-rtdb.firebaseio.com/cities.json").subscribe(cities => {
    this.cities = cities;

    for (const k in this.cities){
        this.listofcities.push(this.cities[k].city.toUpperCase())
    }
    });
  
  }
  setWeatherData(data:{}){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
  }
  getCity(city_name:string){
    this.my_city = city_name;
  }
  find_weather(){

    //make the api call to get weather data
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+this.my_city+'&appid=ef19d684ffd5d7fa6d5f85172fd44340')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})



    //store city in database
    let alreadysearched = false;

    for (let i =0; i<this.listofcities.length;i++){
      if (this.listofcities[i].toUpperCase() === this.my_city.toUpperCase()){
          alreadysearched = true;
      }
    }
    if (alreadysearched === false){
    this.httpClient.post("https://portfolio-2580nav-default-rtdb.firebaseio.com/cities.json", 
    {"city":this.my_city.toUpperCase()})
    .subscribe(response => {this.listofcities.push(this.my_city.toUpperCase())});
    }
  }
}


