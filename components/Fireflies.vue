<template>
  <div class="bg-fireflies">
    <canvas width="1" height="1" ref="firefliesCanvas" />
  </div>
</template>

<script>

import BezierEasing from 'bezier-easing';
import lcm from 'compute-lcm';

class FireflyRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.destroyed = false;
    this.currentFrame = 0;
  }

  destroy() {
    this.destroyed = true;
  }
}

class FireflyAnimator {
  constructor() {
    this.preset = [];
    this.destroyed = false;
    this.styleDefaults = { rotate: 0, translate: [0, 0], scale: 1, opacity: 100, hue: 0, saturate: 1 };
          
    const easingFunction = BezierEasing(1, 0.08, 0, 0.92);

    const butterflyFrames = ['/img/firefly21.svg', '/img/firefly22.svg', '/img/firefly24.svg', '/img/firefly23.svg'];
    this.styles = Object.fromEntries(Object.entries({
      'firefly-a': {
        frames: butterflyFrames,
        animations: [
          [
            { rate: 60, // move
              percent: 0,   rotate: 0,    translate: [0, 0],      scale: 3.8, opacity: 40,   hue: 0,       saturate: 1 },
            { percent: 35,  rotate: -100, translate: [-0.6, 0.4], scale: 3.2, opacity: null, hue: null },
            { percent: 50,  rotate: -160, translate: [-1, -0.4],  scale: 2.6, opacity: 25,   hue: null },
            { percent: 70,  rotate: 80,   translate: [0.2, 1],    scale: 3.2, opacity: null,   hue: 28.68, saturate: 0.761 },
            { percent: 100, rotate: 0,    translate: [0, 0],      scale: 3.8, opacity: 40,   hue: 0,       saturate: 1 },
          ],
          [
            { rate: 20, // SUBmove
              percent: 0,   translate: [0, 0] },
            { percent: 20,  translate: [-0.2, -0.1] },
            { percent: 40,  translate: [-0.1, 0.2] },
            { percent: 60,  translate: [-0.3, 0.2] },
            { percent: 80,  translate: [0.275, -0.13] },
            { percent: 100, translate: [0, 0] },
          ],
        ],
      },
      'firefly-b': {
        frames: butterflyFrames,
        animations: [
          [
            { rate: 51, // move
              percent: 0,   rotate: 0,    translate: [0, 0],      scale: 2.8, opacity: 40,   hue: 0,       saturate: 1 },
            { percent: 35,  rotate: 100,  translate: [0.6, -0.4], scale: 2.2, opacity: null, hue: null },
            { percent: 50,  rotate: 160,  translate: [1, 0.4],    scale: 1.6, opacity: 25,   hue: 0 },
            { percent: 70,  rotate: 80,   translate: [-0.2, -1],  scale: 2.2, opacity: null, hue: 28.68, saturate: 0.761 },
            { percent: 100, rotate: 0,    translate: [0, 0],      scale: 2.8, opacity: 40,   hue: 0,       saturate: 1 },
          ],
          [
            { rate: 21, // SUBmove
              percent: 0,   translate: [0, 0] },
            { percent: 20,  translate: [-0.2, -0.1] },
            { percent: 40,  translate: [-0.1, 0.2] },
            { percent: 60,  translate: [-0.3, 0.2] },
            { percent: 80,  translate: [0.275, -0.13] },
            { percent: 100, translate: [0, 0] },
          ],
        ],
      },
    }).map(([k, { frames, animations }]) => {
      return [k, { 
        frames, 
        animations: animations.map(anim => {
          let rate = null;
          return anim.map((step, stepNumber) => {
            if('rate' in step) {
              rate = step.rate;
            }
            const ret = {};
            Object.entries(step).forEach(([prop, value]) => {
              if(value !== undefined && value !== null) {
                ret[prop] = value;
                console.log("step " + stepNumber, "SET ", prop, "=", ret[prop])
              }
            });
            Object.entries(this.styleDefaults).forEach(([prop]) => {
              if(!(prop in ret)) {
                const reverseAnim = [...anim].reverse();
                const prevIdx = reverseAnim.findIndex((v, i) => (i > anim.length - stepNumber - 1) && prop in v && v[prop] !== null);
                const nextIdx = anim.findIndex((v, i) => (i > stepNumber) && prop in v && v[prop] !== null);
                const prev = prevIdx >= 0 ? reverseAnim[prevIdx] : { percent: 0, ...this.styleDefaults };
                const next = nextIdx >= 0 ? anim[nextIdx] : { percent: 100, ...this.styleDefaults };
                const prevPercent = prev.percent / 100;
                const nextPercent = next.percent / 100;
                const prevValue = prev[prop];
                const nextValue = next[prop];
                const currentPercent = step.percent / 100;
                const t = (currentPercent - prevPercent) / (nextPercent - prevPercent);
                const currentRatio = easingFunction(t);
                ret[prop] = prevValue * (1-currentRatio) + nextValue * currentRatio;
                console.log("step " + stepNumber, "GEN ", prop, "=", ret[prop], " ", t+"t", currentRatio+"ratio", prevPercent*100+"%-"+nextPercent*100+"%", prevValue+"-"+nextValue);
              }
            });
            return ret;
          });
        }),
      }];
    }));
    
    console.log(JSON.parse(JSON.stringify(this.styles)));
  }

