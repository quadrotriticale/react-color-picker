import React, {useEffect, useState} from 'react'
import tinycolor from 'tinycolor2'

const SavedPalettes = () => {

  const [palettes, setPalettes] = useState([]);
  const [justCopied, setJustCopied] = useState([]);

  const deletePalette = (id) => {
    const newPalettes = palettes.filter(palette => palette.id != id);
    setPalettes(newPalettes);
    localStorage.removeItem('palettes');
    localStorage.setItem('palettes', JSON.stringify(newPalettes));
  }

  const copyToClipboard = (id, index) => {
    const newJustCopied = palettes.map(palette => {
      return palette.id == id ? true : false;
    });
    setJustCopied(newJustCopied);
    for (let i = 0; i < palettes.length; i++) {
      const pal = palettes[i]
      if (pal.id == id) {
        navigator.clipboard.writeText(pal.colors[index]);
        return;
      }
    }
  }

  useEffect(() => {
    if (justCopied) {
        const interval = setInterval(() => {
            setJustCopied(justCopied.map(palette => false));
        }, 1200);
    
        return () => clearInterval(interval);
    }
  }, [justCopied])

  useEffect(() => {
    const storage = localStorage.getItem('palettes');
    if (storage) {
      const strings = JSON.parse(storage);
      let palettes = [];

      if (Array.isArray(strings)) {
        palettes = strings.map((string) => ({
          id: string.id,
          colors: string.colors,
        }));
      } else {
        palettes.push(strings);
      }

      setPalettes(palettes);

    }
  }, [])

  return (
    <div>
      <h1>Saved Color Palettes</h1>
      {
        palettes.length >= 1 ? (
          <div className="palettes">
            {
              palettes.map((palette, index) => {
                return (
                <Palette 
                  id={palette.id} 
                  colors={palette.colors} 
                  deletePalette={deletePalette} 
                  copyToClipboard={copyToClipboard}
                  justCopied={justCopied[index]}
                  key={palette.id} />)
              })
            }
          </div>
        ) : (
          <div className='empty'>
            <span className="material-symbols-outlined">sentiment_dissatisfied</span>
            <p>There's nothing here!</p>
          </div>
        )
      }
      
    </div>
  )
}

const Palette = (props) => {
  return (
    <div className='colors'>
      {
        props.colors.map((color, index) => {
          return <div
            key={index}
            className='color'
            style={{ backgroundColor: color, color: tinycolor(color).isDark() ? '#fff' : 'var(--black)'}}>
            <span>#{tinycolor(color).toHex().toUpperCase()}</span>
            <div className="buttons">
                <button onClick={() => props.copyToClipboard(props.id,index)} className='btn-icon' title='Copy to clipboard'>
                    <span style={{color: tinycolor(color).isDark() ? '#fff' : 'var(--black)'}} className="material-symbols-outlined">content_copy</span>
                </button>
            </div>
        </div>
        })
      }
      <div className='buttons-text'>
        <button onClick={() => props.deletePalette(props.id)} className='btn'>
            <span className="material-symbols-outlined">delete</span>
            <span>Delete Palette</span>
        </button>
        <span className={props.justCopied ? 'text-shown' : 'text-hidden'}>COPIED!</span>
      </div>
    </div>
  )
}

export default SavedPalettes