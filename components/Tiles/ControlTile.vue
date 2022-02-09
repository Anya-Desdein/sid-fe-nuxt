
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
          <div class="top-div">
            <span @click="updateControllerDataTarget(10)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142.22 142.21736"><path d="M110.64684,66.44968a5.87057,5.87057,0,0,1,0,9.04455L55.99317,120.77845a5.87118,5.87118,0,0,1-9.61533-4.53106V25.68773a5.86823,5.86823,0,0,1,9.61533-4.52227Z"/></svg>
            </span>
            <span @click="updateControllerDataTarget(1)">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142.22 142.21736"><path d="M110.64684,66.44968a5.87057,5.87057,0,0,1,0,9.04455L55.99317,120.77845a5.87118,5.87118,0,0,1-9.61533-4.53106V25.68773a5.86823,5.86823,0,0,1,9.61533-4.52227Z"/></svg>
            </span>
            <span></span>
            <span @click="updateControllerDataTarget(0.1)">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142.22 142.21736"><path d="M110.64684,66.44968a5.87057,5.87057,0,0,1,0,9.04455L55.99317,120.77845a5.87118,5.87118,0,0,1-9.61533-4.53106V25.68773a5.86823,5.86823,0,0,1,9.61533-4.52227Z"/></svg>
            </span>
          </div>
          <input type="text" v-model="targetInputText" class="value" @change="targetInputChanged" />
          <div class="bottom-div">
            <span @click="updateControllerDataTarget(-10)">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142.22 142.21736"><path d="M110.64684,66.44968a5.87057,5.87057,0,0,1,0,9.04455L55.99317,120.77845a5.87118,5.87118,0,0,1-9.61533-4.53106V25.68773a5.86823,5.86823,0,0,1,9.61533-4.52227Z"/></svg>
            </span>
            <span @click="updateControllerDataTarget(-1)">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142.22 142.21736"><path d="M110.64684,66.44968a5.87057,5.87057,0,0,1,0,9.04455L55.99317,120.77845a5.87118,5.87118,0,0,1-9.61533-4.53106V25.68773a5.86823,5.86823,0,0,1,9.61533-4.52227Z"/></svg>
            </span>
            <span></span>
            <span @click="updateControllerDataTarget(-0.1)">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142.22 142.21736"><path d="M110.64684,66.44968a5.87057,5.87057,0,0,1,0,9.04455L55.99317,120.77845a5.87118,5.87118,0,0,1-9.61533-4.53106V25.68773a5.86823,5.86823,0,0,1,9.61533-4.52227Z"/></svg>
            </span>
          </div>
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
      targetInputText: '',
    };
  },
  methods: {
    targetInputChanged() {
      const parsed = parseFloat(this.targetInputText);
      if(!isNaN(parsed)) {
        this.controllerData.target = parsed;
      }
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

      this.targetInputText = this.controllerData.target;

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
        this.targetInputText = this.controllerData.target;
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

  .top-div , .bottom-div { 
    display: flex;
    font-size: $text-larger;
    > span {
      display: inline-block;
      width: 0.625rem;
      text-align: center;
      line-height: 0.5;
    }
    svg {
      fill: #BEAC8F;
      transform: rotate(-90deg);
    }
  }

  .bottom-div {
        svg {
      transform: rotate(90deg);
    }
  }

  .number-input {
    border: $border;
    border-radius: 0.8rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 40%;
    margin: 0 auto;
    overflow: hidden;
   

    input {
      color: #BEAC8F;
      font-family: 'Xanh Mono', monospace;
      background: transparent;
      border: none;
      text-align: center;
      font-size: $text-larger;
      width: 3rem;
      height: 0.9em;
      outline: none;
      text-shadow: $color-background 0 0 0.10rem, 
        $color-background 0 0 0.15rem,
        transparentize($color-background, 0.4) 0 0 1rem,   
        transparentize($color-background, 0.3) 0 0 2.8rem,  
        transparentize($color-background, 0.8) 0 0 3rem;
      }
  }

  .number-input:after {
    position: absolute;
    content: '';
    z-index: -4;
    background-image: radial-gradient($color-secondary, $color-background);
    top: 0;
    left:0;
    right:0;
    bottom: 0;
    opacity: 0.5;
  }
</style>