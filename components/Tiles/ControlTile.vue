
<template>
  <div class="control-tile">
    <TileHeading :title="deviceInfo.displayName || '...'">{{ deviceInfo.displayName || '...' }}</TileHeading>
    <div class="tile-content">
      <button-on-off labelTrue='Auto' labelFalse='Manual' :state="autoEnabled" @click="toggleAuto"></button-on-off>
      <button-on-off 
        v-if="!autoEnabled"
        :style="{opacity: autoEnabled ? 0.6 : 1, pointerEvents: autoEnabled ? 'none' : 'all'}" 
        labelTrue='Włącz' labelFalse='Wyłącz' :state="targetState" @click="toggleTargetState"
      ></button-on-off>
      <div v-if="autoEnabled && controllerData && controllerData.controller === 'pid' && typeof controllerData.target === 'number'">
        <div class="number-input">
          <span @click="updateControllerDataTarget(-1)">-1</span>
          <span @click="updateControllerDataTarget(-0.1)">-0.1</span>
          <input type="text" v-model.number="controllerData.target" class="value" @change="targetInputChanged" />
          <span @click="updateControllerDataTarget(0.1)">+0.1</span>
          <span @click="updateControllerDataTarget(1)">+1</span>
        </div>
      </div>
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
      autoEnabled: false,
      deviceInfo: {},
      controllerData: null,
      fetchTimeout: null,
    };
  },
  methods: {
    targetInputChanged() {
      this.updateControllerDataTarget(0); // run for checks
    },
    async updateControllerDataTarget(diff) {
      if(typeof this.controllerData.target !== "number") {
        return;
      }
      this.controllerData.target += diff;
      if(typeof this.controllerData.targetMin === "number") {
        this.controllerData.target = Math.max(this.controllerData.target, this.controllerData.targetMin);
      }
      if(typeof this.controllerData.targetMax === "number") {
        this.controllerData.target = Math.min(this.controllerData.target, this.controllerData.targetMax);
      }
      this.controllerData.target = Math.round(this.controllerData.target*10)/10;

      const url = `/api/set-device-config/${this.tileData.deviceId}/${encodeURIComponent(JSON.stringify(this.controllerData))}`;
      const data = await this.$axios.$post(url);
      console.log("Device config set", data);
    },
    toggleTargetState() {
      this.targetState = !this.targetState;
      this.send();
    },
    toggleAuto() {
      this.autoEnabled = !this.autoEnabled;
      this.send();
    },
    async send() {
      const state = this.autoEnabled ? "null" : (this.targetState ? "true" : "false");
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
      return (this.deviceInfo.overrideState === null ? "Auto" : (this.deviceInfo.overrideState ? "Wł." : "Wył."));
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

      this.autoEnabled = entry.overrideState === null;
      if(this.autoEnabled) {
        this.targetState = entry.currentState;
      }else{
        this.targetState = entry.overrideState;
      }

      this.deviceInfo = entry;
      try {
        this.controllerData = JSON.parse(entry.controllerData);
        if(typeof this.controllerData !== "object") throw "";
      }catch(e) {
        this.controllerData = null;
        console.log("Error while parsing device controllerData", e);
      }
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

  .number-input {
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
      background: transparent;
      border: none;
      text-align: center;
      font-size: 1.25rem;
      width: 3rem;
      outline: none;
    }
  }
</style>