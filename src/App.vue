<template>
  <div class="app">
    <div class="container">
      <va-card>
        <va-card-content>
          <div
            class="header flex justify-between items-center"
            style="flex-wrap: wrap"
          >
            <h1 class="va-h1">{{ formatDate(nowDate, preferences.ampm) }}</h1>

            <div class="flex items-center">
              <va-switch
                v-model="preferences.ampm"
                true-inner-label="12h"
                false-inner-label="24h"
                color="primary"
              />

              <va-button class="mx-2" icon="palette" @click="toggleTheme" />
                        
              <va-button icon-right="add" @click="doShowAddModal = true">Add</va-button>
              <AddTimeZoneModal
                v-model="doShowAddModal"
                @create="createTimeZone"
              />
            </div>

          </div>

          <div class="flex gap-2 w-full items-center">
              <va-slider class="flex-grow" v-model="nowTimeOffset" :min="1" :max="24" track-label-visible />
              <va-button icon="restart_alt" flat @click="resetTime"/>
          </div>

          <va-divider />

          <div class="flex flex-wrap mt-4 -ma-4">
            <div
              v-for="(timeZone, index) in timeZones"
              :key="timeZone.name"
              class="lg:w-1/3 md:w-1/2 w-full pa-4 box-border"
            >
              <TimeZoneCard
                clas="w-full"
                :name="timeZone.name"
                :offset="timeZone.offset * 60"
                :timezone="timeZone.timezone"
                :color="clockColors[index]"
                :ampm="preferences.ampm"
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
import { defineComponent, ref} from "vue";
import { useTheme } from './hooks/useTheme'
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useNowDate } from './hooks/useNowDate'
import { formatDate } from './utils/formatDate'
import TimeZoneCard from "./components/TimeZoneCard.vue";
import AddTimeZoneModal from "./components/AddTimeZoneModal.vue";
import { useStore } from "./store/store";
import { storeToRefs } from 'pinia'

type TimeZone = { name: string; offset: number; timezone: any };

export default defineComponent({
  components: { TimeZoneCard, AddTimeZoneModal },

  setup() {
    const { toggle: toggleTheme, clockColors } = useTheme()
    const { storage: preferences } = useLocalStorage('pref', { ampm: false })
    const { storage: timeZones } = useLocalStorage<TimeZone[]>('timezones', [])
    
    const store = useStore()
    const { nowTimeOffset } = storeToRefs(store)
    const { now: nowDate } = useNowDate();
    const doShowAddModal = ref(false);

    const createTimeZone = (timeZone: TimeZone) => {
      timeZones.value.push(timeZone);
    };

    const deleteTimeZone = (timeZone: TimeZone) => {
      timeZones.value = timeZones.value.filter((t) => t !== timeZone);
    };

    const resetTime = () => {
      const now = new Date();
      nowTimeOffset.value = now.getHours();
    }

    return {
      preferences,
      clockColors,
      nowDate,
      doShowAddModal,
      timeZones,
      nowTimeOffset,
      formatDate,
      createTimeZone,
      deleteTimeZone,
      toggleTheme,
      resetTime,
    };
  },
});
</script>

<style>
body {
  font-family: Source Sans Pro, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
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

.va-slider {
  margin: 12px 6px;
}
</style>
