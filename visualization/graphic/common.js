// 创建、编译 shader
function loadShader (gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object
  gl.shaderSource(shader, source);

  // Compile the shader program
  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram (gl, vSource, fSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fSource);
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.error('createProgram failed');
}

// 用参数生成矩形顶点并写进缓冲
function setRectangle (gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;

  // 注意: gl.bufferData(gl.ARRAY_BUFFER, ...) 将会影响到
  // 当前绑定点`ARRAY_BUFFER`的绑定缓冲
  // 目前我们只有一个缓冲，如果我们有多个缓冲
  // 我们需要先将所需缓冲绑定到`ARRAY_BUFFER`
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2]), gl.STATIC_DRAW);
}

function resize (canvas) {
  // 获取浏览器中画布的显示尺寸
  var displayWidth = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;

  // 检尺寸是否相同
  if (canvas.width != displayWidth ||
    canvas.height != displayHeight) {

    // 设置为相同的尺寸
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
}

function initSlider (n, func) {
  const circleName = 'circle' + n;
  const sliderName = 'slider' + n;
  const $circle = document.getElementById(circleName);
  const init = 28;
  let left = 0;
  document.getElementById(sliderName).addEventListener('dragover', (e) => {
    left = e.offsetX;
    window.requestAnimationFrame(() => {
      $circle.style.left = (left + init) + 'px';
      func(left);
    });
  });
}

function slider ({
  func1 = () => { },
  func2 = () => { },
  func3 = () => { },
  func4 = () => { },
  func5 = () => { }
}) {
  initSlider(1, func1);
  initSlider(2, func2);
  initSlider(3, func3);
  initSlider(4, func4);
  initSlider(5, func5);
}