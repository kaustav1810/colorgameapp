import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/styles';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

class PaletteMetaForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stage: 'form',
			newPaletteName: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.showEmojiPicker = this.showEmojiPicker.bind(this);
		this.savePalette = this.savePalette.bind(this);
	}
	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
			return this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase());
		});
	}
	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	showEmojiPicker() {
		this.setState({ stage: 'emoji' });
	}

	savePalette(emoji) {
		let newPalette = {
			paletteName: this.state.newPaletteName,
			emoji: emoji.native
		};

		this.props.handleSubmit(newPalette);
		this.setState({ stage: '' });
	}
	render() {
		let { newPaletteName, stage } = this.state;
		let { handleSubmit } = this.props;
		return (
			<div>
				<Dialog open={stage === 'emoji'} onClose={this.handleClose}>
					<DialogTitle id="form-dialog-title">Pick your emoji</DialogTitle>
					<Picker title="Pick your emoji…" onSelect={this.savePalette} />
				</Dialog>
				<Dialog
					open={stage === 'form'}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
					onClose={this.props.formClose}
				>
					<DialogTitle id="form-dialog-title">SAVE</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContentText>Give a name for this palette.Make sure it's unique!</DialogContentText>
							<TextValidator
								name={'newPaletteName'}
								value={newPaletteName}
								margin="normal"
								fullWidth
								onChange={this.handleChange}
								validators={[ 'required', 'isPaletteNameUnique' ]}
								errorMessages={[ 'this field is required', 'name already taken' ]}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.props.formClose} color="primary">
								Cancel
							</Button>
							<Button variant="contained" color="primary" type="submit">
								SAVE PALETTE
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		);
	}
}
export default (PaletteMetaForm);
