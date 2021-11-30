<template>
  <div>
    <h3 class="display-2">
      {{ currentTime }}
    </h3>

    <va-divider />

    <div class="d-flex align--center justify--space-between">
      <span>
        {{ name }}
      </span>
      
      <p>
        <span class="title">Offset {{ offset / 60 }}h</span> 
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useInterval } from '../hooks/useInterval'

export default defineComponent({
  props: {
    name: {
      type: String, default: "Kyiv",
    },
    offset: {
      type: Number, default: 2 * 60
    }
  },
  
  setup(props) {
    const getDateWithOffset = () => {
      const now = new Date()

      now.setTime(now.getTime() + props.offset * 1000 * 60)

      return now
    }

    const currentTime = ref(getDateWithOffset().toLocaleTimeString())

    useInterval(() => {
      currentTime.value = getDateWithOffset().toLocaleTimeString()
    }, 1000)

    return {
      currentTime,
    }
  },
})
</script>

<style lang="scss" scoped>
  .title {
    text-align: left;
  }
</style>