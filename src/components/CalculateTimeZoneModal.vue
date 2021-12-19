<template>
    <va-modal :model-value="modelValue" @update:model-value="$emit('update:model-value', $event)">

    </va-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
props: {
    modelValue: { type: Boolean, required: true },
  },

    setup(props) {
    
    },
})
</script>


<style scoped>

</style>