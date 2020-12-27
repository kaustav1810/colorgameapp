/* eslint-disable import/no-anonymous-default-export */
import sizes from './sizes';

export default {
	Palette: {
		height: '100vh',
		display: 'flex',
		flexDirection: 'column'
	},

	Colors: {
		height: '90%'
	},

	goBack: {
		backgroundColor: 'black',
		height: '50%',
		width: '20%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-3.5px',
		'& a': {
			color: 'white',
			width: '100px',
			height: '30px',
			position: 'absolute',
			display: 'inline-block',
			top: '50%',
			left: '50%',
			marginLeft: '-50px',
			marginTop: '-15px',
			textAlign: 'center',
			outline: 'none',
			background: 'rgba(255, 255, 255, 0.3)',
			fontSize: '1rem',
			lineHeight: '30px',
			textTransform: 'uppercase',
			border: 'none',
			textDecoration: 'none'
		},
		[sizes.down('lg')]: {
			height: '33.3333%',
			width: '25%'
		},
		[sizes.down('md')]: {
			height: '20%',
			width: '50%'
		},
		[sizes.down('xs')]: {
			width: '100%',
			height: '10%'
		}
	}
};
