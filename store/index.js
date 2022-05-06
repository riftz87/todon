export const state = () => ({
    activeTodo: null
});

export const mutations = {
    setActiveTodo(state, payload) {
        state.activeTodo = payload;
    }
}

export const getters = {
    activeTodo(state) {
        return state.activeTodo;
    }
}

export const actions = {
    setActiveTodo({ commit }, payload) {
        commit('setActiveTodo', payload);
    }
}