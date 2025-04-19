
async function deleteClass() {
    try{
        const response = await fetch("/deleteClass" ,{
            method: "POST",
            headers: { "Content-Type": "application/json"}
        });

        const result = await response.json();
        if (response.ok) {
            window.location.href = result.redirect; 
        } else {
            alert(result.message); 
        }
    }catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
}

async function findAndAdd() {
    const form = document.getElementById("findMember"); 
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
            loadClassData(); 
        } else {
            alert(result.message); 
        }
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    }    
}

loadClassData();