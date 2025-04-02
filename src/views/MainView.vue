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
        const { data } = await axios.get('/api/recipe')

        if (this.doesDinnerExist(data)) {
          return await this.getRandomDinner()
        }

        if (this.foodDishes.length >= 10) this.foodDishes.shift()
        this.foodDishes.push(data)
        this.foodDish = data
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    doesDinnerExist(newDinner) {
      return this.foodDishes.some((oldDinner) => oldDinner.id === newDinner.id)
    },

    getOldDinner() {
      const index = this.foodDishes.findIndex((foodDish) => {
        return foodDish === this.foodDish
      })
      if (index <= 0) return
      this.foodDish = this.foodDishes[index - 1]
    },

    getNewDinner() {
      const index = this.foodDishes.findIndex((foodDish) => {
        return foodDish === this.foodDish
      })
      if (index >= this.foodDishes.length) return
      this.foodDish = this.foodDishes[index + 1]
    },
  },
  async mounted() {
    this.getRandomDinner()
  },
}
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center h-[60vh]" v-if="isLoading">
    <h1 class="text-4xl font-bold my-5">Henter middag :D</h1>
    <i class="pi pi-spin pi-spinner text-6xl"></i>
  </div>

  <div class="flex flex-col items-center text-center h-screen" v-if="!isLoading">
    <h1 class="text-4xl font-bold my-5">
      <!-- Make Some -->
      Lag
    </h1>

    <div class="flex flex-col items-center flex-grow max-h-[50vh] overflow-auto">
      <FoodCard :food-dish="foodDish" />
    </div>
    <div class="mt-4">
      <button
        @click="getOldDinner"
        class="text-white bg-gray-800 font-medium rounded-lg px-5 py-2.5 enabled:hover:bg-gray-700 enabled:hover:cursor-pointer disabled:opacity-75"
        :disabled="foodDish === foodDishes[0]"
      >
        <-
      </button>
      <button
        @click="getRandomDinner"
        class="text-white bg-gray-800 font-small rounded-lg mx-3 px-5 py-2.5 hover:bg-gray-700 hover:cursor-pointer"
      >
        <!-- Get Another Random Dinner -->
        Hent Annen Tilfeldig Middag
      </button>
      <button
        @click="getNewDinner"
        class="text-white bg-gray-800 font-medium rounded-lg px-5 py-2.5 enabled:hover:bg-gray-700 enabled:hover:cursor-pointer disabled:opacity-75"
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
