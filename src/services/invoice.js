import axios from 'axios';
import config from '../config';

const submitInvoice = async (payload) => {
	try {
		const { data } = await axios.post(`${config.apiBaseUrl}/invoice`, { ...payload });
		return {
			data: data.data || null,
			error: data.error || null,
		}
	} catch (err) {
		return {
			error: 'Something went wrong, please contact to administrator.',
		}
	}
};

export default {
  submitInvoice
}