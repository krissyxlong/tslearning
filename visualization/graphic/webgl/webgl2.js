// imageProcess1();
// twoDim();
// moveF();
// circleF();
// stretchF();
// matrix();
imageProcess2();


// 矩阵同时实现：平移、旋转、缩放
function matrix () {
  slider({
    func1: reset(0),
    func2: reset(1),
    func3: rotate,
    func4: scaleFunc(0),
    func5: scaleFunc(1),
  });

  const m3 = {
    translation: function (tx, ty) {
      return [
        1, 0, 0,
        0, 1, 0,
        tx, ty, 1
      ];
    },
    rotation: function (angleInRadians) {
      const c = Math.cos(angleInRadians);
      const s = Math.sin(angleInRadians);
      return [
        c, -s, 0,
        s, c, 0,
        0, 0, 1
      ];
    },
    scaling: function (sx, sy) {
      return [
        sx, 0, 0,
        0, sy, 0,
        0, 0, 1
      ];
    },
    multiply: function (a, b) {
      var a00 = a[0 * 3 + 0];
      var a01 = a[0 * 3 + 1];
      var a02 = a[0 * 3 + 2];
      var a10 = a[1 * 3 + 0];
      var a11 = a[1 * 3 + 1];
      var a12 = a[1 * 3 + 2];
      var a20 = a[2 * 3 + 0];
      var a21 = a[2 * 3 + 1];
      var a22 = a[2 * 3 + 2];
      var b00 = b[0 * 3 + 0];
      var b01 = b[0 * 3 + 1];
      var b02 = b[0 * 3 + 2];
      var b10 = b[1 * 3 + 0];
      var b11 = b[1 * 3 + 1];
      var b12 = b[1 * 3 + 2];
      var b20 = b[2 * 3 + 0];
      var b21 = b[2 * 3 + 1];
      var b22 = b[2 * 3 + 2];
      return [
        b00 * a00 + b01 * a10 + b02 * a20,
        b00 * a01 + b01 * a11 + b02 * a21,
        b00 * a02 + b01 * a12 + b02 * a22,
        b10 * a00 + b11 * a10 + b12 * a20,
        b10 * a01 + b11 * a11 + b12 * a21,
        b10 * a02 + b11 * a12 + b12 * a22,
        b20 * a00 + b21 * a10 + b22 * a20,
        b20 * a01 + b21 * a11 + b22 * a21,
        b20 * a02 + b21 * a12 + b22 * a22,
      ];
    },
  };

  const canvas = document.getElementById('glcanvas');
  const gl = canvas.getContext('webgl');
  const v = `
      attribute vec2 a_position;

      uniform vec2 u_resolution;
      uniform mat3 u_matrix;
      
      void main() {
        // 将位置乘以矩阵
        vec2 position = (u_matrix * vec3(a_position, 1)).xy;

        // convert the position from pixels to 0.0 to 1.0
        vec2 zeroToOne = position / u_resolution;

        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // convert from 0->2 to -1->+1 (clipspace)
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
  `;
  const f = `
    precision mediump float;

    uniform vec4 u_color;
    
    void main() {
      gl_FragColor = u_color;
    }
  `;

  const program = createProgram(gl, v, f);
  gl.useProgram(program);

  var positionLocation = gl.getAttribLocation(program, "a_position");
  var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  var colorLocation = gl.getUniformLocation(program, "u_color");
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");

  // Create a buffer to put positions in
  var positionBuffer = gl.createBuffer();
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Put geometry data into buffer
  setGeometry(gl);

  var translation = [150, 150];
  var angleInRadians = 0;
  var scale = [1, 1];
  var color = [Math.random(), Math.random(), Math.random(), 1];

  drawScene();

  // Draw the scene.
  function drawScene () {
    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

    // set the resolution
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

    // set the color
    gl.uniform4fv(colorLocation, color);

    // 生成矩阵
    var translationMatrix = m3.translation(translation[0], translation[1]);
    var rotationMatrix = m3.rotation(angleInRadians);
    var scaleMatrix = m3.scaling(scale[0], scale[1]);
    // 矩阵相乘
    var matrix = m3.multiply(translationMatrix, rotationMatrix);
    matrix = m3.multiply(matrix, scaleMatrix);
    // 矩阵赋值
    gl.uniformMatrix3fv(matrixLocation, false, matrix);

    // Set the translation.
    // gl.uniform2fv(translationLocation, translation);

    // // Set the rotation.
    // gl.uniform2fv(rotationLocation, rotation);

    // // Set the rotation.
    // gl.uniform2fv(scaleLocation, scale);

    // Draw the geometry.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 18;  // 6 triangles in the 'F', 3 points per triangle
    gl.drawArrays(primitiveType, offset, count);
  }

  function setGeometry (gl) {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        // left column
        0, 0,
        30, 0,
        0, 150,
        0, 150,
        30, 0,
        30, 150,

        // top rung
        30, 0,
        100, 0,
        30, 30,
        30, 30,
        100, 0,
        100, 30,

        // middle rung
        30, 60,
        67, 60,
        30, 90,
        30, 90,
        67, 60,
        67, 90,
      ]),
      gl.STATIC_DRAW);
  }

  function rotate (dis) {
    const ang = Math.PI * 2 * (dis / 113);
    angleInRadians = ang;
    drawScene();
  }
  function scaleFunc (index) {
    return function (left) {
      scale[index] = 1 - left / 114;
      drawScene();
    };
  }
  function reset (index) {
    return function (left) {
      translation[index] = 150 + left;
      drawScene();
    };
  }
}

