<template>
  <div>
    <PageHeading title="Home Editor" noInfoBar></PageHeading>
    <div class="container">
      <div class="config-description">
        <h3>Jak skonfigurować stronę Home:</h3>
        <ul>
          <li>Możesz dodać maksymalnie 8 kafelków do strony głównej, kolejne będą pominięte.</li>
          <li></li>
          <li>Aby dodać element, wybierz jego nazwę u góry panelu. Skonfiguruj wymagane pola w edytorze poniżej. Przed opuszczeniem strony wybierz "Zapisz".</li>
        </ul>
      </div>
      <div class="page-container tos-page"> 
       <div class="button-container">
          <div class="config-button" @click="add('ChartTile')">Dodaj Wykres</div>
          <div class="config-button" @click="add('ListingTile')">Dodaj Listę</div>
          <div class="config-button" @click="add('ControlTile')">Dodaj Przycisk</div>
          <div class="config-button config-save" @click="save()">Zapisz</div>
       </div>
        <div class="editor" ref="editor" style="width: 100%; height: calc(100vh - 20rem); min-height: 10rem;"></div>
      </div>
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
    document.body.classList.add('about-page-active');
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

</script>

<style lang="scss" scoped>

.editor {
  text-shadow: none;
}

.button-container {
  display: flex;
  margin-bottom: 0.4rem;
  text-align: center;
  justify-content: space-around;
  flex-wrap: wrap;
}


$label: 7.2rem;
$border: .0625rem;

.config-button {
  margin: 0 0.6rem 0.6rem;
  display: flex;
  position: relative;
  flex-direction: row;
  $border: $border;
  text-align: center;
  justify-content: center;
  overflow: hidden;
  border: $border solid $color-primary;
  border-radius: 0.8rem;
  cursor: pointer;
  user-select: none;
  color: $color-primary;
  align-items: center;
  width: $label+ $border + $border;
  height: $text-normal + $text-normal;
  
}

.config-button:after {
  left:0;
  top:0;
  position:absolute;
  content: "";
  display: block;
  height: $text-normal + $text-normal + $text-normal;
  width: $label+ $border + $border;
  background-image: radial-gradient($color-secondary-dark, $color-background);
  transform: translateY(-0.7rem);
  z-index: -20;
  border-radius: 0.8rem;
  opacity: 0.5;
}

.config-save {
  color: $color-hover;
  border: $border solid $color-hover;
}

.config-save:after {
  left:0;
  top:0;
  position:absolute;
  content: "";
  display: block;
  height: $text-normal + $text-normal + $text-normal;
  width: $label+ $border + $border;
  background-image: radial-gradient(#750075, $color-background);
  transform: translateY(-0.7rem);
  z-index: -20;
  border-radius: 0.8rem;
  opacity: 0.5;
}

</style>

<style lang="scss">
  ul {
    list-style-type:"- ";
  }
  ul li, ol li {
    margin-bottom: 0.4rem;
  }

  .app-background-image-container {
    transition: opacity 0.2s;
  }
  .about-page-active .app-background-image-container {
    opacity: 0.45;
  }
</style>
