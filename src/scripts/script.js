var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var w = canvas.width
var h = canvas.height
var effects_count = 6;
var bg_color = '#2d303a';
const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
var eff = true;
var effect_index = 0;
var scrollPercent = 0;


if(canvas.getContext)
{

    var ctx = canvas.getContext("2d");

    // ctx.strokeStyle = 'rgba(174,194,224,0.5)';
    // ctx.lineCap = 'round';
    // ctx.globalAlpha = 0.5

    var gravity = 0.4;
    var max_particles = 500
    noise.seed(Math.random());

    // x,y,xs,ys,dir_x,dir_y
    var vectors = []
    effect_index = 0;

    for(var i = 0; i<max_particles;i++)
    {
        var x = Math.random()*w
        var y = Math.random()*h
        vectors.push( [x, y,0,0,x,y,x,y,x,y] )
    }
    function update_vectors()
    {
        // console.log(mousePos)
        for(var i = 0; i<vectors.length; i++)
        {   
            vectors[i][9] = vectors[i][7]
            vectors[i][8] = vectors[i][6]
            vectors[i][6] = vectors[i][4]
            vectors[i][7] = vectors[i][5]
            vectors[i][4] = vectors[i][0]
            vectors[i][5] = vectors[i][1]

            switch(effect_index)
            {
                case 1:
                    var x = map((vectors[i][0]/w),0,1,-4.3,4.3)
                    var y = map((vectors[i][1]/h),0,1,-2.14,2.14)
                    var value_x = 2*Math.cos(y)/x
                    var value_y = x
                    vectors[i][2] = value_x *  clamp(1- 2 *scrollPercent,0,1)
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] = value_y *  clamp(1- 2 *scrollPercent,0,1)
                    vectors[i][1] += vectors[i][3]      
                    if(vectors[i][0] > w || vectors[i][0] < 0 || vectors[i][1] >h )
                    {
                        var x = Math.random()*w
                        var y = Math.random()*h
                        vectors[i] = ( [x, y,0,0,x,y,x,y,x,y] )
                    }
                    break;
                case 0:
                    var noise_y = (vectors[i][1]/h)*255
                    var noise_x = (vectors[i][0]/w)*255
                    var value = noise.perlin2(noise_x, noise_y)
                    vectors[i][2] += value*  clamp(1- 30 *scrollPercent,0,1)
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] += value * gravity  *  clamp(1- 30 *scrollPercent,0,1)
                    vectors[i][1] += vectors[i][3]
                    if(vectors[i][0] > w || vectors[i][0] < 0 || vectors[i][1] >h )
                    {
                        var x = Math.random()*w
                        var y = Math.random()*h
                        vectors[i] = ( [x, y,0,0,x,y,x,y,x,y] )
                    }
                    break;
                case 2:
                    var x = map((vectors[i][0]/w),0,1,-4.3,4.3)
                    var y = map((vectors[i][1]/h),0,1,-2.14,2.14)

                    var value_x = 0.1 * y
                    var value_y = -0.2*y

                    vectors[i][2] = value_x * 10* clamp(1- 2 *scrollPercent,0,1)
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] = value_y * 10* clamp(1- 2 *scrollPercent,0,1)
                    vectors[i][1] += vectors[i][3]
                    if(vectors[i][0] > w || vectors[i][0] < 0 || vectors[i][1] >h || Math.abs(y) < 0.03)
                    {
                        var x = Math.random()*w
                        var y = Math.random()*h
                        vectors[i] = ( [x, y,0,0,x,y,x,y,x,y] )
                    }
                    break;
                case 3:
                    var x = map((vectors[i][0]/w),0,1,-4.3,4.3)
                    var y = map((vectors[i][1]/h),0,1,-2.14,2.14)

                    var value_x = y
                    var value_y = y*y

                    vectors[i][2] = value_x * 10
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] = value_y * 10
                    vectors[i][1] += vectors[i][3]      
                    if(vectors[i][0] > w || vectors[i][0] < 0 || vectors[i][1] >h || Math.abs(y) < 0.01)
                    {
                        var x = Math.random()*w
                        var y = Math.random()*h
                        vectors[i] = ( [x, y,0,0,x,y,x,y,x,y] )
                    }
                    break;
                case 4:
                    var x = map((vectors[i][0]/w),0,1,-4.3,4.3)
                    var y = map((vectors[i][1]/h),0,1,-2.14,2.14)

                    var value_x = Math.cos(y)
                    var value_y = Math.cos(length(x,y) * y ) -y

                    vectors[i][2] = value_x * 5
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] = value_y * 5
                    vectors[i][1] += vectors[i][3]      
                    if(vectors[i][0] > w || vectors[i][0] < 0 || vectors[i][1] >h)
                    {
                        var x = Math.random()*w
                        var y = Math.random()*h
                        vectors[i] = ( [x, y,0,0,x,y,x,y,x,y] )
                    }
                    break;
                case 5:
                    var x = map((vectors[i][0]/w),0,1,-4.3,4.3)
                    var y = map((vectors[i][1]/h),0,1,-2.14,2.14)

                    var value_x = Math.cos(y) 
                    var value_y = -y
                    vectors[i][2] = value_x * 5
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] = value_y * 5
                    vectors[i][1] += vectors[i][3]      
                    if(vectors[i][0] > w || vectors[i][0] < 0 || vectors[i][1] >h)
                    {
                        var x = Math.random()*w
                        var y = Math.random()*h
                        vectors[i] = ( [x, y,0,0,x,y,x,y,x,y] )
                    }
                    break;

                case 6:
                    var x = map((vectors[i][0]/w),0,1,-10,10)
                    var y = map((vectors[i][1]/h),0,1,-10,10)
                    // var noise_y = (x)
                    // var noise_x = (y)
                    // var value = noise.perlin2(noise_x, noise_y)
                    // console.log(value)

                    var value_x = -0.5*x + 0.5*y
                    var value_y = -0.5*x - 0.5*y

                    vectors[i][2] = value_x* clamp(1- 2 *scrollPercent,0,1)
                    vectors[i][0] += vectors[i][2]
                    vectors[i][3] = value_y* clamp(1- 2 *scrollPercent,0,1)
                    vectors[i][1] += vectors[i][3]
                    if(Math.sqrt(x**2 + y ** 2) < 0.1)
                    {
                        var x = Math.random()*w
                        var y = Math.random()*h
                        vectors[i] = ( [x, y,0,0,x,y,x,y,x,y] )
                    }
                    break;

            }

        }
    }
    ctx.lineWidth = 1;
    var clear_count = 0
    function draw()
    {
        ctx.clearRect(0, 0, w, h);
        // clear_count += 1

        for(var i = 0; i<vectors.length; i++)
        {  
            z = h/2
            // var alpha = 1-(vectors[i][1]/h)
            var r = Math.sqrt(vectors[i][2] ** 2 + vectors[i][3] ** 2)

            var alpha = (-(vectors[i][1] - z)*(vectors[i][1] - z) + z**2)/(z**2)  *r 
            // alpha = 1
            // if(r<0.3)
            // {
            //     alpha *= r;
            // }
            // var alpha = 0.5;
            // console.log(alpha)
            ctx.beginPath();
            ctx.arc(vectors[i][0], vectors[i][1], 2, 0, 2 * Math.PI);
            // ctx.strokeStyle = "rgba(174,194,224," + alpha +")"; 
            ctx.strokeStyle = "rgba(200,200,200," + alpha +")"; 
            // ctx.strokeStyle = "rgba(204,140,22," + alpha +")"; 
        
            // ctx.lineWidth = 1;

            ctx.moveTo(vectors[i][0],vectors[i][1]);
            // End point (180,47)

            ctx.lineTo(vectors[i][4],vectors[i][5]);
            

            ctx.lineTo(vectors[i][6],vectors[i][7]);
            

            ctx.lineTo(vectors[i][8],vectors[i][9]);

            // console.log( "rgba(174,194,224," + alpha +")");
            // ctx.fill();
            // ctx.strokeStyle = bg_color;
            ctx.stroke();

       
        } 
    

        // ctx.fillRect(0, 0, canvas.width, canvas.height);
            // var oldArray = ctx.getImageData(0,0,canvas.width,canvas.height);
            // //count through only the alpha pixels
            // for(var d=3;d<oldArray.data.length;d+=4){
            //     //dim it with some feedback, I'm using .9
            //     oldArray.data[d] = Math.floor(oldArray.data[d]*.9);
            // }
            // ctx.putImageData(oldArray,0,0);
        //          // draw vignete
           
    }
    function loop(){
        var scrollTop = document.getElementById('root').scrollTop
        var docHeight = document.getElementById('root').scrollHeight;
        var winHeight = window.innerHeight;
        scrollPercent = (scrollTop) / (docHeight - winHeight);
        console.log(scrollPercent)
        if(eff == true)
        {
            update_vectors()
            draw()
        }
    }

    setInterval(loop, 30);
}



function resized()
{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    w = canvas.width
    h = canvas.height
}

function change(i)
{
        // ctx.clearRect(0, 0, w, h);
        effect_index += i;
        if(effect_index > effects_count)
        {
            effect_index = 0
        }
        if(effect_index < 0)
        {
            effect_index = 4
        }
        document.getElementById('effect_index').innerHTML = (effect_index+1) + '/' + (effects_count+1)
}

function length(px,py)
{
    return Math.sqrt(px ** 2 + py ** 2);
}

function distance(ax,ay,bx,by)
{
    var dist =  Math.sqrt((ax-bx) ** 2 + (ay-by) ** 2)
    console.log(dist)
    return dist
}

function on_off()
{

    eff = !eff;
    if(eff == false)
    {
        document.getElementById('cancel_effect').innerHTML = "o"
        ctx.clearRect(0,0,w,h)
    }
    else{
        document.getElementById('cancel_effect').innerHTML = "x"

    }
}


function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }