<template>
    <nav class="navbar">
        <h3>Online bank</h3>
        <ul class="navbar-menu">
            <li>
                <router-link to="/">Заявки</router-link>
            </li>
            <li>
                <router-link to="/help">Помощь</router-link>
            </li>
            <li>
                <router-link to="#">Сообщения</router-link>
            </li>
            <li>
                <router-link to="#" @click.prevent="logout">Выход</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
    export default {
        setup() {
            const router = useRouter
            const store = useStore
            return {
                logout: () => {
                    store.commit('auth/logout')
                    router.push('/auth')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>