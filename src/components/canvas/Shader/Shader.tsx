import * as THREE from 'three'
import { useFrame, extend, useLoader } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import { shaderMaterial } from '@react-three/drei'
import { BufferAttribute } from "three";

import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'
import { useRouter } from 'next/router'
import circleImg from "./../../../assets/index.png";

const ColorShiftMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.05, 0.0, 0.025),
  },
  vertex,
  fragment
)

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
// @ts-ignore
ColorShiftMaterial.key = THREE.MathUtils.generateUUID()

extend({ ColorShiftMaterial })

const Shader = (props) => {
  const meshRef = useRef(null)
  const [hovered, setHover] = useState(false)
  const router = useRouter()

  // useFrame((state, delta) => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01
  //   }
  //   if (meshRef.current.material) {
  //     meshRef.current.material.uniforms.time.value +=
  //       Math.sin(delta / 2) * Math.cos(delta / 2)
  //   }
  // })
  const CircleImg = useLoader(THREE.TextureLoader, circleImg.src);
  const count = 10;
  const sep = 1;
  let positions = useMemo(() => {
    let positions = [];
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        for (let yi = 0; yi < count; yi++) {
          let x = sep * (xi - count / 2);
          let z = sep * (zi - count / 2);
          let y = sep * (yi - count / 2);
          positions.push(x, y, z);

        }
      }
    }
    return new Float32Array(positions);
  }, [count, sep]);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute

          attach="attributes-position"
          array={positions}
          count={positions.length / 3} //
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        map={CircleImg}
        color={0x000000}
        sizes={0.1}
        sizeAttenuation
        transparent={false}
        alphaTest={0.7}
        opacity={0.9}
      />
    </points>
  )
}

export default Shader
