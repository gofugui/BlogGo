export default{
  namespaced: true,
  state: {
    isActive: true,
  },
  mutations: {
    setAppState(state, isActive) {
      state.isActive = isActive;
    },
  },
};

