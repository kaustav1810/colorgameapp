import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {SortableElement} from 'react-sortable-hoc';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles/DraggableColorBoxStyles';

const DraggableColorBox = SortableElement((props) => {
	let {handleClick,name,background,classes} = props;
	return (
		<div className={classes.root} style={{ backgroundColor: background }}>
			<div className={classes.boxContent}>
				<span>{name}</span>
				<span>
					<DeleteIcon className={classes.deleteIcon} onClick={handleClick}/>
				</span>
			</div>
		</div>
	);
})

export default withStyles(styles)(DraggableColorBox);
