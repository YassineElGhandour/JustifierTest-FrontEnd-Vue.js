
import Api from '@/services/Api'

export default {

	postjustify (credentials) {
		/*var obj = {
			"output" : credentials
		};*/
		return Api().post('justify', credentials)
	}

}