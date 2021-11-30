<template>
  <va-modal :model-value="modelValue" @ok="onOk" @cancel="onCancel" title="Add time zone">
    <va-form style="max-width: 300px; width: 100vw;" ref="form">
      <va-input 
        label="Name" 
        class="mb-2"
        v-model="formData.name"
        placeholder="Kyiv"
        :rules="[
          (value) => value !== '' || 'Required',
        ]"
      />
      <va-input
        label="Offset"
        v-model="formData.offset"
        placeholder="2"
        mask="numeral"
        :rules="[
          (value) => value !== '' || 'Required',
          (value) => !isNaN(value) || 'Should be number',
          (value) => Number(value) <= 24 && Number(value) >= -24 || 'Should in range from -24 to 24'
        ]"
      />     
    </va-form>
  </va-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
  },

  setup(props, { emit }) {
    const form = ref()

    const formData = ref({
      name: '',
      offset: ''
    })

    const onOk = () => {
      if (form.value.validate()) {
        emit('create', formData.value)
        emit('update:modelValue', false)
      }  
    }

    const onCancel = () => {
      emit('update:modelValue', false)
    }

    return {
      form,
      formData,
      onOk,
      onCancel,
    }
  }
})
</script>
