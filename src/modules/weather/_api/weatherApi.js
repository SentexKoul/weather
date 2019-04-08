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
    return Api.get('/anonymous/feb1b31516f3e36a14b29657701f18d2/raw/ eaa544aed7e3bdee37c6caa2a515f1d4c38fbd4f/weather.json')
  }
}

export default weatherApi