// 缩放 F
function stretchF () {
  slider({
    func1: reset(0),
    func2: reset(1),
    func3: rotate,
    func4: scaleFunc(0),
    func5: scaleFunc(1),
  });

  const canvas = document.getElementById('glcanvas');
  const gl = canvas.getContext('webgl');
  const v = `
      attribute vec2 a_position;

      uniform vec2 u_resolution;
      uniform vec2 u_translation;
      uniform vec2 u_rotation;
      uniform vec2 u_scale;
      
      void main() {
        // Scale the position
        vec2 scaledPosition = a_position * u_scale;

        // Rotate the position
        vec2 rotatedPosition = vec2(
          scaledPosition.x * u_rotation.y + scaledPosition.y * u_rotation.x,
          scaledPosition.y * u_rotation.y - scaledPosition.x * u_rotation.x);

        // Add in the translation.
        vec2 position = rotatedPosition + u_translation;

        // convert the position from pixels to 0.0 to 1.0
        vec2 zeroToOne = position / u_resolution;

        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // convert from 0->2 to -1->+1 (clipspace)
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
  `;
  const f = `
    precision mediump float;

    uniform vec4 u_color;
    
    void main() {
      gl_FragColor = u_color;
    }
  `;

  const program = createProgram(gl, v, f);
  gl.useProgram(program);

  var positionLocation = gl.getAttribLocation(program, "a_position");
  var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  var colorLocation = gl.getUniformLocation(program, "u_color");
  var translationLocation = gl.getUniformLocation(program, "u_translation");
  var rotationLocation = gl.getUniformLocation(program, "u_rotation");
  var scaleLocation = gl.getUniformLocation(program, "u_scale");

  // Create a buffer to put positions in
  var positionBuffer = gl.createBuffer();
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Put geometry data into buffer
  setGeometry(gl);

  var translation = [150, 150];
  var rotation = [0, 1];
  var scale = [1, 1];
  var color = [Math.random(), Math.random(), Math.random(), 1];

  drawScene();

  // Draw the scene.
  function drawScene () {
    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

    // set the resolution
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

    // set the color
    gl.uniform4fv(colorLocation, color);

    // Set the translation.
    gl.uniform2fv(translationLocation, translation);

    // Set the rotation.
    gl.uniform2fv(rotationLocation, rotation);

    // Set the rotation.
    gl.uniform2fv(scaleLocation, scale);

    // Draw the geometry.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 18;  // 6 triangles in the 'F', 3 points per triangle
    gl.drawArrays(primitiveType, offset, count);
  }
  function setGeometry (gl) {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        // left column
        0, 0,
        30, 0,
        0, 150,
        0, 150,
        30, 0,
        30, 150,

        // top rung
        30, 0,
        100, 0,
        30, 30,
        30, 30,
        100, 0,
        100, 30,

        // middle rung
        30, 60,
        67, 60,
        30, 90,
        30, 90,
        67, 60,
        67, 90,
      ]),
      gl.STATIC_DRAW);
  }
  function rotate (dis) {
    const ang = Math.PI * 2 * (dis / 113);
    rotation[0] = Math.sin(ang);
    rotation[1] = Math.cos(ang);
    drawScene();
  }
  function scaleFunc (index) {
    return function (left) {
      scale[index] = 1 - left / 114;
      drawScene();
    };
  }
  function reset (index) {
    return function (left) {
      translation[index] = 150 + left;
      drawScene();
    };
  }
}

