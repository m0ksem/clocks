<template>
  <va-modal
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <va-time-input label="Your time" v-model="urTime"> </va-time-input>
    <va-time-input label="Card time" v-model="cardTime"> </va-time-input>
  </va-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

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
    return {
      urTime,
      cardTime,
    };
  },
});
</script>


<style scoped>
</style>