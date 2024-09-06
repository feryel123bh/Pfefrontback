<template>
  <div class="rating">
    <span
      v-for="star in 5"
      :key="star"
      :class="{'star-filled': star <= value, 'star-empty': star > value}"
      class="star"
      @click="setRating(star)">
      ★
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    setRating(star) {
      this.$emit('input', star);
    },
  },
};
</script>

<style scoped>
.rating {
  display: flex;
}

.star {
  cursor: pointer;
  font-size: 24px;
  color: #ccc;
}

.star-filled {
  color: #f39c12;
}

.star-empty {
  color: #ccc;
}

.star:hover,
.star:hover ~ .star {
  color: #f39c12;
}
</style>
