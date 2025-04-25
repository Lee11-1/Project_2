
// import { setClassArray } from '../js/data.js';
// import { setExamArray } from '../js/data.js';
// import { setSetArray } from '../js/data.js';

// async function loadStudentData() {
//     try {
//         const response = await fetch(`/all-classes`);
//         const data = await response.json();

//         if (!response.ok) {
//             alert("Lỗi khi tải dữ liệu");
//             return;
//         }
//         setClassArray(data.allClass);
//         setExamArray(data.allExams);
      
//     } catch (error) {
//         console.error("Lỗi:", error);
//         alert("Không thể tải dữ liệu lớp học.");
//     }
// }


// async function loadQuestionSet() {
//     try {
//         const response = await fetch(`/all-questionSet`);
//         const data = await response.json();

//         if (!response.ok) {
//             alert("Lỗi khi tải dữ liệu");
//             return;
//         }
//         setSetArray(data.allSet);

//     } catch (error) {
//         console.error("Lỗi:", error);
//         alert("Không thể tải dữ liệu.");
//     }
// } 

function loadSignUp(){
    document.getElementById("signUp").addEventListener("click", async function() {
   
        const form = document.getElementById("registerForm");
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
    
        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        
            const result = await response.json();
        
            if (response.ok) {
                
               // loadQuestionSet();
                window.location.href = result.redirect;  
                //loadStudentData();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
            alert("Đã xảy ra lỗi, vui lòng thử lại.");
        }   
    });
}
loadSignUp();



function loadLogin(){
    document.getElementById("signIn").addEventListener("click", async function() {

        const form = document.getElementById("signInForm");
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
    
        try {
            const response = await fetch("/signIn", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if(result.message != "Đăng nhập thành công!")  alert(result.message);
        
            if (response.ok) {
                // loadStudentData();
                // loadQuestionSet();
                window.location.href = result.redirect; 
            }  
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
            alert("Đã xảy ra lỗi, vui lòng thử lại.");
        }   
    });
}
loadLogin();

async function openForgot() {
    window.location.href = "/forgot"; 
}
async function changePass() {
    const form = document.getElementById("forgot"); // Lấy form
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
        try {
            const response = await fetch("/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
    
            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
}