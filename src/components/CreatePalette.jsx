import React, { useState } from 'react'
import tinycolor from 'tinycolor2'
import ColorPicker from './ColorPicker'
import NewPalette from './NewPalette'

const CreatePalette = () => {

  const [colors, setColors] = useState([]);

  const addColor = (color) => {
    let c = tinycolor(color);
    c = c.toHexString();
    setColors([...colors, c]);
  }

  const updateColors = (colors) => {
    setColors(colors);
  }

  const savePalette = () => {
    const storage = localStorage.getItem('palettes');
    const id = Date.now();
    const newPalette = {
      id,
      colors
    }
    if (storage) {
      const parsedStorage = JSON.parse(storage)
      const newPalettes = [...parsedStorage, newPalette];
      localStorage.setItem('palettes', JSON.stringify(newPalettes));
    }
    else {
      const arr = [];
      arr.push(newPalette); 
      localStorage.setItem('palettes', JSON.stringify(arr));
    }
  }

  return (
    <div className='createPalette-wrapper'>
      <header className='createPalette-header'>
        <h1>Colorpicker</h1>
        <p className='text-row'>
          <span className='text-v-center'><span className="material-symbols-outlined">width</span>HUE</span>
          <span className='text-v-center'><span className="material-symbols-outlined">height</span>LIGHTNESS</span>
        </p>
        <span>Click to select color</span>
      </header>
      <ColorPicker addColor={addColor} />
      <NewPalette colors={colors} updateColors={updateColors} savePalette={savePalette} />
    </div>
  )
}

export default CreatePalette