import axios from 'axios';

class Order {
	constructor(options = {}) {
		Object.assign(this, {
			api_host: null,
            api_endpoint: null,  
            headers : {},
        }, options);

        this.options = options
        this.api_url = options.api_host + options.api_endpoint
        this.api_urlp = options.api_host + options.api_endpoint + '/p'
    }
    

    list(params={}) {
        return axios({
            method: 'post',
            headers: null,
            url: this.api_url + "/orders/list",
            data: params
        })
    }

    syncOrder(id, params={}){
        return axios({
            method: 'post',
            hearders: null,
            url: this.api_url + "/order/sync_sale_account/" + id,
            data: params
        })
    }

    getOrder(id) {
        return axios({
           method: 'get',
           headers: null,
           url: this.api_url + "/order/" + id
       })
   }

   getOrderNotes(id) {
    return axios({
        method: 'get',
        headers: null,
        url: this.api_url + "/order/notes/" + id
    })
   }

    deleteOrderNote(id) {
        return axios({
            method: 'delete',
            headers: null,
            url: this.api_url + "/order/delete_order_note/" + id
        })
    }

    show(id) {
         return axios({
            method: 'get',
            headers: null,
            url: this.api_url + "/orders/" + id
        })
    }

    store(data) {
        return axios({
            method: 'post',
            headers: null,
            url: this.api_url + "/orders",
            data: data
        })
    }


    update(id, data) {
         return axios({
            method: 'put',
            headers: null,
            url: this.api_url + "/orders/" + id,
            data: data
        })
    }


    save(data, id = null) {
        // const dataJson = URI.parseQuery(data)
        if (id) {
            var ajaxObj = this.update(id, data)
        } else {
            var ajaxObj = this.store(data)
        }
        return ajaxObj;
    }
}

export default Order