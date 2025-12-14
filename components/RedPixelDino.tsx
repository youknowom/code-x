"use client";

import { useEffect, useRef } from "react";

export default function RedPixelDino() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = 600;
    canvas.height = 150;

    let frame = 0;
    let groundX = 0;

    function drawDino(x: number, y: number, legUp: boolean) {
      ctx.fillStyle = "red";

      // head
      ctx.fillRect(x + 20, y, 20, 20);

      // body
      ctx.fillRect(x, y + 20, 40, 20);

      // tail
      ctx.fillRect(x - 10, y + 30, 10, 10);

      // legs
      if (legUp) {
        ctx.fillRect(x + 5, y + 40, 10, 15);
        ctx.fillRect(x + 25, y + 45, 10, 10);
      } else {
        ctx.fillRect(x + 25, y + 40, 10, 15);
        ctx.fillRect(x + 5, y + 45, 10, 10);
      }
    }

    function drawGround() {
      ctx.fillStyle = "red";
      for (let i = 0; i < 60; i++) {
        ctx.fillRect((i * 20 - groundX) % 600, 110, 10, 2);
      }
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawGround();
      drawDino(100, 60, frame % 20 < 10);

      groundX += 4;
      frame++;

      requestAnimationFrame(loop);
    }

    loop();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="mb-4"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
