var vertexShaderText = [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    '',
    'void main()',
    '{',
    'fragColor = vertColor;',
    'gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'

].join('\n');



var fragmentShaderText = [
    'precision mediump float;',
    '',
    'varying vec3 fragColor;',
    'void main()',
    '{',
    'gl_FragColor = vec4(fragColor, 1.0);',
    '}'
].join('\n');


var InitDemo = function(){
    console.log("This is working");

    let canvas = document.getElementById("game-surface");
    let gl = canvas.getContext("webgl");


    if(!gl){
        console.log("WebGL not suppported, falling back on experimental");
        gl = canvas.getContext('experimental-webgl');
    }

    if(!gl){
        alert("Your browser does not support webGL");
    }


    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    gl.viewport(0,0,window.innerWidth, window.innerHeight);


    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);


    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);


    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
        console.log("Error compiling vertex shader", gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
        console.log("Error compiling fragment shader", gl.getShaderInfoLog(vertexShader));
        return;
    }


    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
        console.log('Error Linking Program!', gl.getProgramInfoLog(program));
        return;
    }



    gl.validateProgram(program);
    if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
        console.log('Error Validating Program', gl.getProgramInfoLog(program));
        return;
    }


    // create Buffer

    var triangleVertices = [
        // X Y            // colors R G B
        0.0, 0.0,         1.0, 1.0, 0.0,
        -0.5, -0.5,       0.7, 0.0, 1.0,
        0.5, -0.5,        0.1, 1.0, 0.6
    ];


    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices) , gl.STATIC_DRAW);


    let positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    let colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
        positionAttribLocation, //attribute location
        2, //number of elements per attribute
        gl.FLOAT, //Type of elemenets
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT, //size of an individual vertex
        0 //Offset from the beginning of a single vertex to this attribute
    );


    gl.vertexAttribPointer(
        colorAttribLocation, //attribute location
        3, //number of elements per attribute
        gl.FLOAT, //Type of elemenets
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT, //size of an individual vertex
        2 * Float32Array.BYTES_PER_ELEMENT //Offset from the beginning of a single vertex to this attribute
    );


    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    //
    // Main render loop (after some time)
    //

    //var loop = function(){
    //    updateWorld();
    //    renderWorld();
    //    if(running){
    //        requestAnimationFrame(loop);
    //    }
    //}

    //requestAnimationFrame(loop);




    // Now we are only drawing the triangle on the screen 

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES,0, 3);




    

}


/* function vertexShader(vertPosition, vertColor){
    return{
        fragColor : vertColor,
        gl_Position : [vertPosition.x, vertPosition.y, 0,0, 1.0]
    }
} */