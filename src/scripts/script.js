var canvas = document.getElementById("canvas");
var canvas2 = canvas.cloneNode()
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let w = canvas.width
let h = canvas.height
let effects_count = 6;
let effect_index = 4;
let eff = true;
let scrollPercent = 0;
var ctx2,ctx;

// const bg_color = '#2d303a';
const bg_color = '#1e1e1e';

const old_poses_count = 12;

if (canvas.getContext) {
    ctx2 = canvas2.getContext("2d");
    ctx = canvas.getContext("2d");
    let gravity = 0.4;
    let max_particles = 800
    noise.seed(Math.random());
    var vectors = [];
    var old_poses = []

    for (let i = 0; i < max_particles; i++) {
        let x = Math.random() * w;
        let y = Math.random() * h;
        // [0,1] - current position, [2,3] - speed, [4,5],[6,7],[8,9] - old positions
        // vectors.push([x, y, 0, 0, x, y, x, y, x, y]);
        vectors.push([x, y, 0, 0]);
        var pose = []
        for (let i = 0; i < old_poses_count; i++) {
            pose.push([x, y])
        }
        old_poses.push(pose)
        pose = []
    }


    function update_vectors() {
        for (let i = 0; i < vectors.length; i++) {
            // vectors[i][9] = vectors[i][7]
            // vectors[i][8] = vectors[i][6]
            // vectors[i][7] = vectors[i][5]
            // vectors[i][6] = vectors[i][4]
            // vectors[i][4] = vectors[i][0]
            // vectors[i][5] = vectors[i][1]

            old_poses[i][0][0] = vectors[i][0]
            old_poses[i][0][1] = vectors[i][1]
            for (let j = old_poses_count - 1; j >= 1; j--) {
                old_poses[i][j][0] = old_poses[i][j - 1][0]
                old_poses[i][j][1] = old_poses[i][j - 1][1]
            }

            var x, y, value_x, value_y;
            switch (effect_index) {
                case 0:
                    let noise_y = (vectors[i][1] / h) * 255
                    let noise_x = (vectors[i][0] / w) * 255
                    let value = noise.perlin2(noise_x, noise_y)
                    vectors[i][2] += value * clamp(1 - 30 * scrollPercent, 0, 1)
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] += value * gravity * clamp(1 - 30 * scrollPercent, 0, 1)
                    vectors[i][1] += vectors[i][3]
                    if (vectors[i][0] > w || vectors[i][0] < 0 || vectors[i][1] > h) {
                        x = Math.random() * w
                        y = Math.random() * h
                        vectors[i] = ([x, y, 0, 0, x, y, x, y, x, y])
                        for (let j = 0; j < old_poses_count; j++) {
                            old_poses[i][j][0] = x
                            old_poses[i][j][1] = y
                        }
                    }
                    break;
                case 1:
                    x = map((vectors[i][0] / w), 0, 1, -4.3, 4.3)
                    y = map((vectors[i][1] / h), 0, 1, -2.14, 2.14)
                    value_x = 2 * Math.cos(y) / x
                    value_y = x
                    vectors[i][2] = value_x * clamp(1 - 2 * scrollPercent, 0, 1)
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] = value_y * clamp(1 - 2 * scrollPercent, 0, 1)
                    vectors[i][1] += vectors[i][3]
                    if (vectors[i][0] > w || vectors[i][0] < 0 || vectors[i][1] > h) {
                        x = Math.random() * w
                        y = Math.random() * h
                        vectors[i] = ([x, y, 0, 0, x, y, x, y, x, y])
                        for (let j = 0; j < old_poses_count; j++) {
                            old_poses[i][j][0] = x
                            old_poses[i][j][1] = y
                        }
                    }
                    break;
                case 2:
                    x = map((vectors[i][0] / w), 0, 1, -4.3, 4.3)
                    y = map((vectors[i][1] / h), 0, 1, -2.14, 2.14)
                    value_x = 0.1 * y
                    value_y = -0.2 * y
                    vectors[i][2] = value_x * 10 * clamp(1 - 2 * scrollPercent, 0, 1)
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] = value_y * 10 * clamp(1 - 2 * scrollPercent, 0, 1)
                    vectors[i][1] += vectors[i][3]
                    if (vectors[i][0] > w || vectors[i][0] < 0 || vectors[i][1] > h || Math.abs(y) < 0.03) {
                        x = Math.random() * w
                        y = Math.random() * h
                        vectors[i] = ([x, y, 0, 0, x, y, x, y, x, y])
                        for (let j = 0; j < old_poses_count; j++) {
                            old_poses[i][j][0] = x
                            old_poses[i][j][1] = y
                        }
                    }
                    break;
                case 3:
                    x = map((vectors[i][0] / w), 0, 1, -4.3, 4.3)
                    y = map((vectors[i][1] / h), 0, 1, -2.14, 2.14)
                    value_x = y
                    value_y = y * y
                    vectors[i][2] = value_x * 10
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] = value_y * 10
                    vectors[i][1] += vectors[i][3]
                    if (vectors[i][0] > w || vectors[i][0] < 0 || vectors[i][1] > h || Math.abs(y) < 0.01) {
                        x = Math.random() * w
                        y = Math.random() * h
                        vectors[i] = ([x, y, 0, 0, x, y, x, y, x, y])
                        for (let j = 0; j < old_poses_count; j++) {
                            old_poses[i][j][0] = x
                            old_poses[i][j][1] = y
                        }
                    }
                    break;
                case 4:
                    x = map((vectors[i][0] / w), 0, 1, -4.3, 4.3)
                    y = map((vectors[i][1] / h), 0, 1, -2.14, 2.14)
                    value_x = Math.cos(y)
                    value_y = Math.cos(vector_length(x, y) * y) - y
                    vectors[i][2] = value_x * 1
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] = value_y * 1
                    vectors[i][1] += vectors[i][3]
                    if (vectors[i][0] > w || vectors[i][0] < 0 || vectors[i][1] > h) {
                        x = Math.random() * w
                        y = Math.random() * h
                        vectors[i] = ([x, y, 0, 0, x, y, x, y, x, y])
                        for (let j = 0; j < old_poses_count; j++) {
                            old_poses[i][j][0] = x
                            old_poses[i][j][1] = y
                        }
                    }
                    break;
                case 5:
                    x = map((vectors[i][0] / w), 0, 1, -4.3, 4.3)
                    y = map((vectors[i][1] / h), 0, 1, -2.14, 2.14)
                    value_x = Math.cos(y)
                    value_y = -y
                    vectors[i][2] = value_x * 5
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] = value_y * 5
                    vectors[i][1] += vectors[i][3]
                    if (vectors[i][0] > w || vectors[i][0] < 0 || vectors[i][1] > h) {
                        x = Math.random() * w
                        y = Math.random() * h
                        vectors[i] = ([x, y, 0, 0, x, y, x, y, x, y])
                        for (let j = 0; j < old_poses_count; j++) {
                            old_poses[i][j][0] = x
                            old_poses[i][j][1] = y
                        }
                    }
                    break;

                case 6:
                    x = map((vectors[i][0] / w), 0, 1, -10, 10)
                    y = map((vectors[i][1] / h), 0, 1, -10, 10)
                    value_x = -0.5 * x + 0.5 * y
                    value_y = -0.5 * x - 0.5 * y
                    vectors[i][2] = value_x * clamp(1 - 2 * scrollPercent, 0, 1)
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] = value_y * clamp(1 - 2 * scrollPercent, 0, 1)
                    vectors[i][1] += vectors[i][3]
                    if (Math.sqrt(x ** 2 + y ** 2) < 0.1) {
                        x = Math.random() * w
                        y = Math.random() * h
                        vectors[i] = ([x, y, 0, 0, x, y, x, y, x, y])
                        for (let j = 0; j < old_poses_count; j++) {
                            old_poses[i][j][0] = x
                            old_poses[i][j][1] = y
                        }
                    }
                    break;
            }
        }
    }
    var global_tick = 0
    ctx.lineWidth = 1;
    let clear_count = 0
    function draw() {

        if(global_tick < 5)
        {
            ctx.fillStyle = "rgb(200,200,200)";
            ctx.fillRect(0,0,w,h)
        }
    
        // ctx2.fillStyle = bg_color;   
        // ctx2.fillRect(0, 0, w,h);
        // ctx2.clearRect(0,0,w,h);
        // ctx2.globalAlpha = 0.1;
        // ctx2.drawImage(canvas,0,0);
        // ctx.clearRect(0,0,w,h);
        // ctx.drawImage(canvas2,0,0);  


        // ctx.clearRect(0, 0, w, h);
        // clear the clone canvas  
        ctx.strokeStyle = "rgb(200,200,200)"
        ctx.lineWidth = 1;

        for (let i = 0; i < vectors.length; i++) {
            z = h / 2
            let r = Math.sqrt(vectors[i][2] ** 2 + vectors[i][3] ** 2)
            // let alpha = (-(vectors[i][1] - z) * (vectors[i][1] - z) + z ** 2) / (z ** 2) * r
            // alpha=255;
            alpha = 1
            // ctx.strokeStyle = "rgba(255,251,230," + alpha + ")";

            // if(r<0.3)
            // {
            //     alpha *= r;
            // }
            // let alpha = 0.5;

            ctx.beginPath();
            // ctx.arc(vectors[i][0], vectors[i][1], 2, 0, 2 * Math.PI);
            // ctx.strokeStyle = "rgba(200,200,200," + alpha + ")";
            // ctx.strokeStyle = "rgba(30,30,30," + alpha + ")";
            // ctx.strokeStyle = `rgba(200,200,200,${alpha}`;
            // ctx.lineWidth = 1;
            // ctx.moveTo(old_poses[i][0][0], old_poses[i][0][1])
            for (let j = 0; j < old_poses_count; j++) {
                ctx.lineTo(old_poses[i][j][0], old_poses[i][j][1])
            }
            // ctx.lineTo(vectors[i][8], vectors[i][9]);
            // ctx.moveTo(vectors[i][0], vectors[i][1]);
            // ctx.lineTo(vectors[i][4], vectors[i][5]);
            // ctx.lineTo(vectors[i][6], vectors[i][7]);
            ctx.stroke();
            global_tick += 1;
        }
   

        // let oldArray = ctx.getImageData(0,0,canvas.width,canvas.height);
        // //count through only the alpha pixels
        // for(let d=3;d<oldArray.data.length;d+=4){
        //     //dim it with some feedback, I'm using .9
        //     oldArray.data[d] = Math.floor(oldArray.data[d]*.9);
        // }
        // ctx.putImageData(oldArray,0,0);
        // //          // draw vignete

    }

    // setInterval(loop, 30);
}
var clear = function()
{
    ctx2.clearRect(0,0,w, h)
    // this should be needed at init and when canvas is resized but for demo I leave it here
    ctx2.globalAlpha = '.9';
    // draw ou visible canvas, a bit less opaque
    ctx2.drawImage(canvas, 0,0)
    // clear the visible canvas
    ctx.clearRect(0,0,w, h)
    // draw back our saved less-opaque image
    ctx.drawImage(canvas2, 0,0)
}
var loop = function() {
    requestAnimationFrame(loop, canvas);
    let scrollTop = document.getElementById('root').scrollTop
    let docHeight = document.getElementById('root').scrollHeight;
    let winHeight = window.innerHeight;
    scrollPercent = (scrollTop) / (docHeight - winHeight);
    if (eff == true) {
        clear();
        update_vectors()
        draw()
    }
}

function resized() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas2.width = window.innerWidth
    canvas2.height = window.innerHeight
    w = canvas.width
    h = canvas.height
}

function change_effect(i) {
    effect_index += i;
    effect_index = ((effect_index % (effects_count + 1)) + effects_count + 1) % (effects_count + 1);
    document.getElementById('effect_index').innerHTML = (effect_index) + '/' + (effects_count)

    for (let i = 0; i < vectors.length; i++) {
        x = Math.random() * w
        y = Math.random() * h
        vectors[i] = ([x, y, 0, 0, x, y, x, y, x, y])
        for (let j = 0; j < old_poses_count; j++) {
            old_poses[i][j][0] = x
            old_poses[i][j][1] = y
        }
    }
}

function vector_length(px, py) {
    return Math.sqrt(px ** 2 + py ** 2);
}

function distance(ax, ay, bx, by) {
    let dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2)
    console.log(dist)
    return dist
}

function on_off() {
    global_tick =0;
    eff = !eff;
    if (eff == false) {
        document.getElementById('cancel_effect').innerHTML = "o"
        ctx.clearRect(0, 0, w, h)
    }
    else {
        document.getElementById('cancel_effect').innerHTML = "x"
    }
}

function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
loop();
