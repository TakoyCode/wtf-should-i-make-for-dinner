<script>
export default {
  props: {
    foodDish: Object,
  },
  methods: {
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
}
</script>

<template>
  <div class="bg-white">
    <a :href="`https://www.matprat.no${foodDish.linkUrl}`" target="_blank">
      <img
        class="rounded-t h-65"
        :src="`${foodDish.imageUrl}-jumbotron/large`"
        :alt="foodDish.imageAlt"
      />
    </a>
    <div class="flex-col justify-items-center p-4 rounded-b border-4 border-gray-800">
      <h1 class="text-3xl text-center w-100 font-bold">
        {{ foodDish.name }}
      </h1>

      <div class="my-1">
        <i
          v-for="i in 5"
          :class="`text-yellow-600 pi ${i <= foodDish.ratingPrecise ? 'pi-star-fill' : 'pi-star'}`"
        >
        </i>

        <span class="mx-1"> {{ foodDish.ratingPrecise }}</span>
      </div>

      <div class="flex">
        <div>
          <i :class="`pi pi-gauge ${getDifficultyIcon}`"></i>
          <span class="mx-2">{{ foodDish.difficulty }}</span>
        </div>

        <div>
          <i class="pi pi-clock"></i>
          <span class="mx-2">{{ foodDish.preparationTime }}</span>
        </div>
      </div>

      <div class="flex">
        <div>
          <i class="pi pi-shopping-cart"></i>
          <span class="mx-1"> {{ foodDish.ingredients.length }} ingredienser</span>
        </div>

        <div>
          <i class="pi pi-user"></i>
          <span class="mx-1"
            >{{ foodDish.portions }} porsjon{{ foodDish.portions <= 1 ? '' : 'er' }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
