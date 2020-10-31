import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import Backup from '@material-ui/icons/Backup';

import './styles.css'
import { Button } from '@material-ui/core';

const noop = () => {};

const CustomDialog = ({
	open = false,
	titile = 'Title',
	description = null,
	content = 'Content',
	disabled = false,
	classes = {},
	titileClasses = {},
	hasTitleDivider = true,
	showActionBtns = true,
	hasClose = false,
	onSubmit= noop,
	onClose = noop,
}) => {
	return (
		<Dialog
			open={open}
			classes={classes}
			onClose={onClose}
		>
			<DialogTitle
				classes={titileClasses}
			>
				<Typography variant='h5'>
					{titile} {hasClose && (<span className='close-btn mt-1' onClick={onClose}><CloseIcon /></span>)}
				</Typography>
				{description && (
					<Typography variant='body2' className='mt-2'>
						{description}
					</Typography>
				)}
			</DialogTitle>
			{hasTitleDivider && (
				<Divider className='mt-2 mb-2' />
			)}
			<DialogContent>
				{content}
			</DialogContent>
			{showActionBtns && (
				<>
				<Divider className='mt-5' />
				<DialogActions classes={{
					root: 'p-5'
				}}>
					<Button
						variant="contained"
						endIcon={<Backup />}
						disabled={disabled}
						onClick={onSubmit}
						classes={{
							root: disabled ? '' : 'submit-btn'
						}}
					>
						Submit
					</Button>
				</DialogActions>
				</>
			)}
		</Dialog>
	);
};

export default CustomDialog;