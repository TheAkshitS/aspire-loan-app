import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const api = axios.create({
  baseURL: 'https://loan-json-server.herokuapp.com',
  'Content-Type': 'application/json',
})

Vue.prototype.$api = api

export { axios, api }
