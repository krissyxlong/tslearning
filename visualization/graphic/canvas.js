const PI = Math.PI;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'blue';
ctx.strokeStyle = 'purple';
ctx.strokeRect(0, 0, 1000, 1000);
ctx.translate(500, canvas.height / 2);
ctx.scale(1, -1);

function clear () {
  var c = document.getElementById("canvas");
  var cxt = c.getContext("2d");
  c.height = c.height;
  ctx.translate(500, canvas.height / 2);
  ctx.scale(1, -1);
}
// drawCircle(0, 0, 100, 0, 0.5 * Math.PI);
// drawEllipse(0, 0, 100, 50, 0, 2 * Math.PI);
// drawPara(0, 0, 0.02, -500, 500);
// ar(2, 50, 0, 10 * PI);
// bezier([0, 0], [50, 300], [300, 0]);
// bezier0(0, 310, 300, 0, 300, 300);
// transform();
// rotate();
// star(200, 200, 100, 'red');
// star(-200, 200, 50, 'blue');
// shine();
// sky(); 
// watch();
// image();

// 小球动画
function ball () {

  function drawBall () {

  }
}

// 联系图像使用
function image () {
  const img = new Image();
  img.src = './icon.jpeg';
  img.onload = function (params) {
    // ctx.drawImage(img, 0, 0, 100, 100);
    ctx.drawImage(img, 400, 0, 100, 100);
  };
}

// 时钟
function watch () {
  ctx.save();
  function step () {
    const time = new Date();
    const h = time.getHours() % 12;
    const m = time.getMinutes();
    const s = time.getSeconds();
    ctx.restore();
    ctx.clearRect(-500, -500, 500, 500);
    clear();
    // 外圈
    ctx.strokeStyle = '#268bd3';
    ctx.fillStyle = '#268bd3';
    ctx.lineWidth = '4';
    ctx.arc(0, 0, 200, 0, 2 * PI, true);
    ctx.stroke();
    ctx.closePath();

    // 圆心
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * PI, true);
    ctx.fill();
    ctx.save();

    // 刻度
    const ang = 2 * PI / (60);
    ctx.strokeStyle = 'black';
    ctx.lineCap = "square";
    for (let i = 1; i <= 60; i++) {
      ctx.rotate(ang);
      const x = i % 5 === 0 ? 175 : 186;
      ctx.moveTo(x, 0);
      ctx.lineTo(190, 0);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
    // 时针
    ctx.save();
    const ang1 = PI / 2 - 2 * PI * (h / 12) - PI / 6 * (m / 60);
    ctx.rotate(ang1);
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(100, 0);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    // 分针
    ctx.save();
    const ang2 = PI / 2 - 2 * PI * (m / 60);
    ctx.lineWidth = 4;
    ctx.rotate(ang2);
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(130, 0);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    // 秒针
    ctx.save();
    const ang3 = PI / 2 - 2 * PI * (s / 60);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.rotate(ang3);
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(150, 0);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
  step();
  let s = setInterval(() => {
    step();
  }, 1000);
  // setTimeout(() => {
  //   clearInterval(s);
  // }, 2000);
}

// 天体运动
function sky () {
  let ang = 0;
  function step () {
    ctx.clearRect(-500, -500, 500, 500);
    ctx.fillStyle = 'black';
    ctx.fillRect(-500, -500, 1000, 1000);
    ctx.closePath();

    // 太阳
    ctx.beginPath();
    const radgrad = ctx.createRadialGradient(0, 0, 10, 10, 0, 50);
    radgrad.addColorStop(0, '#FFFCE3');
    radgrad.addColorStop(1, 'rgba(255, 254, 240, 0.9)');
    ctx.fillStyle = radgrad;
    ctx.arc(0, 0, 40, 0, 2 * PI);
    ctx.fill();
    ctx.closePath();

    // 地球轨道
    ctx.beginPath();
    ctx.strokeStyle = '#add7f7';
    ctx.arc(0, 0, 350, 0, 2 * PI, true);
    ctx.stroke();
    ctx.closePath();

    // 地球运动
    ang = ang + PI / 360;
    if (ang > 2 * PI) {
      ang = ang - 2 * PI;
    }
    ctx.save();
    ctx.beginPath();
    ctx.rotate(ang);
    ctx.arc(350, 0, 30, 0, 2 * PI, true);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();


    // 月球运动
    ctx.beginPath();
    ctx.translate(350, 0);
    ctx.rotate(ang);
    ctx.arc(50, 0, 10, 0, 2 * PI, true);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }
  setInterval(() => {
    step();
  }, 100);
}

// 夜空效果
function shine () {
  ctx.fillStyle = 'black';
  ctx.fillRect(-500, -500, 1000, 1000);
  ctx.beginPath();
  ctx.arc(0, 0, 500, 0, 2 * PI, true);
  ctx.clip();

  var lingrad = ctx.createLinearGradient(-500, -500, 500, 500);
  lingrad.addColorStop(0, '#232256');
  lingrad.addColorStop(1, '#143778');
  ctx.fillStyle = lingrad;
  ctx.fillRect(-500, -500, 1000, 1000);

  // let i = 0;
  // function once () {
  //   const x = Math.random() * 1000 - 500;
  //   const y = Math.random() * 1000 - 500;
  //   const r = Math.random() * 50;
  //   star(x, y, r, '#fff');
  //   i++;
  //   if (i <= 100) {
  //     window.requestAnimationFrame(once);
  //   }
  // }
  // window.requestAnimationFrame(once);
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 1000 - 500;
    const y = Math.random() * 1000 - 500;
    const r = Math.random() * 50;
    star(x, y, r, '#fff');
  }
}

