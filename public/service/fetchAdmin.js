
async function loadDataForAdmin() {
    try {
        const response = await fetch(`/getAllDataForAdmin`);
        const data = await response.json();

        if (!response.ok) {
            alert("Lỗi khi tải dữ liệu");
            return;
        }

        displayDataForAdmin(data.allUsers, data.allClass, data.allExams);

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Không thể tải dữ liệu lớp học.");
    }
}
loadDataForAdmin();