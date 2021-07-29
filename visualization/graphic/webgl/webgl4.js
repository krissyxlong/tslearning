// camera();
// light0();
// light1();
pointLight();

// 点光源
// 每个点都有一个不同的面到光源的矢量
function pointLight () {
  slider1([
    {
      func: rotate,
      range: [-360, 360]
    }
  ]);
  const v = `
    attribute vec4 a_position;
    attribute vec3 a_normal;
    
    uniform vec3 u_lightWorldPosition; // 光源位置
    
    uniform mat4 u_world;
    uniform mat4 u_worldViewProjection;
    uniform mat4 u_worldInverseTranspose;
    
    varying vec3 v_normal;
    
    varying vec3 v_surfaceToLight;
    
    void main() {
      // 将位置和矩阵相乘
      gl_Position = u_worldViewProjection * a_position;
     
      // 重定向法向量并传递给片断着色器
      v_normal = mat3(u_worldInverseTranspose) * a_normal;
     
      // 计算表面的世界坐标
      vec3 surfaceWorldPosition = (u_world * a_position).xyz;
     
      // 计算表面到光源的方向
      // 传递给片断着色器
      v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;
    }
  `;
  const f = `
  precision mediump float;
 
  // 从顶点着色器中传入的值
  varying vec3 v_normal;
  varying vec3 v_surfaceToLight;
  
  uniform vec3 u_reverseLightDirection;
  uniform vec4 u_color;
  
  void main() {
    // 由于 v_normal 是可变量，所以经过插值后不再是单位向量，
    // 单位化后会成为单位向量
    vec3 normal = normalize(v_normal);
  
    vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
  
    float light = dot(normal, surfaceToLightDirection);
  
    gl_FragColor = u_color;
  
    // 只将颜色部分（不包含 alpha） 和光照相乘
    gl_FragColor.rgb *= light;
  }

  `;

  var canvas = document.querySelector("#glcanvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }
  const program = createProgram(gl, v, f);

  // look up where the vertex data needs to go.
  var positionLocation = gl.getAttribLocation(program, "a_position");
  var normalLocation = gl.getAttribLocation(program, "a_normal");

  // lookup uniforms
  var worldViewProjectionLocation = gl.getUniformLocation(program, "u_worldViewProjection");
  var worldInverseTransposeLocation = gl.getUniformLocation(program, "u_worldInverseTranspose");
  var colorLocation = gl.getUniformLocation(program, "u_color");
  var lightWorldPositionLocation =
    gl.getUniformLocation(program, "u_lightWorldPosition");
  var worldLocation =
    gl.getUniformLocation(program, "u_world");

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setGeometry(gl); // F 数据点

  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  setNormals(gl); // F 点的法向量

  function radToDeg (r) {
    return r * 180 / Math.PI;
  }

  function degToRad (d) {
    return d * Math.PI / 180;
  }

  var fieldOfViewRadians = degToRad(60); // 视场角
  var fRotationRadians = 0; // y 轴旋转方向

  drawScene();
  function rotate (value) {
    fRotationRadians = degToRad(value);
    drawScene();
  }
  function drawScene () {
    drawReady(gl, program);

    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var size = 3;          // 3 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

    gl.enableVertexAttribArray(normalLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    var size = 3;          // 3 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      normalLocation, size, type, normalize, stride, offset);

    // 计算映射矩阵
    var projectionMatrix = getProjectionMatrix(gl, fieldOfViewRadians);

    // 计算相机矩阵
    var camera = [100, 150, 200];
    var target = [0, 35, 0];
    var up = [0, 1, 0];
    var cameraMatrix = m4.lookAt(camera, target, up);

    // 视图矩阵
    var viewMatrix = m4.inverse(cameraMatrix);

    // 计算视图映射矩阵
    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    // 在原点画 F 
    var worldMatrix = m4.yRotation(fRotationRadians);

    // Multiply the matrices.
    var worldViewProjectionMatrix = m4.multiply(viewProjectionMatrix, worldMatrix);
    var worldInverseMatrix = m4.inverse(worldMatrix);
    var worldInverseTransposeMatrix = m4.transpose(worldInverseMatrix);
    // Set the matrix.
    gl.uniformMatrix4fv(worldViewProjectionLocation, false, worldViewProjectionMatrix);
    gl.uniformMatrix4fv(worldInverseTransposeLocation, false, worldInverseTransposeMatrix);
    gl.uniformMatrix4fv(worldLocation, false, worldMatrix);

    // 设置颜色
    gl.uniform4fv(colorLocation, [0.2, 1, 0.2, 1]); // green

    // 设置光照位置
    gl.uniform3fv(lightWorldPositionLocation, [20, 30, 60]);

    // 画图.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 16 * 6;
    gl.drawArrays(primitiveType, offset, count);
  }
}

// 方向光源不随旋转而变化
// 需要在物体重定向时，重定向法向量
function light1 () {
  slider1([{
    func: rotate,
    range: [0, 360]
  }]);
  const v = `
  attribute vec4 a_position;
  attribute vec3 a_normal;
  
  uniform mat4 u_worldViewProjection;
  uniform mat4 u_world;

  varying vec3 v_normal; // 法向量
  
  void main() {
    // 将位置与世界矩阵相乘
    gl_Position = u_worldViewProjection * a_position;

    v_normal = mat3(u_world) * a_normal;  // 物体旋转时重定向法向量：还需求逆转置
  }
  `;
  const f = `
  precision mediump float;

  // Passed in from the vertex shader.
  varying vec3 v_normal;

  uniform vec3 u_reverseLightDirection; // 光的反向量
  uniform vec4 u_color;

  void main() {
    vec3 normal = normalize(v_normal);

    float light = dot(normal, u_reverseLightDirection);

    gl_FragColor = u_color;

    // Lets multiply just the color portion (not the alpha)
    // by the light
    gl_FragColor.rgb *= light;
  }
  `;

  var canvas = document.querySelector("#glcanvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }
  const program = createProgram(gl, v, f);

  var positionLocation = gl.getAttribLocation(program, "a_position");
  var normalLocation = gl.getAttribLocation(program, "a_normal");

  var worldViewProjectionLocation = gl.getUniformLocation(program, "u_worldViewProjection");
  var worldLocation = gl.getUniformLocation(program, "u_world");
  var reverseLightDirectionLocation = gl.getUniformLocation(program, "u_reverseLightDirection");
  var colorLocation = gl.getUniformLocation(program, "u_color");

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setGeometry(gl); // F 数据点

  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  setNormals(gl); // F 点的法向量

  function radToDeg (r) {
    return r * 180 / Math.PI;
  }

  function degToRad (d) {
    return d * Math.PI / 180;
  }

  var fieldOfViewRadians = degToRad(60); // 视场角
  var fRotationRadians = 0; // y 轴旋转方向

  drawScene();
  function rotate (value) {
    fRotationRadians = degToRad(value);
    drawScene();
  }
  function drawScene () {
    drawReady(gl, program);

    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var size = 3;          // 3 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

    gl.enableVertexAttribArray(normalLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    var size = 3;          // 3 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      normalLocation, size, type, normalize, stride, offset);

    // 计算映射矩阵
    var projectionMatrix = getProjectionMatrix(gl, fieldOfViewRadians);

    // 计算相机矩阵
    var camera = [100, 150, 200];
    var target = [0, 35, 0];
    var up = [0, 1, 0];
    var cameraMatrix = m4.lookAt(camera, target, up);

    // 视图矩阵
    var viewMatrix = m4.inverse(cameraMatrix);

    // 计算视图映射矩阵
    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    // 在原点画 F 
    var worldMatrix = m4.yRotation(fRotationRadians);

    // Multiply the matrices.
    var worldViewProjectionMatrix = m4.multiply(viewProjectionMatrix, worldMatrix);

    // Set the matrix.
    gl.uniformMatrix4fv(worldViewProjectionLocation, false, worldViewProjectionMatrix);
    gl.uniformMatrix4fv(worldLocation, false, worldMatrix);

    // 设置颜色
    gl.uniform4fv(colorLocation, [0.2, 1, 0.2, 1]); // green

    // 设置光照方向
    gl.uniform3fv(reverseLightDirectionLocation, m4.normalize([1.5, 0.7, 1]));

    // 画图.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 16 * 6;
    gl.drawArrays(primitiveType, offset, count);
  }
}
// 方向光源
function light () {
  slider1([{
    func: rotate,
    range: [0, 360]
  }]);
  const v = `
  attribute vec4 a_position;
  attribute vec3 a_normal;
  
  uniform mat4 u_matrix;
  varying vec3 v_normal; // 法向量
  
  void main() {
    // Multiply the position by the matrix.
    gl_Position = u_matrix * a_position;
  
    // Pass the normal to the fragment shader
    v_normal = a_normal;
  }
  `;
  const f = `
  precision mediump float;

  // Passed in from the vertex shader.
  varying vec3 v_normal;

  uniform vec3 u_reverseLightDirection; // 光的反向量
  uniform vec4 u_color;

  void main() {
    vec3 normal = normalize(v_normal);

    float light = dot(normal, u_reverseLightDirection);

    gl_FragColor = u_color;

    // Lets multiply just the color portion (not the alpha)
    // by the light
    gl_FragColor.rgb *= light;
  }
  `;

  var canvas = document.querySelector("#glcanvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }
  const program = createProgram(gl, v, f);

  var positionLocation = gl.getAttribLocation(program, "a_position");
  var normalLocation = gl.getAttribLocation(program, "a_normal");
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");
  var reverseLightDirectionLocation = gl.getUniformLocation(program, "u_reverseLightDirection");
  var colorLocation = gl.getUniformLocation(program, "u_color");

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setGeometry(gl); // F 数据点

  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  setNormals(gl); // F 点的法向量

  function radToDeg (r) {
    return r * 180 / Math.PI;
  }

  function degToRad (d) {
    return d * Math.PI / 180;
  }

  var fieldOfViewRadians = degToRad(60); // 视场角
  var fRotationRadians = 0; // y 轴旋转方向

  drawScene();
  function rotate (value) {
    fRotationRadians = degToRad(value);
    drawScene();
  }
  function drawScene () {
    drawReady(gl, program);

    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var size = 3;          // 3 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

    gl.enableVertexAttribArray(normalLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    var size = 3;          // 3 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      normalLocation, size, type, normalize, stride, offset);

    // 计算映射矩阵
    var projectionMatrix = getProjectionMatrix(gl, fieldOfViewRadians);

    // 计算相机矩阵
    var camera = [100, 150, 200];
    var target = [0, 35, 0];
    var up = [0, 1, 0];
    var cameraMatrix = m4.lookAt(camera, target, up);

    // 视图矩阵
    var viewMatrix = m4.inverse(cameraMatrix);

    // 计算视图映射矩阵
    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    // 在原点画 F 
    var worldMatrix = m4.yRotation(fRotationRadians);

    // Multiply the matrices.
    var worldViewProjectionMatrix = m4.multiply(viewProjectionMatrix, worldMatrix);

    // Set the matrix.
    gl.uniformMatrix4fv(matrixLocation, false, worldViewProjectionMatrix);

    // 设置颜色
    gl.uniform4fv(colorLocation, [0.2, 1, 0.2, 1]); // green

    // 设置光照方向
    gl.uniform3fv(reverseLightDirectionLocation, m4.normalize([1.5, 0.7, -1]));

    // 画图.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 16 * 6;
    gl.drawArrays(primitiveType, offset, count);
  }
}

// 三维相机
function camera () {
  slider1([
    {
      func: rotate,
      range: [-360, 360]
    },
  ]);
  const v = `
  attribute vec4 a_position;
  attribute vec4 a_color;

  uniform mat4 u_matrix; // 全局变量，在着色器程序运行前赋值，在运行过程中全局有效
  varying vec4 v_color;

  void main() {
    // Multiply the position by the matrix.
    gl_Position = u_matrix * a_position;

    // Pass the color to the fragment shader.
    v_color = a_color;
  }
  `;
  const f = `
    precision mediump float;

    // Passed in from the vertex shader.
    varying vec4 v_color;

    void main() {
      gl_FragColor = v_color;
    }
  `;
  var canvas = document.querySelector("#glcanvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }
  const program = createProgram(gl, v, f);

  var positionLocation = gl.getAttribLocation(program, "a_position");
  var colorLocation = gl.getAttribLocation(program, "a_color");
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");

  // 绑数据
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setGeometry(gl);

  // 绑颜色
  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setColors(gl);

  function radToDeg (r) {
    return r * 180 / Math.PI;
  }

  function degToRad (d) {
    return d * Math.PI / 180;
  }

  var cameraAngleRadians = degToRad(0);
  var fieldOfViewRadians = degToRad(60);

  drawScene();

  function drawScene () {
    drawReady(gl, program);

    // 启动位置属性
    gl.enableVertexAttribArray(positionLocation);
    // 数据就位
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var size = 3;          // 3 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

    gl.enableVertexAttribArray(colorLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    var size = 3;                 // 3 components per iteration
    var type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned values
    var normalize = true;         // normalize the data (convert from 0-255 to 0-1)
    var stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;               // start at the beginning of the buffer
    gl.vertexAttribPointer(
      colorLocation, size, type, normalize, stride, offset);

    var numFs = 5;
    var radius = 200;

    // 计算映射矩阵
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight; // 屏幕宽高比
    var zNear = 1;
    var zFar = 2000;
    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);

    // 第一个 F 位置
    var fPosition = [radius, 0, 0];

    // 计算相机矩阵
    var cameraMatrix = m4.yRotation(cameraAngleRadians);
    cameraMatrix = m4.translate(cameraMatrix, 0, 0, radius * 1.5);

    // 获取相机位置：原点
    var cameraPosition = [
      cameraMatrix[12],
      cameraMatrix[13],
      cameraMatrix[14],
    ];

    var up = [0, 1, 0];

    // 相机矩阵
    var cameraMatrix = m4.lookAt(cameraPosition, fPosition, up);
    // 视图矩阵，同相机矩阵相反
    var viewMatrix = m4.inverse(cameraMatrix);
    // 计算视图、映射矩阵
    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    for (var ii = 0; ii < numFs; ++ii) {
      var angle = ii * Math.PI * 2 / numFs;
      var x = Math.cos(angle) * radius;
      var y = Math.sin(angle) * radius;

      // starting with the view projection matrix
      // compute a matrix for the F
      var matrix = m4.translate(viewProjectionMatrix, x, 0, y);

      // Set the matrix.
      gl.uniformMatrix4fv(matrixLocation, false, matrix);

      // Draw the geometry.
      var primitiveType = gl.TRIANGLES;
      var offset = 0;
      var count = 16 * 6;
      gl.drawArrays(primitiveType, offset, count);
    }
  }
  function rotate (value) {
    cameraAngleRadians = degToRad(value);
    drawScene();
  }
}

// Fill the buffer with the values that define a letter 'F'.
function setGeometry (gl) {
  var positions = new Float32Array([
    // left column front
    0, 0, 0,
    0, 150, 0,
    30, 0, 0,
    0, 150, 0,
    30, 150, 0,
    30, 0, 0,

    // top rung front
    30, 0, 0,
    30, 30, 0,
    100, 0, 0,
    30, 30, 0,
    100, 30, 0,
    100, 0, 0,

    // middle rung front
    30, 60, 0,
    30, 90, 0,
    67, 60, 0,
    30, 90, 0,
    67, 90, 0,
    67, 60, 0,

    // left column back
    0, 0, 30,
    30, 0, 30,
    0, 150, 30,
    0, 150, 30,
    30, 0, 30,
    30, 150, 30,

    // top rung back
    30, 0, 30,
    100, 0, 30,
    30, 30, 30,
    30, 30, 30,
    100, 0, 30,
    100, 30, 30,

    // middle rung back
    30, 60, 30,
    67, 60, 30,
    30, 90, 30,
    30, 90, 30,
    67, 60, 30,
    67, 90, 30,

    // top
    0, 0, 0,
    100, 0, 0,
    100, 0, 30,
    0, 0, 0,
    100, 0, 30,
    0, 0, 30,

    // top rung right
    100, 0, 0,
    100, 30, 0,
    100, 30, 30,
    100, 0, 0,
    100, 30, 30,
    100, 0, 30,

    // under top rung
    30, 30, 0,
    30, 30, 30,
    100, 30, 30,
    30, 30, 0,
    100, 30, 30,
    100, 30, 0,

    // between top rung and middle
    30, 30, 0,
    30, 60, 30,
    30, 30, 30,
    30, 30, 0,
    30, 60, 0,
    30, 60, 30,

    // top of middle rung
    30, 60, 0,
    67, 60, 30,
    30, 60, 30,
    30, 60, 0,
    67, 60, 0,
    67, 60, 30,

    // right of middle rung
    67, 60, 0,
    67, 90, 30,
    67, 60, 30,
    67, 60, 0,
    67, 90, 0,
    67, 90, 30,

    // bottom of middle rung.
    30, 90, 0,
    30, 90, 30,
    67, 90, 30,
    30, 90, 0,
    67, 90, 30,
    67, 90, 0,

    // right of bottom
    30, 90, 0,
    30, 150, 30,
    30, 90, 30,
    30, 90, 0,
    30, 150, 0,
    30, 150, 30,

    // bottom
    0, 150, 0,
    0, 150, 30,
    30, 150, 30,
    0, 150, 0,
    30, 150, 30,
    30, 150, 0,

    // left side
    0, 0, 0,
    0, 0, 30,
    0, 150, 30,
    0, 0, 0,
    0, 150, 30,
    0, 150, 0]);

  // Center the F around the origin and Flip it around. We do this because
  // we're in 3D now with and +Y is up where as before when we started with 2D
  // we had +Y as down.

  // We could do by changing all the values above but I'm lazy.
  // We could also do it with a matrix at draw time but you should
  // never do stuff at draw time if you can do it at init time.
  var matrix = m4.xRotation(Math.PI);
  matrix = m4.translate(matrix, -50, -75, -15);

  for (var ii = 0; ii < positions.length; ii += 3) {
    var vector = m4.vectorMultiply([positions[ii + 0], positions[ii + 1], positions[ii + 2], 1], matrix);
    positions[ii + 0] = vector[0];
    positions[ii + 1] = vector[1];
    positions[ii + 2] = vector[2];
  }

  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
}

// Fill the buffer with colors for the 'F'.
function setColors (gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Uint8Array([
      // left column front
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,

      // top rung front
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,

      // middle rung front
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,

      // left column back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

      // top rung back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

      // middle rung back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

      // top
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,

      // top rung right
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,

      // under top rung
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,

      // between top rung and middle
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,

      // top of middle rung
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,

      // right of middle rung
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,

      // bottom of middle rung.
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,

      // right of bottom
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,

      // bottom
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,

      // left side
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220]),
    gl.STATIC_DRAW);
}

// F 法向量
function setNormals (gl) {
  var normals = new Float32Array([
    // 正面左竖
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // 正面上横
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // 正面中横
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // 背面左竖
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,

    // 背面上横
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,

    // 背面中横
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,

    // 顶部
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // 上横右面
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // 上横下面
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,

    // 上横和中横之间
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // 中横上面
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // 中横右面
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // 中横底面
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,

    // 底部右侧
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // 底面
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,

    // 左面
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0]);
  gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
}
