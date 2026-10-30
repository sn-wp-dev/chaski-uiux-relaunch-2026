/** CHASKI Grenzraum: on-demand parcel study, local assets only. */
const stage = document.getElementById('parcel-stage');
const host = document.getElementById('parcel-canvas');
const fallback = document.getElementById('parcel-fallback');
let disposeScene = () => {};
let starting = false;

function showFallback() {
  if (stage) stage.dataset.scene = 'fallback';
  if (fallback) { fallback.hidden = false; fallback.style.removeProperty('display'); }
  if (host) host.hidden = true;
}

async function startScene() {
  if (!stage || !host || starting) return;
  starting = true;
  showFallback();
  try {
    const THREE = await import('./assets-grenzraum/vendor/three.bundle.min.js');
    disposeScene = createScene(THREE);
  } catch {
    showFallback();
  } finally {
    starting = false;
  }
}

function createScene(THREE) {
  const canvas = host instanceof HTMLCanvasElement ? host : document.createElement('canvas');
  const generatedCanvas = canvas !== host;
  const context = canvas.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'low-power' });
  if (!context) return () => {};
  if (generatedCanvas) host.appendChild(canvas);
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';

  const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0xffffff, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-4.6, 4.6, 2.4, -2.4, .1, 45);
  camera.position.set(0, 5.8, 11);
  camera.lookAt(0, .8, 0);
  const resources = new Set();
  const keep = resource => { resources.add(resource); return resource; };
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = true;
  let disposed = false;
  let failed = false;
  let raf = 0;
  let renderCount = 0;
  let journeyTween;
  let dimensionTween;
  let cameraTween;
  let mode = 'journey';
  const cameraSettings = { span: 9.2 };
  let viewWidth = 0;
  let viewHeight = 0;
  let scaleTarget = { x: 1, y: 1, z: 1 };
  const positions = [-2.8, 0, 2.8];
  const orientations = [-.34, -.08, .29];
  const selected = document.querySelector('[data-journey-step][aria-pressed="true"]');
  let step = Math.max(0, Math.min(2, Number(selected?.dataset.journeyStep) || 0));

  function seededRandom(seed) {
    let value = seed;
    return () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 4294967296; };
  }

  function textureFromCanvas(surface, color = true) {
    const texture = keep(new THREE.CanvasTexture(surface));
    if (color) texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    return texture;
  }

  function paperSurface() {
    const surface = document.createElement('canvas');
    surface.width = surface.height = 768;
    const brush = surface.getContext('2d');
    const pixels = brush.createImageData(768, 768);
    const random = seededRandom(40718);
    for (let i = 0; i < pixels.data.length; i += 4) {
      const variation = (random() - .5) * 17;
      pixels.data[i] = 197 + variation;
      pixels.data[i + 1] = 158 + variation;
      pixels.data[i + 2] = 112 + variation;
      pixels.data[i + 3] = 255;
    }
    brush.putImageData(pixels, 0, 0);
    brush.lineWidth = .5;
    for (let i = 0; i < 2100; i++) {
      const x = random() * 768, y = random() * 768;
      brush.strokeStyle = random() > .5 ? 'rgba(255,241,214,.10)' : 'rgba(77,53,29,.09)';
      brush.beginPath(); brush.moveTo(x, y); brush.lineTo(x + 2 + random() * 7, y + random() * 2); brush.stroke();
    }
    return surface;
  }

  const paper = textureFromCanvas(paperSurface());
  paper.wrapS = paper.wrapT = THREE.RepeatWrapping;
  const cardboard = keep(new THREE.MeshStandardMaterial({ map: paper, roughness: .91, metalness: 0, bumpMap: paper, bumpScale: .018 }));
  const flapMaterial = keep(new THREE.MeshStandardMaterial({ map: paper, color: 0xf3eadb, roughness: .9, metalness: 0 }));
  const tapeMaterial = keep(new THREE.MeshStandardMaterial({ color: 0xb68b53, roughness: .47, metalness: 0, transparent: true, opacity: .8 }));
  const creaseMaterial = keep(new THREE.LineBasicMaterial({ color: 0x735735, transparent: true, opacity: .19 }));
  const parcel = new THREE.Group();
  parcel.position.x = positions[step];
  parcel.rotation.y = orientations[step];
  scene.add(parcel);
  const length = 2.4, height = 1.55, depth = 1.65, bevel = .024;

  // A shallow bevel catches the studio light without rounding the parcel into a toy.
  const outline = new THREE.Shape();
  outline.moveTo(-length / 2 + bevel, -height / 2 + bevel);
  outline.lineTo(length / 2 - bevel, -height / 2 + bevel);
  outline.lineTo(length / 2 - bevel, height / 2 - bevel);
  outline.lineTo(-length / 2 + bevel, height / 2 - bevel);
  outline.closePath();
  const bodyGeometry = keep(new THREE.ExtrudeGeometry(outline, { depth: depth - bevel * 2, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, steps: 1, curveSegments: 1 }));
  bodyGeometry.translate(0, height / 2, -(depth - bevel * 2) / 2);
  const body = new THREE.Mesh(bodyGeometry, cardboard);
  body.castShadow = true;
  body.receiveShadow = true;
  parcel.add(body);

  function box(w, h, d, material, x, y, z) {
    const mesh = new THREE.Mesh(keep(new THREE.BoxGeometry(w, h, d)), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parcel.add(mesh);
    return mesh;
  }

  // Two real top flaps meet below the packing tape; the slight gap keeps the construction legible.
  box(length - .046, .014, depth / 2 - .037, flapMaterial, 0, height + .006, -depth / 4 - .012);
  box(length - .046, .014, depth / 2 - .037, flapMaterial, 0, height + .007, depth / 4 + .012);
  box(length + .012, .008, .235, tapeMaterial, 0, height + .02, 0);
  box(.009, .35, .235, tapeMaterial, -length / 2 - .011, height - .16, 0);
  box(.009, .35, .235, tapeMaterial, length / 2 + .011, height - .16, 0);

  const scoredGeometry = keep(new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-length / 2 + .034, height + .016, -depth / 2 + .025),
    new THREE.Vector3(length / 2 - .034, height + .016, -depth / 2 + .025),
    new THREE.Vector3(length / 2 - .034, height + .016, depth / 2 - .025),
    new THREE.Vector3(-length / 2 + .034, height + .016, depth / 2 - .025),
    new THREE.Vector3(-length / 2 + .034, height + .016, -depth / 2 + .025)
  ]));
  parcel.add(new THREE.Line(scoredGeometry, creaseMaterial));

  const labelSurface = document.createElement('canvas');
  labelSurface.width = 1024; labelSurface.height = 576;
  const labelBrush = labelSurface.getContext('2d');
  const labelTexture = textureFromCanvas(labelSurface);
  let brandImage = null;
  function drawLabel() {
    labelBrush.fillStyle = '#faf9f5'; labelBrush.fillRect(0, 0, 1024, 576);
    labelBrush.strokeStyle = '#c4d5df'; labelBrush.lineWidth = 3; labelBrush.strokeRect(20, 20, 984, 536);
    if (brandImage) {
      const ratio = brandImage.naturalWidth / brandImage.naturalHeight;
      const w = Math.min(600, 164 * ratio), h = w / ratio;
      labelBrush.drawImage(brandImage, 65, 75 + (164 - h) / 2, w, h);
    } else {
      labelBrush.fillStyle = '#174bf2'; labelBrush.font = '800 130px Satoshi, Arial, sans-serif';
      labelBrush.fillText('CHASKI', 60, 209);
    }
    labelBrush.fillStyle = '#174bf2'; labelBrush.fillRect(65, 285, 894, 5);
    labelBrush.fillStyle = '#142d3f'; labelBrush.font = '600 37px Satoshi, Arial, sans-serif';
    labelBrush.fillText('DEINE LIEFERADRESSE', 65, 354);
    labelBrush.font = '28px Satoshi, Arial, sans-serif'; labelBrush.fillStyle = '#556570';
    labelBrush.fillText('KONSTANZ  /  ABHOLUNG VOR ORT', 65, 460);
    labelTexture.needsUpdate = true;
  }
  drawLabel();
  const labelPaper = box(1.065, .606, .013, keep(new THREE.MeshStandardMaterial({ color: 0xfaf9f5, roughness: .96 })), -.22, .78, depth / 2 + .016);
  labelPaper.rotation.z = 0;
  const labelFace = new THREE.Mesh(keep(new THREE.PlaneGeometry(1.05, .59)), keep(new THREE.MeshStandardMaterial({ map: labelTexture, roughness: .95, metalness: 0 })));
  labelFace.position.set(-.22, .78, depth / 2 + .024);
  labelFace.rotation.z = 0;
  parcel.add(labelFace);

  const logo = new Image();
  logo.onload = () => { if (!disposed && !failed) { brandImage = logo; drawLabel(); requestRender(); } };
  logo.onerror = () => {};
  logo.src = new URL('./assets-grenzraum/logo.png', import.meta.url).href;

  scene.add(new THREE.HemisphereLight(0xffffff, 0xb8a58e, 2.15));
  const key = new THREE.DirectionalLight(0xfffaf1, 3.05);
  key.position.set(-3.5, 9.5, 3.5);
  key.castShadow = true;
  key.shadow.mapSize.set(512, 512); key.shadow.radius = 6; key.shadow.blurSamples = 8;
  key.shadow.camera.left = -6; key.shadow.camera.right = 6;
  key.shadow.camera.top = 5; key.shadow.camera.bottom = -4;
  key.shadow.camera.near = 1; key.shadow.camera.far = 22;
  key.shadow.bias = -.0004; key.shadow.normalBias = .018;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 1.15);
  fill.position.set(5, 3, -4); scene.add(fill);
  const ground = new THREE.Mesh(keep(new THREE.PlaneGeometry(22, 12)), keep(new THREE.ShadowMaterial({ color: 0x352a1d, opacity: .065 })));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -.02; ground.receiveShadow = true; scene.add(ground);

  const shadowSurface = document.createElement('canvas');
  shadowSurface.width = shadowSurface.height = 256;
  const shadowBrush = shadowSurface.getContext('2d');
  const radial = shadowBrush.createRadialGradient(128, 128, 14, 128, 128, 120);
  radial.addColorStop(0, 'rgba(48,36,20,.28)'); radial.addColorStop(.46, 'rgba(48,36,20,.13)'); radial.addColorStop(1, 'rgba(48,36,20,0)');
  shadowBrush.fillStyle = radial; shadowBrush.fillRect(0, 0, 256, 256);
  const contactShadow = new THREE.Mesh(keep(new THREE.PlaneGeometry(3.8, 2.6)), keep(new THREE.MeshBasicMaterial({ map: textureFromCanvas(shadowSurface), transparent: true, depthWrite: false, opacity: .7 })));
  contactShadow.rotation.x = -Math.PI / 2; contactShadow.position.set(parcel.position.x, -.013, 0); scene.add(contactShadow);

  function canRender() { return !disposed && !failed && visible && !document.hidden && viewWidth > 0 && viewHeight > 0; }
  function requestRender() {
    if (!raf && canRender()) raf = requestAnimationFrame(render);
  }
  function render() {
    raf = 0;
    if (!canRender()) return;
    contactShadow.position.x = parcel.position.x;
    // The box changes proportions; its printed brand keeps its correct aspect ratio.
    const labelFit = Math.min(1, parcel.scale.x * length * .68 / 1.065, parcel.scale.y * height * .58 / .606);
    labelPaper.scale.set(labelFit / parcel.scale.x, labelFit / parcel.scale.y, 1);
    labelFace.scale.set(labelFit / parcel.scale.x, labelFit / parcel.scale.y, 1);
    contactShadow.scale.set((parcel.scale.x * length + .4) / 3.8, (parcel.scale.z * depth + .4) / 2.6, 1);
    contactShadow.rotation.z = parcel.rotation.y;
    updateCamera();
    try {
      renderer.render(scene, camera);
      stage.dataset.renderCount = String(++renderCount);
      stage.dataset.parcelDimensions = [length * parcel.scale.x, depth * parcel.scale.z, height * parcel.scale.y].map(value => value.toFixed(5)).join(',');
      stage.dataset.sceneMode = mode;
      stage.dataset.sceneSpan = cameraSettings.span.toFixed(3);
      stage.dataset.scene = 'ready';
      host.hidden = false;
      if (fallback) { fallback.hidden = true; fallback.style.display = 'none'; }
    } catch { failScene(); }
  }

  function updateCamera() {
    if (!viewWidth || !viewHeight) return;
    const aspect = viewWidth / viewHeight;
    const physicalHeight = height * parcel.scale.y;
    const projectedDepth = Math.abs(Math.sin(parcel.rotation.y)) * length * parcel.scale.x + Math.abs(Math.cos(parcel.rotation.y)) * depth * parcel.scale.z;
    const requiredHeight = physicalHeight * .92 + projectedDepth * .394 + .72;
    const verticalSpan = Math.max(1.25, requiredHeight, cameraSettings.span / aspect);
    camera.left = -verticalSpan * aspect / 2; camera.right = verticalSpan * aspect / 2;
    camera.top = verticalSpan / 2; camera.bottom = -verticalSpan / 2;
    camera.position.set(0, physicalHeight / 2 + 4.7, 11);
    camera.lookAt(0, physicalHeight / 2, 0);
    camera.updateProjectionMatrix();
  }

  function fitCamera() {
    if (disposed || failed) return;
    const bounds = stage.getBoundingClientRect();
    viewWidth = Math.max(0, Math.round(bounds.width));
    viewHeight = Math.max(0, Math.round(bounds.height));
    if (!viewWidth || !viewHeight) return;
    updateCamera();
    renderer.setSize(viewWidth, viewHeight, false);
    requestRender();
  }

  function animateJourney(next, instant = false) {
    if (!Number.isInteger(next) || next < 0 || next > 2 || disposed || failed) return;
    step = next;
    journeyTween?.kill();
    const gsap = window.gsap;
    if (!gsap || motionPreference.matches || instant) {
      parcel.position.x = positions[step]; parcel.rotation.y = orientations[step]; requestRender(); return;
    }
    journeyTween = gsap.timeline({ onUpdate: requestRender, onComplete: requestRender });
    journeyTween.to(parcel.position, { x: positions[step], duration: 1, ease: 'power3.inOut' }, 0);
    journeyTween.to(parcel.rotation, { y: orientations[step], duration: 1, ease: 'power3.inOut' }, 0);
    if (!visible || document.hidden) journeyTween.pause();
  }

  function animateDimensions(values, instant = false) {
    if (disposed || failed) return;
    const sizes = [Number(values?.length), Number(values?.height), Number(values?.width)];
    if (sizes.some(value => !Number.isFinite(value) || value <= 0)) return;
    const maximum = Math.max(...sizes);
    const normalized = sizes.map(value => Math.max(Number.EPSILON, value / maximum * 2.4));
    scaleTarget = { x: normalized[0] / length, y: normalized[1] / height, z: normalized[2] / depth };
    dimensionTween?.kill();
    const gsap = window.gsap;
    if (!gsap || motionPreference.matches || instant) { parcel.scale.set(scaleTarget.x, scaleTarget.y, scaleTarget.z); requestRender(); return; }
    dimensionTween = gsap.to(parcel.scale, { ...scaleTarget, duration: .8, ease: 'power3.inOut', onUpdate: requestRender, onComplete: requestRender });
    if (!visible || document.hidden) dimensionTween.pause();
  }

  function currentDimensions() {
    return {
      length: document.getElementById('gr-length')?.value || 40,
      width: document.getElementById('gr-width')?.value || 30,
      height: document.getElementById('gr-height')?.value || 20
    };
  }

  function setMode(next, instant = false) {
    if (!['journey', 'price'].includes(next) || disposed || failed) return;
    mode = next;
    cameraTween?.kill();
    const targetSpan = mode === 'price' ? 6 : 9.2;
    if (mode === 'price') {
      animateJourney(1, instant);
      animateDimensions(currentDimensions(), instant);
    }
    if (instant || motionPreference.matches || !window.gsap) {
      cameraSettings.span = targetSpan; requestRender(); return;
    }
    cameraTween = window.gsap.to(cameraSettings, { span: targetSpan, duration: .8, ease: 'power3.inOut', onUpdate: requestRender, onComplete: requestRender });
    if (!visible || document.hidden) cameraTween.pause();
  }

  const onJourney = event => animateJourney(Number(event.detail?.step));
  const onDimensions = event => animateDimensions(event.detail);
  const onMode = event => setMode(event.detail?.mode);
  function syncMotion() {
    if (motionPreference.matches) {
      journeyTween?.kill(); dimensionTween?.kill(); cameraTween?.kill();
      parcel.position.x = positions[step]; parcel.rotation.y = orientations[step];
      parcel.scale.set(scaleTarget.x, scaleTarget.y, scaleTarget.z);
      cameraSettings.span = mode === 'price' ? 6 : 9.2;
    }
    requestRender();
  }
  function syncVisibility() {
    const playing = visible && !document.hidden;
    if (playing) { journeyTween?.resume(); dimensionTween?.resume(); cameraTween?.resume(); requestRender(); }
    else { journeyTween?.pause(); dimensionTween?.pause(); cameraTween?.pause(); if (raf) cancelAnimationFrame(raf); raf = 0; }
  }
  const resizeObserver = new ResizeObserver(fitCamera);
  resizeObserver.observe(stage);
  const intersectionObserver = new IntersectionObserver(entries => {
    visible = entries[0]?.isIntersecting ?? true; syncVisibility();
  }, { rootMargin: '80px' });
  intersectionObserver.observe(stage);
  const onContextLost = event => { event.preventDefault(); failScene(); };
  canvas.addEventListener('webglcontextlost', onContextLost);
  window.addEventListener('chaski:journey', onJourney);
  window.addEventListener('chaski:dimensions', onDimensions);
  window.addEventListener('chaski:mode', onMode);
  document.addEventListener('visibilitychange', syncVisibility);
  motionPreference.addEventListener('change', syncMotion);

  function dispose() {
    if (disposed) return;
    disposed = true;
    if (raf) cancelAnimationFrame(raf); raf = 0;
    journeyTween?.kill(); dimensionTween?.kill(); cameraTween?.kill();
    resizeObserver.disconnect(); intersectionObserver.disconnect();
    window.removeEventListener('chaski:journey', onJourney);
    window.removeEventListener('chaski:dimensions', onDimensions);
    window.removeEventListener('chaski:mode', onMode);
    document.removeEventListener('visibilitychange', syncVisibility);
    motionPreference.removeEventListener('change', syncMotion);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    logo.onload = null; logo.onerror = null;
    key.shadow.dispose();
    for (const resource of resources) resource.dispose?.();
    resources.clear(); renderer.dispose();
    if (generatedCanvas) canvas.remove();
    showFallback();
  }
  function failScene() { failed = true; dispose(); }
  animateDimensions(currentDimensions(), true);
  const initialMode = document.getElementById('preise')?.dataset.mode || document.querySelector('[data-workbench-mode][aria-selected="true"]')?.dataset.workbenchMode || 'journey';
  setMode(initialMode, true);
  document.fonts?.ready.then(() => { if (!disposed && !failed) { drawLabel(); requestRender(); } });
  fitCamera();
  return dispose;
}

window.addEventListener('pagehide', () => disposeScene());
window.addEventListener('pageshow', event => { if (event.persisted) startScene(); });
startScene();






