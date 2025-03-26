<script>
import axios from 'axios'

export default {
  data() {
    return {
      randomFoodDish: {},
      isLoading: true,
    }
  },
  methods: {
    async getRandomDinner() {
      try {
        const response = await axios.get('/api/recipe')
        this.randomFoodDish = response.data
        console.log(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
  async mounted() {
    this.getRandomDinner()
  },
}
</script>

<template>
  <div class="container mx-auto" v-if="!isLoading">
    <div class="flex flex-col items-center">
      <h1 class="text-4xl font-bold my-5">Make Some</h1>
      <img
        class="rounded h-75"
        :src="`${randomFoodDish.imageUrl}-jumbotron/large`"
        :alt="randomFoodDish.imageAlt"
      />
      <a
        :href="`https://www.matprat.no${randomFoodDish.linkUrl}`"
        target="_blank"
        class="text-4xl font-bold mt-4 p-4 rounded border-4 border-gray-800 hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-300"
        >{{ randomFoodDish.name }}</a
      >
      <button
        @click="getRandomDinner"
        class="text-white bg-gray-800 hover:bg-gray-700 hover:cursor-pointer font-medium rounded-lg mt-4 px-5 py-2.5"
      >
        Get Another Random Dinner
      </button>
    </div>
  </div>
</template>
