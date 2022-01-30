<template>
<div>
    <PageHeading title="Edit Home" noInfoBar></PageHeading>
    <div class="container page-container tos-page"> 
      <button @click="add('ChartTile')">Add Chart</button>
      <button @click="add('ListingTile')">Add Listing</button>
      <button @click="add('ControlTile')">Add Controls</button>
      <button @click="save()">Save</button>
      <div class="editor" ref="editor" style="width: 100%; height: calc(100vh - 20rem); min-height: 10rem;"></div>
    </div>
  </div>
</template>

<script>
import 'jsoneditor/dist/jsoneditor.min.css'
import JSONEditor from 'jsoneditor';

export default {
  data() {
    return {
      editor: null,
    }
  },
  methods: {
    add(type) {
      const json = this.editor.get();
      json.push({
        type, ids: [ "Set this field to correct ID" ]
      });
      this.editor.set(json);
    },
    save() {
      const json = this.editor.get();
      const tiles = json.map(({type, ids}) => {
        const id = `${type}-${ids.join(',')}`
        switch(type) {
          case 'ChartTile':
          case 'ListingTile':
            return { id, tileType: type, tileData: { sensorIds: ids } };
          case 'ControlTile':
            return { id, tileType: type, tileData: { deviceIds: ids } };
          default:
            throw 'Invalid tile type!';
        }
      });
      window.localStorage.setItem("__home-tiles", JSON.stringify(tiles));
    }
  },
  mounted() {
    const { editor } = this.$refs;
    this.editor = new JSONEditor(editor, {
      onNodeName({ size, value }) {
        if(value.type && typeof value.ids === "object") {
          return `${value.type} - ${value.ids.length ? value.ids.join(", ") : 'NO IDS'}`;
        }
        return size;
      }
    });
    
    const initialJson = JSON.parse(window.localStorage.getItem("__home-tiles") || '[]') || [];

    const editorJson = initialJson.map(entry => {
      let ids = [];
      if(entry.tileData && entry.tileData.sensorIds) {
        ids = entry.tileData.sensorIds;
      }
      if(entry.tileData && entry.tileData.deviceIds) {
        ids = entry.tileData.deviceIds;
      }
      return {
        type: entry.tileType,
        ids
      };
    })

    this.editor.set(editorJson)
  },
  destroyed() {
    document.body.classList.remove('about-page-active');
  }
}

/*

        return {
          id: 'chart-' + sensor.id,
          tileType: 'ChartTile',
          tileData: { 
            sensorIds: [ sensor.id ],
            startDate: new Date(new Date() - 1000 * 60 * 60 * 1 * 1),
            endDate: new Date(new Date() + 1000 * 60),
            preferredPointCount: 5, 
          }
        }
      }),

      ...sensors.map(sensor => {
        return {
          id: 'listing-' + sensor.id,
          tileType: 'ListingTile',
          tileData: { 
            sensorIds: [ sensor.id ],
          }
        }
      }),
            ...devices.map(device => {
        return {
          id: 'control-' + device.id,
          tileType: 'ControlTile',
          tileData: { deviceId: device.id }
        }
  */

</script>

<style lang="scss" scoped>

.editor {
  font-size: 16px;
  text-shadow: none;
}

</style>
