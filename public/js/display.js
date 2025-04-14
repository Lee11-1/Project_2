function displayAllClass(allClass){
    const container = document.getElementById('class_container');
    container.innerHTML = '';
    allClass.forEach(classes => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('classes');
        projectDiv.addEventListener("click", function() { openClass(classes.class_id)  });
        projectDiv.innerHTML = `
        <img src="/src/class.png" alt="">
        <div class = "cl_2"> 
            <h3>Name: ${classes.class_name}</h3>
            <p>ID:${classes.class_id}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Subject: ${classes.subject} </p>
            <p>Date: ${new Date(classes.created_at).toLocaleDateString()}</p>
            <p class = "addClass"> <button >View class</button> </p>
        </div>   `;
        container.appendChild(projectDiv);
    });
}

function displayClassInfo(classInfo,infoOwner){
    const infoDiv = document.getElementById('class-name');
    infoDiv.innerHTML = '';
    infoDiv.innerHTML = `
    <h2>Class name: ${classInfo.name}</h2>
    <p>Start: ${new Date(classInfo.created_at).toLocaleString()}</p>
    <p>Owner: ${infoOwner.fullname} </p>
    <p>Email: ${infoOwner.email} </p>
`;
}

function displayClassHome(re_members){
    const infoDiv = document.getElementById('reMem');
    infoDiv.innerHTML = '';
    re_members.forEach(re_mem =>{
        const li = document.createElement("li");
        li.innerHTML = `<p> Name: ${re_mem.fullname} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email: ${re_mem.email} </p>`;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Delete"; 
        button.classList.add("deleteMem"); 
        button.addEventListener("click",async function(event) {  event.preventDefault(); deleteReMem( re_mem.user_id)  });


        const button1 = document.createElement("button");
        button1.textContent = "Accept"; 
        button1.classList.add("acceptMem"); 
        button1.addEventListener("click",async function(event) {  event.preventDefault(); addMem(re_mem.user_id)  });

        li.appendChild(button1);
        li.appendChild(button);

        infoDiv.appendChild(li);
    });
}

function displayMembers(members) {
    const membersList = document.getElementById("class-members");
    membersList.innerHTML = "";
    members.forEach(member => {
        const li = document.createElement("li");
        li.innerHTML = ` <p> Name: ${member.fullname}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email: ${member.email} </p>`;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Delete"; 
        button.classList.add("deleteMem"); 
        button.addEventListener("click",async function(event) {  event.preventDefault(); deleteMem(member.user_id)  });
        li.appendChild(button);
        membersList.appendChild(li);
    });
}

 function displayResultFind(allClass , type){
    const container = document.getElementById('bodySearch');
    console.log(allClass, type);
   if(type == "1") container.innerHTML = '';
    // if (!Array.isArray(allClass) || allClass.length === 0) {
    //     container.innerHTML = `<p style="color: red;">Không tìm thấy kết quả nào.</p>`;
    //     return;
    // }
    allClass.forEach(classes => {
        if(type == "1"){
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('classes');
            projectDiv.addEventListener("click", function() { requestToClass(classes.class_id)  });
            projectDiv.innerHTML = `
                <img src="/src/class.png" alt="">
                <div class = "cl_2"> 
                    <h3>Name: ${classes.class_name}</h3>
                    <p>ID:${classes.class_id}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Subject: ${classes.subject} </p>
                    <p>Date: ${new Date(classes.created_at).toLocaleDateString()}</p>
                    <p class = "addClass" id = "addClass" > <button> Request </button> </p>
                </div>   `;
            container.appendChild(projectDiv);
        }
        else if (type == "2"){
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('classes');
            projectDiv.addEventListener("click", function() { unRequest(classes.class_id)  });
            projectDiv.innerHTML = `
                <img src="/src/class.png" alt="">
                <div class = "cl_2"> 
                    <h3>Name: ${classes.class_name}</h3>
                    <p>ID:${classes.class_id}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Subject: ${classes.subject} </p>
                    <p>Date: ${new Date(classes.created_at).toLocaleDateString()}</p>
                    <p class = "Sent" id = "Sent" > <button> Sent </button> </p>
                </div>   `;
            container.appendChild(projectDiv);
        }
        else if (type == "3"){
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('classes');
            projectDiv.addEventListener("click", function() { openClass(classes.class_id)  });
            projectDiv.innerHTML = `
                <img src="/src/class.png" alt="">
                <div class = "cl_2"> 
                    <h3>Name: ${classes.class_name}</h3>
                    <p>ID:${classes.class_id}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Subject: ${classes.subject} </p>
                    <p>Date: ${new Date(classes.created_at).toLocaleDateString()}</p>
                    <p class = "addClass"> <button >View class</button> </p>
                </div>   `;
            container.appendChild(projectDiv);
        }  
    });
}