  calculateStyle(type, frame, progress) {
    console.log("calculate style",type, frame, progress);
    const { frames, animations } = this.styles[type];
    const ret = {
      file: frames[frame % frames.length],
      ...this.styleDefaults
    };

    for(let anim of animations) {
      const bIdx = anim.findIndex(x => x.percent >= progress);
      if(bIdx < 0) {
        debugger;
        throw "Invalid animation";
      }
      const aIdx = bIdx == 0 ? 0 : bIdx - 1;
      const a = anim[aIdx];
      const b = anim[bIdx];
      const t = (progress - a.percent) / (b.percent - a.percent);
      const ti = 1 - t;

      ret.rotate += a.rotate * ti + b.rotate * t;
      ret.translate[0] += a.translate[0] * ti + b.translate[0] * t;
      ret.translate[1] += a.translate[1] * ti + b.translate[1] * t;
      ret.scale *= a.scale * ti + b.scale * t;
      ret.opacity = (ret.opacity / 100 * a.opacity * ti / 100 + b.opacity * t / 100) * 100;
      ret.hue += a.hue * ti + b.hue * t;
      ret.saturate *= a.saturate * ti + b.saturate * t;
    }

    return ret;
  }

  destroy() {
    this.destroyed = true;
  }

  setPreset(preset) {
    this.preset = preset;
  }

  calculateElementAnimationTime(time, elementIdx) {
    return time + 20 - (elementIdx * 2) % 19;
  }

  calculateElementAnimationDuration(elementIdx) {
    const a = [2, 3, 4][elementIdx % 3];
    const b = [8, 9, 10, 11, 12, 14, 13, 15][elementIdx % 8];
    return lcm(a, b);
  }

  generateObjects({ objects, currentFrame }, time) {
    let elementIdx = 0;
    let added = false;
    for(let [count, type] of this.preset) {
      for(let i = 0; i < count; i++) {
        const t = this.calculateElementAnimationTime(time, elementIdx);
        const duration = this.calculateElementAnimationDuration(elementIdx);
        const progress = t / duration;
        if((time / duration) >= 1) {
          objects[elementIdx].finished = true;
          continue;
        }
        const style = this.calculateStyle(type, currentFrame, progress);
        if(!objects[elementIdx]) objects[elementIdx] = { finished: false, frames: [] };
        objects[elementIdx].frames.push(style);
        elementIdx++;
        added = true;
      }
    }
    return added;
  }

  generateFrame(data, time) {
    const frame = [];
    if(!data.finished) {
      if(!this.generateObjects(data, time)) {
        data.finished = true;
      }
    }
    for(let obj of data.objects) {
      frame.push(obj.frames[data.currentFrame % obj.frames.length]);
    }
    return frame;
  }

  frameGenerator(fps = 4) {
    const frames = [];
    const data = {
      currentFrame: 0,
      finished: false,
      objects: [],
    };

    new Promise(async () => {
      while (!this.destroyed) {
        if(frames.length >= 2) {
          await new Promise(r => setTimeout(r, frames.length * 10));
          if(frames.length > 10) {
            continue;
          }
        }
        frames.push(this.generateFrame(data, data.currentFrame / fps));
        data.currentFrame++;
      }
    });

    return async () => {
      let val = frames.shift();
      while(!val) {
        await new Promise(r => setTimeout(r, 1)); // todo: clean up using promises 
        val = frames.shift();
      }
      return val;
    };
  }
}

export default {
  data() {
    return {
      renderer: null,
      windowResizeHandler: () => this.resizeCanvas(),
    };
  },
  async mounted() {
    this.resizeCanvas();
    const canvas = this.$refs.firefliesCanvas;
    this.renderer = new FireflyRenderer(canvas);
    this.animator = new FireflyAnimator();

    window.addEventListener('resize', this.windowResizeHandler);

    this.animator.setPreset([
        [3, 'firefly-a'], 
        [6, 'firefly-b'], 
        // [9, 'firefly-c'], 
    ])

    const frameGenerator = this.animator.frameGenerator();
    for(let i = 0; i < 100; i++) {
      console.log("Got frame", await frameGenerator());
    }
  },
  methods: {
    resizeCanvas() {
      const canvas = this.$refs.firefliesCanvas;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  },
  beforeDestroy() {
    if(this.renderer) {
      window.removeEventListener('resize', this.windowResizeHandler);
      this.renderer.destroy();
    }
    if(this.animator) {
      this.animator.destroy();
    }
  }
}
</script>


<style lang="scss" scoped>
.bg-fireflies {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -300;

  canvas {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>