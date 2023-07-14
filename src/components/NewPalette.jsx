import React, { useEffect, useState } from 'react'
import tinycolor from 'tinycolor2'

const NewPalette = (props) => {

    const [justSaved, setJustSaved] = useState(false);
    const [justCopied, setJustCopied] = useState(false);

    const removeColor = (index) => {
        const newColors = props.colors.filter((c, idx) => idx != index)
        props.updateColors(newColors);
    }

    const copyToClipboard = (index) => {
        setJustCopied(true);
        navigator.clipboard.writeText(props.colors[index]);
    }

    const savePalette = () => {
        setJustSaved(true);
        props.savePalette();
    }

    useEffect(() => {
        if (justSaved) {
            const interval = setInterval(() => {
                setJustSaved(false);
            }, 1200);
        
            return () => clearInterval(interval);
        }
    }, [justSaved])

    useEffect(() => {
        if (justCopied) {
            const interval = setInterval(() => {
                setJustCopied(false);
            }, 1200);
        
            return () => clearInterval(interval);
        }
    }, [justCopied])

    return (
        <div className='newPalette'>
            <h1>New Palette</h1>
            <div className="colors">
                {
                    props.colors.map((color, index) => {
                        return <div
                            key={index}
                            className='color'
                            style={{ backgroundColor: color, color: tinycolor(color).isDark() ? '#fff' : 'var(--black)'}}>
                            <span>#{tinycolor(color).toHex().toUpperCase()}</span>
                            <div className="buttons">
                                <button onClick={() => removeColor(index)} className='btn-icon' title="Remove Color">
                                    <span style={{color: tinycolor(color).isDark() ? '#fff' : 'var(--black)'}} className="material-symbols-outlined">cancel</span>
                                </button>
                                <button onClick={() => copyToClipboard(index)} className='btn-icon' title='Copy to clipboard'>
                                    <span style={{color: tinycolor(color).isDark() ? '#fff' : 'var(--black)'}} className="material-symbols-outlined">content_copy</span>
                                </button>
                            </div>
                        </div>
                    })
                }
                {
                    props.colors.length > 0 && (
                        <div className='buttons-text'>
                            <button onClick={savePalette} className='btn'>
                                <span className="material-symbols-outlined">save</span>
                                <span>Save Palette</span>
                            </button>
                            <span className={justSaved || justCopied ? 'text-shown' : 'text-hidden'}>
                                {justSaved && 'SAVED!'}
                                {justCopied && 'COPIED!'}
                            </span>
                            {/* <span className={justCopied ? 'text-shown' : 'text-hidden'}>COPIED!</span> */}
                        </div>
                    )
                }
            </div>
        </div>
    )
}


export default NewPalette