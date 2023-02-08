// https://www.youtube.com/watch?v=uV-vsXRu8WY&ab_channel=Denis

import Vue from 'vue'
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {required, email, min, regex} from 'vee-validate/dist/rules'
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

extend('required', {
    ...required,
    message: 'Поле обязательно для заполнения'
})

extend('email', {
    ...email,
    message: 'Почта введена не верно'
})

extend('min', {
    ...min,
    message: 'Минимальная длина {length} символа'
})

extend('regex', {
    ...regex,
    message: 'Номер телефона введен не верно'
})