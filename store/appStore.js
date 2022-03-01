export const state = () => ({
  lastUpdated: null,
})

export const mutations = {
  updateLastUpdated(state, date) {
    if(date && (!state.lastUpdated || state.lastUpdated < date)) {
      state.lastUpdated = date;
    } 
  },
}
