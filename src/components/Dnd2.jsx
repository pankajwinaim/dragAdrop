import React from "react";

function Dnd2() {
  const handleDragStart = (e) => {
    console.log(e.dataTransfer.setData("text", "drag this"));
  };

  return (
    <div>
      <div className="Card">
        <h1>Card</h1>
      </div>
      <p
        draggable="true"
        onDragStart={handleDragStart}
        style={{ background: "blue" }}
      >
        This text <strong>may</strong> be dragged.
      </p>
    </div>
  );
}

export default Dnd2;
