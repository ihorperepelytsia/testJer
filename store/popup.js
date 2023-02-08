export const state = () => ({
  active: false,
  idxPopupTariff: 0,
})

export const mutations = {
  activate(state, idx) {
      state.active = true;
      state.idxPopupTariff = idx;
  },
  deactivate(state) {
      state.active = false
  },
}