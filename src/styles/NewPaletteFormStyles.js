import { DRAWER_WIDTH } from '../constants';
import sizes from './sizes';

const drawerWidth = DRAWER_WIDTH;

export default (theme) => ({
	root: {
		display: 'flex'
	},

	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '90%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	pickerBtns: {
		width: '100%',
		'& button': {
			width: '50%'
		}
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		height:'100vh'
	},
	drawerPaper: {
		width: drawerWidth,
		display: 'flex',
		alignItems: 'center'
	},
	drawerHeader: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	content: {
		height: 'calc(100vh - 64px)',
		flexGrow: 1,
		padding: 0,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	}
});