// 画五角星
function star (x, y, r, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.save();
  ctx.translate(x, y);
  ctx.moveTo(0, 0);
  ctx.lineTo(r, 0); // 第一条

  ctx.translate(r, 0);
  ctx.rotate(PI / 5);
  ctx.lineTo(-r, 0); // 第二条

  ctx.translate(-r, 0);
  ctx.rotate(PI / 5);
  ctx.lineTo(r, 0); // 第三条

  ctx.translate(r, 0);
  ctx.rotate(PI / 5);
  ctx.lineTo(-r, 0); // 第四条

  ctx.translate(-r, 0);
  ctx.rotate(PI / 5);
  ctx.lineTo(r, 0); // 第五条

  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

// 联系旋转、配合 translate() 使用
function rotate () {
  const o_ang = PI / 3; // 每次旋转角度
  let num = 3; // 每圈画圆数
  let r = 10; // 圈半径
  const R = 5; // 小圆半径
  for (let i = 0; i < 5; i++) {
    const diff_ang = o_ang * (0.5 ** i);
    num = num * 2;
    r = r + 35;
    console.log(1, diff_ang, num, r);
    for (let j = 0; j < num; j++) {
      const ang = diff_ang * j - (PI / 6);
      console.log(2, ang);
      ctx.save();
      ctx.translate(r * Math.cos(ang), r * Math.sin(ang));
      ctx.rotate(diff_ang);
      ctx.arc(0, 0, R, 0, 2 * PI, true);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }
}

// 练习 save()、restore()
function transform () {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      ctx.save();
      ctx.fillStyle = 'rgb(' + (51 * i) + ', ' + (255 - 51 * i) + ', 255)';
      ctx.translate(10 + j * 50, 10 + i * 50);
      ctx.fillRect(0, 0, 25, 25);
      ctx.restore();
    }
  }
}

function bezier0 (cp1x, cp1y, x, y, cp2x, cp2y) {
  ctx.moveTo(0, 0);
  ctx.strokeStyle = 'red';
  // 二阶
  ctx.quadraticCurveTo(cp1x, cp1y, x, y);
  ctx.moveTo(0, 0);
  // 三阶
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  ctx.stroke();
}

