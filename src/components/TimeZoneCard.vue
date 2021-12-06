<template>
  <va-card :color="color" gradient>
    <va-hover class="time-zone-card" #default="{ hover }" stateful>
      <va-card-content>
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

        <va-button 
          class="time-zone-card__delete-button" 
          v-show="hover" icon="close" size="small" 
          color="danger"
          @click="$emit('delete')"
        />
      </va-card-content>
    </va-hover>
  </va-card>

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
    timezone: {
      type: Object, required: true
    },
    color: {
      type: String
    },
    ampm: {
      type: Boolean,
      default: false,
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

    const  formatDate = (date:Date) => {
      if (props.ampm == true) {
        return date.toLocaleTimeString('en-US')
      } else {
        return date.toLocaleTimeString('en-GB')
      }
    }

    const currentTime = ref(formatDate(getDateWithOffset()))

    useInterval(() => {
      currentTime.value = formatDate(getDateWithOffset())
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

  .time-zone-card {
    position: relative;
    &__delete-button {
      position: absolute;
      right: 16px;
      top: 16px;
    }
  }
</style>