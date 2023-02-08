export const state = () => ({
    threeElemObj: {
        active: false,
        idx: 0,
        content: {
            elements: [
                {
                    title: '',
                    text: ''
                }
            ]
        }
    }
  })
  
  export const mutations = {
    activate(state) {
        state.threeElemObj.active = true
    },
    deactivate(state) {
        state.threeElemObj.active = false
    },
    addContent(state, payload) {
        state.threeElemObj.content = payload
    },
    changeIdx(state, payload) {
        state.threeElemObj.idx = payload
    },
  }