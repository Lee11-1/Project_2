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
                window.location.href = result.redirect; 
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