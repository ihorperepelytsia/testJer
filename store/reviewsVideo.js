export const state = () => ({
  active: false,
  videoId: null
})

export const mutations = {
  activate(state, id) {
      state.active = true;
      state.videoId = id;
  },
  deactivate(state) {
      state.active = false
  },
}