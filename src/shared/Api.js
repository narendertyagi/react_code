import config from './ConfigClient'
import ApiClass from '../api'
export default new ApiClass(config.apiEndpoints, {host: config.host})