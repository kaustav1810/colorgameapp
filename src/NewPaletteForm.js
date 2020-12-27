import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';

import arrayMove from 'array-move';
import classNames from 'classnames';

import ColorPickerForm from './ColorPickerForm';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';

import styles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';

class NewPaletteForm extends Component {
	static defaultProps = {
		maxColors: 20
	};
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			// newColorName: '',
			// newPaletteName: '',
			// currentColor: 'teal',
			colors: seedColors[0].colors
		};

		this.addNewColor = this.addNewColor.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeColor = this.removeColor.bind(this);
		this.clearPalette = this.clearPalette.bind(this);
		this.addRandomColor = this.addRandomColor.bind(this);
	}

	removeColor(color) {
		this.setState({
			colors: this.state.colors.filter(({ name }) => color !== name)
		});
	}
	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	addNewColor(newColor) {
		this.setState({ colors: [ ...this.state.colors, newColor ] });
	}

	clearPalette() {
		this.setState({ colors: [] });
	}

	addRandomColor(){
		let allColors = this.props.palettes.map(palette=> palette.colors).flat();
		let rand;
		let randomColor;
		let isDuplicateColor = true;

		while(isDuplicateColor){
			rand = Math.floor(Math.random()*allColors.length);
			randomColor = allColors[rand];

			isDuplicateColor = this.state.colors.some(
				color => color.name===randomColor.name);

		}

		this.setState({colors:[...this.state.colors,randomColor]})
	}
	handleSubmit(newPalette) {
		
		newPalette.id = newPalette.paletteName
		.toLowerCase().replace(/ /g, '-');

		newPalette.colors = this.state.colors;
		
		this.props.savePalette(newPalette);

		this.props.history.push('/');
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex)
		}));
	};
	render() {
		const { classes, palettes,maxColors } = this.props;
		const { open,colors } = this.state;
		let paletteFull = this.state.colors.length>=maxColors;
		return (
			<div className={classes.root}>
				<PaletteFormNav 
				open={open}
				palettes={palettes}
				classes={classes}
				handleSubmit={this.handleSubmit}
				handleDrawerOpen={this.handleDrawerOpen}
				/>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<div className={classes.container}>
					<Typography variant="h4" gutterBottom>Design your palette</Typography>
					<div className={classes.pickerBtns}>
						<Button variant="contained" color="secondary" onClick={this.clearPalette}>
							CLEAR PALETTE
						</Button>
						<Button variant="contained" 
						disabled={paletteFull}
						onClick={this.addRandomColor} color={paletteFull?'grey':'primary'}>
							RANDOM COLOR
						</Button>
					</div>
					<ColorPickerForm 
					colors={colors}
					paletteFull={paletteFull}
					addNewColor={this.addNewColor}
					/>
					</div>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={colors}
						removeColor={this.removeColor}
						axis="xy"
						distance={12}
						onSortEnd={this.onSortEnd}
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
