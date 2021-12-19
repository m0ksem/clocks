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

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
    offset: { type: Number, required: true },
  },

  setup(props) {
    const urTime = ref(new Date());
    const getDateWithOffset = () => {
      const now = new Date();
      now.setTime(now.getTime() + props.offset * 1000 * 60);

      return now;
    };
    const cardTime = ref(getDateWithOffset());
    watch(urTime, () => {
      const now = new Date();
      now.setTime(urTime.value.getTime() + props.offset * 1000 * 60);
      cardTime.value = now
    });
    watch(cardTime, () => {
      const now = new Date();
      now.setTime(cardTime.value.getTime() - props.offset * 1000 * 60);
      urTime.value = now
    });

    return {
      urTime,
      cardTime,
    };
  },
});
</script>