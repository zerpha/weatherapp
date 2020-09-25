import React from 'react';
import "./weather.style.css";

// uses basic bootstrap to format 
const Weather = props => {
    return (
        <div className = "container">
            <div className="cards pt-4">
                <h1>
                    {props.city}
                </h1>
                <h5 className="py-4">
                    <i className = {`wi ${props.weatherIcon} display-3`}></i>
                </h5>

                {props.temperature !== undefined ? (
                    <h1 className="py-2">{props.temperature}&deg;</h1>) : null}

                {minmaxTemp(props.temp_min, props.temp_max, props.changetemp)}

                <h4 className="py-3 text-capitalize">{props.description}</h4>
            </div>
        </div>
    );
};

function minmaxTemp(min, max, tempflag) {
    if (max !== undefined && min !== undefined) {
      return (
        <h3>
          <span className="px-4">{min}&deg;</span>
          <span className="px-4">{max}&deg;</span>
        </h3>
      );
    }
  }


export default Weather;