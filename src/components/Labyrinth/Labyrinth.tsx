// components/Labyrinth.tsx
import React from "react";
import MazeCanvas from "@components/MazeCanvas/MazeCanvas";

const Labyrinth: React.FC = () => {
  const screenWidth = window.innerWidth * 0.9;
  const screenHeight = window.innerHeight * 0.9;
  const cols = 40;
  const rows = 40;

  return (
    <div className="w-[100svw] h-[100svh] flex items-center justify-center bg-amber-50">
      <MazeCanvas
        width={screenWidth}
        height={screenHeight}
        cols={cols}
        rows={rows}
      />
    </div>
  );
};

export default Labyrinth;
