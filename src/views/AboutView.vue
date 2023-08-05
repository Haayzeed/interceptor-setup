<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="logout">Logout</button>
    <table>
      <tr>
        <th>S/N</th>
        <th>Title</th>
        <th>Category</th>
        <th>Description</th>
        <th>Price</th>
        <th>Image</th>
      </tr>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product?.title }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
        <td><img :src="product.image" width="100" height="100" alt=""></td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const { getSingleUser, logoutUser, getProduct } = useUserStore();
const router = useRouter();

const products = ref([]);

const logout = () => {
  logoutUser()
  router.push('/');
}

onBeforeMount(() => {
  getSingleUser().then((response) => {
    console.log(response)
  });

  getProduct().then((response) => {
    console.log(response)
    products.value = response.data;
    console.log(products.value);
  });




  const token = localStorage.getItem("token");
  console.log("token", token);
})
</script>

<style>
table, table tr, table tr th, table tr td {
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
}
</style>

