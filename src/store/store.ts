import { defineStore } from "pinia";

export const useStore = defineStore('main', {
  state: () => {
    return {
      calculatedTime: 0,
      
    }
  }
})