var vertexShaderText = [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    '',
    'void main()',
    '{',
    'gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'

].join('\n');



var fragmentShaderText = [
    'precision mediump float;',
    '',
    'void main()',
    '{',
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
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

}


/* function vertexShader(vertPosition, vertColor){
    return{
        fragColor : vertColor,
        gl_Position : [vertPosition.x, vertPosition.y, 0,0, 1.0]
    }
} */