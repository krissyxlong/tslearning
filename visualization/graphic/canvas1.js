const PI = Math.PI;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

ctx.fillStyle = 'blue';
ctx.strokeStyle = '#000';
ctx.strokeRect(0, 0, 1000, 1000);

// ball();
// imageData();
// getMounseColor();
// greyImage();
// zoomImage();
saveImage();

// 保存图片
function saveImage () {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    const w = 300, h = 300;
    ctx.drawImage(img, 0, 0, w, h);
    document.getElementById('btn').addEventListener('click', () => {
      const x = canvas.toDataURL();
      console.log(x);
    });
  };
  img.src = 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF';
}

// 放大图像
function zoomImage () {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    const w = 300, h = 300;
    ctx.drawImage(img, 0, 0, w, h);
    canvas.addEventListener('mousemove', (e) => {
      const { x, y } = e;
      ctx.drawImage(canvas,
        Math.abs(x - 50), Math.abs(y - 50), 100, 100,
        300, 0, 300, 300); // key code
    });
  };
  img.src = 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF';
}

// 图像灰度
function greyImage () {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    const w = 300, h = 300;
    ctx.drawImage(img, 0, 0, w, h);
    const T = w * h;
    const pixels = ctx.getImageData(0, 0, w, h);
    console.log('pixels', pixels);
    const data = pixels.data;
    for (let i = 0; i < data.length; i = i + 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
      // console.log(22, avg, pixels[i], pixels[i + T], pixels[i + 2 * T]);
    }
    ctx.putImageData(pixels, w, 0);
  };
  img.src = 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF';
  // img.src = './icon.jpeg';
}

// 获取鼠标点颜色
function getMounseColor () {
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 100, 100);
  canvas.addEventListener('click', (e) => {
    const { offsetX: x, offsetY: y } = e;
    var pixel = ctx.getImageData(x, y, 1, 1); // key code
    var data = pixel.data;
    console.log(`{${x},${y}:${data}}`);
  });
};

// ImageData 对象联系
function imageData (params) {
  const data = ctx.getImageData(0, 0, 10, 10);
  console.log('data:', data);
}

// 小球运动
function ball () {
  let ref;
  const ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 3,
    r: 20,
    color: 'blue',
    draw () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * PI, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  };

  function move () {
    // ctx.clearRect(0, 0, WIDTH, HEIGHT); 
    /* 拖尾效果 */
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ball.draw();
    let nextX = ball.x + ball.vx;
    let nextY = ball.y + ball.vy;
    const R = ball.r;
    /* 处理边界 */
    // 撞到右边
    if (nextX > WIDTH - R) {
      ball.vx = -ball.vx;
      nextX = WIDTH - R;
    } else if (nextX < R) { // 撞到左边
      ball.vx = -ball.vx;
      nextX = R;
    }
    // 撞到下边
    if (nextY > HEIGHT - R) {
      ball.vy = -ball.vy;
      nextY = HEIGHT - R;
    } else if (nextY < R) { // 撞到上边
      ball.vy = -ball.vy;
      nextY = R;
    }

    ball.x = nextX;
    ball.y = nextY;
    ref = window.requestAnimationFrame(move);
  }

  function move1 (x, y) {
    // ctx.clearRect(0, 0, WIDTH, HEIGHT); 
    /* 拖尾效果 */
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ball.draw();
    ball.x = x;
    ball.y = y;
    // ref = window.requestAnimationFrame(move);
  }

  ball.draw(); // 初始化静态球
  // canvas.addEventListener('mouseover', () => {
  //   window.requestAnimationFrame(move);
  // });
  canvas.addEventListener('mouseleave', () => {
    window.cancelAnimationFrame(ref);
  });
  canvas.addEventListener('mousemove', (e) => {
    ref = window.requestAnimationFrame(() => {
      move1(e.offsetX, e.offsetY);
    });
  });
  canvas.addEventListener('click', () => {
    window.requestAnimationFrame(move);
  });
}