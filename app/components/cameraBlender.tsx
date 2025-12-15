"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function CameraBlender() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null); // Cleanup 혹은 외부 접근 시 사용하기 위해 Renderer를 따로 저장.
  const router = useRouter();

  const onClickBlender = () => {
    if (!mountRef.current) return;

    router.push("/upload");
  };

  useEffect(() => {
    const scene = new THREE.Scene(); // Scene 생성
    scene.background = new THREE.Color(0x0f0f0f);
    console.log(mountRef.current?.clientWidth);
    if (!mountRef.current) {
      console.log("Camera Blender Not Mount!");
      return;
    }

    // Camera 생성
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current?.clientWidth / mountRef.current?.clientHeight,
      0.1,
      1000
    );
    // Camera Position 설정
    camera.position.set(0, 0, 5);

    // WebGL Renderer 생성 (antialias -> 부드러운 렌더링 제공)
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer 출력 캔버스 크기 설정
    renderer.setSize(
      mountRef.current?.clientWidth,
      mountRef.current?.clientHeight
    );
    if (mountRef.current) {
      // 실제 DOM 노드에 존재 할때 renderer를 해당 DOM에 붙임.
      mountRef.current.appendChild(renderer.domElement);
      // 이후 rendererRef에 저장.
      rendererRef.current = renderer;
    }

    // Light
    // 주변광을 생성해서 씬 전체에 균일한 광 제공.
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // * DirectionalLight -> 위치보다 방향이 중요. 현재는 위치로 방향을 간섭함.
    // 평행광 추가
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 평행광 위치 설정. 이로 인해 그림자가 생성됨.
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // Model Loader
    // GLTF Loader 인스턴스 생성
    const loader = new GLTFLoader();

    loader.load("/render_image.glb", (gltf) => {
      // 모델링된 파일을 비동기 로드. 로드 성공 시 모델의 루트 씬을 가져와 model로 저장하고, 스케일 설정 후 씬에 추가함.
      const model = gltf.scene;
      model.scale.set(1, 1, 1);
      scene.add(model);
    });

    // Animate
    // 애니메이션 루프 생성. 여기에 모델 회전, 물리 업데이트, 컨트롤 업데이트 등을 넣을 수 있음.
    const animate = () => {
      // requestAnimationFrame를 반복으로 호출.
      requestAnimationFrame(animate);
      // 아래 코드로 씬을 렌더링
      renderer.render(scene, camera);
    };
    animate();

    // CleanUp -> Component 언마운트 시 실행, 리소스를 안전하게 정리.

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose(); // WebGL 관련 내부 자원(버퍼 / 텍스쳐 등)을 해제함.
        rendererRef.current.forceContextLoss?.(); // 렌더러의 GL Context를 강제로 잃게 하여 메모리 누수 방지.

        if (
          rendererRef.current.domElement &&
          rendererRef.current.domElement.parentNode
        ) {
          rendererRef.current.domElement.parentNode.removeChild(
            rendererRef.current.domElement
          );
        }
      }
    };
  }, [mountRef]);

  return (
    <div ref={mountRef} className="w-full h-full" onClick={onClickBlender} />
  );
}
