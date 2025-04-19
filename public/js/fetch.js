async function goHome() {
    window.location.href = "/";
}

async function myClass() {
    window.location.href = "/";
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
        displayMembers(data.members)

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