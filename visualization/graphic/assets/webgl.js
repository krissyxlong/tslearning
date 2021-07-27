
// init();
// main();
// basic();
// commonFourLine();
principle();

function principle () {
  const canvas = document.getElementById('glcanvas');
  const gl = canvas.getContext('webgl');

  const vertex = `
    attribute vec2 a_position;
    attribute vec4 a_color;
    
    uniform mat3 u_matrix;
    
    varying vec4 v_color;
    
    void main() {
      // Multiply the position by the matrix.
      gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
    
      // Copy the color from the attribute to the varying.
      v_color = a_color;
    }
`;

  const fragment = `
    precision mediump float;

    varying vec4 v_color;
    
    void main() {
      gl_FragColor = v_color;
    }
`;

  const program = createProgram(gl, vertex, fragment);
  var positionLocation = gl.getAttribLocation(program, "a_position");
  var colorLocation = gl.getAttribLocation(program, "a_color");
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");

  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setGeometry(gl);

  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setColors(gl);

  var translation = [200, 150];
  var angleInRadians = 0;
  var scale = [1, 1];

  drawScene();

  function drawScene () {
    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionLocation);
    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);


    gl.enableVertexAttribArray(colorLocation);
    // Bind the color buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    var size = 4;          // 4 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      colorLocation, size, type, normalize, stride, offset);

    // 不懂了诶！！！颜色是怎么复制给两个三角形的呢
    // Compute the matrix
    var matrix = m3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight);
    matrix = m3.translate(matrix, translation[0], translation[1]);
    matrix = m3.rotate(matrix, angleInRadians);
    matrix = m3.scale(matrix, scale[0], scale[1]);
    // Set the matrix.
    gl.uniformMatrix3fv(matrixLocation, false, matrix);

    // Draw the geometry.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
  }

  function setColors (gl) {
    // Pick 2 random colors.
    var r1 = Math.random();
    var b1 = Math.random();
    var g1 = Math.random();
    var r2 = Math.random();
    var b2 = Math.random();
    var g2 = Math.random();

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(
        [r1, b1, g1, 1,
          r1, b1, g1, 1,
          r1, b1, g1, 1,
          r2, b2, g2, 1,
          r2, b2, g2, 1,
          r2, b2, g2, 1]),
      gl.STATIC_DRAW);
  }
  function setGeometry (gl) {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -150, -100,
        150, -100,
        -150, 100,
        150, -100,
        -150, 100,
        150, 100]),
      gl.STATIC_DRAW);
  }
};

// 绘制多个四边形
function commonFourLine () {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');

  const vSource = `
    attribute vec4 a_position;

    uniform vec2 u_resolution;

    void main() {
      // convert the position from pixels to 0.0 to 1.0
      vec2 zeroToOne = a_position.xy / u_resolution;

      // convert from 0->1 to 0->2
      vec2 zeroToTwo = zeroToOne * 2.0;

      // convert from 0->2 to -1->+1 (clipspace)
      vec2 clipSpace = zeroToTwo - 1.0;

      gl_Position = vec4(clipSpace, 0, 1);
    }
   `;
  const fSource = `
    precision mediump float;
    uniform vec4 u_color; // 自定义颜色
    void main() {
      gl_FragColor = u_color;
    }`;
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fSource);
  // 创建 glsl 着色程序
  const program = createProgram(gl, vertexShader, fragmentShader);
  // 该程序的唯一输入为 a_position，所以需要找到该属性的位置.寻找应该在初始化的时候完成，而不是渲染循环中
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
  var colorUniformLocation = gl.getUniformLocation(program, "u_color"); // 颜色定义位置

  webglUtils.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // 属性值从缓冲中获取数据，所以需要创建一个缓冲
  const positionBuffer = gl.createBuffer();
  // wegGL 可以通过一个绑定点操控全局范围内的许多数据，可以把绑定点想象成一个全局 webGL 内部的全局变量。
  // 首先绑定一个数据源到绑定点，然后，可以通过引用绑定点指向该数据源。所以接下来绑定位置信息缓冲。
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  /************ 开始渲染 ***********/
  // 清空画布
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 告诉它用我们之前写好的着色程序（一个着色器对）
  gl.useProgram(program);
  // 启用之前传入的属性的位置
  gl.enableVertexAttribArray(positionAttributeLocation);
  // 将绑定点绑定到缓冲数据（positionBuffer）
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
  var size = 2;          // 每次迭代运行提取两个单位数据
  var type = gl.FLOAT;   // 每个单位的数据类型是32位浮点型
  var normalize = false; // 不需要归一化数据
  var stride = 0;        // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）
  // 每次迭代运行运动多少内存到下一个数据开始点
  var offset = 0;        // 从缓冲起始位置开始读取
  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset);

  // 设置全局变量 分辨率
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  // 运行程序
  // 绘制50个随机颜色矩形
  for (var ii = 0; ii < 50; ++ii) {
    // 创建一个随机矩形
    // 并将写入位置缓冲
    // 因为位置缓冲是我们绑定在
    // `ARRAY_BUFFER`绑定点上的最后一个缓冲
    setRectangle(
      gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));

    // 设置一个随机颜色
    gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

    // 绘制矩形
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
};

// 返回 0 到 range 范围内的随机整数
function randomInt (range) {
  return Math.floor(Math.random() * range);
}

