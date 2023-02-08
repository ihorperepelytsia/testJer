export const state = () => ({
    package: {
        active: false,
        idx: 0,
        content: {
            elements: [
                {
                    title: 'dadad',
                    text: '',
                    price: ''
                }
            ]
        }
    }
  })
  
  export const mutations = {
    activate(state) {
        state.package.active = true
    },
    deactivate(state) {
        state.package.active = false
    },
    addContent(state, payload) {
        state.package.content.elements = payload
    },
    changeIdx(state, payload) {
        state.package.idx = payload
    },
  }