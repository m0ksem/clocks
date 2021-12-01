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
        <span class="title">Offset {{ timeZoneOffset / 60 }}h</span> 
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useInterval } from '../hooks/useInterval'
import { stringTimeZoneToNumber } from '../utils/stringTimeZoneToNumber'

export default defineComponent({
  props: {
    name: {
      type: String, default: "Kyiv",
    },
    offset: {
      type: Number, default: 2 * 60
    },
    timezone: {
      type: Object, required: true
    }
  },
  
  setup(props) {
    const userOffset = new Date().getTimezoneOffset()

    const timeZoneOffset = computed(() =>
      stringTimeZoneToNumber(props.timezone.utc) + userOffset
    )

    const getDateWithOffset = () => {
      const now = new Date()

      now.setTime(now.getTime() + timeZoneOffset.value * 1000 * 60)

      return now
    }

    const currentTime = ref(getDateWithOffset().toLocaleTimeString())

    useInterval(() => {
      currentTime.value = getDateWithOffset().toLocaleTimeString()
    }, 1000)

    return {
      currentTime,

      timeZoneOffset
    }
  },
})
</script>

<style lang="scss" scoped>
  .title {
    text-align: left;
  }
</style>