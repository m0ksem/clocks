<template>
  <va-card :color="color" gradient @dblclick="doShowCalculateModal=true">
    <va-hover class="time-zone-card" #default="{ hover }" stateful>
      <va-card-content>
        <h3 class="display-2">
          {{ formatDate(nowDateWithOffset, ampm) }}
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
          v-show="hover"
          icon="cancel"
          flat
          color="danger"
          @click="$emit('delete')"
        />

        <va-button
          class="time-zone-card__calculate-button"
          flat
          v-show="hover"
          icon="schedule"
          color="info"
          @click="doShowCalculateModal=true"
        />

        <CalculateTimeZoneModal v-model="doShowCalculateModal" :offset="timeZoneOffset" :ampm="ampm"></CalculateTimeZoneModal>
      </va-card-content>
    </va-hover>
  </va-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { stringTimeZoneToNumber } from "../utils/stringTimeZoneToNumber";
import { addHoursOffset } from '../utils/addHoursOffset'
import { formatDate } from '../utils/formatDate'
import { useNowDate } from '../hooks/useNowDate'
import CalculateTimeZoneModal from "./CalculateTimeZoneModal.vue";

export default defineComponent({
  components: {
    CalculateTimeZoneModal,
  },

  props: {
    name: {
      type: String,
      default: "Kyiv",
    },
    timezone: {
      type: Object,
      required: true,
    },
    color: {
      type: String,
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
      () => stringTimeZoneToNumber(props.timezone.utc) + userOffset
    );

    const getDateWithOffset = () => {
      return addHoursOffset(new Date(), timeZoneOffset.value)
    };

    const { now: nowDate } = useNowDate()

    const nowDateWithOffset = computed(() => addHoursOffset(nowDate.value, timeZoneOffset.value))

    return {
      nowDateWithOffset,

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
  &__delete-button {
    position: absolute;
    right: 16px;
    top: 8px;
  }
  &__calculate-button {
    position: absolute;
    right: 54px;
    top: 8px;
  }
}
</style>