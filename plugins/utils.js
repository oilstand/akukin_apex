const formatDate = (date, format) => {
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    return format;
}

class API {
    constructor (axios) {
        this.axios = axios;
    }
    get API_ROOT() {
        return "https://api.holoechelon.com/api/";
    }

    async request(apiInterface, params = {}) {
        return await this.axios.get(
            this.API_ROOT + apiInterface, {
                params: params
            })
            .catch((e) => {
                console.log("catch request error");
                console.log(e);
                return false;
            });
    }

}
export default function ({ $axios }, inject) {
  const api = new API($axios);
  inject('api', api);
  inject('formatDate', formatDate);
}