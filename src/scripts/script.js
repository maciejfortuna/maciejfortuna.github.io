var light = true;
var dark_c = "#333333";
var dark_bg_c = "#22262e";
var light_c = "rgb(240, 240, 240)";
function switch_color()
{
    bd = document.getElementsByTagName("body")[0];
    proj_container = document.getElementsByClassName("project_container");
    git_icon = document.getElementById("git_img");
    col_icon = document.getElementById("color_mode");
    var i  =0;

    if (light == true)
    {
        bd.style.backgroundColor = dark_bg_c;
        bd.style.color = light_c;    
        for (i =0;i<proj_container.length; i++)
        {
            proj_container[i].style.backgroundColor = "rgba(210,210,210,0.05)";
        }
        git_icon.style.filter = "invert(1)";
        col_icon.style.filter = "invert(1)";
    }
    if(light == false)
    {
        bd.style.backgroundColor = light_c;
        bd.style.color = dark_c;
        for (i =0;i<proj_container.length; i++)
        {
            proj_container[i].style.backgroundColor = "rgba(100,100,100,0.05)";
        }    
        git_icon.style.filter = "invert(0)";
        col_icon.style.filter = "invert(0)";
    }
    light = !light;
    
}