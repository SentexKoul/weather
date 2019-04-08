import Api from '@/api/Api.js'

const weatherApi = {
  userRegister (phone, code) {
    return Api.post('/apps/verni-nalog/obtain-token', {
      "request_type": "confirm-sms",
      "payload": {
        phone,
        code
      }
    })
  },
  userLogin (user, code) {
    return Api.post('/apps/verni-nalog/obtain-token', {
      "request_type": "confirm-sms",
      "payload": {
        user,
        code
      }
    })
  },
  recoverCode (user) {
    return Api.post('/apps/verni-nalog/obtain-token', {
      "request_type": "get-sms",
      "payload": {
        user
      }
    })
  },
  getWeather () {

  }
}

export default weatherApi