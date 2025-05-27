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
        // localStorage.removeItem('classes');
        // localStorage.removeItem('exams');
        // localStorage.removeItem('sets');
        // localStorage.removeItem('num');
        localStorage.clear();
        window.location.href = response.url; 
    }
}

async function  myAcount() {
    try {
        window.location.href = "/myAcount";
    }
     catch (error) {
        console.error("Lỗi:", error);
        alert("Không thể tải dữ liệu ");
    }
   
}

async function getAcountInfo() {
    try {
        const response = await fetch(`/infoAcount`);
        const data = await response.json();

        if (!response.ok) {
            alert("Lỗi khi tải dữ liệu");
            return;
        }

        displayAcountInfo(data.user);
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Không thể tải dữ liệu ");
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

        displayClassInfo(data.infoClass, data.infoOwner, data.user);
        if(data.user.id != data.infoClass.owner_id){
            document.getElementById("addMembers").style.display = "none";
            document.getElementById("newTest").style.display = "none";
          //  document.getElementById("deleteClass").style.display = "none";
        }
      
        displayClassHome(data.re_members);
        displayMembers(data.members,"class-members");
        displayTests(data.tests, data.user, data.infoClass);


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

        displayMembers(data.members,"examMems");
        displayAllQuestion(data.questions,"examQuestions");
        if(data.profession == "Admin"){
            const btn1 = document.getElementById("openAddQuestionToExam");
            const btn2 = document.getElementById("openAddMemberToExam");
            const btn3 = document.getElementById("deleteExam");
            btn1.style.display = "none";
            btn2.style.display = "none";
            btn3.style.display = "block";
            const h1 = document.getElementById("header2");
            h1.style.display = "none";
            const h2 = document.getElementById("header3");
            h2.style.display = "block";
        }
        const btn4 = document.getElementById("viewPoint");
        btn4.addEventListener("click", function(){
            allAttempts(data.exam_id);
        });
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Không thể tải dữ liệu lớp học.");
    }
}

async function loadTestData() {
    try {
        const response = await fetch(`/infoTest`);
        const data = await response.json();

        if (!response.ok) {
            alert("Lỗi khi tải dữ liệu");
            return;
        }
        displayAllQuestion(data.questions,"examQuestions");
      
        const btn4 = document.getElementById("viewPoint");
        btn4.addEventListener("click", function(){
            allAttempts(data.exam_id);
    });
    } catch (error) {
        console.error("Lỗi:", error);
      //  alert("Không thể tải dữ liệu lớp học.");
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
                let savedClasses = localStorage.getItem('classes');
                let classList = savedClasses ? JSON.parse(savedClasses) : [];
                classList.unshift(result.newClass);
                localStorage.setItem('classes', JSON.stringify(classList));
                console.log('Đã thêm lớp học mới và cập nhật Local Storage:', classList);

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
                let savedExams = localStorage.getItem('exams');
                let examList = savedExams ? JSON.parse(savedExams) : [];
                examList.unshift(result.newExam);
                localStorage.setItem('exams', JSON.stringify(examList));
                console.log('Đã thêm lớp học mới và cập nhật Local Storage:', examList);

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
    
                let savedSets = localStorage.getItem('sets');
                let setList = savedSets ? JSON.parse(savedSets) : [];
                setList.unshift(result.newSet);
                localStorage.setItem('sets', JSON.stringify(setList));
                console.log('Đã thêm set và cập nhật Local Storage:', setList);

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

async function deleteQuestion(questionID) {
    try {
        const response = await fetch("/deleteQuestionToExam", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({questionID})
        }) ;

        const result = await response.json();
        if (response.ok) {
            loadExamData();
        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Error");
    }
}