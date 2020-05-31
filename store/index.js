const data = require('@/http/data.json')
import timeoutPromise from '@/http/mockData'

export const state = () => ({
    items: [],
    item: null,
    loading: false
})

export const getters = {
    getItems: state => state.items,
    getCurrentItem: state => state.item
}

export const mutations = {
    SET_ITEMS(state, data) {
        state.items = data
    },
    SET_ITEM(state, data) {
        state.item = data
    },
    UPDATE_ITEM(state, data) {
        const current = state.items.findIndex(item => item.id === data.id)
        state.items[current] = data
    },
    DELETE_ITEM(state, id) {
        const current = state.items.findIndex(item => item.id === id)
        state.items.splice(current, 1)
    },
    ADD_ITEM(state, data) {
        state.items.push(data)
    },
    SET_LOADING(state, status) {
        state.loading = status
    }
}

export const actions = {
    async getItems ({ commit }) {
        commit('SET_LOADING', true)
        try {
            const response = await timeoutPromise(2000, data)
  
            if (response.status === 200) {
                commit('SET_ITEMS', response.data)
                commit('SET_LOADING', false)
                return response
            }
        } catch (error) {
            console.log(`status: ${error.status}, message: ${error.message}`)
        }
    },
    async getItem ({ commit }, id) {
        commit('SET_LOADING', true)
        try {
            const response = await timeoutPromise(500, data)
  
            if (response.status === 200) {
                const item = response.data.find(item => item.id === parseInt(id))
                commit('SET_ITEM', item)
                commit('SET_LOADING', false)
                return item
            }
        } catch (error) {
            console.log(`status: ${error.status}, message: ${error.message}`)
        }
    },
}