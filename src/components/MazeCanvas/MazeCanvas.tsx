// components/MazeCanvas.tsx
import React, { useEffect, useRef } from "react";
import { generateMaze, type Cell } from "@lib/generateMaze";

interface MazeCanvasProps {
  width: number;
  height: number;
  cols: number;
  rows: number;
}

const MazeCanvas: React.FC<MazeCanvasProps> = ({
  width,
  height,
  cols,
  rows,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverCanvasRef = useRef<HTMLCanvasElement>(null);
  const mazeRef = useRef<Cell[][]>(generateMaze(cols, rows));

  const cellWidth = width / cols;
  const cellHeight = height / rows;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maze = mazeRef.current;
    ctx.clearRect(0, 0, width, height);

    maze.forEach((row, y) => {
      row.forEach((cell, x) => {
        const px = x * cellWidth;
        const py = y * cellHeight;

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        const [top, right, bottom, left] = cell.walls;

        if (top) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + cellWidth, py);
          ctx.stroke();
        }
        if (right) {
          ctx.beginPath();
          ctx.moveTo(px + cellWidth, py);
          ctx.lineTo(px + cellWidth, py + cellHeight);
          ctx.stroke();
        }
        if (bottom) {
          ctx.beginPath();
          ctx.moveTo(px + cellWidth, py + cellHeight);
          ctx.lineTo(px, py + cellHeight);
          ctx.stroke();
        }
        if (left) {
          ctx.beginPath();
          ctx.moveTo(px, py + cellHeight);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      });
    });
  }, [width, height, cols, rows]);

  const drawHoverCell = (x: number, y: number) => {
    const ctx = hoverCanvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    ctx.globalAlpha = 0.6;
    ctx.fillStyle = "rgba(152, 251, 152, 1)";
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);

    ctx.globalAlpha = 1.0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = hoverCanvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const cellX = Math.floor((mx / width) * cols);
    const cellY = Math.floor((my / height) * rows);

    drawHoverCell(cellX, cellY);
  };

  const handleMouseLeave = () => {
    const ctx = hoverCanvasRef.current?.getContext("2d");
    ctx?.clearRect(0, 0, width, height);
  };

  return (
    <div className="relative" style={{ width, height }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0 z-0"
      />
      <canvas
        ref={hoverCanvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0 z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default MazeCanvas;
