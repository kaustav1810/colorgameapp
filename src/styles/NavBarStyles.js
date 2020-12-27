/* eslint-disable import/no-anonymous-default-export */
import sizes from './sizes';

export default {
	NavBar: {
		display: 'flex',
		justifyContent: 'flex-start',
		height: '6vh',
		alignItems: 'center'
	},

	logo: {
		backgroundColor: '#eceff1',
		fontSize: '22px',
		textDecoration: 'none',
		height: '100%',
		display: 'flex',
		fontFamily: 'Roboto',
		alignItems: 'center',
		marginRight: '15px',
		padding: '0 13px',
		'& a': {
			textDecoration: 'none',
			color: 'black'
		},
		[sizes.down('xs')]:{
			display:'none'
		}
	},

	slider: {
		width: '340px',
		margin: '0 10px',
		display: 'inline-block',
		'& .rc-slider-track': {
			backgroundColor: 'transparent'
		},
		'&  .rc-slider-rail': {
			height: '8px'
		},

		'& .rc-slider-handle,.rc-slider-handle:active,.rc-slider-handle:focus,.rc-slider-handle:hover ': {
			backgroundColor: 'green',
			outline: 'none',
			border: '2px solid green',
			boxShadow: 'none',
			width: '13px',
			height: '13px',
			marginLeft: '-7px',
			marginTop: '-3px'
		},
		[sizes.down('sm')]:{
			width:'150px'
		}
	},

	selectContainer:{
		marginLeft: 'auto',
		marginRight: '12px',
	},
  
	sliderContainer:{
		display: 'flex',
		alignItems: 'center',
	}
};