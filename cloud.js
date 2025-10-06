// ---------------- MÂY ----------------
const canvasCloud = document.getElementById("cloud");
const ctxCloud = canvasCloud.getContext("2d");

canvasCloud.width = window.innerWidth;
canvasCloud.height = window.innerHeight;

const cloudrights = [];
const cloudlefts = [];
const cloudSources = ["/img/white_cloud.png"];

function getCloudImage() {
  const index = Math.floor(Math.random() * cloudSources.length);
  return cloudSources[index];
}

function createCloud() {
  const size = Math.random() * 400 + 300;
  const image1 = new Image();
  image1.src = getCloudImage();

  const image2 = new Image();
  image2.src = getCloudImage();

  // Mây bay từ phải sang trái
  cloudrights.push({
    x: canvasCloud.width + size,
    y: Math.random() * canvasCloud.height,
    size,
    speed: Math.random() * 1.5 + 0.5,
    img: image1
  });

  // Mây bay từ trái sang phải
  cloudlefts.push({
    x: -size, // bắt đầu ngoài khung bên trái
    y: Math.random() * canvasCloud.height,
    size,
    speed: Math.random() * 1.5 + 0.5,
    img: image2
  });
}

// tạo 5 mây mỗi bên
for (let i = 0; i < 5; i++) createCloud();

function animateCloud() {
  ctxCloud.clearRect(0, 0, canvasCloud.width, canvasCloud.height);

  // Mây bên phải bay sang trái
  for (let i = cloudrights.length - 1; i >= 0; i--) {
    const obj = cloudrights[i];
    obj.x -= obj.speed;

    let center = canvasCloud.width / 2;
    let dist = Math.abs(obj.x - center);
    let opacity = 1 - dist / center;
    if (opacity < 0.2) opacity = 0.2;

    ctxCloud.globalAlpha = opacity;
    ctxCloud.drawImage(obj.img, obj.x, obj.y, obj.size, obj.size);
    ctxCloud.globalAlpha = 1.0;

    if (obj.x + obj.size < 0) {
      cloudrights.splice(i, 1);
      createCloud();
    }
  }

  // Mây bên trái bay sang phải
  for (let i = cloudlefts.length - 1; i >= 0; i--) {
    const obj = cloudlefts[i];
    obj.x += obj.speed;

    let center = canvasCloud.width / 2;
    let dist = Math.abs(obj.x - center);
    let opacity = 1 - dist / center;
    if (opacity < 0.2) opacity = 0.2;

    ctxCloud.globalAlpha = opacity;
    ctxCloud.drawImage(obj.img, obj.x, obj.y, obj.size, obj.size);
    ctxCloud.globalAlpha = 1.0;

    if (obj.x > canvasCloud.width) {
      cloudlefts.splice(i, 1);
      createCloud();
    }
  }


  requestAnimationFrame(animateCloud);
}

animateCloud();
