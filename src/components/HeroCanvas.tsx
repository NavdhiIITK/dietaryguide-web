
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const HeroCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    if (mountRef.current) {
      // Clear any existing canvas
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);
    }
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create floating fruits
    const fruits: THREE.Mesh[] = [];
    const fruitGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    
    // Apple (red)
    const appleMaterial = new THREE.MeshPhongMaterial({ color: 0xff4500 });
    const apple = new THREE.Mesh(fruitGeometry, appleMaterial);
    apple.position.set(-3, 1, -2);
    scene.add(apple);
    fruits.push(apple);
    
    // Orange (orange)
    const orangeMaterial = new THREE.MeshPhongMaterial({ color: 0xffa500 });
    const orange = new THREE.Mesh(fruitGeometry, orangeMaterial);
    orange.position.set(3, -1, -1);
    orange.scale.set(0.8, 0.8, 0.8);
    scene.add(orange);
    fruits.push(orange);
    
    // Blueberry (blue)
    const blueberryMaterial = new THREE.MeshPhongMaterial({ color: 0x4169e1 });
    const blueberry = new THREE.Mesh(fruitGeometry, blueberryMaterial);
    blueberry.position.set(2, 2, -3);
    blueberry.scale.set(0.3, 0.3, 0.3);
    scene.add(blueberry);
    fruits.push(blueberry);
    
    // Avocado (green)
    const avocadoMaterial = new THREE.MeshPhongMaterial({ color: 0x2e8b57 });
    const avocado = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 16), 
      avocadoMaterial
    );
    avocado.position.set(-2, -2, -2);
    avocado.scale.set(0.7, 0.9, 0.7);
    scene.add(avocado);
    fruits.push(avocado);
    
    // Create a leaf
    const leafGeometry = new THREE.BufferGeometry();
    const leafMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x7cfc00, 
      side: THREE.DoubleSide 
    });
    
    // Create a simple leaf shape
    const vertices = new Float32Array([
      0, 0, 0,    // base of leaf
      1, 0.5, 0,  // right edge
      0, 2, 0,    // tip of leaf
      -1, 0.5, 0, // left edge
    ]);
    
    const indices = [
      0, 1, 2,
      0, 2, 3,
    ];
    
    leafGeometry.setIndex(indices);
    leafGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    leafGeometry.computeVertexNormals();
    
    const leaf1 = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf1.position.set(1, 1, -3);
    leaf1.scale.set(0.5, 0.5, 0.5);
    scene.add(leaf1);
    
    const leaf2 = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf2.position.set(-1.5, 0, -2);
    leaf2.rotation.z = Math.PI / 3;
    leaf2.scale.set(0.4, 0.4, 0.4);
    scene.add(leaf2);
    
    // Position camera
    camera.position.z = 5;
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse interaction
    const mouse = new THREE.Vector2();
    const windowHalf = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX - windowHalf.x) / windowHalf.x;
      mouse.y = (event.clientY - windowHalf.y) / windowHalf.y;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate fruits
      fruits.forEach((fruit, index) => {
        fruit.rotation.x = elapsedTime * 0.1 * (index % 2 === 0 ? 1 : -1);
        fruit.rotation.y = elapsedTime * 0.15;
        
        // Add floating animation
        fruit.position.y += Math.sin(elapsedTime + index) * 0.002;
      });
      
      // Rotate leaves
      leaf1.rotation.z = Math.sin(elapsedTime * 0.5) * 0.1;
      leaf2.rotation.z = Math.PI / 3 + Math.sin(elapsedTime * 0.3) * 0.1;
      
      // Move items based on mouse position
      fruits.forEach(fruit => {
        fruit.position.x += (mouse.x * 0.01 - fruit.position.x * 0.01) * 0.1;
        fruit.position.y += (-mouse.y * 0.01 - fruit.position.y * 0.01) * 0.1;
      });
      
      leaf1.position.x += (mouse.x * 0.01 - leaf1.position.x * 0.01) * 0.05;
      leaf1.position.y += (-mouse.y * 0.01 - leaf1.position.y * 0.01) * 0.05;
      
      leaf2.position.x += (mouse.x * 0.01 - leaf2.position.x * 0.01) * 0.03;
      leaf2.position.y += (-mouse.y * 0.01 - leaf2.position.y * 0.01) * 0.03;
      
      // Render
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose geometries and materials
      fruitGeometry.dispose();
      appleMaterial.dispose();
      orangeMaterial.dispose();
      blueberryMaterial.dispose();
      avocadoMaterial.dispose();
      leafGeometry.dispose();
      leafMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default HeroCanvas;
