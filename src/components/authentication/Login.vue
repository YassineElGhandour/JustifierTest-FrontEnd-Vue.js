<template>
	<v-layout>
		<v-flex xs6 offset-xs3>
			<panel title="Login">
				<form
					name="tabe-tracker-form"
					autocomplete="off">

					<v-text-field
						label="Email"
						v-model="email"
					>
					</v-text-field>

					<v-text-field
						label="Password"
						type="password"
						v-model="password"
						autocomplete="new-password"
					>
					</v-text-field>

					<div class="error" v-html="error"/>

					<v-btn
						class="blue-grey lighten-4
						"
						@click="login">
							Login
					</v-btn>

				</form>
			</panel>	
		</v-flex>
	</v-layout>
</template>

<script>
	import AuthenticationService from '@/services/AuthenticationService'

	export default {
		data() {
			return {
				email: '',
				password: '',
				error : null
			}
		},
		methods: {
			async login() {
				try
				{
					const response = await AuthenticationService.login({
						email : this.email,
						password : this.password
					})
					this.$store.dispatch('setToken', response.data.token)
					this.$store.dispatch('setUser', response.data.user)
					this.$router.push('justify')
				}
				catch(error){
					this.error = error.response.data.error
				}
			}
		}
	}
</script>

<style scoped>
	.error{
		color: red;
	}
</style>