import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import './Background3D.css';

/* ---- Vertex & Fragment Shaders for Wireframe TorusKnot ---- */
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  uniform float time;
  
  void main() {
    vUv = uv;
    vNormal = normal;
    vPosition = position;
    
    vec3 newPosition = position + normal * sin(position.y * 5.0 + time) * 0.05;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  uniform float time;
  uniform bool pulseEnabled;
  uniform float opacity;

  vec3 colorA = vec3(0.9, 0.1, 0.6);
  vec3 colorB = vec3(0.1, 0.8, 0.9);
  vec3 colorC = vec3(0.8, 0.3, 0.1);

  void main() {
    float pulse = pulseEnabled ? sin(time * 2.5) * 0.5 + 0.5 : 0.75;
    
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    float gradient = smoothstep(0.1, 0.5, dist);
    
    float interference = sin(vPosition.x * 10.0 + time) * sin(vPosition.y * 10.0 + time) * 0.5 + 0.5;
    
    vec3 colorMix1 = mix(colorA, colorB, pulse * gradient);
    vec3 colorMix2 = mix(colorMix1, colorC, interference);
    
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float rim = 1.0 - max(dot(vNormal, viewDirection), 0.0);
    rim = pow(rim, 3.0);
    
    float holographic = sin(vPosition.x * 20.0 + time) * sin(vPosition.y * 20.0 + time) * 0.1;
    
    vec3 finalColor = colorMix2 + rim * 0.5 + holographic;
    
    gl_FragColor = vec4(finalColor, opacity);
  }
`;

/* ---- Starfield Particle Shaders ---- */
const starsVertexShader = `
  attribute float size;
  varying float vSize;
  
  void main() {
    vSize = size;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starsFragmentShader = `
  uniform float opacity;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    float brightness = 1.0 - (dist * 2.0);
    brightness = pow(brightness, 3.0);
    
    gl_FragColor = vec4(1.0, 1.0, 1.0, brightness * opacity);
  }
`;

/* ---- Starfield Component ---- */
const Starfield = ({ scrollProgress, isMobile }) => {
  const pointsRef = useRef();

  const [geometry, material] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = isMobile ? 2500 : 7000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1200;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: { opacity: { value: 1.0 } },
      vertexShader: starsVertexShader,
      fragmentShader: starsFragmentShader,
      transparent: true,
      depthWrite: false,
    });

    return [geo, mat];
  }, [isMobile]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0002;
      pointsRef.current.rotation.y += 0.0003;
    }
    material.uniforms.opacity.value = Math.max(0, 1 - scrollProgress * 1.2);
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

/* ---- Main 3D Scene Controller ---- */
const BackgroundScene = ({ scrollProgress, setBlurAmount, isMobile }) => {
  const meshRef = useRef();
  const { camera } = useThree();

  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
      pulseEnabled: { value: true },
      opacity: { value: 1.0 },
    }),
    []
  );

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        wireframe: true,
        transparent: true,
      }),
    [uniforms]
  );

  useFrame((state, delta) => {
    uniforms.time.value += delta;

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;

      const mouseX = isMobile ? 0 : state.pointer.x * 0.8;
      const mouseY = isMobile ? 0 : state.pointer.y * 0.8;

      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        mouseX * 0.5 + scrollProgress * Math.PI,
        0.05
      );

      const targetZ = 4.2 + scrollProgress * 11.8;
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);

      const targetY = (scrollProgress - 0.5) * -4.0;
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY - mouseY * 0.5,
        0.05
      );
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        mouseX * 0.5,
        0.05
      );

      let currentOpacity = 1.0;
      if (scrollProgress > 0.65) {
        currentOpacity = Math.max(0, 1 - (scrollProgress - 0.65) / 0.3);
      }
      uniforms.opacity.value = THREE.MathUtils.lerp(
        uniforms.opacity.value,
        currentOpacity,
        0.1
      );

      const blur = scrollProgress > 0.6 ? (scrollProgress - 0.6) * 25 : 0;
      setBlurAmount(blur);
    }
  });

  return (
    <>
      <mesh ref={meshRef} material={material}>
        <torusKnotGeometry args={isMobile ? [2, 0.5, 128, 24] : [2, 0.5, 256, 48]} />
      </mesh>
      <Starfield scrollProgress={scrollProgress} isMobile={isMobile} />
    </>
  );
};

/* ---- Full-Screen Background Component ---- */
const Background3D = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(hover: none)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="bg-3d-wrapper"
      style={{
        filter: `blur(${blurAmount}px)`,
        opacity: Math.max(0, 1 - (scrollProgress - 0.7) * 3),
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
      >
        <BackgroundScene
          scrollProgress={scrollProgress}
          setBlurAmount={setBlurAmount}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
};

export default Background3D;
