import React, { useState } from "react";
import ControlPanel from "./components/ControlPanel";
import MeshGrid from "./components/MeshGrid";
import ComplexityPanel from "./components/ComplexityPanel";
import { meshShift } from "./utils/shiftLogic";
import "./App.css";

function createGrid(p) {
  const size = Math.sqrt(p);
  let count = 0;
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => count++)
  );
}

export default function App() {
  const [grid, setGrid] = useState(createGrid(16));
  const [afterRow, setAfterRow] = useState(null);
  const [afterCol, setAfterCol] = useState(null);
  const [info, setInfo] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRow, setShowRow] = useState(false);
  const [showCol, setShowCol] = useState(false);

  const handleRun = async (p, q) => {
    setIsAnimating(true);
    setShowRow(false);
    setShowCol(false);
    
    const newGrid = createGrid(p);
    const size = Math.sqrt(p);
    
    setGrid(newGrid);
    setAfterRow(null);
    setAfterCol(null);
    
    // Step 1: Show Row Shift after 1 second
    setTimeout(() => {
      const result = meshShift(newGrid, size, size, q);
      setAfterRow(result.afterRow);
      setShowRow(true);
      setInfo({ p, q, ...result });
    }, 500);
    
    // Step 2: Show Column Shift after 2 seconds
    setTimeout(() => {
      const result = meshShift(newGrid, size, size, q);
      setAfterCol(result.afterCol);
      setShowCol(true);
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <div className="app">
      <header>
        <h1>🔄 Mesh Circular Shift Visualizer</h1>
        <p>Visualizing parallel communication on 2D Mesh Topology</p>
      </header>

      <ControlPanel onSubmit={handleRun} isAnimating={isAnimating} />

      <div className="grids-container">
        <div className="grid-card">
          <MeshGrid grid={grid} title="📦 Before Shift (Initial State)" />
        </div>

        {(showRow || afterRow) && (
          <div className="grid-card">
            <MeshGrid grid={afterRow} title="➡️ Stage 1: After Row Shift" />
          </div>
        )}

        {(showCol || afterCol) && (
          <div className="grid-card">
            <MeshGrid grid={afterCol} title="✅ Stage 2: After Column Shift (Final State)" />
          </div>
        )}
      </div>

      {info.p && <ComplexityPanel {...info} />}

      <footer>
        <p>
          <strong>Algorithm:</strong> Row shift by (q mod √p) → Column shift by ⌊q/√p⌋
          <br />
          Total Mesh Steps = {(info.rowShift || 0) + (info.colShift || 0)} | Ring Steps = {info.q ? Math.min(info.q, info.p - info.q) : 0}
        </p>
      </footer>
    </div>
  );
}