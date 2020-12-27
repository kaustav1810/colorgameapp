import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { render } from 'react-dom';

import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles'

class miniPalette extends PureComponent {
	
	constructor(props){
		super(props);

		this.deletePalette = this.deletePalette.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	deletePalette(e){
		e.stopPropagation();
		this.props.handleDrawerOpen(this.props.id);
	}

	handleClick(){
		this.props.handleClick(this.props.id);
	}

	render(){
		const { classes, colors, emoji, paletteName } = this.props;
		const miniColors = colors.map((color) => (
			<div className={classes.miniColor} key={color.name} style={{ backgroundColor: color.color }} />
		));
	return (
		<div className={classes.root} onClick={this.handleClick}>
			<DeleteIcon className={classes.trashIcon}
			onClick={this.deletePalette} 
			style={{transition:'all 0.3s ease-in-out'}}/>
			<div className={classes.colors}>{miniColors}</div>
			<h5 className={classes.title}>
				{paletteName}
				<span className={classes.emoji}>{emoji}</span>
			</h5>
		</div>
	);
	}
}

export default withStyles(styles)(miniPalette);
