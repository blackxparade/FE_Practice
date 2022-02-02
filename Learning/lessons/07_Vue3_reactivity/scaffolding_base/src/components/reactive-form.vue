<template>
	<div>
        <h1 class="subtitle">Reactive form</h1>
        <form action="#" @submit.prevent="dataToConsole">
            <div class="columns">
                <div class="column">
                    <input 
                    class="input" 
                    type="text" 
                    v-model="formData.firstName"
                    name="firstname" 
                    id="firstname"
                    placeholder="First name">

                    <input 
                    class="input mt-5" 
                    type="text" 
                    v-model="formData.phoneNumber"
                    name="phonenumber" 
                    id="phonenumber"
                    placeholder="Phone number">
                </div>

                <div class="column">
                    <input 
                    class="input" 
                    type="text" 
                    v-model="formData.lastName"
                    name="lastname" 
                    id="lastname"
                    placeholder="Last name">
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <input 
                    class="input mt-2" 
                    type="email" 
                    v-model="formData.email"
                    name="email" 
                    id="email"
                    placeholder="Email">
                </div>

                <div class="column">
                    <input 
                    class="input mt-2" 
                    type="password" 
                    v-model="formData.password"
                    name="password" 
                    id="password"
                    placeholder="Password">
                </div>
            </div>
            <input type="submit" class="button mt-2" value="Submit">
        </form>
	</div>
</template>
<script lang="ts">

import { defineComponent, reactive } from 'vue';

export default defineComponent({
    setup() {
        const formData = reactive({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: ""
        });
        return {
            formData
        };
    },

    methods: {
        dataToConsole() {
            console.log(JSON.parse(JSON.stringify(this.formData)));
        }
    }
});
</script>
