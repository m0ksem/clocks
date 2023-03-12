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

            <div class="flex gap-2">
              <a href="https://github.com/m0ksem/clocks" target="_blank">
                <va-button color="backgroundElement" :style="`fill: var(--va-on-background-element)`">
                  <GithubIcon />
                </va-button>
              </a>

              <va-button @click="preferences.ampm = !preferences.ampm" color="backgroundElement">
                {{  preferences.ampm ? '24h' : '12h' }}
              </va-button>

              <va-button :icon="`${currentPresetName === 'dark' ? 'light' : 'dark'}_mode`" @click="toggleTheme" color="backgroundElement" />
            </div>

          </div>

          <div class="flex gap-2 w-full items-center">
              <va-slider class="flex-grow" v-model="nowTimeOffset" :min="1" :max="24" track-label-visible />
              <va-button icon="restart_alt" preset="secondary" @click="resetTime"/>
          </div>

          <va-divider />

          <div class="flex flex-wrap mt-4 -ma-4" v-if="timeZones.length > 0">
            <div
              v-for="(timeZone, index) in timeZones"
              :key="timeZone.name"
              class="lg:w-1/4 md:w-1/2 w-full pa-4 box-border"
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
          <div class="px-4 mt-4 flex justify-center items-center flex-col" >
            <va-button preset="secondary" icon="add" @click="doShowAddModal = true">Add a timezone</va-button>
            <p class="va-text flex items-center" v-if="timeZones.length > 0">
              <va-icon name="lightbulb" size="small" color="warning" class="mr-2" />
              Tip: Use slider above to shift a time
            </p>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
                          
  <AddTimeZoneModal
    v-model="doShowAddModal"
    @create="createTimeZone"
  />
</template>

<script lang="ts">
import { defineComponent, ref} from "vue";
import { useTheme } from './hooks/useTheme'
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useNowDate } from './hooks/useNowDate'
import { formatDate } from './utils/formatDate'
import TimeZoneCard from "./components/TimeZoneCard.vue";
import AddTimeZoneModal from "./components/AddTimeZoneModal.vue";
import GithubIcon from "./components/GithubIcon.vue"
import { useStore } from "./store/store";
import { storeToRefs } from 'pinia'

type TimeZone = { name: string; offset: number; timezone: any };

export default defineComponent({
  components: { TimeZoneCard, AddTimeZoneModal, GithubIcon },

  setup() {
    const { toggle: toggleTheme, clockColors, currentPresetName } = useTheme()
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
      currentPresetName,
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
