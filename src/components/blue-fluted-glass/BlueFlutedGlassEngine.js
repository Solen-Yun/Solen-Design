// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";
export function mountBlueFlutedGlass(target, options = {}) {
const scope = createSurface(target, {"markup":"\r\n\r\n<main class=\"bfg-stage\" tabindex=\"0\" role=\"button\" aria-label=\"Pause background animation\" aria-pressed=\"false\" data-paused=\"false\">\r\n<canvas class=\"bfg-canvas\" aria-hidden=\"true\"></canvas>\r\n<svg class=\"bfg-logo\" xmlns=\"http://www.w3.org/2000/svg\" width=\"520\" height=\"180\" viewBox=\"0 0 520 180\" role=\"img\" aria-label=\"Solen\"><title>Solen</title><g fill=\"currentColor\"><g transform=\"translate(6 16) scale(0.74)\"><path d=\"M 165.3 65.3 L 167.8 70.4 L 169.9 75.8 L 171.6 81.3 L 172.8 86.9 L 173.6 92.6 L 174.0 98.3 L 173.9 104.0 L 173.4 109.7 L 172.4 115.4 L 171.0 120.9 L 169.1 126.4 L 166.9 131.7 L 164.2 136.8 L 161.2 141.6 L 157.8 146.2 L 154.0 150.6 L 149.9 154.6 L 145.6 158.3 L 140.9 161.7 L 136.0 164.7 L 130.9 167.2 L 125.6 169.4 L 120.1 171.2 L 114.5 172.6 L 108.9 173.5 L 103.2 173.9 L 97.4 174.0 L 91.7 173.5 L 86.0 172.7 L 80.4 171.4 L 75.0 169.6 L 69.6 167.5 L 64.5 164.9 L 59.6 162.0 L 54.9 158.7 L 50.5 155.0 L 54.5 150.5 L 59.0 153.4 L 63.6 155.8 L 68.3 157.9 L 73.2 159.6 L 78.1 160.9 L 83.1 161.7 L 88.0 162.2 L 93.0 162.3 L 97.8 162.0 L 102.6 161.3 L 107.3 160.2 L 111.8 158.8 L 116.1 157.1 L 120.3 155.1 L 124.2 152.7 L 127.9 150.1 L 131.3 147.2 L 134.5 144.1 L 137.3 140.8 L 139.9 137.4 L 142.2 133.7 L 144.1 130.0 L 145.7 126.2 L 147.0 122.2 L 148.0 118.3 L 148.6 114.3 L 148.9 110.4 L 148.9 106.5 L 148.6 102.6 L 148.0 98.9 L 147.1 95.2 L 145.9 91.7 L 144.5 88.4 L 142.8 85.2 L 140.9 82.1 L 138.8 79.3 Z\"/><path d=\"M 38.2 132.9 L 36.0 128.3 L 34.1 123.6 L 32.5 118.7 L 31.4 113.8 L 30.5 108.7 L 30.1 103.7 L 30.0 98.6 L 30.3 93.5 L 31.0 88.4 L 32.0 83.5 L 33.4 78.6 L 35.1 73.8 L 37.2 69.1 L 39.6 64.6 L 42.3 60.4 L 45.3 56.3 L 48.7 52.4 L 52.3 48.8 L 56.1 45.5 L 60.2 42.4 L 64.5 39.7 L 68.9 37.3 L 73.6 35.2 L 78.4 33.4 L 83.3 32.0 L 88.2 31.0 L 93.3 30.3 L 98.4 30.0 L 103.5 30.1 L 108.5 30.5 L 113.6 31.3 L 118.5 32.5 L 123.4 34.0 L 128.1 35.9 L 132.7 38.1 L 137.1 40.6 L 133.9 45.7 L 129.6 43.9 L 125.2 42.5 L 120.8 41.4 L 116.3 40.6 L 111.8 40.2 L 107.4 40.1 L 103.0 40.4 L 98.6 40.9 L 94.4 41.8 L 90.3 42.9 L 86.3 44.4 L 82.5 46.1 L 78.9 48.1 L 75.4 50.3 L 72.2 52.8 L 69.2 55.4 L 66.4 58.2 L 63.9 61.2 L 61.6 64.4 L 59.6 67.6 L 57.8 71.0 L 56.4 74.5 L 55.2 78.0 L 54.3 81.5 L 53.6 85.1 L 53.3 88.6 L 53.2 92.2 L 53.3 95.6 L 53.7 99.1 L 54.4 102.4 L 55.3 105.6 L 56.4 108.7 L 57.8 111.7 L 59.3 114.5 L 61.0 117.2 L 62.9 119.7 Z\"/><circle cx=\"52.5\" cy=\"152.8\" r=\"3\"/><circle cx=\"135.5\" cy=\"43.2\" r=\"3\"/></g><rect fill=\"#ff8650\" x=\"137\" y=\"59\" width=\"11\" height=\"3.5\" rx=\"1.75\" transform=\"rotate(-25 142 61)\"/><path d=\"M 180.8 85.8 A 82 82 0 0 1 78.8 179.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><text x=\"178\" y=\"124\" fill=\"currentColor\" font-family=\"Helvetica Neue, Helvetica, Arial, sans-serif\" font-weight=\"500\" font-size=\"100\" textLength=\"300\" lengthAdjust=\"spacingAndGlyphs\">Solen</text></svg>\r\n<span class=\"bfg-sr\" aria-live=\"polite\"></span>\r\n</main>\r\n\r\n","css":"\r\n*{box-sizing:border-box}html,body{width:100%;height:100%;margin:0;background:#f4f4f4}\r\n.bfg-stage{position:relative;display:grid;place-items:center;width:100%;height:100vh;min-height:1px;overflow:hidden;isolation:isolate;background:#f4f4f4;outline:none;cursor:default}\r\n.bfg-stage:focus-visible{outline:3px solid #fff;outline-offset:-7px;box-shadow:inset 0 0 0 9px #0b3c69}\r\n.bfg-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;filter:blur(1.25px);transform:scale(1.008)}\r\n.bfg-logo{position:relative;display:block;width:22%;height:auto;color:#fff;pointer-events:none;filter:drop-shadow(0 1px 3px #00132e20)}\r\n.bfg-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}\r\n","width":1200,"height":833,"responsive":false}, options);
const { document, window, requestAnimationFrame, cancelAnimationFrame, setTimeout, clearTimeout, setInterval, clearInterval, ResizeObserver, IntersectionObserver, matchMedia } = scope;

const stage = document.querySelector('.bfg-stage');
const canvas = document.querySelector('.bfg-canvas');
const status = document.querySelector('.bfg-sr');
const media = matchMedia('(prefers-reduced-motion: reduce)');
let gl = canvas.getContext('webgl', { alpha:false, antialias:false, depth:false, preserveDrawingBuffer:true });
let program, buffer, timeLocation, sizeLocation;
let frame = 0, last = 0, elapsed = 0, paused = false, visible = true, destroyed = false;
const VERTEX = 'attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}';
const FRAGMENT = `
precision highp float;
uniform vec2 resolution;
uniform float time;
float blob(vec2 p,vec2 center,vec2 radius,float angle){
  p-=center;float c=cos(angle),s=sin(angle);
  p=mat2(c,-s,s,c)*p/radius;
  return exp(-dot(p,p));
}
vec3 fluid(vec2 p,float t){
  float s=sin(t),c=cos(t);
  p.x+=.025*sin(p.y*7.0+t*2.0);
  float trunk=blob(p,vec2(.52+.15*s-.07*sin(t*2.0),.76),vec2(.235,.46),-.12-.52*s);
  float crown=blob(p,vec2(.77-.55*s,.20-.10*sin(t*2.0)),vec2(.235,.23),-.50+.45*s);
  float baseY=1.045-.17*p.x+.075*sin(p.x*5.0+t*2.0);
  float base=exp(-pow((p.y-baseY)/.092,2.0));
  float hole=blob(p,vec2(.85-.55*s,.59-.13*s),vec2(.19+.025*c,.32),.1+.5*s);
  float density=(trunk+.56*crown+.90*base)*(1.0-.78*hole);
  vec3 color=mix(vec3(.957),vec3(.66,.80,.89),smoothstep(.015,.20,density));
  color=mix(color,vec3(.10,.48,.73),smoothstep(.16,.49,density));
  color=mix(color,vec3(.015,.135,.28),smoothstep(.40,.73,density));
  color=mix(color,vec3(.008,.025,.087),smoothstep(.62,.93,density));
  return color;
}
void main(){
  vec2 uv=vec2(gl_FragCoord.x/resolution.x,1.0-gl_FragCoord.y/resolution.y);
  // The lenses refract the fluid itself; they are not an opacity stripe overlay.
  float rib=fract(uv.x*71.0)-.5;
  vec2 refracted=uv+vec2(rib*.018,(rib*rib-.0833)*.034);
  float t=time*6.28318530718/28.0;
  vec3 color=fluid(refracted,t)*.40;
  color+=fluid(refracted+vec2(0.,.025),t)*.24;
  color+=fluid(refracted-vec2(0.,.025),t)*.24;
  color+=fluid(refracted+vec2(0.,.055),t)*.06;
  color+=fluid(refracted-vec2(0.,.055),t)*.06;
  float edge=pow(abs(rib)*2.0,10.0);
  float blue=(1.0-color.r)*smoothstep(.02,.18,color.b-color.r);
  color+=vec3(.018,.025,.03)*(rib*.65+edge*.24)*blue;
  gl_FragColor=vec4(clamp(color,0.0,1.0),1.0);
}`;
function shader(type, source) {
  const value = gl.createShader(type);
  gl.shaderSource(value, source); gl.compileShader(value);
  if (!gl.getShaderParameter(value, gl.COMPILE_STATUS)) { gl.deleteShader(value); return null; }
  return value;
}
function initialize() {
  if (!gl) return false;
  const vertex=shader(gl.VERTEX_SHADER,VERTEX), fragment=shader(gl.FRAGMENT_SHADER,FRAGMENT);
  if (!vertex || !fragment) { if(vertex)gl.deleteShader(vertex);if(fragment)gl.deleteShader(fragment);return false; }
  program=gl.createProgram();gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
  gl.deleteShader(vertex);gl.deleteShader(fragment);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))return false;
  gl.useProgram(program);
  buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  timeLocation=gl.getUniformLocation(program,'time');sizeLocation=gl.getUniformLocation(program,'resolution');
  return true;
}
if (!initialize()) {
  if(gl){if(program)gl.deleteProgram(program);gl.getExtension('WEBGL_lose_context')?.loseContext();}
  gl=null;
  const fallback=canvas.cloneNode();canvas.replaceWith(fallback);
  // Keep a working static composition when WebGL is unavailable.
  const ctx=fallback.getContext('2d');fallback.width=960;fallback.height=666;
  ctx.fillStyle='#f4f4f4';ctx.fillRect(0,0,960,666);
  const gradient=ctx.createRadialGradient(525,520,20,525,520,440);
  gradient.addColorStop(0,'#020820');gradient.addColorStop(.45,'#073d69');gradient.addColorStop(.7,'#378fbe');gradient.addColorStop(1,'#f4f4f4');
  ctx.fillStyle=gradient;ctx.fillRect(0,0,960,666);
  stage.dataset.renderer='fallback';
} else stage.dataset.renderer='webgl';
function render() {
  if(!gl||destroyed)return;
  gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(sizeLocation,canvas.width,canvas.height);gl.uniform1f(timeLocation,elapsed);gl.drawArrays(gl.TRIANGLES,0,6);
  stage.dataset.time=elapsed.toFixed(3);
  document.body.dataset.motionReady='true';
}
function reduced(){return typeof scope!=='undefined'?scope.reduced():media.matches;}
function running(){return gl&&!destroyed&&!paused&&!reduced()&&visible&&!document.hidden;}
function tick(now){
  frame=0;
  if(!running()){last=0;stage.dataset.paused=String(paused||reduced());return;}
  if(last)elapsed+=Math.min((now-last)/1000,.05);
  last=now;render();frame=requestAnimationFrame(tick);
}
function sync(){
  cancelAnimationFrame(frame);frame=0;last=0;
  if(!gl){stage.dataset.paused='true';stage.tabIndex=-1;stage.setAttribute('role','img');stage.setAttribute('aria-label','Solen on a static blue background');stage.removeAttribute('aria-pressed');return;}
  stage.dataset.paused=String(paused||reduced());
  stage.setAttribute('aria-pressed',String(paused));
  stage.setAttribute('aria-label',paused?'Resume background animation':'Pause background animation');
  render();if(running())frame=requestAnimationFrame(tick);
}
function resize(){
  const bounds=scope.rect(stage),dpr=Math.min(window.devicePixelRatio||1,1.5);
  canvas.width=Math.max(1,Math.round(bounds.width*dpr));canvas.height=Math.max(1,Math.round(bounds.height*dpr));
  sync();
}
function toggle(){paused=!paused;status.textContent=paused?'Animation paused':'Animation playing';sync();}
stage.addEventListener('click',toggle);
function keydown(event){if(event.key===' '||event.key==='Enter'){event.preventDefault();toggle();}}
stage.addEventListener('keydown',keydown);
media.addEventListener('change',sync);
document.addEventListener('visibilitychange',sync);
const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(stage);
const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();});intersection.observe(stage);
// Native package options can change independently of the system media query.
const preferenceObserver=typeof scope!=='undefined'?new MutationObserver(sync):null;
if(preferenceObserver)preferenceObserver.observe(scope.element,{attributes:true,attributeFilter:['data-reduced-motion']});
function dispose(){
  if(destroyed)return;destroyed=true;cancelAnimationFrame(frame);resizeObserver.disconnect();intersection.disconnect();
  preferenceObserver?.disconnect();
  stage.removeEventListener('click',toggle);stage.removeEventListener('keydown',keydown);media.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);
  if(gl){gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.getExtension('WEBGL_lose_context')?.loseContext();}
}
window.addEventListener('pagehide',dispose,{once:true});
if(typeof scope!=='undefined')scope.addCleanup(dispose);
resize();
document.body.dataset.motionReady='true';


scope.ready();
return scope.controller;
}
