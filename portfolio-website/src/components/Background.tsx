'use client';

import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = 0;
    let mouseY = 0;
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const maxDistance = 150;

    // Create nodes with very slow random speed
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
      });
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      nodes.forEach(node => {
        if (node.x > canvas.width) node.x = canvas.width * Math.random();
        if (node.y > canvas.height) node.y = canvas.height * Math.random();
      });
    }

    function drawNetwork() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      });

      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i === j) return;

          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.5;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(15, 240, 252, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });

        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.5;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(15, 240, 252, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle = '#0FF0FC';
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(drawNetwork);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleResize = () => {
      resize();
    };

    resize();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    drawNetwork();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-[#2B2B2B] to-black"
      style={{ touchAction: 'none' }}
    />
  );
}