import axios from 'axios';


export default axios.create({
	baseURL: 'https://history.muffinlabs.com/date',
	crossdomain: true
});