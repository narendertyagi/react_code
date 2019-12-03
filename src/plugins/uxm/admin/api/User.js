import axios from 'axios';

class User {
	constructor(options = {}) {
		Object.assign(this, {
			api_host: null,
            api_endpoint: null,  
            headers : {},
        }, options);

        this.options = options
        this.api_url = options.api_host + options.api_endpoint
        //console.log(this.api_url)
    }

    list(params={}) {
        return axios({
            method: 'post',
            headers: null,
            url: this.api_url + "/users/list",
            data: params
        })
    }
    
    getUser(userId) {
        return axios({
            method: 'get',
            headers: null,
            url: this.api_url + "/user/" + userId,
        })
    }

    updateUser(body,userId) {
        return axios({
            method: 'put',
            headers: null,
            url: this.api_url + "/user/" + userId,
            data: body
        })
    }
    
	register(params={}) {
        return axios({
            method: 'post',
            headers: null,
            url: this.api_url + '/register_seller',
            data: params
        })
    }

    invite(data) {
         return axios({
            method: 'post',
            headers: null,
            url: this.api_url + "/register_seller_byinvite",
            data: data
        })
    }

    getInviteeDetail(userId) {
        return axios({
            method: 'get',
            headers: null,
            url: this.api_url + "/invitee/" + userId,
        })
    }

    removeMe(data) {
        return axios({
           method: 'post',
           headers: null,
           url: this.api_url + "/remove_me",
           data: data
       })
    }

    
    meUpdate(data) {
         return axios({
            method: 'put',
            // headers: null,
            url: this.api_url + '/me',
            data: data
        })
    }


    listChilds(params={}) {
        return axios({
            method: 'post',
            headers: null,
            url: this.api_url + '/users/list_childs',
            data: params
        })
    }

    
}

export default User