
// 1、创建上下文
const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl');

/* 2、创建 WebGLProgram 对象：
  着色器
*/
// 顶点着色器
const vertex = `
  attribute vec2 position;

  void main() {
    gl_PointSize = 1.0;
    gl_Position = vec4(position, 1.0, 1.0);
  }
`;

// 片源着色器
const fragment = `
  precision mediump float;

  void main()
  {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }    
`;

// 分别创建成 shader 对象
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);

// 已在 GPU 上创建了 webGL 对象
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

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
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0); // 给变量设置长度和类型;
gl.enableVertexAttribArray(vPosition); // 激活这个变量;


gl.clear(gl.COLOR_BUFFER_BIT);
// webgl 开始执行 glsl 程序
gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
