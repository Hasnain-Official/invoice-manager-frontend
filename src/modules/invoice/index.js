import React from 'react';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CustomDialog from '../../shared/components/custom-dialog';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import { InvoiceService } from '../../services/';
import './styles.css';
import Typography from '@material-ui/core/Typography';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';

const defaultState = {
	openResult: false,
	fileProgress: 0,
	file: null,
	processedResult: {
		invoicesUploaded: 0,
		sumOfInvoicesAmount: 0,
		numberOfVendorsUploaded: 0,
		numberOfInvalidInvoices: 0,
	},
};

const Invoice = () => {
	const [state, setState] = React.useState(defaultState);
	const inputFileRef = React.useRef(null);

	const readFile = file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.onload = (evt) => {
				const data = new Uint8Array(evt.target.result);
				resolve(data);
			}
			reader.onerror = error => {
				reject(error);
			}
		});
	};

	const submitInvoice = async () => {
		const file = await readFile(state.file);
		const fileBase64 = btoa(String.fromCharCode.apply(null, file));

		const { data, error } = await InvoiceService.submitInvoice({ file: fileBase64 });
		if (error) {
			toast.error(error);
		} else {
			setState(prevState => ({
				...prevState,
				openResult: true,
				processedResult: {
					invoicesUploaded: data.total_invoices,
					sumOfInvoicesAmount: data.total_amount,
					numberOfVendorsUploaded: data.number_of_vendors,
					numberOfInvalidInvoices: data.number_of_invalid_invoices,
				},
			}))
		}
	};

	const renderContent = () => {
		return (
			<>
				<input
					accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					className='d-none'
					type="file"
					ref={inputFileRef}
					onChange={evt => {
						const file = evt.target.files[0];
						setState(prevState => ({
							...prevState,
							file,
						}));
					}}
					
      	/>
					<Button
						disabled={!!state.file}
						variant="contained"
						endIcon={<InsertDriveFile />}
						onClick={() => inputFileRef?.current?.click()}
						classes={{
							root: state.file ? '' : 'upload-btn'
						}}
					>
						Upload File
					</Button>
					{state.file?.name && (
						<div className='mt-3'>
							<Chip
								label={state.file.name}
								onDelete={() => {
									inputFileRef.current.value = null;
									setState(prevState => ({
										...prevState,
										file: null,
									}));
								}} 
								color="primary" 
								variant="outlined" 
							/>
						</div>
					)}
			</>
		)
	};

	const renderResultContent = data => {
		return (
			<div>
				<Typography variant='body2' className='mt-3 result-label'>
					<FiberManualRecord className='result-label-point mr-1' /> Number of invoices uploaded: <b className='ml-1'>{data.invoicesUploaded}</b>
				</Typography>
				<Typography variant='body2' className='mt-3 result-label'>
					<FiberManualRecord className='result-label-point mr-1' /> Total sum of invoice amounts: <b className='ml-1'>{data.sumOfInvoicesAmount}</b>
				</Typography>
				<Typography variant='body2' className='mt-3 result-label'>
					<FiberManualRecord className='result-label-point mr-1' /> Total number of vendors' invoices uploaded: <b className='ml-1'>{data.numberOfVendorsUploaded}</b>
				</Typography>
				<Typography variant='body2' className='mt-3 result-label'>
					<FiberManualRecord className='result-label-point mr-1' /> Total number of invalid invoices: <b className='ml-1'>{data.numberOfInvalidInvoices}</b>
				</Typography>
			</div>
		);
	};

	return (
		<>
			<CustomDialog
				classes={{
					paper: 'dialog-wrapper'
				}}
				open={true}
				disabled={!state.file}
				titile='Invoice Manager'
				description="A smart manager will establish a culture of gratitude. Expands the appreciative attitude to vendors and ofcourse customer."
				content={renderContent()}
				onSubmit={submitInvoice}
			/>
			<CustomDialog
				classes={{
					paper: 'result-dialog-wrapper'
				}}
				titileClasses={{
					root: 'result-dialog-title'
				}}
				hasTitleDivider={false}
				open={state.openResult}
				titile='Results'
				content={renderResultContent(state.processedResult)}
				showActionBtns={false}
				hasClose={true}
				onClose={() => {
					setState(prevState => ({
						...prevState,
						openResult: false,
					}))
				}}
			/>
		</>
	);
};

export default Invoice;