// 二级贝塞尔曲线
function bezier (p0, p1, p2) {
  let start = false;
  const [x0, y0] = p0;
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  for (t = 0; t <= 1; t += 0.01) {
    const x = (1 - t) ** 2 * x0 + 2 * t * (1 - t) * x1 + t ** 2 * x2;
    const y = (1 - t) ** 2 * y0 + 2 * t * (1 - t) * y1 + t ** 2 * y2;
    if (start === false) {
      ctx.moveTo(x, y);
      start = true;
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

// 阿基米德螺旋线
function ar (x0, belta, sAng, eAng) {
  const divider = 1000;
  const del = (eAng - sAng) / divider;
  let start = false;
  for (ang = sAng; ang <= eAng; ang += del) {
    const x = (x0 + belta * ang) * Math.cos(ang);
    const y = (x0 + belta * ang) * Math.sin(ang);
    if (start === false) {
      ctx.moveTo(x, y);
      start = true;
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

// 根据函数画椭圆
function drawPara (x0, y0, p, st, et) {
  const divider = 60;
  const del = (et - st) / divider;
  const pre_x = st;
  const pre_y = 0.5 * p * (st ** 2);
  ctx.moveTo(pre_x, pre_y);
  for (t = st; t <= et; t += del) {
    const current_y = 0.5 * p * (t ** 2);
    ctx.lineTo(t, current_y);
  }
  ctx.stroke();
}

// 根据函数画椭圆
function drawEllipse (x0, y0, rx, ry, sAng, eAng) {
  const divider = 60;
  const del = (eAng - sAng) / divider;
  const pre_x = x0 + rx * Math.cos(sAng);
  const pre_y = y0 + ry * Math.sin(sAng);
  ctx.moveTo(pre_x, pre_y);
  for (i = 0; i <= 60; i++) {
    const ang = sAng + del * i;
    const current_x = x0 + rx * Math.cos(ang);
    const current_y = y0 + ry * Math.sin(ang);
    ctx.lineTo(current_x, current_y);
  }
  ctx.stroke();
}

// 根据函数画圆
function drawCircle (x0, y0, r, sAng, eAng) {
  const divider = 60;
  const del = (eAng - sAng) / divider;
  const pre_x = x0 + r * Math.cos(sAng);
  const pre_y = y0 + r * Math.sin(sAng);
  ctx.moveTo(pre_x, pre_y);
  for (i = 0; i <= 60; i++) {
    const ang = sAng + del * i;
    const current_x = x0 + r * Math.cos(ang);
    const current_y = y0 + r * Math.sin(ang);
    ctx.lineTo(current_x, current_y);
  }
  ctx.stroke();
}

// 画正多边形
const drawMultiShape = (edges, x, y, step) => {
  const PI = Math.PI;
  const singleAng = 2 * Math.PI / edges;
  let pre = [0, 0];
  let next = [step, 0];

  for (let i = 1; i <= edges; i++) {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    // ctx.arc(0, 0, 5, 0, Math.PI * 2, true);
    ctx.strokeStyle = 'blue';
    ctx.moveTo(0, 0);
    ctx.lineTo(step, 0);
    ctx.stroke();
    ctx.translate(step, 0);
    ctx.rotate(singleAng);
    pre = next;
  }
};

// drawMultiShape(56, 500, 500, 10);

// 坐标原点切换
const drawTraslate = () => {
  ctx.strokeRect(0, 0, 1000, 1000);
  ctx.translate(0, canvas.height);
  ctx.scale(1, -1);
  ctx.lineCap = 'round';

  ctx.moveTo(500, 0);
  ctx.lineTo(500, 50);
  ctx.stroke();
  let pre = [[500, 50]];
  const generateRandomAng = (flag) => {
    if (flag) {
      return Number(((Math.random() * 3.14) - 1.57).toFixed(2));
    }
    return Number(((Math.random() * 3.14) - 1.57).toFixed(2));
  };
  let dis = 80;
  for (let i = 0; i < 5; i++) {
    const current = [];
    dis -= 10;
    pre.map(([x, y]) => {
      const ang1 = generateRandomAng();
      const p1_x = Number((x + dis * Math.cos(ang1)).toFixed(2));
      const p1_y = Number((y + dis * Math.sin(Math.abs(ang1))).toFixed(2));
      ctx.moveTo(x, y);
      ctx.lineTo(p1_x, p1_y);
      ctx.stroke();
      current.push([p1_x, p1_y]);

      const ang2 = generateRandomAng();
      const p2_x = Number((x + dis * Math.cos(-ang2)).toFixed(2));
      const p2_y = Number((y + dis * Math.sin(Math.abs(ang2))).toFixed(2));
      ctx.moveTo(x, y);
      ctx.lineTo(p2_x, p2_y);
      ctx.stroke();
      current.push([p2_x, p2_y]);
    });
    pre = current;
  }
  ctx.closePath();
};


// function draw (fnx, fny, start, end) {
//   const divider = (end - start) / 100;
//   let start = false;
//   for (let i = start; i <= end; i++) {
//     const x = fnx();
//     const y = fny();
//     if (start === false) {
//       ctx.moveTo(x, y);
//       start = true;
//     } else {
//       ctx.lineTo(x, y);
//     }
//   }
//   ctx.stroke();
// }