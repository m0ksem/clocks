<template>
  <va-modal :model-value="modelValue" @ok="onOk" @cancel="onCancel" @before-open="onBeforeOpen" title="Add time zone" no-outside-dismiss>
    <va-form ref="form" class="flex flex-col">
      <va-input 
        v-model="formData.name"
        label="Name" 
        class="mb-2"
        placeholder="Kyiv"
        :rules="[
          (value) => (value != null && value.length > 0) || 'Required',
        ]"
      />

      <va-select
        v-model="formData.timezone"
        label="Time zone"  
        :text-by="textBy" 
        track-by="name"
        :options="computedTimeZones"
        :group-by="(t) => t.name.split('/')[0]"
        searchable
        :rules="[
          (value) => (value != null && value) || 'Required',
        ]"
        prevent-overflow
        @click.stop
      />
    </va-form>
  </va-modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { getTimeZones, TimeZone } from "@vvo/tzdb";

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
  },

  setup(props, { emit }) {
    const form = ref()
    const timezones = getTimeZones()

    const formData = ref({
      name: '',
      filterOffset: '',
      timezone: null as typeof timezones[0] | null
    })

    const onOk = () => {
      if (formData.value.timezone) {
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
        filterOffset: '',
        timezone: null
      }
    }

    watch(() => props.modelValue, (value) => {
      if (value) {
        onBeforeOpen()
      }
    })

    const textBy = (timeZone: TimeZone) => {
      let name = timeZone.name.replace(/_/g, ' ')
      const time = timeZone.currentTimeFormat.match(/(?:\+|\-)[0-9]{2}:[0-9]{2}/)![0]

      if (name.includes('Kiev')) {
        name = name.replace('Kiev', 'Kyiv 🇺🇦')
      }

      return `[${time}] ${name}`
    }

    const computedTimeZones = computed(() => {
      if (!formData.value.filterOffset) { return timezones }

      return timezones.filter((timeZone) => 
        timeZone.currentTimeOffsetInMinutes === Number(formData.value.filterOffset) * 60
      )
    })

    watch(() => formData.value.timezone, (timeZone) => {
      if (!formData.value.name && timeZone) {
        formData.value.name = timeZone.name.replace(/_/g, ' ').split('/')[1]
      }
    })

    return {
      computedTimeZones,
      form,
      formData,
      onOk,
      onCancel,
      onBeforeOpen,
      textBy,
    }
  }
})
</script>

<style lang="scss">
.va-dropdown__content {
  z-index: 9999999 !important;
}
</style>