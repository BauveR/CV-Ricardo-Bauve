import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";

// ─── AJUSTES GLOBALES (no dependen del breakpoint) ───────────────────────────
const CONFIG = {
  cameraFov: 45,
  scrollPerRotation: 800,   // px para una vuelta completa — menor = más rápido
  scrollTiltX: 0.0003,      // inclinación sutil en X al hacer scroll

  // Gravedad cero — movimiento orgánico idle
  idleSpinY:   0.18,   // velocidad de giro Y continuo (rad/s)
  floatAmp:    0.09,   // amplitud del flote arriba/abajo (unidades Three.js)
  floatSpeed:  0.55,   // velocidad del flote (ciclos/s)
  wobbleAmpX:  0.04,   // amplitud del balanceo en X
  wobbleAmpZ:  0.03,   // amplitud del balanceo en Z
  wobbleSpeedX: 0.42,  // velocidad del balanceo X
  wobbleSpeedZ: 0.31,  // velocidad del balanceo Z (distinto para que sea asimétrico)
};

// ─── BREAKPOINTS ──────────────────────────────────────────────────────────────
// Edita cada fila para ajustar el modelo en ese ancho exacto.
// Los valores intermedios se interpolan automáticamente.
//
// cameraZ      → distancia de la cámara (menor = más cerca)
// cameraY      → altura de la cámara   (0 = a nivel del modelo)
// cameraLookAtX → X: positivo → izq  | negativo → der
// cameraLookAtY → Y: positivo → baja | negativo → sube
// canvasSize   → tamaño CSS del contenedor (string clamp)
const BREAKPOINTS = [
  { w: 375,  cameraZ: 4,   cameraY: 1, cameraLookAtX:  0.0,  cameraLookAtY: 0.0, canvasSize: "clamp(180px, 65vw,  260px)" },
  { w: 768,  cameraZ: 4,   cameraY: 1, cameraLookAtX:  0.0,  cameraLookAtY: 0.0, canvasSize: "clamp(240px, 32vw,  320px)" },
  { w: 1024, cameraZ: 4,   cameraY: 1, cameraLookAtX:  0.0,  cameraLookAtY: 0.0, canvasSize: "clamp(280px, 22vw,  380px)" },
  { w: 1366, cameraZ: 4,   cameraY: 1, cameraLookAtX:  0.0,  cameraLookAtY: 0.0, canvasSize: "clamp(280px, 22vw,  380px)" },
  { w: 1920, cameraZ: 4,   cameraY: 1, cameraLookAtX:  0.0,  cameraLookAtY: 0.0, canvasSize: "clamp(280px, 22vw,  380px)" },
];
// ─────────────────────────────────────────────────────────────────────────────

type ViewCfg = Omit<typeof BREAKPOINTS[0], "w">;

function getViewCfg(): ViewCfg {
  const w = window.innerWidth;
  const bp = BREAKPOINTS;
  if (w <= bp[0].w) return bp[0];
  if (w >= bp[bp.length - 1].w) return bp[bp.length - 1];
  const hi = bp.findIndex((b) => b.w >= w);
  const lo = hi - 1;
  const t = (w - bp[lo].w) / (bp[hi].w - bp[lo].w);
  const lerp = (a: number, b: number) => a + (b - a) * t;
  return {
    cameraZ:       lerp(bp[lo].cameraZ,       bp[hi].cameraZ),
    cameraY:       lerp(bp[lo].cameraY,       bp[hi].cameraY),
    cameraLookAtX: lerp(bp[lo].cameraLookAtX, bp[hi].cameraLookAtX),
    cameraLookAtY: lerp(bp[lo].cameraLookAtY, bp[hi].cameraLookAtY),
    canvasSize: bp[lo].canvasSize, // string, no se interpola — usa el del breakpoint inferior
  };
}

useGLTF.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

// Actualiza la cámara cada frame según el viewCfg activo
function CameraSync({ viewCfg }: { viewCfg: ViewCfg }) {
  const { camera, invalidate } = useThree();
  useFrame(() => {
    camera.position.y = viewCfg.cameraY;
    camera.position.z = viewCfg.cameraZ;
    camera.lookAt(viewCfg.cameraLookAtX, viewCfg.cameraLookAtY, 0);
    invalidate();
  });
  return null;
}

function Model({ url, scrollY }: { url: string; scrollY: number }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, group);
  const rotY  = useRef(0);
  const rotX  = useRef(0);
  const idleY = useRef(0); // acumula el giro idle continuo

  useEffect(() => {
    if (names.length > 0) {
      actions[names[0]]?.reset().fadeIn(0.3).play();
    }
    return () => {
      names.forEach((name) => actions[name]?.fadeOut(0.3));
    };
  }, [actions, names]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    // Giro Y: scroll + drift idle continuo
    const targetY = (scrollY / CONFIG.scrollPerRotation) * Math.PI * 2;
    rotY.current = THREE.MathUtils.lerp(rotY.current, targetY, 1 - Math.pow(0.05, delta));
    idleY.current += delta * CONFIG.idleSpinY;

    // Tilt X: scroll + balanceo orgánico
    const targetX = scrollY * CONFIG.scrollTiltX;
    rotX.current = THREE.MathUtils.lerp(rotX.current, targetX, 1 - Math.pow(0.03, delta));

    group.current.rotation.y = rotY.current + idleY.current;
    group.current.rotation.x = rotX.current + Math.sin(t * CONFIG.wobbleSpeedX) * CONFIG.wobbleAmpX;
    group.current.rotation.z = Math.sin(t * CONFIG.wobbleSpeedZ) * CONFIG.wobbleAmpZ;

    // Flote suave arriba/abajo
    group.current.position.y = Math.sin(t * CONFIG.floatSpeed) * CONFIG.floatAmp;
  });

  return <primitive ref={group} object={scene} scale={1} />;
}

export function OctopusCanvas({ url }: { url: string }) {
  const [scrollY, setScrollY] = useState(0);
  const [viewCfg, setViewCfg] = useState<ViewCfg>(() => getViewCfg());
  const invalidateRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      invalidateRef.current?.();
    };
    const onResize = () => {
      setViewCfg(getViewCfg());
      invalidateRef.current?.();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      style={{
        width: viewCfg.canvasSize,
        height: viewCfg.canvasSize,
        position: "relative",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <Canvas
        frameloop="always"
        camera={{ position: [0, viewCfg.cameraY, viewCfg.cameraZ], fov: CONFIG.cameraFov, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
        dpr={[1, 2]}
        onCreated={({ invalidate }) => { invalidateRef.current = invalidate; }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 4]} intensity={1.0} color="#fff4e0" />
        <directionalLight position={[-4, 4, -4]} intensity={0.6} color="#d4e8ff" />
        <directionalLight position={[0, -4, 2]} intensity={0.4} color="#ffffff" />

        <Suspense fallback={null}>
          <CameraSync viewCfg={viewCfg} />
          <Model url={url} scrollY={scrollY} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export const preloadOctopus = (url: string) => useGLTF.preload(url);
