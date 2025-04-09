

async function signOut() {
    const response = await fetch("/logout", { method: "GET" });
    if (response.redirected) {
        window.location.href = response.url; 
    }
}

async function openForgot() {
        window.location.href = "/forgot"; 
}
async function myClass() {
    window.location.href = "/";
 }

async function goHome() {
    window.location.href = "/";
}



async function loadStudentData() {
    try {
        const response = await fetch(`/all-classes`);
        const data = await response.json();

        if (!response.ok) {
            alert("Lỗi khi tải dữ liệu");
            return;
        }
        displayAllClass(data.allClass);

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Không thể tải dữ liệu lớp học.");
    }
}


async function openClass(class_id) {
    try {
        const response = await fetch("/toClass", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ class_id}) 
        });

        const result = await response.json();
        if (response.ok) {
            window.location.href = `/class/${class_id}`; 
        } else {
            alert(result.message); 
        }
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
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
        displayClassInfo(data.infoClass,data.infoOwner);
        displayClassHome(data.re_members);
        displayMembers(data.members)

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Không thể tải dữ liệu lớp học.");
    }
}

document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
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
});

document.getElementById("signInForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
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
})

document.getElementById("className").addEventListener("input", function() {
    if (this.value.length > 20) {
        alert("Tên lớp không được vượt quá 20 ký tự!");
        this.value = this.value.slice(0, 20); // Cắt bớt ký tự dư
    }
});

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


async function addClass() {
    const form = document.getElementById("crClass"); // Lấy form
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
            loadStudentData();
        }
        else{
            alert(result.message);
        }

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }  
}
async function findAndAdd() {
    const form = document.getElementById("findMember"); // Lấy form
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try{ 
        const response = await fetch("/findMem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result); 
    if (response.ok) {
        loadClassData();
    } else{
        alert(result.message);
    }

    } catch (error){
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
}

async function deleteReMem(idUser) {
    try {
        const response = await fetch("/deleReMem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({idUser}) 
        });

        const result = await response.json();
        if (response.ok) {
            alert("Xoá thành công!");
            loadClassData(); 
        } else {
            alert(result.message); 
        }
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }    
}
async function deleteMem(idUser) {
    try {
        const response = await fetch("/deleMem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({idUser}) 
        });

        const result = await response.json();
        if (response.ok) {
            alert("Xoá thành công!");
            loadClassData(); 
        } else {
            alert(result.message); 
        }
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }    
}

async function addMem(user_id) {
    try {
        const response = await fetch("/addMem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user_id}) 
        });

        const result = await response.json();
        if (response.ok) {
            alert("Add thành công!");
            loadClassData(); 
        } else {
            alert(result.message); 
        }
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }    
}





