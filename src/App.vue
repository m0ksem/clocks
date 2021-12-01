<template>
<div class="app">
  <div class="container">
    <va-card>
      <va-card-content>
        <div class="header d-flex justify--space-between align--center" style="flex-wrap: wrap;">
          <h1 class="display-1">{{ currentTime }}</h1>

          <div>
            <va-button icon-right="add" @click="doShowAddModal = true">Add</va-button>
            <AddTimeZoneModal v-model="doShowAddModal" @create="createTimeZone"></AddTimeZoneModal>      
          </div>
        </div>

        <va-divider />
        <div class="row" style="margin: 0 -.5rem;">
          <div v-for="(timeZone, index) in timeZones" :key="timeZone.name" class="flex lg4 md6 sm12 xs12 pa-2">
            <TimeZoneCard 
              :name="timeZone.name" :offset="timeZone.offset * 60" 
              :timezone="timeZone.timezone" :color="colors[index]" 
              @delete="deleteTimeZone(timeZone)"
            />            
          </div>
        </div>
      </va-card-content>
    </va-card>     
  </div>
</div>

</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useInterval } from './hooks/useInterval'
import TimeZoneCard from './components/TimeZoneCard.vue'
import AddTimeZoneModal from './components/AddTimeZoneModal.vue'

type TimeZone = { name: string, offset: number, timezone: any }

export default defineComponent({
  components: { TimeZoneCard, AddTimeZoneModal },

  setup() {
    const colors = ['#4cc9f0', '#ffc6ff', '#06d6a0', '#4ea8de', '#f9c74f', '#bdb2ff', '#ffc6ff']

    const currentTime = ref(new Date().toLocaleTimeString())

    useInterval(() => {
      currentTime.value = new Date().toLocaleTimeString()
    }, 1000)


    const doShowAddModal = ref(false)

    const timeZones = ref([] as TimeZone[])
    const LOCAL_STORAGE_KEY = 'timezones'
    const createTimeZone = (timeZone: TimeZone) => {
      timeZones.value.push(timeZone)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(timeZones.value))
    }

    const deleteTimeZone = (timeZone: TimeZone) => {
      timeZones.value = timeZones.value.filter((t) => t !== timeZone)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(timeZones.value))
    }

    onBeforeMount(() => {
      timeZones.value = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')
    })

    return {
      colors,
      currentTime,
      doShowAddModal,
      timeZones,
      createTimeZone,
      deleteTimeZone,
    }
  },
})
</script>

<style>
body {
  font-family: Source Sans Pro, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100wh;
}

.container {
  width: 100%;
  max-width: 1280px;
  padding: 60px;
}

.flex {
  box-sizing: border-box;
}
</style>
