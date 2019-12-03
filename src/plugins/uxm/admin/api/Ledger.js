import axios from 'axios';

class Ledger {
	constructor(options = {}) {
		Object.assign(this, {
			api_host: null,
            api_endpoint: null,  
            headers : {},
        }, options);

        this.options = options
        this.api_url = options.api_host + options.api_endpoint
    }
    
    hello() {
		//console.log(this.options)
		return 'Hello'
	}

	list(params={}) {
        return axios({
            method: 'post',
            headers: null,
            url: this.api_url + '/ledgers/list',
            data: params
        })
    }

    getBalance(id) {
        return axios({
            method: 'get',
            headers: null,
            url: this.api_url + '/ledgers/get_balance/' + id
        })
    }


    show(id) {
         return axios({
            method: 'get',
            headers: null,
            url: this.api_url + "/ledgers/" + id
        })
    }
}

export default Ledger