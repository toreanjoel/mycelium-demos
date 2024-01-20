/**
 * Connect to socket
 * Join relevant room for canvas
 * Initalize the state to the canvas
 * Track movement?
 * Draw should send event and send updates to all
 * Call update to canvas
 * 
 * 
 * This should happen when connecting and we should use the server response to update
 */

document.addEventListener("DOMContentLoaded", () => {
  const picker = document.getElementById("color-picker");
  const square = document.getElementById("drawPlace");
  const paper = square.getContext("2d");
  let pressedMouse = false;
  let x;
  let y;

  document.addEventListener("mousedown", startDrawing);
  document.addEventListener("mousemove", drawLine);
  document.addEventListener("mouseup", stopDrawing);

  function startDrawing(eventvs01) {
    pressedMouse = true;
    x = eventvs01.offsetX;
    y = eventvs01.offsetY;
  }

  function drawLine(eventvs02) {
    if (pressedMouse) {
      const xM = eventvs02.offsetX;
      const yM = eventvs02.offsetY;
      drawing_line(picker.value, x, y, xM, yM);
      x = xM;
      y = yM;
    }
  }

  function stopDrawing(eventvs03) {
    pressedMouse = false;
    update_cavnas()
  }

  drawing_line(picker.value, x - 1, y, x, y);

  function drawing_line(color, x_start, y_start, x_end, y_end, board) {
    paper.beginPath();
    paper.strokeStyle = color;
    paper.lineWidth = 5;
    paper.moveTo(x_start, y_start);
    paper.lineTo(x_end, y_end);
    paper.stroke();
    paper.closePath();
  }

  function update_cavnas() {
    console.log("paper")
    console.log(paper)
    console.log(paper.toDataURL())
  }
});
