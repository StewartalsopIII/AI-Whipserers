'use client';

import { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Connection {
  start: Point;
  end: Point;
  active: boolean;
  progress: number;
  thickness: number;
  isBeam?: boolean; // Flag for special beam connections
  beamProgress?: number; // Track beam animation progress
  beamOrigin?: string; // ID of the question that initiated the beam
}

interface NetworkVisualizerProps {
  questionIds: string[];
  activeQuestionId: string | null;
}

export function NetworkVisualizer({ questionIds, activeQuestionId }: NetworkVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [connections, setConnections] = useState<Connection[]>([]);
  const [nodes, setNodes] = useState<Point[]>([]);
  const [terminalPosition, setTerminalPosition] = useState<Point>({ x: 0, y: 0 });
  const [silhouettes, setSilhouettes] = useState<Point[]>([]);
  const animationFrameRef = useRef<number>();
  
  // Initialize canvas and get dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
        
        // Set canvas dimensions
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        
        // Set terminal position (center)
        setTerminalPosition({ x: width / 2, y: height / 2 });
        
        // Generate silhouettes positions
        setSilhouettes([
          { x: width * 0.2, y: height * 0.65 },
          { x: width * 0.8, y: height * 0.7 }
        ]);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Find question elements positions and create connections
  useEffect(() => {
    const findQuestionElements = () => {
      const newNodes: Point[] = [];
      const newConnections: Connection[] = [];
      const nodePositions: {[id: string]: Point} = {}; // Map to store question positions by ID
      
      // First collect all node positions
      questionIds.forEach(id => {
        // Find the question element by id
        const element = document.getElementById(`question-${id}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const canvasRect = canvasRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
          
          // Calculate position relative to canvas
          const x = rect.left + rect.width / 2 - canvasRect.left;
          const y = rect.top + rect.height / 2 - canvasRect.top;
          
          newNodes.push({ x, y });
          nodePositions[id] = { x, y };
          
          // Create connection to terminal
          newConnections.push({
            start: { x, y },
            end: terminalPosition,
            active: id === activeQuestionId,
            progress: id === activeQuestionId ? 1 : 0,
            thickness: id === activeQuestionId ? 2 : 0.5
          });
        }
      });
      
      // If a question is active, create beam connections to other questions
      if (activeQuestionId && nodePositions[activeQuestionId]) {
        const originPoint = nodePositions[activeQuestionId];
        
        // Create beams to other questions
        questionIds.forEach(targetId => {
          if (targetId !== activeQuestionId && nodePositions[targetId]) {
            newConnections.push({
              start: originPoint,
              end: nodePositions[targetId],
              active: true,
              progress: 1,
              thickness: 1.5,
              isBeam: true,
              beamProgress: 0, // Start at 0, will animate
              beamOrigin: activeQuestionId
            });
          }
        });
      }
      
      // Add connections between silhouettes and terminal
      silhouettes.forEach(silhouette => {
        newConnections.push({
          start: silhouette,
          end: terminalPosition,
          active: true,
          progress: 1,
          thickness: 1
        });
      });
      
      // Add some random connections between questions for the mesh effect
      for (let i = 0; i < newNodes.length; i++) {
        for (let j = i + 1; j < newNodes.length; j++) {
          if (Math.random() > 0.7) { // Only create some connections, not all
            newConnections.push({
              start: newNodes[i],
              end: newNodes[j],
              active: false,
              progress: 1,
              thickness: 0.3
            });
          }
        }
      }
      
      setNodes(newNodes);
      setConnections(newConnections);
    };
    
    // Delay finding elements to ensure they're rendered
    const timer = setTimeout(findQuestionElements, 500);
    return () => clearTimeout(timer);
  }, [questionIds, activeQuestionId, terminalPosition, silhouettes]);
  
  // Animation function
  useEffect(() => {
    const animate = () => {
      if (!canvasRef.current) return;
      
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Update connection progress
      const updatedConnections = connections.map(conn => {
        // Handle regular connections
        if (!conn.isBeam) {
          if (conn.active && conn.progress < 1) {
            return { ...conn, progress: Math.min(conn.progress + 0.05, 1) };
          } else if (!conn.active && conn.progress > 0) {
            return { ...conn, progress: Math.max(conn.progress - 0.03, 0) };
          }
          return conn;
        } 
        // Handle beam connections
        else {
          // If it's a beam, animate it
          if (conn.beamProgress !== undefined) {
            // Fast animation for beam connections
            const newBeamProgress = Math.min((conn.beamProgress + 0.03), 1);
            return { ...conn, beamProgress: newBeamProgress };
          }
          return conn;
        }
      });
      
      // Draw connections
      updatedConnections.forEach(conn => {
        if (conn.progress <= 0) return;
        
        // Handle special beam connections
        if (conn.isBeam && typeof conn.beamProgress === 'number') {
          // Draw beam effect for question-to-question connections
          const dx = conn.end.x - conn.start.x;
          const dy = conn.end.y - conn.start.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Calculate beam positions
          const beamLength = distance * 0.15; // 15% of total length
          const beamPosition = conn.beamProgress * (distance + beamLength) - beamLength;
          
          // Only draw if the beam is visible on the line
          if (beamPosition > -beamLength && beamPosition < distance) {
            // Calculate start and end of beam segment
            const beamStart = Math.max(0, beamPosition);
            const beamEnd = Math.min(distance, beamPosition + beamLength);
            
            // Calculate points along the line
            const startFraction = beamStart / distance;
            const endFraction = beamEnd / distance;
            
            const startX = conn.start.x + dx * startFraction;
            const startY = conn.start.y + dy * startFraction;
            const endX = conn.start.x + dx * endFraction;
            const endY = conn.start.y + dy * endFraction;
            
            // Draw the beam segment with bright green glow
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(50, 255, 50, 0.8)';
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = 'rgba(120, 255, 120, 0.9)'; // Bright green for beam
            ctx.lineWidth = conn.thickness * 1.5;
            ctx.stroke();
            
            // Add a pulsing effect on the nodes when the beam reaches them
            const startNodePulse = beamPosition <= 0 && beamPosition > -beamLength;
            const endNodePulse = beamPosition >= distance - beamLength && beamPosition < distance;
            
            if (startNodePulse) {
              // Pulse the origin node
              ctx.beginPath();
              ctx.arc(conn.start.x, conn.start.y, 3 + Math.random() * 2, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(150, 255, 150, 0.9)';
              ctx.fill();
            }
            
            if (endNodePulse) {
              // Pulse the target node
              ctx.beginPath();
              ctx.arc(conn.end.x, conn.end.y, 3 + Math.random() * 2, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(150, 255, 150, 0.9)';
              ctx.fill();
            }
          }
          
          // Always draw the base connecting line (dimmer)
          ctx.shadowBlur = 5;
          ctx.shadowColor = 'rgba(0, 100, 0, 0.3)';
          ctx.beginPath();
          ctx.moveTo(conn.start.x, conn.start.y);
          ctx.lineTo(conn.end.x, conn.end.y);
          ctx.strokeStyle = 'rgba(0, 100, 0, 0.3)';
          ctx.lineWidth = conn.thickness * 0.5;
          ctx.stroke();
        } 
        // Handle regular connections
        else {
          const dx = conn.end.x - conn.start.x;
          const dy = conn.end.y - conn.start.y;
          const endX = conn.start.x + dx * conn.progress;
          const endY = conn.start.y + dy * conn.progress;
          
          // Glow effect
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(0, 100, 0, 0.4)'; // Darker glow
          
          // Draw line
          ctx.beginPath();
          ctx.moveTo(conn.start.x, conn.start.y);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = `rgba(0, 100, 0, ${conn.progress * 0.6})`; // Darker green for background connections
          ctx.lineWidth = conn.thickness;
          ctx.stroke();
        }
        
        // Draw tiny nodes at the line vertices for a more technical look
        ctx.beginPath();
        ctx.arc(conn.start.x, conn.start.y, 1, 0, Math.PI * 2);
        // Use brighter green for connection points
        ctx.fillStyle = conn.active ? 'rgba(100, 255, 100, 0.9)' : 'rgba(0, 255, 0, 0.6)';
        ctx.fill();
      });
      
      // Draw silhouettes (abstract outlines)
      silhouettes.forEach(silhouette => {
        // Create abstract human shape with glowing outline
        ctx.strokeStyle = 'rgba(0, 100, 0, 0.5)'; // Darker green for background elements
        ctx.lineWidth = 1;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(0, 100, 0, 0.5)'; // Darker shadow
        
        // Head
        ctx.beginPath();
        ctx.arc(silhouette.x, silhouette.y - 30, 15, 0, Math.PI * 2);
        ctx.stroke();
        
        // Body (simplistic)
        ctx.beginPath();
        ctx.moveTo(silhouette.x, silhouette.y - 15);
        ctx.lineTo(silhouette.x, silhouette.y + 20);
        ctx.stroke();
        
        // Arms
        ctx.beginPath();
        ctx.moveTo(silhouette.x - 20, silhouette.y);
        ctx.lineTo(silhouette.x + 20, silhouette.y);
        ctx.stroke();
        
        // Matrix effect inside silhouette - falling green characters
        const characters = "01";
        ctx.fillStyle = 'rgba(0, 100, 0, 0.2)'; // Darker green
        ctx.font = '8px monospace';
        
        for (let i = 0; i < 10; i++) {
          const x = silhouette.x - 10 + Math.random() * 20;
          const y = silhouette.y - 30 + Math.random() * 60;
          const char = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.fillText(char, x, y);
        }
      });
      
      // Matrix rain effect in background
      const matrixRain = () => {
        ctx.fillStyle = 'rgba(0, 255, 0, 0.05)';
        ctx.font = '10px monospace';
        
        const characters = "01";
        for (let i = 0; i < 10; i++) {
          const x = Math.random() * dimensions.width;
          const y = Math.random() * dimensions.height;
          const char = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.fillText(char, x, y);
        }
      };
      
      matrixRain();
      
      setConnections(updatedConnections);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [connections, dimensions, silhouettes]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}