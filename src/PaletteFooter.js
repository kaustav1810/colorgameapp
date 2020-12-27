import React from 'react';
import styles from './styles/PaletteFooterStyles'
import { withStyles } from '@material-ui/styles';

function PaletteFooter(props) {
    let {paletteName,emoji,classes} = props;
	return (
		<div className={classes.PaletteFooter}>
			{paletteName}
			<span className={classes.emoji}>{emoji}</span>
		</div>
	);
}

export default withStyles(styles)(PaletteFooter);
