import {computed, watch} from 'vue'
import * as yup from 'yup'
import {useField, useForm, configure} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {

    const store = useStore()
    const router = useRouter()
    const PASSWORD_MIN_LENGTH = 6
    const isTooManyAttempts = computed(() => submitCount.value >= 3)

    configure({
      validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
      validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
      validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
      validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
    })

    const {handleSubmit, isSubmitting, submitCount} = useForm()

    const onSubmit = handleSubmit(async values => {
      //try {
        console.log("Form data: ", values, store)
        await store.dispatch('auth/login', values)
        router.push('/')
      //} catch(e) {
      //}
      
    })

    watch(isTooManyAttempts, val => {
      if(val) {
        setTimeout(() => submitCount.value = 0, 2000)
      }
    })

    const {value: email, errorMassage: eError, handleBlur: emailBlur} = useField(
      'email',
      yup
        .string()
        .trim()
        .required('Указать email')
        .email('Ввести правильный email')
      )

    const {value: password, errorMassage: pError, handleBlur: passwordBlur} = useField(
      'password',
      yup
        .string()
        .trim()
        .required('Введите пароль')
        .min(PASSWORD_MIN_LENGTH, `Длина пароля от ${PASSWORD_MIN_LENGTH} символов`)
      )
      
    return {
      email, eError, emailBlur,
      password, pError, passwordBlur,
      onSubmit, isSubmitting, isTooManyAttempts
    }
}