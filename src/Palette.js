import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';

import ColorBox from './ColorBox'
import NavBar from './NavBar'
import PaletteFooter from './PaletteFooter'
import styles from './styles/PaletteStyles'

class Palette extends Component {

    constructor(props){
        super(props)

        this.state = {
            level:500,
            format:"hex"
        }

        this.changeLevel = this.changeLevel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    changeLevel(level){
        this.setState({level})
    }

    handleChange(val){
        this.setState({format:val})
    }

    render() {

        let {colors,emoji,paletteName,id} = this.props.palette;
        let {level,format} = this.state;
        let {classes} = this.props;

        let colorBoxes = colors[level].map(color =>
            <ColorBox
            showFullPalette
            key={color.name} 
            background={color[format]} 
            name={color.name}
            moreUrl={`/palette/${id}/${color.id}`} 
            />)
        return (
            <div className={classes.Palette}>
                <NavBar 
                isActive
                level={level} 
                changeLevel={this.changeLevel}
                handleChange={this.handleChange}
                />                
                <div className={classes.Colors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(Palette);