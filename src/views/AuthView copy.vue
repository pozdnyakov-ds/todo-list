<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти</h1>

    <div :class="['form-control', {invalid: emailError}]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="emailBlur">
      <small v-if="emailError">{{ emailError}}</small>
      <div>Error: {{emailError}} </div>
    </div>

    <div :class="['form-control', {invalid: passwordError}]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="passwordBlur">
      <small v-if="passwordError">{{ passwordError}}</small>
    </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
    <div class="text-danger" v-if="isTooManyAttempts">Слишком много попыток входа</div>

  </form>
</template>

<script>
import {computed, watch} from 'vue'
import * as yup from 'yup'
import {useField, useForm, configure} from 'vee-validate'
import { values } from 'lodash'

export default {
  setup() {
    const PASSWORD_MIN_LENGTH = 6
    const isTooManyAttempts = computed(() => submitCount.value >= 3)

    configure({
      validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
      validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
      validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
      validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
    })

    const {handleSubmit, isSubmitting, submitCount} = useForm()

    const onSubmit = handleSubmit(values => {
        console.log("Form data: ", values)
    })

    watch(isTooManyAttempts, val => {
      if(val) {
        setTimeout(() => submitCount.value = 0, 2000)
      }
    })

    const {value: email, errorMassage: emailError, handleBlur: emailBlur} = useField(
      'email',

      )

    const {value: password, errorMassage: passwordError, handleBlur: passwordBlur} = useField(
      'password',
      yup
        .string()
        .trim()
        .required('Введите пароль')
        .min(PASSWORD_MIN_LENGTH, `Длина пароля от ${PASSWORD_MIN_LENGTH} символов`)
      )
      
    return {
      email, emailError, emailBlur,
      password, passwordError, passwordBlur,
      onSubmit, isSubmitting, isTooManyAttempts
    }
  }

}

</script>

<style>

</style>
