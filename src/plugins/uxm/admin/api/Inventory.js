import axios from 'axios';

class Inventory {
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
            url: this.api_url + "/inventories/list",
            data: params
        })
    }

    updateItem(params={}) {
        return axios({
            method: 'post',
            headers: null,
            url: this.api_url + "/inventories/update_item",
            data: params
        })
    }

    csvToJson(params={},id){
        //  console.log(id);
         
        return axios({
            method: 'post',
            headers: null,
            url: this.api_url + "/inventories/csvtojson" + id ,
            data: params
        })
    }
    show(id) {
        return axios({
           method: 'get',
           headers: null,
           url: this.api_url + "/inventories/" + id
       })
    }
    sync(id){
        return axios({
            method: 'get',
            headers: null,
            url: this.api_url + "/inventories/sync/" +id
        })
    }
    sales(){
        return axios({
            method: 'get',
            headers: null,
            url: this.api_url + "/inventories/sales"
        })
     }

    //  store(data) {
    //     return axios({
    //         method: 'post',
    //         headers: null,
    //         url: this.api_url + "/asin",
    //         data: data
    //     })
    // }

     update(id, data) {
        //   console.log(id);
        return axios({
           method: 'put',
           headers: null,
           url: this.api_url + "/inventories/" + id,
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

export default Inventory