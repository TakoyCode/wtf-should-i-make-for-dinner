<script>
import axios from 'axios'
import FoodCard from '@/components/FoodCard.vue'

export default {
  data() {
    return {
      foodDishes: [],
      foodDish: {},
      isLoading: true,
    }
  },
  components: {
    FoodCard,
  },
  methods: {
    async getRandomDinner() {
      try {
        const response = await axios.get('/api/recipe')
        this.foodDishes.push(response.data)
        this.foodDish = response.data
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    getOldDinner() {
      const index = this.foodDishes.findIndex((foodDish) => {
        foodDish === this.foodDish
      })
      console.log(index)
    },

    getNewDinner() {},
  },
  async mounted() {
    this.getRandomDinner()
  },
}
</script>

<template>
  <i class="pi pi-spin pi-spinner" v-if="isLoading"></i>

  <div class="flex flex-col items-center text-center h-screen" v-if="!isLoading">
    <h1 class="text-4xl font-bold my-5">Make Some</h1>

    <div class="flex flex-col items-center flex-grow max-h-[50vh] overflow-auto">
      <FoodCard :food-dish="foodDish" />
    </div>
    <div class="mt-4">
      <button
        @click="getOldDinner"
        class="text-white bg-gray-800 font-medium rounded-lg px-5 py-2.5 hover:bg-gray-700 hover:cursor-pointer"
        :disabled="foodDish === foodDishes[0]"
      >
        <-
      </button>
      <button
        @click="getRandomDinner"
        class="text-white bg-gray-800 font-small rounded-lg mx-3 px-5 py-2.5 hover:bg-gray-700 hover:cursor-pointer"
      >
        Get Another Random Dinner
      </button>
      <button
        @click="getNewDinner"
        :class="`text-white bg-gray-800 font-medium rounded-lg px-5 py-2.5 hover:bg-gray-700 hover:cursor-pointer`"
        :disabled="foodDish === foodDishes[foodDishes.length - 1]"
      >
        ->
      </button>
    </div>
  </div>
</template>

<style>
body {
  background-color: oklch(0.938 0.127 124.321);
}
</style>
