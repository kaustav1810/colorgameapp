import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';

import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newColorName: '',
			currentColor: 'teal'
        };
        
		this.handleChange = this.handleChange.bind(this);
		this.changeCurrentColor = this.changeCurrentColor.bind(this);
		this.addNewColor = this.addNewColor.bind(this);

	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
			return this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
		});

		ValidatorForm.addValidationRule('isColorUnique', (value) => {
			return this.props.colors.every(({ color }) => color !== this.state.currentColor);
		});
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
    changeCurrentColor(color) {
		this.setState({ currentColor: color.hex });
    }
    
    addNewColor(){
		let newColor = { 
            color: this.state.currentColor, 
            name: this.state.newColorName
         };

        this.props.addNewColor(newColor);
    }
	render() {
		let { paletteFull,classes } = this.props;
        let {currentColor,newColorName} = this.state;
		return (
			<div className={classes.root}>
				<ChromePicker  className={classes.picker} color={currentColor} onChangeComplete={this.changeCurrentColor} />
				<ValidatorForm onSubmit={this.addNewColor} instantValidate={false}>
					<TextValidator
						variant='filled'
						margin='normal'
						placeholder='Color Name'
						className={classes.colorInput}
						name={'newColorName'}
						value={newColorName}
						onChange={this.handleChange}
						validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
						errorMessages={[ 'this field is required', 'Color name must be unique', 'Color already used' ]}
					/>
					<Button
						className={classes.addColor}
						variant="contained"
						disabled={paletteFull}
						type="submit"
						color="secondary"
						style={{ backgroundColor: currentColor }}
					>
						{paletteFull?'PALETTE FULL':'ADD COLOR'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}
export default withStyles(styles)(ColorPickerForm);
