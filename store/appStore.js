export const state = () => ({
  lastUpdated: null,
  currentBackgroundAnimation: 0,
})

export const mutations = {
  updateLastUpdated(state, date) {
    if(date && (!state.lastUpdated || state.lastUpdated < date)) {
      state.lastUpdated = date;
    } 
  },
  setCurrentBackgroundAnimation(state, value) {
    state.currentBackgroundAnimation = value;
  },
}
