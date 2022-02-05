<template>
  <div class="bg-fireflies">
    <canvas width="1" height="1" ref="firefliesCanvas" />
  </div>
</template>

<script>

import BezierEasing from 'bezier-easing';
import lcm from 'compute-lcm';

class FireflyRenderer {
  constructor(canvas, frameGenerator) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.frameGenerator = frameGenerator;
    this.destroyed = false;
    this.currentFrame = 0;
    this.fps = 15;
    this.nextFrameTimeout = null;
  }

  destroy() {
    this.destroyed = true;
  }

  play(fps = undefined) {
    if(fps !== undefined) {
      this.fps = fps;
    }
    if(!(this.fps >= 0.01)) {
      throw "Invalid FPS";
    }
    this.setNextFrameTimeout();
  }

  setNextFrameTimeout(elapsed = false) {
    if(!elapsed && this.nextFrameTimeout !== null) {
      window.clearTimeout(this.nextFrameTimeout);
    }
    let time = 1000 / this.fps;
    if(typeof elapsed === "number") {
      time -= elapsed;
    }
    if(time < 1) time = 1;
    this.nextFrameTimeout = window.setTimeout(() => {
      if(this.destroyed) return;
      this.renderNextFrame()
    }, time);
  }

  async renderNextFrame() {
    const renderStart = performance.now();
    try {
      const frame = await this.frameGenerator(this.fps);
      const ctx = this.ctx;
      const { width, height } = this.canvas;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'green';
      ctx.strokeStyle = 'red';
      ctx.strokeRect(20, 10, 160, 100);
      for(let obj of frame) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const { rotate, startPosX, startPosY, translate, scale, opacity, hue, saturate } = obj;
        const translateScale = 40;
        const size = scale * 8; 
        const cx = translate[0] * translateScale + size/2;
        const cy = translate[1] * translateScale + size/2;
        ctx.globalAlpha = opacity / 100;
        ctx.filter = `hue-rotate(${hue}deg) saturate(${saturate})`;
        ctx.translate(startPosX * width, startPosY * height);
        ctx.translate(cx, cy);
        ctx.rotate(rotate / 180 * Math.PI);
        ctx.translate(-cx, -cy);
        ctx.fillRect(cx - size/2, cy - size/2, size, size);
      }
    } finally {
      const renderDuration = performance.now() - renderStart;
      this.setNextFrameTimeout(renderDuration);
    }
  }
}

const easingFunction = BezierEasing(1, 0.08, 0, 0.92);
// const easingFunction = x => x;

