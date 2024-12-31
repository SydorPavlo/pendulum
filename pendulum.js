const canvas = document.getElementById('pendulumCanvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const pivot = { x: width / 2, y: 0 };
const length = height * 0.7;
const bobRadius = length * 0.1;
let angle = -Math.PI / 4 ;
let angularVelocity = 0;
const gravity = 0.99;
const damping = 0.9995;

let dragging = false;

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);
updatePendulum();

function drawPendulum() {
  // ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff08'
  ctx.fillRect(0, 0, width, height);
  const bobX = pivot.x + length * Math.sin(angle);
  const bobY = pivot.y + length * Math.cos(angle);
  ctx.beginPath();
  ctx.moveTo(pivot.x, pivot.y);
  ctx.lineTo(bobX, bobY);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.stroke();
}

function updatePendulum() {
  if (!dragging) {
    const angularAcceleration = (-gravity / length) * Math.sin(angle);
    angularVelocity += angularAcceleration;
    angularVelocity *= damping;
    angle += angularVelocity;
  }
  drawPendulum();
  requestAnimationFrame(updatePendulum);
  // setTimeout(updatePendulum, 400 )
  // console.log({angularVelocity})
}

function getMousePosition(event) {
  return {
    x: event.x,
    y: event.y
  };
}

function onMouseDown(event) {
  const pos = getMousePosition(event);
  const bobX = pivot.x + length * Math.sin(angle);
  const bobY = pivot.y + length * Math.cos(angle);
  const dx = pos.x - bobX;
  const dy = pos.y - bobY;
  // const distance = Math.hypot(dx, dy);
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < bobRadius) {
    dragging = true;
  }
}

function onMouseMove(event) {
  if (dragging) {
    const pos = getMousePosition(event);
    angle = Math.atan2(pos.x - pivot.x, pos.y - pivot.y);
    angularVelocity = 0;
  }
}

function onMouseUp(event) {
  dragging = false;
}
