import { api } from 'boot/axios'

export async function getAllLoans({ commit }) {
  const response = await api.get('/loans')

  commit('SET_ALL_LOANS', response.data)
}
