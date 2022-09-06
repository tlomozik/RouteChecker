import axios from 'axios';

export default axios.create({
  baseURL: 'https://www.googleapis.com/geolocation/v1/geolocate',
});