function basic () {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');

  //   const vSource = `
  //   attribute vec4 a_position;
  //   void main() {
  //     gl_Position = a_position;
  //   }
  //  `;
  const vSource = `
    attribute vec4 a_position;

    uniform vec2 u_resolution;

    void main() {
      // convert the position from pixels to 0.0 to 1.0
      vec2 zeroToOne = a_position.xy / u_resolution;

      // convert from 0->1 to 0->2
      vec2 zeroToTwo = zeroToOne * 2.0;

      // convert from 0->2 to -1->+1 (clipspace)
      vec2 clipSpace = zeroToTwo - 1.0;

      // gl_Position = vec4(clipSpace, 0, 1);
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1); // 翻转 y 轴
    }
   `;
  const fSource = `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(1, 0, 0.5, 1); // 返回“瑞迪施紫色”
    }`;
  // 创建 glsl 着色程序
  const program = createProgram(gl, vSource, fSource);
  // 该程序的唯一输入为 a_position，所以需要找到该属性的位置.寻找应该在初始化的时候完成，而不是渲染循环中
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

  // 属性值从缓冲中获取数据，所以需要创建一个缓冲
  const positionBuffer = gl.createBuffer();
  // wegGL 可以通过一个绑定点操控全局范围内的许多数据，可以把绑定点想象成一个全局 webGL 内部的全局变量。
  // 首先绑定一个数据源到绑定点，然后，可以通过引用绑定点指向该数据源。所以接下来绑定位置信息缓冲。
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  resize(canvas); // 让像素尺寸等同于显示尺寸
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); // 告诉 webgl 如何将裁剪空间转换到像素空间

  /************ 开始渲染 ***********/
  // 清空画布
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 告诉它用我们之前写好的着色程序（一个着色器对）
  gl.useProgram(program);
  // 启用之前传入的属性的位置
  gl.enableVertexAttribArray(positionAttributeLocation);
  // 将绑定点绑定到缓冲数据（positionBuffer）
  // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
  var size = 2;          // 每次迭代运行提取两个单位数据
  var type = gl.FLOAT;   // 每个单位的数据类型是32位浮点型
  var normalize = false; // 不需要归一化数据
  var stride = 0;        // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）
  // 每次迭代运行运动多少内存到下一个数据开始点
  var offset = 0;        // 从缓冲起始位置开始读取
  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset);

  // 设置全局变量 分辨率
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  // 接下来存放数据: 先定义三个二维点坐标，但是 webgl 需要强类型数据序列
  var positions = [
    10, 20,
    80, 20,
    10, 30,
    10, 30,
    80, 20,
    80, 30,
  ];
  // 所以将数据复制到 GPU 的 positionBuffer 上
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // 运行程序
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  // var count = 3;
  var count = 6;
  gl.drawArrays(primitiveType, offset, count);
}

// 四边形及着色
function main () {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program
  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying lowp vec4 vColor;
    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;
  // Fragment shader program
  const fsSource = `
    varying lowp vec4 vColor;
    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  const shaderProgram = createProgram(gl, vsSource, fsSource);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'), // 找到着色器程序中变量的位置
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    // 类似全局变量
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  const buffers = initBuffers(gl);

  // 以上均为初始化代码，只会执行一次
  // 一下为渲染代码，将在每次要渲染或绘制时执行

  drawScene(gl, programInfo, buffers);
}

function initBuffers (gl) {
  // 绑定一个数据源到绑定点，然后可以引用绑定点指向数据源
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // 绑到 ARRAY_BUFFER 上
  const positions = [
    1.0, 1.0,
    -1.0, 1.0,
    1.0, -1.0,
    -1.0, -1.0,
  ];
  // 通过绑定点向缓冲中存放数据|复制数据到 GPU 的 positionBuffer 对象上。
  // gl.STATIC_DRAW 提示不会经常改变这些数据
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW); // 将位置信息传递给 webGL

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  var colors = [
    1.0, 1.0, 1.0, 1.0,    // white
    1.0, 0.0, 0.0, 1.0,    // red
    0.0, 1.0, 0.0, 1.0,    // green
    0.0, 0.0, 1.0, 1.0,    // blue
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}

function drawScene (gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
    fieldOfView,
    aspect,
    zNear,
    zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
    modelViewMatrix,     // matrix to translate
    [-0.0, 0.0, -6.0]);  // amount to translate

  // 告诉 webGL 怎样从 buffer 中取出数据
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    // 将绑定点绑定到缓冲数据
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexColor);
  }

  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);
  // Set the shader uniforms
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix);

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}

// 画平面三角形
function init () {
  // 1、创建上下文
  const canvas = document.getElementById('glcanvas');
  const gl = canvas.getContext('webgl');

  const vertex = `
  attribute vec2 position;
  void main() {
    gl_PointSize = 1.0;
    gl_Position = vec4(position, 1.0, 1.0);
  }
`;

  const fragment = `
  precision mediump float;

  void main()
  {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

  const program = createProgram(gl, vertex, fragment);

  // 代表位置的强类型二进制数组
  const points = new Float32Array([
    -1, -1,
    0, 1,
    1, -1,
  ]);

  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

  /* 以下为 rendering */
  // 执行哪个 program
  gl.useProgram(program);
  const vPosition = gl.getAttribLocation(program, 'position'); // 获取顶点着色器中的position变量的地址;
  // webgl 怎么从 buffer 中拿数据
  gl.vertexAttribPointer(
    vPosition,
    2, // 每次迭代运行，提取两个单位数据
    gl.FLOAT, // 每个单位数据类型是 32 位浮点型
    false, // 不需要归一化数据
    0, // 移动单位数量 * 每个单位占用内存
    0 // 从缓存其实位置开始读取
  ); // 给变量设置长度和类型;
  gl.enableVertexAttribArray(vPosition); // 启用这个变量;
  gl.clear(gl.COLOR_BUFFER_BIT);

  // webgl 开始执行 glsl 程序
  gl.drawArrays(
    gl.TRIANGLES, // 设置图元类型为三角形，顶点着色器每运行3次webGL将会根据gl_positon值绘制一个三角形
    0,
    points.length / 2
  );
}
