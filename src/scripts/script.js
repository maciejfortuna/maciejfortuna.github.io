var light = true;
var dark_c = "#333333";
// var dark_bg_c = "#22262e";
var dark_bg_c = "rgb(30,30,30)";
var light_c = "rgb(240, 240, 240)";
var add_dark_color = "rgb(204, 140, 22)";
var add_light_color = "rgb(22, 131, 204)";


function switch_color()
{
    bd = document.getElementsByTagName("body")[0];
    proj_container = document.getElementsByClassName("project_container");
    categories = document.getElementsByClassName("category");
    git_icon = document.getElementById("git_img");
    col_icon = document.getElementById("color_mode");
    bd.classList.toggle('body_dark');
    document.getElementById('title').classList.toggle("title_dark");


    var i  =0;

    for (i =0;i<proj_container.length; i++)
    {
        proj_container[i].classList.toggle('project_container_dark');
        categories[i].classList.toggle('category_dark_mode');
        proj_container[i].style.backgroundColor = "rgba(210,210,210,0.07)";

    }
    if (light == true)
    {
        git_icon.style.filter = "invert(1)";
        col_icon.style.filter = "invert(1)";
    }
    if(light == false)
    {
        git_icon.style.filter = "invert(0)";
        col_icon.style.filter = "invert(0)";
    }
    light = !light;
    
}