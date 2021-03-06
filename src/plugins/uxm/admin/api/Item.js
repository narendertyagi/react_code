import axios from 'axios';

class Item {
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
            url: this.api_url + "/item/list",
            data: params
        })
    }

    show(id) {
         return axios({
            method: 'get',
            headers: null,
            url: this.api_url + "/item/" + id
        })
    }

    updateItem(params={}) {
        return axios({
            method: 'post',
            headers: null,
            url: this.api_url + "/item/update_item",
            data: params
        })
    }
    
    remove(id){
        return axios({
            method: 'delete',
            headers: null,
            url: this.api_url + "/item/delete_item/" + id,
        })
    }

    store(data) {
        return axios({
            method: 'post',
            headers: null,
            url: this.api_url + "/item",
            data: data
        })
    }


    update(id, data) {
         return axios({
            method: 'put',
            headers: null,
            url: this.api_url + "/item/" + id,
            data: data
        })
    }

    sync(params={}){
        return axios({
            method: 'post',
            headers: null,
            url: this.api_url + "/item/sync",
            data: params
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

export default Item