<template>
  <va-modal
    :model-value="modelValue"
    title="Time calculator"
    cancel-text=""
    @update:model-value="$emit('update:model-value', $event)"
    @before-open="resetTimes"
  >
    <va-time-input 
      label="Your time" 
      v-model="urTime" 
      class="mb-2"
      manual-input
      :ampm="ampm"
      @update:model-value="onUrTimeUpdate"
    />
    <va-time-input 
      label="Card time" 
      v-model="cardTime"
      manual-input
      :ampm="ampm"
      @update:model-value="onCardTimeUpdate"
    />
  </va-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { addHoursOffset } from '../utils/addHoursOffset'

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
    offset: { type: Number, required: true },
    ampm: { type: Boolean, required: true },
  },

  setup(props) {
    const urTime = ref(new Date());
    const cardTime = ref(addHoursOffset(urTime.value, props.offset));

    const resetTimes = () => {
      urTime.value = new Date()
      cardTime.value = addHoursOffset(urTime.value, props.offset)
    }

    const onUrTimeUpdate = () => {
      cardTime.value = addHoursOffset(urTime.value, props.offset)
    };
    const onCardTimeUpdate = () => {
      urTime.value = addHoursOffset(cardTime.value, -props.offset)
    };

    return {
      urTime,
      cardTime,

      onUrTimeUpdate,
      onCardTimeUpdate,
      resetTimes,
    };
  },
});
</script>