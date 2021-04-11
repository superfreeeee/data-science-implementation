
const setting = {
    state: {
        settingVisible: false,
        settingList: {}
    },
    mutations: {
        set_settingVisible: function (state, data) {
            state.settingVisible = data
        },
        set_settingList: function (state, data) {
            state.set_settingList = data
        }
    },
    actions:{
    }
}

export default setting
