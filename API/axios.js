import axios from 'axios'

const domain = 'http://amlak.softgatesdemo.com/api/'
    // const domain = 'http://offers.softgatesdemo.com/api/'

export const baseUrl = `${domain}`;
const axiosIns = axios.create({
    baseURL: domain,
})

export default axiosIns