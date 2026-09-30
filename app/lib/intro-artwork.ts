type Point = { x: number; y: number; z: number };
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** A small, deterministic particle sculpture. No video, network assets, or WebGL. */
export function createIntroArtwork(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let lastElapsed = 0;
  const count = 660;
  const points: Point[] = Array.from({ length: count }, (_, i) => {
    const progress = i / count;
    // Sample the strokes of an A and the circumference of an O.
    if (progress < .24) {
      const t = progress / .24;
      return { x: mix(-.93, -.48, t), y: mix(.58, -.58, t), z: 0 };
    }
    if (progress < .48) {
      const t = (progress - .24) / .24;
      return { x: mix(-.48, -.03, t), y: mix(-.58, .58, t), z: 0 };
    }
    if (progress < .58) {
      const t = (progress - .48) / .10;
      return { x: mix(-.77, -.19, t), y: .16, z: 0 };
    }
    const angle = (progress - .58) / .42 * Math.PI * 2;
    return { x: .49 + Math.cos(angle) * .42, y: Math.sin(angle) * .59, z: 0 };
  });

  const draw = (elapsed: number) => {
    lastElapsed = elapsed;
    if (!context || !width || !height) return;
    const ctx = context;
    const seconds = elapsed / 1000;
    const toWave = smooth((elapsed - 1000) / 1600);
    const toMonogram = smooth((elapsed - 2850) / 1900);
    const arrive = smooth(elapsed / 1400);
    const scale = Math.min(width * .41, height * .4);
    const cx = width * .5;
    const cy = height * .5;
    ctx.clearRect(0, 0, width, height);

    // Fine orbital filaments establish depth behind the point cloud.
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-.3 + seconds * .035);
    for (let ring = 0; ring < 4; ring++) {
      ctx.beginPath();
      ctx.ellipse(0, 0, scale * (1.04 + ring * .105), scale * (.3 + ring * .19), ring * .52, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(192, 223, 155, ${(.09 - ring * .013) * (1 - toMonogram * .65)})`;
      ctx.lineWidth = .7;
      ctx.stroke();
    }
    ctx.restore();

    const rendered: { x: number; y: number; alpha: number; radius: number }[] = [];
    for (let i = 0; i < count; i++) {
      const angle = i * 2.3999632297 + seconds * .22;
      const sphereY = 1 - ((i + .5) / count) * 2;
      const ring = Math.sqrt(1 - sphereY * sphereY);
      const scatter = 1 + (1 - arrive) * 1.15;
      const sphereX = Math.cos(angle) * ring * scatter;
      const sphereZ = Math.sin(angle) * ring;
      const row = Math.floor(i / 66);
      const waveX = (i % 66) / 65 * 2 - 1;
      const waveY = Math.sin(waveX * 4 + seconds * .8 + row * .16) * .31 + (row - 4.5) * .06;
      const target = points[i];
      const flutter = Math.sin(i * 1.91 + seconds) * .009;
      const x = mix(mix(sphereX, waveX, toWave), target.x + flutter, toMonogram);
      const y = mix(mix(sphereY * .9 * scatter, waveY, toWave), target.y + flutter, toMonogram);
      const z = mix(sphereZ, 0, toMonogram);
      const perspective = 1 + z * .13 * (1 - toWave);
      rendered.push({
        x: cx + x * scale * perspective,
        y: cy + y * scale * perspective,
        alpha: (.3 + (z + 1) * .27) * (.2 + arrive * .8),
        radius: (i % 13 === 0 ? 2.1 : .95) + (z + 1) * .35,
      });
    }

    for (let i = 0; i < rendered.length; i++) {
      const point = rendered[i];
      const next = rendered[i + 1];
      if (next && i % 66 !== 65 && toWave > .1) {
        const distance = Math.hypot(next.x - point.x, next.y - point.y);
        if (distance < scale * .12) {
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = `rgba(205, 235, 162, ${.16 * toWave})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${i % 7 === 0 ? "242, 246, 223" : "201, 235, 152"}, ${point.alpha})`;
      ctx.fill();
      if (i % 33 === 0) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 235, 152, ${point.alpha * .065})`;
        ctx.fill();
      }
    }
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context?.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(lastElapsed);
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  return { draw, resize, destroy: () => observer.disconnect() };
}
