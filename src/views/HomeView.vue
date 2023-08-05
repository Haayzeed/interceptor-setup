<template>
	<main>
		<form @submit.prevent="login()">
			<input type="text" placeholder="Email Address here" v-model="user.username" />
			<input type="password" placeholder="Password" v-model="user.password" />
			<button>Login</button>
		</form>
	</main>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const { userLogin } = useUserStore()
const { token } = storeToRefs(useUserStore())
const router = useRouter()

const user = ref({
	username: '',
	password: ''
})

const login = () => {
	userLogin({ username: user.value.username, password: user.value.password })
		.then((response) => {
			console.log(response)
			token.value = response.data.token
			console.log(token.value)
			router.push({ name: 'about' })
		})
		.catch((err) => {
			console.log(err.response)
		})
}
</script>
