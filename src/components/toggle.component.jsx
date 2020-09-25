import React from 'react'

const Toggle = props => {
    return(
        <div className='custom-control custom-switch'>
        <input 
          onClick = {props.changetemp}
          type='checkbox'
          className='custom-control-input'
          id='customSwitches'
          readOnly
        />
        <label className='custom-control-label' htmlFor='customSwitches'>
          Check in Celcius
        </label>
      </div>
    );
};

export default Toggle;