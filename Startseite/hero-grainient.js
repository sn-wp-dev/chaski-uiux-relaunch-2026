// Grainient shader from the user-provided React Bits component.
// Static HTML adaptation: native WebGL2, no React/OGL runtime required.
(() => {
'use strict';
const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;
const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uLightMode;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);} 
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);} 
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,(1.0-S(v1,v0,tuv.y)));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);} 
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);
  if(uLightMode>0.5){
    float energy=max(max(col.r,col.g),col.b);
    vec3 hue=col/max(energy,0.001);
    float chroma=length(col-vec3(dot(col,vec3(0.333333))));
    float coverage=clamp(0.12+chroma*1.15+energy*0.18,0.0,0.88);
    col=mix(vec3(1.0),clamp(hue*0.58+col*0.18,0.0,1.0),coverage);
  }

  o=vec4(col,1.0);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`;
const container = document.getElementById('hero-grainient');
if (!container) return;
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl2', {alpha:false, antialias:false, depth:false, powerPreference:'low-power'});
if (!gl) { container.dataset.state = 'fallback'; return; }
let program, buffer;
const shaders = [];
try {
  const compile = (type, source) => {
    const shader = gl.createShader(type);
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  };
  program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
} catch {
  shaders.forEach(shader => gl.deleteShader(shader));
  if (buffer) gl.deleteBuffer(buffer);
  if (program) gl.deleteProgram(program);
  container.dataset.state = 'fallback';
  return;
}
shaders.forEach(shader => gl.deleteShader(shader));
const uniform = name => gl.getUniformLocation(program, name);
const settings = {
  uTimeSpeed:.25, uColorBalance:0, uWarpStrength:1, uWarpFrequency:5,
  uWarpSpeed:2, uWarpAmplitude:50, uBlendAngle:0, uBlendSoftness:.05,
  uRotationAmount:500, uNoiseScale:2, uGrainAmount:.1, uGrainScale:2,
  uGrainAnimated:0, uContrast:1.5, uGamma:1, uSaturation:1, uZoom:.9, uLightMode:0
};
Object.entries(settings).forEach(([name,value]) => gl.uniform1f(uniform(name),value));
const rgb = hex => [1,3,5].map(i => parseInt(hex.slice(i,i+2),16)/255);
gl.uniform3fv(uniform('uColor1'),rgb('#8A8F68'));
gl.uniform3fv(uniform('uColor2'),rgb('#D8C3AB'));
gl.uniform3fv(uniform('uColor3'),rgb('#A3B18A'));
gl.uniform2f(uniform('uCenterOffset'),0,0);
const timeLocation = uniform('iTime');
const resolutionLocation = uniform('iResolution');
container.appendChild(canvas);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let raf = 0, visible = false, elapsed = 0, previous = 0, lastDraw = 0, disposed = false;
const draw = () => {
  if (disposed || gl.isContextLost()) return;
  gl.uniform1f(timeLocation,elapsed);
  gl.drawArrays(gl.TRIANGLES,0,3);
};
const resize = () => {
  const rect = container.getBoundingClientRect();
  const dpr = Math.min(devicePixelRatio || 1,innerWidth < 768 ? 1 : 1.5);
  canvas.width = Math.max(1,Math.round(rect.width*dpr));
  canvas.height = Math.max(1,Math.round(rect.height*dpr));
  gl.viewport(0,0,canvas.width,canvas.height);
  gl.uniform2f(resolutionLocation,canvas.width,canvas.height);
  draw();
};
const tick = now => {
  raf = 0;
  if (disposed) return;
  if (previous) elapsed += (now-previous)/1000;
  previous = now;
  if (now-lastDraw >= 1000/30) { draw(); lastDraw=now; }
  raf = requestAnimationFrame(tick);
};
const sync = () => {
  if (raf) cancelAnimationFrame(raf);
  raf = 0; previous = 0;
  if (disposed) return;
  if (reducedMotion.matches) { container.dataset.state='static'; draw(); }
  else if (visible && !document.hidden) { container.dataset.state='active'; raf=requestAnimationFrame(tick); }
  else container.dataset.state='paused';
};
const resizeObserver = new ResizeObserver(resize);
const intersectionObserver = new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; sync(); });
resizeObserver.observe(container);
intersectionObserver.observe(container);
reducedMotion.addEventListener('change',sync);
document.addEventListener('visibilitychange',sync);
const dispose = () => {
  disposed = true;
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
  resizeObserver.disconnect(); intersectionObserver.disconnect();
  reducedMotion.removeEventListener('change',sync);
  document.removeEventListener('visibilitychange',sync);
  gl.deleteBuffer(buffer); gl.deleteProgram(program);
  container.dataset.ready='false'; container.dataset.state='fallback';
};
canvas.addEventListener('webglcontextlost',event => { event.preventDefault(); dispose(); },{once:true});
// Keep listeners intact for back/forward-cache restoration.
window.addEventListener('pagehide',event => { if (!event.persisted) dispose(); });
resize(); container.dataset.ready='true'; sync();

})();
