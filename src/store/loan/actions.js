import { api } from 'boot/axios'

export async function getAllLoans({ commit }) {
  const response = await api.get('/loans')

  commit('SET_ALL_LOANS', response.data)
}

export async function createLoan({ commit }, payload) {
  await api.post('/loans', payload)
}

export async function updateLoan({ commit }, { id, payload }) {
  await api.patch(`/loans/${id}`, payload)
}