class FireflyAnimator {
  constructor() {
    this.preset = [];
    this.destroyed = false;
    this.styleDefaults = { rotate: 0, startPosX: 0, startPosY: 0, translate: [0, 0], scale: 1, opacity: 100, hue: 0, saturate: 1 };

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
              percent: 0,   translate: [0, 0], scale: 1 },
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
      'firefly-test': {
        frames: butterflyFrames,
        animations: [
          [
            { percent: 0, rotate: 0, translate: [0, 0], scale: 1, opacity: 100,   hue: 0, saturate: 1 },
            { percent: 15, rotate: 45, translate: [1, 1], scale: 1, opacity: 100,   hue: 0, saturate: 1 },
            { percent: 30, rotate: 0, translate: [2, 2], scale: 2, opacity: 100,   hue: 0, saturate: 1 },
            { percent: 45, rotate: 45, translate: [3, 3], scale: 1, opacity: 100,   hue: 0, saturate: 1 },
            { percent: 60, rotate: 0, translate: [3.5, 4], scale: 1, opacity: 100,   hue: 0, saturate: 1 },
            { percent: 74, rotate: 45, translate: [3, 1], scale: 1, opacity: 100,   hue: 0, saturate: 1 },
            { percent: 88, rotate: 0, translate: [3, 0], scale: 1, opacity: 100,   hue: 0, saturate: 1 },
            { percent: 100, rotate: 45, translate: [0, 0], scale: 1, opacity: 100,   hue: 0, saturate: 1 },
          ],
        ],
      },
      'firefly-test2': {
        frames: butterflyFrames,
        animations: [
          [
            { percent: 0, rotate: 0, translate: [1, 0], scale: 2, opacity: 40,   hue: 0, saturate: 1 },
            { percent: 15, rotate: 0, translate: [2, 0], scale: 1, opacity: 40,   hue: 0, saturate: 0 },
            { percent: 30, rotate: 0, translate: [3, 0], scale: 1, opacity: 40,   hue: 0, saturate: 1 },
            { percent: 45, rotate: 0, translate: [4, 0], scale: 1, opacity: 40,   hue: 180, saturate: 1 },
            { percent: 60, rotate: 0, translate: [5, 0], scale: 1, opacity: 0,   hue: 0, saturate: 1 },
            { percent: 75, rotate: 0, translate: [6, 0], scale: 1, opacity: 100,   hue: 0, saturate: 1 },
            { percent: 90, rotate: 0, translate: [8, 0], scale: 3, opacity: 40,   hue: 0, saturate: 1 },
            { percent: 100, rotate: 0, translate: [12, 0], scale: 1, opacity: 40,   hue: 0, saturate: 1 },
          ],
        ],
      },
    }).map(([k, { frames, animations }]) => {
      return [k, { 
        frames, 
        animations: animations.map(anim => {
          const styles = anim.map((step, stepNumber) => {
            const ret = {percent: step.percent};
            Object.entries(this.styleDefaults).forEach(([prop]) => {
              if(!(prop in ret)) {
                const reverseAnim = [...anim].reverse();
                const prevIdx = reverseAnim.findIndex((v, i) => (i >= anim.length - stepNumber - 1) && prop in v && v[prop] !== null);
                const nextIdx = anim.findIndex((v, i) => (i > stepNumber) && prop in v && v[prop] !== null);
                const prevOrThis = prevIdx >= 0 ? reverseAnim[prevIdx] : { ...this.styleDefaults, translate: [0, 0], ...step };
                const next = nextIdx >= 0 ? anim[nextIdx] : { percent: 100, ...this.styleDefaults, translate: [0, 0] };
                const prevPercent = prevOrThis.percent / 100;
                const nextPercent = next.percent / 100;
                const prevValue = prevOrThis[prop];
                const nextValue = next[prop];
                ret[prop] = {
                  prevPercent, nextPercent,
                  prevValue, nextValue
                };
              }
            });
            return ret;
          });
          console.log(k, styles)
          styles.pop();
          return styles;
        }),
      }];
    }));
    
    console.log(JSON.parse(JSON.stringify(this.styles)));
  }

  calculateStyle(type, frame, progress) {
    // console.log("calculate style",type, frame, progress);
    const { frames, animations } = this.styles[type];
    const ret = {
      file: frames[frame % frames.length],
      ...this.styleDefaults, translate: [0, 0]
    };

    for(let anim of animations) {
      const foundIdx = [...anim].reverse().findIndex(x => x.percent <= progress * 100);
      if(foundIdx === -1) {
        debugger;
      }
      const idx = anim.length - 1 - foundIdx;
      const step = anim[idx];

      const prop = ({prevPercent, nextPercent, prevValue, nextValue}, fn) => {
        const t = (progress - prevPercent) / (nextPercent - prevPercent);
        if(t < 0 || t > 1) {
          debugger;
        }
        // debugger;
        const r = easingFunction(t);
        if(!fn) {
          return r * nextValue + (1-r) * prevValue;
        }else{
          return fn(r, prevValue, nextValue);
        }
      };

      ret.rotate += prop(step.rotate);
      ret.scale *= prop(step.scale);
      ret.opacity *= prop(step.opacity);
      ret.hue += prop(step.hue);
      ret.saturate *= prop(step.saturate);

      const translate = prop(step.translate, (r, prev, next) => {
        return [
          prev[0]*(1-r) + next[0]*r,
          prev[1]*(1-r) + next[1]*r,
        ];
      });
      ret.translate[0] += translate[0];
      ret.translate[1] += translate[1];
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
    return time; //+ 20 - (elementIdx * 2) % 19;
  }

  calculateElementAnimationDuration(elementIdx) {
    const a = [2, 3, 4][elementIdx % 3];
    const b = [8, 9, 10, 11, 12, 14, 13, 15][elementIdx % 8];
    return lcm(a, b);
  }

  generateObjects({ objects, currentFrame }, time) {
    let added = false;
    let elementIdx = -1;
    for(let [count, type] of this.preset) {
      for(let i = 0; i < count; i++) {
        elementIdx++;
        const initialT = this.calculateElementAnimationTime(0, elementIdx);
        const t = this.calculateElementAnimationTime(time, elementIdx);
        const duration = this.calculateElementAnimationDuration(elementIdx);
        const progress = (t / duration + 100.0) % 1.0;
        if((objects[elementIdx] && objects[i].finished) || ((time-initialT) / duration) >= 1) {
          objects[elementIdx].finished = true;
          continue;
        }
        const style = this.calculateStyle(type, currentFrame, progress);
        if(!objects[elementIdx]) {
          objects[elementIdx] = { 
            finished: false, 
            frames: [], 
            startPos: [Math.random()*0.95+0.05, Math.random()*1.05-0.025]
          };
        }
        style.startPosX = objects[elementIdx].startPos[0];
        style.startPosY = objects[elementIdx].startPos[1];
        objects[elementIdx].frames.push(style);
        added = true;
        if(i === 5) {
          console.log((progress*100).toFixed(1), time, duration)
        }
      }
    }
    return added;
  }

  generateFrame(data, time) {
    const start = new Date();
    const frame = [];
    // debugger;
    if(!data.finished) {
      if(!this.generateObjects(data, time)) {
        console.log("finished", time);
        data.finished = true;
      }
    }
    for(let obj of data.objects) {
      frame.push(obj.frames[data.currentFrame % obj.frames.length]);
    }
    const end = new Date();
    if((end - start) > 10) {
      console.log("Generating frame took ", (end - start));
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
        if(frames.length >= 3) {
          await new Promise(r => setTimeout(r, 1 + frames.length * 5));
          if(frames.length >= 10) {
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
      if(frames.length <= 2 || frames.length > 10) {
        console.log("Got frame, left in buffer:", frames.length);
      }
      return val;
    };
  }
}


export default {
  data() {
    return {
      renderer: null,
      windowResizeHandler: this.resizeCanvas.bind(this),
    };
  },
  async mounted() {
    this.resizeCanvas();

    window.addEventListener('resize', this.windowResizeHandler);

    this.animator = new FireflyAnimator();
    this.animator.setPreset([
        // [10, 'firefly-test'], 
        [40, 'firefly-a'], 
        [15, 'firefly-b'], 
    ])

    const fps = 30;
    const frameGenerator = this.animator.frameGenerator(fps);

    const canvas = this.$refs.firefliesCanvas;

    this.renderer = new FireflyRenderer(canvas, frameGenerator);
    this.renderer.play(fps);

    // // performance tests
    // const frameGenerator = this.animator.frameGenerator();
    // this.animator.setPreset([
    //     [1500, 'firefly-a'], 
    //     [500, 'firefly-b'], 
    //     // [9, 'firefly-c'], 
    // ])
    // for(let i = 0; i < 150; i++) {
    //   await new Promise(r => setTimeout(r, 1000 / 30));
    //   console.log(i);
    //   await frameGenerator();
    // }
    // for(let i = 0; i < 250; i++) {
    //   await new Promise(r => setTimeout(r, 1000 / 60));
    //   console.log(i);
    //   await frameGenerator();
    // }
    // for(let i = 0; i < 50; i++) {
    //   await new Promise(r => setTimeout(r, 1000 / 8)); 
    //   console.log(i);
    //   await frameGenerator();
    // }

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