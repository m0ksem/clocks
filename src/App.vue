<template>
  <div class="app">
    <div class="container">
      <va-card>
        <va-card-content>
          <div
            class="header d-flex justify--space-between align--center"
            style="flex-wrap: wrap"
          >
            <h1 class="display-1">{{ formatDate(nowDate, preferences.ampm) }}</h1>

            <div class="d-flex align--center">
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
              ></AddTimeZoneModal>
            </div>
          </div>

          <va-divider />

          <div class="row" style="margin: 0 -0.5rem">
            <div
              v-for="(timeZone, index) in timeZones"
              :key="timeZone.name"
              class="flex lg4 md6 sm12 xs12 pa-2"
            >
              <TimeZoneCard
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

type TimeZone = { name: string; offset: number; timezone: any };

export default defineComponent({
  components: { TimeZoneCard, AddTimeZoneModal },

  setup() {
    const { toggle: toggleTheme, clockColors } = useTheme()
    const { storage: preferences } = useLocalStorage('pref', { ampm: false })
    const { storage: timeZones } = useLocalStorage<TimeZone[]>('timezones', [])
    const { now: nowDate } = useNowDate()
    
    const doShowAddModal = ref(false);

    const createTimeZone = (timeZone: TimeZone) => {
      timeZones.value.push(timeZone);
    };

    const deleteTimeZone = (timeZone: TimeZone) => {
      timeZones.value = timeZones.value.filter((t) => t !== timeZone);
    };

    return {
      preferences,
      clockColors,
      nowDate,
      doShowAddModal,
      timeZones,
      formatDate,
      createTimeZone,
      deleteTimeZone,
      toggleTheme,
    };
  },
});
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
  background-color: var(--va-background);
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