// 旋转 F，旋转公式：x1 = x0*cosN - y0*sinN；y1 = y1*sinN + y0*cosN；
// 每次旋转都可以对应一个旋转矩阵，todo
function circleF () {
  slider({
    func1: reset(0),
    func2: reset(1),
    func3: rotate
  });

  const canvas = document.getElementById('glcanvas');
  const gl = canvas.getContext('webgl');
  const v = `
      attribute vec2 a_position;
      uniform vec2 u_resolution;
      uniform vec2 u_translation;
      uniform vec2 u_rotation;
      
      void main() {
        // Rotate the position
        vec2 rotatedPosition = vec2(
          a_position.x * u_rotation.y - a_position.y * u_rotation.x,
          a_position.y * u_rotation.y + a_position.x * u_rotation.x);

      // Add in the translation.
      vec2 position = rotatedPosition + u_translation;

      // convert the rectangle points from pixels to 0.0 to 1.0
      vec2 zeroToOne = position / u_resolution;

      // convert from 0->1 to 0->2
      vec2 zeroToTwo = zeroToOne * 2.0;

      // convert from 0->2 to -1->+1 (clipspace)
      vec2 clipSpace = zeroToTwo - 1.0;

      // 坐标原点移到左上角
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
  `;
  const f = `
    precision mediump float;

    uniform vec4 u_color;
    
    void main() {
      gl_FragColor = u_color;
    }
  `;

  const program = createProgram(gl, v, f);
  gl.useProgram(program);

  var positionLocation = gl.getAttribLocation(program, "a_position");
  var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  var colorLocation = gl.getUniformLocation(program, "u_color");
  var translationLocation = gl.getUniformLocation(program, "u_translation");
  var rotationLocation = gl.getUniformLocation(program, "u_rotation");

  // Create a buffer to put positions in
  var positionBuffer = gl.createBuffer();
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Put geometry data into buffer
  setGeometry(gl);

  var translation = [150, 150];
  var rotation = [0, 1];
  var color = [Math.random(), Math.random(), Math.random(), 1];

  drawScene();

  // Draw the scene.
  function drawScene () {
    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

    // set the resolution
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

    // set the color
    gl.uniform4fv(colorLocation, color);

    // Set the translation.
    gl.uniform2fv(translationLocation, translation);

    // Set the rotation.
    gl.uniform2fv(rotationLocation, rotation);

    // Draw the geometry.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 18;  // 6 triangles in the 'F', 3 points per triangle
    gl.drawArrays(primitiveType, offset, count);
  }
  function setGeometry (gl) {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        // left column
        0, 0,
        30, 0,
        0, 150,
        0, 150,
        30, 0,
        30, 150,

        // top rung
        30, 0,
        100, 0,
        30, 30,
        30, 30,
        100, 0,
        100, 30,

        // middle rung
        30, 60,
        67, 60,
        30, 90,
        30, 90,
        67, 60,
        67, 90,
      ]),
      gl.STATIC_DRAW);
  }
  function rotate (dis) {
    const ang = Math.PI * 2 * (dis / 113);
    rotation[0] = Math.sin(ang);
    rotation[1] = Math.cos(ang);
    drawScene();
  }
  function reset (index) {
    return function (left) {
      if (index <= 1) {
        translation[index] = 150 + left;
      }
      drawScene();
    };
  }
}

