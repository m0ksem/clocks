<template>
  <va-modal :model-value="modelValue" @ok="onOk" @cancel="onCancel" @before-open="onBeforeOpen" title="Add time zone">
    <va-form ref="form">
      <va-input 
        v-model="formData.name"
        label="Name" 
        class="mb-4"
        placeholder="Kyiv"
        :rules="[
          (value) => (value != null && value.length > 0) || 'Required',
        ]"
      />

      <va-input
        v-model="formData.offset"
        label="filter time zone by offset"
        class="mb-2"
        placeholder="2"
        mask="numeral"
        :rules="[
          (value) => !value || !isNaN(value) || 'Should be number',
          (value) => !value || Number(value) <= 24 && Number(value) >= -24 || 'Should in range from -24 to 24'
        ]"
      />

      <va-select
        v-model="formData.timezone"
        label="Time zone"  
        text-by="label" 
        track-by="label"
        :options="computedTimeZones" 
        searchable
        :rules="[
          (value) => (value != null && value) || 'Required',
        ]"
      />
    </va-form>
  </va-modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import timezones from 'timezones-list'
import { stringTimeZoneToNumber } from '../utils/stringTimeZoneToNumber'

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
  },

  setup(props, { emit }) {
    const form = ref()

    const formData = ref({
      name: '',
      offset: '',
      timezone: null as typeof timezones[0] | null
    })

    const onOk = () => {
      // TODO: temp fix here and check for formData.timezone !== null
      if (form.value.validate() && formData.value.timezone) {
        emit('create', formData.value)
        emit('update:modelValue', false)
      }  
    }

    const onCancel = () => {
      emit('update:modelValue', false)
    }

    const onBeforeOpen = () => {
      formData.value = {
        name: '',
        offset: '',
        timezone: null
      }
    }

    const computedTimeZones = computed(() => {
      const userOffset = new Date().getTimezoneOffset()

      if (!formData.value.offset) { return timezones }

      return timezones.filter((timeZone) => 
        stringTimeZoneToNumber(timeZone.utc) + userOffset === Number(formData.value.offset) * 60
      )
    })

    watch(() => formData.value.timezone, (timeZone) => {
      if (!formData.value.name && timeZone) {
        formData.value.name = timeZone.label
      }
    })

    return {
      computedTimeZones,
      form,
      formData,
      onOk,
      onCancel,
      onBeforeOpen,
    }
  }
})
</script>

<style lang="scss">
.va-dropdown__content-wrapper {
  z-index: 9999999 !important;
}
</style>