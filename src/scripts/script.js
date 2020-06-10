var canvas = document.getElementById("canvas");
// var canvas2 = canvas.cloneNode()
// canvas2.width = window.innerWidth;
// canvas2.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let w = canvas.width
let h = canvas.height
let effects_count = 4;
let effect_index = 4;
let eff = true;
let scrollPercent = 0;
var global_tick = 0
var ctx;
const bg_color = '#1e1e1e';
const old_poses_count = 30;
const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
var isMobile = false; //initiate as false
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
    document.getElementById("buttons").style.display = "none";
}


if (canvas.getContext && w > 770 && isMobile == false) {
    console.log("display");
    ctx = canvas.getContext("2d");
    let gravity = 0.4;
    let max_particles = 400;
    noise.seed(Math.random());
    var vectors = [];
    var old_poses = []
    let area = clamp(w, 375, 1920) * clamp(h, 667, 1080);
    max_particles = Math.round(map(area, 250125, 2073600, 100, 400));

    console.log(max_particles);

    // for (let i = 0; i < max_particles; i++) {
    //     let x = Math.random() * w;
    //     let y = Math.random() * h;
    //     // [0,1] - current position, [2,3] - speed, [4,5],[6,7],[8,9] - old positions
    //     // vectors.push([x, y, 0, 0, x, y, x, y, x, y]);
    //     vectors.push([x, y, 0, 0]);
    //     var pose = []
    //     for (let i = 0; i < old_poses_count; i++) {
    //         pose.push([x, y])
    //     }
    //     old_poses.push(pose)
    //     pose = []
    // }

    function update_vectors() {
        global_tick += 1;
        if (vectors.length < max_particles) {
            if (global_tick % 2 == 0) {
                let a = Math.random() * w;
                let b = Math.random() * h;
                // [0,1] - current position, [2,3] - speed, [4,5],[6,7],[8,9] - old positions
                // vectors.push([x, y, 0, 0, x, y, x, y, x, y]);
                vectors.push([a, b, 0, 0]);
                var pose = []
                for (let i = 0; i < old_poses_count; i++) {
                    pose.push([a, b])
                }
                old_poses.push(pose)
                pose = []
            }
        }

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
                    let value = noise.perlin2(noise_x, noise_y) * 0.2
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
                    vectors[i][2] = value_x * 1
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] = value_y * 1
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
    ctx.lineWidth = 1;
    let clear_count = 0

    function draw() {
        ctx.strokeStyle = "rgb(200,200,200)"
        ctx.lineWidth = 1;

        for (let i = 0; i < vectors.length; i++) {
            z = h / 2
            let r = Math.sqrt(vectors[i][2] ** 2 + vectors[i][3] ** 2)
            let alpha = (-(vectors[i][1] - z) * (vectors[i][1] - z) + z ** 2) / (z ** 2) * r
                // alpha=255;
                // alpha = 1
                // ctx.strokeStyle = "rgba(255,251,230," + alpha + ")";

            // if(r<0.3)
            // {
            //     alpha *= r;
            // }
            // let alpha = 0.5;

            ctx.beginPath();
            ctx.arc(vectors[i][0], vectors[i][1], 2, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(200,200,200," + alpha + ")";
            for (let j = 0; j < old_poses_count; j++) {
                ctx.lineTo(old_poses[i][j][0], old_poses[i][j][1])
            }
            ctx.stroke();
        }


    }

    var clear = function() {
        ctx.clearRect(0, 0, w, h)
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
    loop();

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
    global_tick = 0;
    eff = !eff;
    if (eff == false) {
        document.getElementById('cancel_effect').innerHTML = "o"
        ctx.clearRect(0, 0, w, h)
    } else {
        document.getElementById('cancel_effect').innerHTML = "x"
    }
}

function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

function resized() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    w = canvas.width
    h = canvas.height
}
