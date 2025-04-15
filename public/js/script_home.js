
let index = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slidesToShow = 4; // Số ảnh hiển thị cùng lúc

function moveSlide(step) {
    index += step;
    if (index < 0) index =  totalSlides - slidesToShow;
    if (index > totalSlides - slidesToShow) index =  0;
    document.querySelector('.slider').style.transform = `translateX(${-index * 25}%)`;
}

const  classTask =["signUpPage", "main", "signInPage"];
function showHomeMenu(task){
    for(i = 0; i < classTask.length; i++){
        if(task == classTask[i]) document.getElementById(classTask[i]).style.display = "flex";
        else document.getElementById(classTask[i]).style.display = "none";
    }
}