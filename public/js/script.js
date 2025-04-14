function toggleMenu(menuId) {
    let menu = document.getElementById(menuId);
    
    // Ẩn tất cả các menu khác
    document.querySelectorAll(".dropdown-menu").forEach(item => {
        if (item.id !== menuId) {
            item.style.display = "none";
        }
    });

    // Toggle menu hiện tại
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// Ẩn menu khi click ra ngoài
document.addEventListener("click", function(event) {
    if (!event.target.closest(".dropdown")) {
        document.querySelectorAll(".dropdown-menu").forEach(menu => {
            menu.style.display = "none";
        });
    }
});
document.addEventListener("click", function(event) {
    if (!event.target.closest(".dropdown")) {
        document.querySelectorAll(".dropdown-menu2").forEach(menu => {
            menu.style.display = "none";
        });
    }
});


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

function showPopup(id) {
    let popup = document.getElementById(id);
    popup.style.visibility = "visible";
    popup.style.opacity = "1";
}

function hidePopup(id) {
    let popup = document.getElementById(id);
    popup.style.opacity = "0";
    setTimeout(() => {
        popup.style.visibility = "hidden";
    }, 300); // Chờ hiệu ứng mờ dần
}


function showSignUpPage() {
    document.getElementById("main").style.display = "none";
    document.getElementById("signInPage").style.display = "none"; // Ẩn trang chính
    document.getElementById("signUpPage").style.display = "flex";  // Hiện trang đăng nhập
}

function showHomePage(){
    document.getElementById("signUpPage").style.display = "none"; 
    document.getElementById("signInPage").style.display = "none";
    document.getElementById("main").style.display = "flex"; // Ẩn trang chính
   
}

function showSignInPage(){
    document.getElementById("signUpPage").style.display = "none"; 
    document.getElementById("main").style.display = "none"; // Ẩn trang chính
    document.getElementById("signInPage").style.display = "flex";
}

function showFolderPage(){
    document.getElementById("folderPage").style.display = "flex"; 
    document.getElementById("main").style.display = "none"; 
}

function closeFolderPage(){
    document.getElementById("folderPage").style.display = "none"; 
    document.getElementById("main").style.display = "block"; 
}

function seeClassInfo(){
    document.getElementById("homeClass").style.display = "none";
    document.getElementById("classTest").style.display = "none";
    document.getElementById("classDocu").style.display = "none";
    document.getElementById("classMem").style.display = "none";
    document.getElementById("classInfo").style.display = "flex";
}
function seeHomeClass(){
    document.getElementById("homeClass").style.display = "flex";
    document.getElementById("classTest").style.display = "none";
    document.getElementById("classDocu").style.display = "none";
    document.getElementById("classMem").style.display = "none";
    document.getElementById("classInfo").style.display = "none";
}
function seeDocuments(){
    document.getElementById("homeClass").style.display = "none";
    document.getElementById("classTest").style.display = "none";
    document.getElementById("classDocu").style.display = "flex";
    document.getElementById("classMem").style.display = "none";
    document.getElementById("classInfo").style.display = "none";
}
function seeMembers(){
    document.getElementById("homeClass").style.display = "none";
    document.getElementById("classTest").style.display = "none";
    document.getElementById("classDocu").style.display = "none";
    document.getElementById("classMem").style.display = "flex";
    document.getElementById("classInfo").style.display = "none";
}
function seeTest(){
    document.getElementById("homeClass").style.display = "none";
    document.getElementById("classTest").style.display = "flex";
    document.getElementById("classDocu").style.display = "none";
    document.getElementById("classMem").style.display = "none";
    document.getElementById("classInfo").style.display = "none";
}

let index_test = 0;
const test = document.querySelectorAll('.slide_question');
const totalQuiz = test.length;
const quizToShow = 1; // Số ảnh hiển thị cùng lúc

function movequiz(step) {
    index_test += step;
    if (index_test < 0) index_test =  totalQuiz - quizToShow;
    if (index_test > totalQuiz - quizToShow) index_test =  0;
    document.querySelector('.slider_test').style.transform = `translateX(${-index_test * 100}%)`;
}

 