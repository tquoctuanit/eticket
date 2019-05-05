import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedCategories: [],
      infoUser: [],
      access_token: '338c7505-371d-42da-8838-ac58fbdd1885'
    },
    mutations: {
      setCategories(state, categories) {
        state.loadedCategories = categories;
      },
      setUser(state, infoUser) {
        state.infoUser = infoUser;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get(
            'https://eticket-vhu.herokuapp.com/api/v1/eticket/get-categories'
          )
          .then(data => {
            vuexContext.commit('setCategories', data.data);
          })
          .catch(e => context.error(e));
      },
      setCategories(vuexContext, categories) {
        vuexContext.commit('setCategories', categories);
      },
      setUser(vuexContext, infoUser) {
        vuexContext.commit('setUser', infoUser);
      }
    },
    getters: {
      loadedCategories(state) {
        return state.loadedCategories;
      },
      loadedUser(state) {
        return state.infoUser;
      }
      // loaddedAccessToken(state) {
      //   return state.access_token;
      // }
    }
  });
};

export default createStore;
