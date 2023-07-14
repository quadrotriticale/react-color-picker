import React, { useState } from 'react'
import tinycolor from 'tinycolor2'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'


const ColorPicker = (props) => {

  const [currentColor, setcurrentColor] = useState('#7FFFD4');
  const [sliderValue, setSliderValue] = useState(100);

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const elementWidth = rect.width;
    const elementHeight = rect.height;

    const h = Math.round((360 * mouseX) / elementWidth);
    const l = Math.round((100 * mouseY) / elementHeight);
    const s = sliderValue;

    setcurrentColor(`hsl(${h}, ${s}%, ${l}%)`);
  }

  const handleClick = () => {
    props.addColor(currentColor);
  }

  const handleSliderChange = (value) => {
    setSliderValue(value);
    let color = tinycolor(currentColor).toHsl();
    color.s = value;
    color = tinycolor(color).toHslString();
    setcurrentColor(color);
  }

  return (
    <div className='colorPicker-wrapper'>
      <div 
        onMouseMove={handleMouseMove} 
        onClick={handleClick}
        style={{backgroundColor: currentColor}}
        className='colorPicker'>
        <p style={tinycolor(currentColor).isDark() ? {color:'#fff'} : {color:'var(--black)'}}>
          {tinycolor(currentColor).toHexString().toUpperCase()}
        </p>
      </div>
      <div className="slider-wrapper">
        <span title='Saturation'>SAT</span>
        <Slider 
          vertical 
          min={0} 
          max={100} 
          trackStyle={{ backgroundColor: 'var(--grey-darker)'}}
          handleStyle={{ borderColor: 'var(--black)'}}
          defaultValue={100}
          onChange={handleSliderChange}/>
      </div>
    </div>
  )
}

export default ColorPicker