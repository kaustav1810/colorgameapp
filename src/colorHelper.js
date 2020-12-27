
import chroma, { rgb } from 'chroma-js';

let levels = [50,100,200,300,400,500,600,700,800,900];

function generatePalette(oldPalette){

    let newPalette = {...oldPalette,colors:{}}

    for(let level of levels){
        newPalette.colors[level] = [];
    }

    for(let color of oldPalette.colors){
        let scales = getScale(color.color,10).reverse()

        for(let i in scales){
            
           newPalette.colors[levels[i]].push(
               {
                   name: `${color.name} ${levels[i]}`,
                   id: color.name.toLowerCase().replace(/ /g,"-"),
                   hex: scales[i],
                   rgb: chroma(scales[i]).css(),
                   rgba: chroma(scales[i]).css()
                            .replace("rgb","rgba")
                            .replace(")",",1)")
               }
           )
        }
    }

    return newPalette;
}

function getScale(hexColor,numColors){
    return chroma
    .scale(getRange(hexColor))
    .mode('lab')
    .colors(numColors)
}

function getRange(hexColor){
    return[
        chroma(hexColor)
        .darken(1.4)
        .hex(),
        hexColor,
        "#fff"
    ]
}

export {generatePalette}