<script>
import axios from 'axios'

export default {
  data() {
    return {
      foodName: 'Taco',
      randomFoodDish: {},
    }
  },
  methods: {},
  async mounted() {
    console.log(this.foodName)
    try {
      const response = await axios.get(
        // 'http://www.matprat.no//api/WeeklyMenuPlanner/GetRandomRecipe',
        'https://pirate.monkeyness.com/api/insult',
      )
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  },
}
</script>

<template>
  <h1 class="text-3xl font-bold">Make Some</h1>
  <h1 class="text-3xl font-bold">{{ foodName }}</h1>
  <button class="">Get Random Dinner</button>
</template>
