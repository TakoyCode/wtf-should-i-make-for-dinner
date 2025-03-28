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

    getDifficultyIcon(difficulty) {
      switch (difficulty) {
        case 'enkel':
          return ''
        case 'middels':
          return ''
        case 'vanskelig':
          return ''
        default:
          return ''
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
      <a :href="`https://www.matprat.no${randomFoodDish.linkUrl}`" target="_blank">
        <img
          class="rounded h-80"
          :src="`${randomFoodDish.imageUrl}-jumbotron/large`"
          :alt="randomFoodDish.imageAlt"
        />
      </a>
      <div class="mt-4 p-4 rounded border-4 border-gray-800">
        <h1 class="text-4xl text-center w-100 font-bold">
          {{ randomFoodDish.name }}
        </h1>
        <div>
          <i :class="`pi pi-gauge ${getDifficultyIcon}`"></i>
          <span class="mx-2">{{ randomFoodDish.difficulty }}</span>
        </div>
        <div>
          <i class="pi pi-user"></i>
          <span class="mx-1">{{ randomFoodDish.portions }}</span>
          <!-- <div>
            <i v-for="i in randomFoodDish.portions" class="pi pi-user mx-1"></i>
          </div> -->
        </div>
        <div>
          <i class="pi pi-clock"></i>
          <span class="mx-2">{{ randomFoodDish.preparationTime }}</span>
        </div>
        <div>
          <i v-for="i in randomFoodDish.rating" class="pi pi-star"></i>
          <span class="mx-1"> {{ randomFoodDish.ratingPrecise }}</span>
        </div>
        <div>
          <i class="pi pi-arrow-down mx-1"></i>
          <span>Ingrendienser</span>
        </div>
      </div>
      <button
        @click="getRandomDinner"
        class="text-white bg-gray-800 hover:bg-gray-700 hover:cursor-pointer font-medium rounded-lg mt-4 px-5 py-2.5"
      >
        Get Another Random Dinner
      </button>
    </div>
  </div>
</template>
