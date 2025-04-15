
async function loadResult() {
    try{
        const response = await fetch('/resultFind');
        const data = await response.json();
        if(!response.ok){
            alert("Lỗi khi tải dữ liệu");
            return;
        }
        console.log("DATA NHẬN ĐƯỢC:", data);

        displayResultFind(data.availableClasses, "1");
        displayResultFind(data.pendingRequests, "2");
        displayResultFind(data.myClasses, "3");
    }catch (error){
        console.error("Lỗi:", error);
        alert("Không thể tải dữ liệu lớp học.");
    }  
}

async function requestToClass(idClass) {
    try{
        const response = await fetch("/sendRequest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({idClass})
        });

        const result = await response.json();
        if (response.ok) {
          loadResult();
        } else {
            alert(result.message);
        }
    }  
    catch (error){
        console.error("Lỗi:", error);
        alert("Không thể tải dữ liệu.");
    }  
}

async function unRequest(idClass) {
    try {
        const response = await fetch("/unRequest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({idClass})
        });

        const result = await response.json();
        if (response.ok) {
          loadResult();
        } else {
            alert(result.message);
        }
        
    } catch (error) {
        console.error("Loi :", error );
        alert("Khong the tai du lieu.");
    } 
}