import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { request } from '../helper/axios';

export const useUserStore = defineStore('user', {
  state() {
    return {
      user: useStorage('user', []),
      token: useStorage('token', "")
    }
  },
  actions: {
    userLogin({username, password}) {
      const response = request.post('/auth/login', {username, password});
      return response;
    },

    getSingleUser() {
      const response = request.get('users');
      return response;
    },

    getProduct() {
      const response = request.get('products');
      return response;
    },

    logoutUser() {
      this.user = [];
      this.token = "";
    }
  },
})
