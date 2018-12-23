import axios from 'axios';


export default axios.create({
	baseURL: `${'https://cors-anywhere.herokuapp.com/'}https://history.muffinlabs.com/date`
});