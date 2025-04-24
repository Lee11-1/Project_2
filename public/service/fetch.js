async function goHome() {
    window.location.href = "/";
}

async function myClass() {
    window.location.href = "/";
 }
 async function myQuestionSet() {
    window.location.href = "/questionSet";
 }

async function signOut() {
    const response = await fetch("/logout", { method: "GET" });
    if (response.redirected) {
        window.location.href = response.url; 
    }
}

async function loadClassData() {
    try {
        const response = await fetch(`/infoClass`);
        const data = await response.json();

        if (!response.ok) {
            alert("Lỗi khi tải dữ liệu");
            return;
        }
        displayClassInfo(data.infoClass, data.infoOwner);
        displayClassHome(data.re_members);
        displayMembers(data.members,"class-members")

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Không thể tải dữ liệu lớp học.");
    }
}

async function findClass(subject) {
    try{
        window.location.href = `/search/${subject}`; 
    }
    catch{
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }  
}

async function openClass(class_id) {
    try {
         window.location.href = `/class/${class_id}`; 
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
}

async function openExam(exam_id, exam_title) {
    try {
        window.location.href = `/exam/${exam_title}/${exam_id}`
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
}


async function loadExamData() {
    try {
        const response = await fetch(`/infoExam`);
        const data = await response.json();

        if (!response.ok) {
            alert("Lỗi khi tải dữ liệu");
            return;
        }

        displayMembers(data.members,"examMems")

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Không thể tải dữ liệu lớp học.");
    }
}

function addClass(){      
    document.getElementById("addClassButton").addEventListener("click", async function () {
        const form = document.getElementById("crClass");
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        try {
            const response = await fetch("/addClass", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log(result); 
            if (response.ok) {
                window.location.href = result.redirect; 
            } else{
                alert(result.message);
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }  
    });
}


function createExam(){
    document.getElementById("createExamButton").addEventListener("click", async function () {
        const form = document.getElementById("crTest");
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
    
        try {
            const response = await fetch("/createExam", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }) ;
    
            const result = await response.json();
            if (response.ok) {
                window.location.href = result.redirect; 
            } else {
                alert(result.message);
            }
    
        } catch (error) {
            console.error("Error:", error);
            alert("Error");
        }
        
    });
}


function createQuestionSet(){
    document.getElementById("createQuestionSetButton").addEventListener("click", async function () {
        const form = document.getElementById("crFolder");
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
    
        try {
            const response = await fetch("/createQuestionSet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }) ;
    
            const result = await response.json();
            if (response.ok) {
                window.location.href = result.redirect; 
            } else {
                alert(result.message);
            }
    
        } catch (error) {
            console.error("Error:", error);
            alert("Error");
        }
        
    });
}
