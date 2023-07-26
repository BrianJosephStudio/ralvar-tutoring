<template>
  <div :class="ClassName" :title="Title">
    <h2>{{ hour }}</h2>
  </div>
</template>

<script setup>
import { ref } from "vue"
const props = defineProps({
  hour: String,
  ClassName: String,
  Title: String
});
</script>

<style scoped lang="scss">
@mixin lisItem {
  display: flex;
  flex-direction: column;
  place-content: center;
  height: 3vw;

  h2 {
    font-size: 1.5vw;
  }
}

.available {
  @include lisItem;
  cursor: pointer;

  // border-color: hsl(0, 0%, 90%);

  &:hover {
    background-color: hsl(0, 0%, 90%);
  }

  h2 {
    color: hsl(128, 50%, 45%);
  }
}

.unavailable {
  @include lisItem;

  // text-decoration: line-through;
  // text-decoration-color: hsl(0, 0%, 50%);
  // text-decoration-thickness: 1px;
  h2 {
    user-select: none;
    color: hsl(0, 0%, 75%);
  }
}

.partiallyAvailable {
  @include lisItem;

  h2 {
    color: hsl(51, 69%, 58%);
  }
}
</style>
