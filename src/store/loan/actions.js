import { api } from 'boot/axios'

export async function getAllLoans({ commit }) {
  const response = await api.get('/loans')

  commit('SET_ALL_LOANS', response.data)
}

export async function createLoan({ commit }, payload) {
  const response = await api.post('/loans', payload)
}
