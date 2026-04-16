export default function ComplexityPanel({ p, q, rowShift, colShift }) {
  const meshSteps = rowShift + colShift;
  const ringSteps = Math.min(q, p - q);
  const efficiency = ((ringSteps - meshSteps) / ringSteps * 100).toFixed(1);
  const isMoreEfficient = meshSteps < ringSteps;
  const maxSteps = Math.max(meshSteps, ringSteps, 10);
  const meshBarWidth = (meshSteps / maxSteps) * 100;
  const ringBarWidth = (ringSteps / maxSteps) * 100;

  return (
    <div style={{
      padding: "20px",
      backgroundColor: "#e8f4f8",
      borderRadius: "8px",
      marginTop: "20px"
    }}>
      <h3>📊 Complexity Analysis</h3>
      
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        <div>
          <h4>Formulas</h4>
          <p><strong>Row shift:</strong> q mod √p = {rowShift}</p>
          <p><strong>Column shift:</strong> ⌊q / √p⌋ = {colShift}</p>
          <p><strong>Mesh Steps:</strong> {rowShift} + {colShift} = <strong style={{color: "#007bff"}}>{meshSteps}</strong></p>
          <p><strong>Ring Steps:</strong> min(q, p-q) = min({q}, {p-q}) = <strong style={{color: "#dc3545"}}>{ringSteps}</strong></p>
        </div>
        
        <div style={{ flex: 1, minWidth: "250px" }}>
          <h4>Step Comparison</h4>
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ width: "80px" }}>Mesh:</span>
              <div style={{ flex: 1, backgroundColor: "#ddd", height: "30px", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${meshBarWidth}%`, backgroundColor: "#007bff", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "5px", color: "white" }}>
                  {meshSteps}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ width: "80px" }}>Ring:</span>
              <div style={{ flex: 1, backgroundColor: "#ddd", height: "30px", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${ringBarWidth}%`, backgroundColor: "#dc3545", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "5px", color: "white" }}>
                  {ringSteps}
                </div>
              </div>
            </div>
          </div>
          
          <div style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: isMoreEfficient ? "#d4edda" : "#f8d7da",
            borderRadius: "4px",
            color: isMoreEfficient ? "#155724" : "#721c24"
          }}>
            {isMoreEfficient ? (
              <strong>✅ Mesh is {efficiency}% more efficient than Ring!</strong>
            ) : (
              <strong>⚠️ Ring is more efficient for this q value</strong>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}