<template>
  <div class="app">
    <va-card>
      <va-card-content>
        <h1 class="display-2">{{ currentTime }}</h1>
        <va-divider />
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const currentTime = ref(new Date().toLocaleTimeString())

    setInterval(() => {
      currentTime.value = new Date().toLocaleTimeString()
    }, 1000)

    return {
      currentTime,
    }
  },
})
</script>


<!-- <script lang="ts">
export default {
  data() {
    return {
      currentTime: '',
    }
  },
  
  mounted() {
    setInterval(() => {
      this.currentTime = new Date().toTimeString()
    }, 1000)
  }
}
</script> -->

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100wh;
}
</style>
