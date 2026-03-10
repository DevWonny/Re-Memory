"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// store
import { useAuth } from "@/store/auth";
import { useModalStore } from "@/store/modal";

export default function CameraBlender() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null); // Cleanup 혹은 외부 접근 시 사용하기 위해 Renderer를 따로 저장.
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const router = useRouter();
  const session = useAuth((state) => state.session);
  const openModal = useModalStore((state) => state.openModal);

  const onClickBlender = (e: React.MouseEvent) => {
    if (!mountRef.current || !cameraRef.current || !sceneRef.current) return;
    // 마우스 클릭 위치를 -1 ~ 1 사이의 NDC 좌표로 변환
    const rect = mountRef.current.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Raycaster 설정
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    // 교차하는 물체 확인(scene.children 전체 검사)
    const intersects = raycaster.intersectObjects(
      sceneRef.current.children,
      true,
    );

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;

      // 특정 이름을 가진 부위를 클릭했을 때만 동작
      if (clickedObject.name === "Cylinder001") {
        if (!session) {
          openModal("LOGIN_CHECK");
          return;
        }
        router.push("/upload");
      }
    }
  };

  useEffect(() => {
    const scene = new THREE.Scene(); // Scene 생성
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0f0f0f);
    if (!mountRef.current) {
      console.log("Camera Blender Not Mount!");
      return;
    }

    // Camera 생성
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current?.clientWidth / mountRef.current?.clientHeight,
      0.1,
      1000,
    );
    cameraRef.current = camera;
    // Camera Position 설정
    camera.position.set(0, 0, 5);

    // WebGL Renderer 생성 (antialias -> 부드러운 렌더링 제공)
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer 출력 캔버스 크기 설정
    renderer.setSize(
      mountRef.current?.clientWidth,
      mountRef.current?.clientHeight,
    );
    if (mountRef.current) {
      // 실제 DOM 노드에 존재 할때 renderer를 해당 DOM에 붙임.
      mountRef.current.appendChild(renderer.domElement);
      // 이후 rendererRef에 저장.
      rendererRef.current = renderer;
    }

    // Orbit Controls
    const orbit = new OrbitControls(camera, renderer.domElement);

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

    loader.load("/Kodac_rendering_image.glb", (gltf) => {
      // 모델링된 파일을 비동기 로드. 로드 성공 시 모델의 루트 씬을 가져와 model로 저장하고, 스케일 설정 후 씬에 추가함.
      const model = gltf.scene;
      model.scale.set(1, 1, 1);
      // 초기 뷰 설정
      model.rotation.y = THREE.MathUtils.degToRad(45);
      model.rotation.x = THREE.MathUtils.degToRad(45);
      scene.add(model);
    });

    // Resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      // 카메라 종회비 수정
      camera.aspect = width / height;
      // 변경사항 적용
      camera.updateProjectionMatrix();
      // 렌더러 크기 수정
      rendererRef.current.setSize(width, height);
    };

    // Event Listener
    window.addEventListener("resize", handleResize);
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
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose(); // WebGL 관련 내부 자원(버퍼 / 텍스쳐 등)을 해제함.
        rendererRef.current.forceContextLoss?.(); // 렌더러의 GL Context를 강제로 잃게 하여 메모리 누수 방지.

        if (
          rendererRef.current.domElement &&
          rendererRef.current.domElement.parentNode
        ) {
          rendererRef.current.domElement.parentNode.removeChild(
            rendererRef.current.domElement,
          );
        }
      }
    };
  }, [mountRef]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      onClick={(e) => onClickBlender(e)}
    />
  );
}
