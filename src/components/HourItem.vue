<template>
  <div :class="ClassName" :title="Title" :data-clickable="Clickable">
    <h2>{{ hour }}</h2>
  </div>
</template>

<script setup>
import { ref } from "vue"
const props = defineProps({
  hour: String,
  ClassName: String,
  Title: String,
  Clickable: Boolean,
});
</script>

<style scoped lang="scss">
@mixin lisItem {
  display: flex;
  // flex-direction: column;
  justify-content: center;
  // height: 4rem;
  padding: 1.5rem 0;


  h2 {
    color: white;
    margin: 0;
    font-size: 1.8rem;
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
    color: hsl(128, 0%, 30%);
    font-weight: 400
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
    text-decoration: line-through
  }
}

.partiallyAvailable {
  @include lisItem;
  cursor: default;

  h2 {
    color: hsl(0, 0%, 75%);
    // color: hsl(51, 69%, 58%);
  }
}

.active {
  @include lisItem;
  background-color: hsl(260, 40%, 75%);
  cursor: pointer;

  h1 {
    color: white;
  }
}
</style>