// 移动 F，变更位置逻辑写在 vertexShader 中
function moveF () {
  slider({
    func1: reset(0),
    func2: reset(1),
  });
  const canvas = document.getElementById('glcanvas');
  const gl = canvas.getContext('webgl');
  const v = `
    attribute vec2 a_position;
    uniform vec2 u_resolution;
    uniform vec2 u_translation;

    void main() {
      // Add in the translation.
      vec2 position = a_position + u_translation;

      // convert the rectangle points from pixels to 0.0 to 1.0
      vec2 zeroToOne = position / u_resolution;

      // convert from 0->1 to 0->2
      vec2 zeroToTwo = zeroToOne * 2.0;

      // convert from 0->2 to -1->+1 (clipspace)
      vec2 clipSpace = zeroToTwo - 1.0;

      // 坐标原点移到左上角
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
  `;
  const f = `
    precision mediump float;

    uniform vec4 u_color;
    
    void main() {
      gl_FragColor = u_color;
    }
  `;

  const program = createProgram(gl, v, f);
  gl.useProgram(program);

  var positionLocation = gl.getAttribLocation(program, "a_position");
  var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  var colorLocation = gl.getUniformLocation(program, "u_color");
  var translationLocation = gl.getUniformLocation(program, "u_translation");

  // Create a buffer to put positions in
  var positionBuffer = gl.createBuffer();
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Put geometry data into buffer
  setGeometry(gl);

  var translation = [0, 0];
  var color = [Math.random(), Math.random(), Math.random(), 1];

  drawScene();

  // Draw the scene.
  function drawScene () {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas.
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

    // set the resolution
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

    // set the color
    gl.uniform4fv(colorLocation, color);

    // Set the translation.
    gl.uniform2fv(translationLocation, translation);

    // Draw the geometry.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 18;  // 6 triangles in the 'F', 3 points per triangle
    gl.drawArrays(primitiveType, offset, count);
  }
  function setGeometry (gl) {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        // left column
        0, 0,
        30, 0,
        0, 150,
        0, 150,
        30, 0,
        30, 150,

        // top rung
        30, 0,
        100, 0,
        30, 30,
        30, 30,
        100, 0,
        100, 30,

        // middle rung
        30, 60,
        67, 60,
        30, 90,
        30, 90,
        67, 60,
        67, 90,
      ]),
      gl.STATIC_DRAW);
  }
  function reset (index) {
    return function (left) {
      translation[index] = left;
      console.log('left', left);
      drawScene();
    };
  }
}

// 移动四边形，位置变更直接重新生成三角形
function twoDim () {
  slider(reset);
  // 平移参数
  var translation = [0, 0];
  var width = 100;
  var height = 30;
  var color = () => [Math.random(), Math.random(), Math.random(), 1];

  const canvas = document.getElementById('glcanvas');
  const gl = canvas.getContext('webgl');
  const v = `
    attribute vec2 a_position;

    uniform vec2 u_resolution;

    void main() {
      // convert the rectangle points from pixels to 0.0 to 1.0
      vec2 zeroToOne = a_position / u_resolution;

      // convert from 0->1 to 0->2
      vec2 zeroToTwo = zeroToOne * 2.0;

      // convert from 0->2 to -1->+1 (clipspace)
      vec2 clipSpace = zeroToTwo - 1.0;

      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
  `;
  const f = `
    precision mediump float;

    uniform vec4 u_color;
    
    void main() {
      gl_FragColor = u_color;
    }
  `;

  var program = createProgram(gl, v, f);
  var positionLocation = gl.getAttribLocation(program, "a_position");
  var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  var colorLocation = gl.getUniformLocation(program, "u_color");

  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // 设置参数
  setRectangle(gl, translation[0], translation[1], width, height);
  drawScene();

  function drawScene () {
    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

    // set the resolution
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

    // set the color
    gl.uniform4fv(colorLocation, color());
    setRectangle(gl, translation[0], translation[1], width, height);

    // Draw the geometry.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;  // 6 triangles in the 'F', 3 points per triangle
    gl.drawArrays(primitiveType, offset, count);
  }
  function reset (left) {
    translation[0] = left;
    drawScene();
  }
}

