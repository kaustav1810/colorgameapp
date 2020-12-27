import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

import ColorBox from './ColorBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles'

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);

		this.state = {
			format: 'hex'
		};
		this._shades = this.getShades(this.props.palette, this.props.color);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(val) {
		this.setState({ format: val });
	}

	getShades(palette, filterColor) {
		let shades = [];

		for (let key in palette.colors) {
			shades = shades.concat(palette.colors[key].filter((item) => item.id === filterColor));
		}

		return shades.slice(1);
	}
	render() {
		let { format } = this.state;
		let { classes } = this.props;
		let { paletteName, emoji, id } = this.props.palette;
		let colorBoxes = this._shades.map((shade) => (
			<ColorBox key={shade.name} name={shade.name} background={shade[format]} showFullPalette={false} />
		));
		return (
			<div className={classes.Palette}>
				<NavBar handleChange={this.handleChange} isActive={false} />
				<div className={classes.Colors}>
					{colorBoxes}
					<div className={classes.goBack}>
						<Link to={`/palette/${id}`} className={classes.backButton}>
							Go back
						</Link>
					</div>
				</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}
export default withStyles(styles)(SingleColorPalette);
