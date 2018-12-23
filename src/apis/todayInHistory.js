import axios from 'axios';


export default axios.create({
	baseURL: 'https://history.muffinlabs.com/date',
	withCredentials: false,
	'Access-Control-Allow-Origin': '*'
});