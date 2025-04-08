
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
    
    // Create natural organic elements
    const elements: THREE.Mesh[] = [];
    
    // Create a leaf geometry
    const leafGeometry = new THREE.BufferGeometry();
    const leafShape = new THREE.Shape();

    // Create a leaf shape
    leafShape.moveTo(0, 0);
    leafShape.bezierCurveTo(1, 1, 2, 0, 3, 0);
    leafShape.bezierCurveTo(3, 1, 2, 2, 0, 2);
    leafShape.bezierCurveTo(-2, 2, -3, 1, -3, 0);
    leafShape.bezierCurveTo(-2, 0, -1, 1, 0, 0);
    
    // Create leaf geometry
    const leafDetail = new THREE.ExtrudeGeometry(leafShape, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3
    });
    
    // Green leaves (multiple)
    const leafMaterials = [
      new THREE.MeshPhongMaterial({ color: 0x4CA64C, shininess: 50 }), // Medium green
      new THREE.MeshPhongMaterial({ color: 0x2E8B57, shininess: 30 }), // Sea green
      new THREE.MeshPhongMaterial({ color: 0x228B22, shininess: 70 })  // Forest green
    ];
    
    for (let i = 0; i < 7; i++) {
      const leafMaterial = leafMaterials[i % leafMaterials.length];
      const leaf = new THREE.Mesh(leafDetail, leafMaterial);
      
      leaf.scale.set(0.25, 0.25, 0.25);
      leaf.rotation.x = Math.random() * Math.PI;
      leaf.rotation.y = Math.random() * Math.PI;
      leaf.rotation.z = Math.random() * Math.PI;
      
      leaf.position.x = (Math.random() - 0.5) * 10;
      leaf.position.y = (Math.random() - 0.5) * 6;
      leaf.position.z = (Math.random() - 0.5) * 10 - 5;
      
      scene.add(leaf);
      elements.push(leaf);
    }
    
    // Create water droplet (sphere with refractive material)
    const dropletGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const dropletMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xADD8E6,
      transparent: true,
      opacity: 0.8,
      shininess: 90
    });
    
    for (let i = 0; i < 5; i++) {
      const droplet = new THREE.Mesh(dropletGeometry, dropletMaterial);
      
      droplet.scale.set(0.3 + Math.random() * 0.3, 0.3 + Math.random() * 0.3, 0.3 + Math.random() * 0.3);
      droplet.position.x = (Math.random() - 0.5) * 8;
      droplet.position.y = (Math.random() - 0.5) * 5;
      droplet.position.z = (Math.random() - 0.5) * 5 - 3;
      
      scene.add(droplet);
      elements.push(droplet);
    }
    
    // Create flower
    const petalGeometry = new THREE.BufferGeometry();
    const petalShape = new THREE.Shape();
    
    // Create petal shape
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.5, 1, 1, 2, 0, 3);
    petalShape.bezierCurveTo(-1, 2, -0.5, 1, 0, 0);
    
    // Create petal geometry
    const petalDetail = new THREE.ExtrudeGeometry(petalShape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 2
    });
    
    // Create flower center
    const centerGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const centerMaterial = new THREE.MeshPhongMaterial({ color: 0xFFF44F }); // Yellow
    
    // Create complete flowers
    const flowerColors = [
      0xFFB6C1, // Light pink
      0xE6E6FA, // Lavender
      0xFFFFE0  // Light yellow
    ];
    
    for (let i = 0; i < 3; i++) {
      const flowerGroup = new THREE.Group();
      
      // Create petals
      const petalMaterial = new THREE.MeshPhongMaterial({ color: flowerColors[i % flowerColors.length] });
      for (let j = 0; j < 6; j++) {
        const petal = new THREE.Mesh(petalDetail, petalMaterial);
        petal.rotation.z = (j / 6) * Math.PI * 2;
        petal.scale.set(0.2, 0.2, 0.2);
        flowerGroup.add(petal);
      }
      
      // Add center
      const center = new THREE.Mesh(centerGeometry, centerMaterial);
      center.scale.set(0.2, 0.2, 0.2);
      flowerGroup.add(center);
      
      // Position the flower
      flowerGroup.position.x = (Math.random() - 0.5) * 10;
      flowerGroup.position.y = (Math.random() - 0.5) * 6;
      flowerGroup.position.z = (Math.random() - 0.5) * 5 - 4;
      
      // Random rotation
      flowerGroup.rotation.x = Math.random() * Math.PI;
      flowerGroup.rotation.y = Math.random() * Math.PI;
      
      scene.add(flowerGroup);
      elements.push(flowerGroup);
    }
    
    // Position camera
    camera.position.z = 8;
    
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
      
      // Animate all elements with gentle floating motion
      elements.forEach((element, index) => {
        // Different animation frequency and amplitude for each element
        const frequency = 0.5 + Math.random() * 0.5;
        const amplitude = 0.05 + Math.random() * 0.1;
        
        element.position.y += Math.sin(elapsedTime * frequency + index) * amplitude * 0.02;
        element.rotation.x += 0.001 * (index % 2 === 0 ? 1 : -1);
        element.rotation.y += 0.001 * (index % 3 === 0 ? 1 : -1);
        
        // Subtle response to mouse movement
        element.position.x += (mouse.x * 0.01 - element.position.x * 0.01) * 0.1;
        element.position.y += (-mouse.y * 0.01 - element.position.y * 0.01) * 0.1;
      });
      
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
      elements.forEach(element => {
        if (element instanceof THREE.Mesh) {
          element.geometry.dispose();
          if (Array.isArray(element.material)) {
            element.material.forEach(material => material.dispose());
          } else {
            element.material.dispose();
          }
        }
      });
      
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
