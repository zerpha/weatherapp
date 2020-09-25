import React from 'react';
import './App.css';

import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './components/weather.component';
import Form from './components/form.component'
import Head from './components/head.component'
import Toggle from './components/toggle.component';

const API_key ="887bd16f039b21c69183f3d11de690c5";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      temperature: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
      color: '#ffcce6',
      fahrFlag: true
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calFahrenheit(temp){
    let fahr = Math.round(((temp - 273.15) * 1.8) + 32);
    return fahr;
  }

  changeTemp = async(e) =>{
    this.fahrFlag = !this.fahrFlag;
    this.fahrFlag ? 
      this.setState({
        temperature: Math.round((this.state.temperature -32) * (5/9)),
        temp_max: Math.round((this.state.temp_max -32) * (5/9)),
        temp_min: Math.round((this.state.temp_min -32) * (5/9)),
      })
      :
      this.setState({
        temperature: Math.round((this.state.temperature * 1.8) + 32),
        temp_max: Math.round((this.state.temp_max * 1.8) + 32),
        temp_min: Math.round((this.state.temp_min * 1.8) + 32),
      })
  }

  // The weather icon are taken from the weatherAPI
  // and is based on the id of the weather 
  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        this.setState({ color: '#ffffcc'});
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        this.setState({ color: '#ccffff'});
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        this.setState({ color: '#ccd9ff'});
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        this.setState({ color: '#ccccff'});
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        this.setState({ color: '#ffcccc'});
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        this.setState({ color: '#ccffcc'});
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        this.setState({ color: '#ccffe6'});
        break;
      default:
        this.setState({ icon: icons.Clouds });
        this.setState({ color: '#ffcce6'});
    }
  }

  // async to have changes reactively
  getWeather = async (e) => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;


      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

      const response = await api_call.json();
      console.log(response)

      if (country && city && response.cod !== "404") {

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        temperature: this.calFahrenheit(response.main.temp),
        temp_max: this.calFahrenheit(response.main.temp_max),
        temp_min: this.calFahrenheit(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      // setting icons
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
      document.body.style.background = "white";

      console.log(response);
    } else {
      this.setState({
        error: true
      });
    }
  };


  render(){
    const background_type = {
      background: this.state.color
    };
    return(
      <div style = {background_type} className="App">
        <Head />
        <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather city = {this.state.city} country = {this.state.country} 
        temperature = {this.state.temperature} temp_max = {this.state.temp_max}
        temp_min = {this.state.temp_min} description= {this.state.description}
        weatherIcon = {this.state.icon} fahrflag = {this.state.fahrFlag}/>
        <Toggle changetemp = {this.changeTemp}/>
      </div>
    )
  }
}

export default App;