// 图像纹理1
function imageProcess1 () {
  main();
  function main () {
    var image = new Image();
    image.src = "../icon.jpeg";  // MUST BE SAME DOMAIN!!!
    image.onload = function () {
      console.log('image loaded');
      render(image);
    };
  }
  function render (image) {
    // 1、创建上下文
    const canvas = document.getElementById('glcanvas');
    const gl = canvas.getContext('webgl');

    const vertex = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    
    uniform vec2 u_resolution;
    varying vec2 v_texCoord;
    
    void main() {
       // convert the rectangle from pixels to 0.0 to 1.0
       vec2 zeroToOne = a_position / u_resolution;
    
       // convert from 0->1 to 0->2
       vec2 zeroToTwo = zeroToOne * 2.0;
    
       // convert from 0->2 to -1->+1 (clipspace)
       vec2 clipSpace = zeroToTwo - 1.0;
    
       gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    
       // pass the texCoord to the fragment shader
       // The GPU will interpolate this value between points.
       v_texCoord = a_texCoord;
    }
`;

    // u_image
    const fragment = `
    precision mediump float;

    // our texture
    uniform sampler2D u_image; // u_image：全局单位，默认为 0，纹理单元 0 默认为当前活跃纹理，所以调用 bindTexture 会将纹理绑定到单元 0
    
    // the texCoords passed in from the vertex shader.
    varying vec2 v_texCoord;
    
    void main() {
      // 在纹理上寻找对应颜色值
      gl_FragColor = texture2D(u_image, v_texCoord).bgra;
    }
`;

    const program = createProgram(gl, vertex, fragment);

    // 取出数据存放地址
    var positionLocation = gl.getAttribLocation(program, "a_position");
    var texcoordLocation = gl.getAttribLocation(program, "a_texCoord"); // 找到纹理地址
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setRectangle(gl, 0, 0, image.width, image.height);

    // 为矩形提供纹理坐标
    var texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0, 0.0,
      1.0, 0.0,
      0.0, 1.0,
      // 0.0, 0.0,
      // 1.0, 0.0,
      // 0.0, 1.0,
      0.0, 1.0,
      1.0, 0.0,
      1.0, 1.0,
    ]), gl.STATIC_DRAW);
    // 创建纹理
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the parameters so we can render any size image.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    // 将图片上传至纹理中
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

    // Turn on the texcoord attribute
    gl.enableVertexAttribArray(texcoordLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

    // Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      texcoordLocation, size, type, normalize, stride, offset);

    // set the resolution
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

    // Draw the rectangle.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
  };

}

// 图像纹理2，通过取相邻值的均值实现图片模糊化
function imageProcess2 () {
  main();
  function main () {
    var image = new Image();
    image.src = "../icon.jpeg";  // MUST BE SAME DOMAIN!!!
    image.onload = function () {
      console.log('image loaded');
      render(image);
    };
  }
  function render (image) {
    // 1、创建上下文
    const canvas = document.getElementById('glcanvas');
    const gl = canvas.getContext('webgl');

    const vertex = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    
    uniform vec2 u_resolution;
    varying vec2 v_texCoord;
    
    void main() {
       // convert the rectangle from pixels to 0.0 to 1.0
       vec2 zeroToOne = a_position / u_resolution;
    
       // convert from 0->1 to 0->2
       vec2 zeroToTwo = zeroToOne * 2.0;
    
       // convert from 0->2 to -1->+1 (clipspace)
       vec2 clipSpace = zeroToTwo - 1.0;
    
       gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    
       // pass the texCoord to the fragment shader
       // The GPU will interpolate this value between points.
       v_texCoord = a_texCoord;
    }
`;
    // 联系怎么获取像素值
    const fragment = `
    precision mediump float;

    // our texture
    uniform sampler2D u_image;
    uniform vec2 u_textureSize;
    
    // the texCoords passed in from the vertex shader.
    varying vec2 v_texCoord;
    
    void main() {
      vec2 onePixel = vec2(1.0, 1.0) / u_textureSize; // 一个像素
      // 在纹理上寻找对应颜色值
      gl_FragColor = (
        texture2D(u_image, v_texCoord) +
        texture2D(u_image, v_texCoord + vec2(onePixel.x, 0.0)) +
        texture2D(u_image, v_texCoord + vec2(-onePixel.x, 0.0))) / 3.0;;
    }
`;

    const program = createProgram(gl, vertex, fragment);

    // 取出数据存放地址
    var positionLocation = gl.getAttribLocation(program, "a_position");
    var texcoordLocation = gl.getAttribLocation(program, "a_texCoord"); // 找到纹理地址
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    var textureSizeLocation = gl.getUniformLocation(program, "u_textureSize");

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setRectangle(gl, 0, 0, image.width, image.height);

    // 为矩形提供纹理坐标
    var texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0, 0.0,
      1.0, 0.0,
      0.0, 1.0,
      // 0.0, 0.0,
      // 1.0, 0.0,
      // 0.0, 1.0,
      0.0, 1.0,
      1.0, 0.0,
      1.0, 1.0,
    ]), gl.STATIC_DRAW);

    // 创建纹理
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the parameters so we can render any size image.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    // 将图片上传至纹理中：目标、图像详细等级、颜色组件、纹理数据格式、纹理数据的数据类型、纹理像素源
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

    gl.enableVertexAttribArray(texcoordLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    // Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    // 告诉显卡从当前绑定的缓冲区中读取顶点数据：
    // 要修改的顶点属性的索引、size: 指定每个顶点属性的组成数量，必须是 1， 2， 3， 4、数据类型、是否将整数数值归一化到特定的范围、两个属性是否有交错位移、指定顶点属性数组中第一部分的字节偏移量
    gl.vertexAttribPointer(
      texcoordLocation, size, type, normalize, stride, offset);

    // set the resolution
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height); // uniform()：给 uniform 变量赋值
    // set the size of the image
    gl.uniform2f(textureSizeLocation, gl.canvas.width, gl.canvas.height);

    // Draw the rectangle.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
  };

}
