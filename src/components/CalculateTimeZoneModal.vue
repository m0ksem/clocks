<template>
  <va-modal
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <va-time-input label="Your time" v-model="urTime" class="mb-2"> </va-time-input>
    <va-time-input label="Card time" v-model="cardTime"> </va-time-input>
  </va-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { addHoursOffset } from '../utils/addHoursOffset'

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
    offset: { type: Number, required: true },
  },

  setup(props) {
    const urTime = ref(new Date());
    const cardTime = ref(addHoursOffset(urTime.value, props.offset));

    watch(urTime, () => {
      cardTime.value = addHoursOffset(urTime.value, props.offset)
    });
    watch(cardTime, () => {
      urTime.value = addHoursOffset(cardTime.value, -props.offset)
    });

    return {
      urTime,
      cardTime,
    };
  },
});
</script>