'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import useSound from 'use-sound'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'

// Mock data for knowledge graph
const mockNodes = [
  { id: '1', title: 'Getting Started', x: 0, y: 0, z: 0, category: 'documentation' },
  { id: '2', title: 'API Documentation', x: 5, y: 3, z: 2, category: 'engineering' },
  { id: '3', title: 'Design System', x: -3, y: 2, z: -4, category: 'design' },
  { id: '4', title: 'Marketing Guidelines', x: 4, y: -2, z: -1, category: 'marketing' },
  { id: '5', title: 'Onboarding Process', x: -5, y: -1, z: 3, category: 'hr' },
]

const mockEdges = [
  { source: '1', target: '2' },
  { source: '1', target: '3' },
  { source: '2', target: '4' },
  { source: '3', target: '5' },
]

function Node({ position, title, category, onClick }: { position: [number, number, number], title: string, category: string, onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.25 })

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  const colorMap: Record<string, string> = {
    documentation: '#0A66C2',
    engineering: '#007AFF',
    design: '#00A86B',
    marketing: '#FF6B35',
    hr: '#8A4FFF',
  }

  return (
    <motion.group
      whileHover={{ scale: 1.2 }}
      onHoverStart={() => {
        setHovered(true)
        playHover()
      }}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
    >
      <mesh position={position} ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={colorMap[category] || '#6B7280'} 
          transparent 
          opacity={0.8}
          emissive={hovered ? colorMap[category] || '#6B7280' : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
      {hovered && (
        <Text
          position={[position[0], position[1] + 1, position[2]]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      )}
    </motion.group>
  )
}

function Edge({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
  const ref = useRef<THREE.Line>(null)
  
  const points = [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
  ]
  
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  
  return (
    <line ref={ref}>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial attach="material" color="#9CA3AF" linewidth={1} />
    </line>
  )
}

export default function GraphView() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.25 })

  const handleNodeClick = (id: string) => {
    setSelectedNode(id)
    // In a real app, this would navigate to the article
    console.log(`Navigate to article ${id}`)
  }

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-lg font-bold text-white">Knowledge Graph</h3>
        <p className="text-gray-300 text-sm">Click and drag to explore connections</p>
      </div>
      
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
        
        {mockEdges.map((edge, index) => {
          const sourceNode = mockNodes.find(n => n.id === edge.source)
          const targetNode = mockNodes.find(n => n.id === edge.target)
          
          if (!sourceNode || !targetNode) return null
          
          return (
            <Edge 
              key={index}
              start={[sourceNode.x, sourceNode.y, sourceNode.z]}
              end={[targetNode.x, targetNode.y, targetNode.z]}
            />
          )
        })}
        
        {mockNodes.map((node) => (
          <Node
            key={node.id}
            position={[node.x, node.y, node.z]}
            title={node.title}
            category={node.category}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </Canvas>
      
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg p-4 text-white"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-lg">
                {mockNodes.find(n => n.id === selectedNode)?.title}
              </h4>
              <p className="text-gray-300 text-sm mt-1">
                Category: {mockNodes.find(n => n.id === selectedNode)?.category}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => playHover()}
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
          <div className="mt-3 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => playHover()}
              className="px-3 py-1 bg-primary-600 rounded-md text-sm"
            >
              View Article
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => playHover()}
              className="px-3 py-1 bg-gray-700 rounded-md text-sm"
            >
              Explore Connections
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}