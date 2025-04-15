function toggleMenu(menuId) {
    let menu = document.getElementById(menuId);
 
    document.querySelectorAll(".dropdown-menu").forEach(item => {
        if (item.id !== menuId) {
            item.style.display = "none";
        }
    });
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

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


function showFolderPage(){
    document.getElementById("folderPage").style.display = "flex"; 
    document.getElementById("main").style.display = "none"; 
}

function closeFolderPage(){
    document.getElementById("folderPage").style.display = "none"; 
    document.getElementById("main").style.display = "block"; 
}



 