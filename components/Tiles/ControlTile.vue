
<template>
  <div class="control-tile">
    <TileHeading>{{ deviceInfo.displayName || '...' }}</TileHeading>
    <div class="tile-content">
      <button-on-off labelTrue='Auto' labelFalse='Manual' :state="autoAnabled" @click="toggleAuto"></button-on-off>
      <button-on-off 
        :style="{opacity: autoAnabled ? 0.6 : 1, pointerEvents: autoAnabled ? 'none' : 'all'}" 
        labelTrue='Włącz' labelFalse='Wyłącz' :state="targetState" @click="toggleTargetState"
      ></button-on-off>
      <center>
        Ustawiono: {{ targetStateString }}  
      </center>
      <center>
        Obecnie: {{ actualStateString }}  
      </center>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tileData: Object,
  },
   data() {
    return {
      targetState: false, 
      autoAnabled: false,
      deviceInfo: {},
      fetchTimeout: null,
    };
  },
  methods: {
    toggleTargetState() {
      this.targetState = !this.targetState;
      this.send();
    },
    toggleAuto() {
      this.autoAnabled = !this.autoAnabled;
      this.send();
    },
    async send() {
      const state = this.autoAnabled ? "null" : (this.targetState ? "true" : "false");
      const url = `/api/set-device-state/${this.tileData.deviceId}/${state}`;
      const data = await this.$axios.$post(url);
      console.log("Device state set", data);
      this.$fetch();
      this.queueFetch(2);
    },
    queueFetch(seconds = 5) {
      if(this.fetchTimeout) {
        window.clearTimeout(this.fetchTimeout);
      }
      this.fetchTimeout = window.setTimeout(() => {
        this.$fetch();
      }, 1000 * seconds);
    }
  },
  computed: {
    targetStateString() {
      return (this.deviceInfo.overrideState === null ? "Auto" : (this.deviceInfo.overrideState ? "Wł." : "Wył."))
    },
    actualStateString() {
      return (this.deviceInfo.overrideState === null ? this.deviceInfo.currentState : this.deviceInfo.overrideState) ? "Wł." : "Wył.";
    }
  },
  async fetch() {
    try {
      const url = `/api/get-device-list/` + this.tileData.deviceId;
      const data = await this.$axios.$get(url);
      if(!data || !data.devices || !data.devices.length) {
        throw "Can't load device info for "+this.tileData.deviceId+"!";
      }

      const entry = data.devices.find(e => e.id === this.tileData.deviceId);
      if(!entry) {
        throw "Can't load device info for "+this.tileData.deviceId+"!";
      }

      this.autoAnabled = entry.overrideState === null;
      if(this.autoAnabled) {
        this.targetState = entry.currentState;
      }else{
        this.targetState = entry.overrideState;
      }

      this.deviceInfo = entry;
      console.log(this.deviceInfo)
    }finally{
      this.queueFetch(10);
    }
  },
}
</script>

<style lang="scss" scoped>

  .tile-content > * {
    margin-bottom: 0.5rem;
    -webkit-user-select: none; 
    -moz-user-select: none;     
    -ms-user-select: none;  
    user-select: none;  
  }

  @include bp(max-square) {
   .tile-content > * {
      margin-left: auto;
      margin-right: auto;
   }
  }
</style>