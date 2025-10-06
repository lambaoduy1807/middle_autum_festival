const wishes = [
  "Chúc bạn Trung Thu vui vẻ, trọn vẹn yêu thương!",
  "Chúc bạn luôn mạnh khỏe, hạnh phúc và thành công!",
  "Chúc bạn một mùa Trung Thu đầy ánh trăng và niềm vui!"
];

canvas.addEventListener("click", function (event) {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  for (let i = laterns.length - 1; i >= 0; i--) {
    const obj = laterns[i];
    if (
      mouseX >= obj.x &&
      mouseX <= obj.x + obj.size &&
      mouseY >= obj.y &&
      mouseY <= obj.y + obj.size
    ) {
      laterns.splice(i, 1);
      createLatern();

      const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
      const box = document.getElementById("wishBox");
      document.getElementById("wishText").innerText = randomWish;

      // Hiệu ứng trượt xuống
      box.classList.add("active");

      break;
    }
  }
});

function closeWish() {
  document.getElementById("wishBox").classList.remove("active");
}
