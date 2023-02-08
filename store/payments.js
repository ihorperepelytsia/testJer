export const state = () => ({
  email: "",
  phone: "",
});

export const mutations = {
  setEmailPayments(state, payload) {
    state.email = payload;
  },
  setPhonePayments(state, payload) {
    state.phone = payload;
  },
  clearState(state) {
    state.phone = "";
    state.email = "";
  },
};
