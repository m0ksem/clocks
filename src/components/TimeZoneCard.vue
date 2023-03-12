<template>
  <va-card class="time-zone-card" :color="color" gradient @click="doShowCalculateModal=true">
    <va-hover #default="{ hover }" stateful>
      <va-card-content>
        <h3 class="va-h2">
          {{ formatDate(nowDateWithOffset, ampm) }}
        </h3>

        <va-divider :style="`--va-divider-border-top-color: ${dividerColor}`"/>

        <div class="d-flex align--center justify--space-between">
          <span>
            {{ name }}
          </span>

          <!-- <p>
            <span class="title">Offset {{ timeZoneOffset / 60 }}h</span>
          </p> -->
        </div>

        <va-button
          class="time-zone-card__delete-button"
          v-show="hover"
          icon="cancel"
          color="danger"
          preset="secondary"
          @click="$emit('delete')"
        />

        <va-button
          class="time-zone-card__calculate-button"
          v-show="hover"
          icon="schedule"
          preset="secondary"
          color="info"
          @click="doShowCalculateModal=true"
        />

        <CalculateTimeZoneModal v-model="doShowCalculateModal" :offset="timeZoneOffset" :ampm="ampm"></CalculateTimeZoneModal>
      </va-card-content>
    </va-hover>
  </va-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { addHoursOffset } from '../utils/addHoursOffset'
import { formatDate } from '../utils/formatDate'
import { useNowDate } from '../hooks/useNowDate'
import type { TimeZone } from '@vvo/tzdb'
import CalculateTimeZoneModal from "./CalculateTimeZoneModal.vue";
import { useColors } from "vuestic-ui";

export default defineComponent({
  components: {
    CalculateTimeZoneModal,
  },

  props: {
    name: {
      type: String,
      default: "Unknown",
    },

    timezone: {
      type: Object as PropType<TimeZone>,
      required: true,
    },

    color: {
      type: String,
      required: true
    },

    ampm: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const doShowCalculateModal = ref(false);

    const userOffset = new Date().getTimezoneOffset();

    const timeZoneOffset = computed(
      () => props.timezone.currentTimeOffsetInMinutes + userOffset
    );

    const { now: nowDate } = useNowDate();

    const nowDateWithOffset = computed(() => addHoursOffset(nowDate.value, timeZoneOffset.value))

    const { getTextColor, getColor } = useColors()
    const dividerColor = computed(() => getColor(getTextColor(props.color)))

    return {
      nowDateWithOffset,
      dividerColor,

      timeZoneOffset,

      doShowCalculateModal,

      formatDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  text-align: left;
}

.time-zone-card {
  position: relative;
  cursor: pointer;
  &__delete-button {
    position: absolute;
    right: 8px;
    top: 8px;
  }
  &__calculate-button {
    position: absolute;
    right: 54px;
    top: 8px;
  }
}
</style>