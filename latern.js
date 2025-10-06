// ---------------- ĐÈN LỒNG ----------------
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const laterns = [];
const laternSources = [
  "img/vscode.png",
  "img/intellji.png",
  "img/android.png",
  "img/latern1.png",
  "img/latern2.png",
  "img/latern3.png",

];

function getLaternImage() {
  const index = Math.floor(Math.random() * laternSources.length);
  return laternSources[index];
}

function createLatern() {
  const size = Math.random() * 150 + 90;
  const image = new Image();
  image.src = getLaternImage();

  laterns.push({
    x: Math.random() * canvas.width,
    y: canvas.height + size,
    size,
    speed: Math.random() * 2 + 1,
    img: image
  });
}

for (let i = 0; i < 30; i++) createLatern();

function animateLatern() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = laterns.length - 1; i >= 0; i--) {
    const obj = laterns[i];
    obj.y -= obj.speed;
    ctx.drawImage(obj.img, obj.x, obj.y, obj.size, obj.size);

    if (obj.y + obj.size < 0) {
      laterns.splice(i, 1);
      createLatern();
    }
  }

  requestAnimationFrame(animateLatern);
}

animateLatern();
