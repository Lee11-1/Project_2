function displayAllClass(allClass){
    const container = document.getElementById('class_container');
    container.innerHTML = ''; 
    
    allClass.forEach(classes => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('classes');
    
        const img = document.createElement('img');
        img.src = "/src/class.png";
        img.alt = "Ảnh lớp học";  
    
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('cl_2');
  
        const name = document.createElement('h3');
        name.textContent = `Class: ${classes.class_name}`;
   
        const idSubject = document.createElement('p');
        idSubject.textContent = `ID: ${classes.class_id} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Subject: ${classes.subject}`; // \u00A0 là khoảng trắng không ngắt dòng
 
        const date = document.createElement('p');
        date.textContent = `Date: ${new Date(classes.created_at).toLocaleDateString()}`;

        const viewClassButton = document.createElement('button');
        viewClassButton.textContent = 'View Class';
    
        const addClass = document.createElement('p');
        addClass.classList.add('addClass')
        addClass.appendChild(viewClassButton);
    
        projectDiv.addEventListener("click", function() {
            openClass(classes.class_id);
        });
    
        infoDiv.appendChild(name);
        infoDiv.appendChild(idSubject);
        infoDiv.appendChild(date);
        infoDiv.appendChild(addClass);
    
        projectDiv.appendChild(img);
        projectDiv.appendChild(infoDiv);
        container.appendChild(projectDiv);
    });
}


function displayExam(allExams){
    const container = document.getElementById('class_container');
    
    allExams.forEach(exam => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('classes');
    
        const img = document.createElement('img');
        img.src = "/src/exam.png";
        img.alt = "Ảnh lớp học";  
    
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('cl_2');
  
        const name = document.createElement('h3');
        name.textContent = `Exam: ${exam.title}`;
   
        const idSubject = document.createElement('p');
        idSubject.textContent = `Time linmit: ${exam.timelimit} minute \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Number questions: ${exam.numberquestion}`; // \u00A0 là khoảng trắng không ngắt dòng
                                                                                                                      
        const date = document.createElement('p');
        date.textContent = `Date: ${new Date(exam.created_at).toLocaleDateString()}`;

        const viewClassButton = document.createElement('button');
        viewClassButton.textContent = 'View Exam';
    
        const addClass = document.createElement('p');
        addClass.classList.add('addClass')
        addClass.appendChild(viewClassButton);
    
        projectDiv.addEventListener("click", function() {
            openExam(exam.id, exam.title);
        });
    
        infoDiv.appendChild(name);
        infoDiv.appendChild(idSubject);
        infoDiv.appendChild(date);
        infoDiv.appendChild(addClass);
    
        projectDiv.appendChild(img);
        projectDiv.appendChild(infoDiv);
        container.appendChild(projectDiv);
    });
}




function displayClassInfo(classInfo, infoOwner){
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
    allClass.forEach(classes => {
        if(type == "1"){
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('classes');
            projectDiv.addEventListener("click", function() { requestToClass(classes.class_id)  });
            projectDiv.innerHTML = `
                <img src="/src/class.png" alt="">
                <div class = "cl_2"> 
                    <h3>Class: ${classes.class_name}</h3>
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
                    <h3>Class: ${classes.class_name}</h3>
                    <p>ID:${classes.class_id}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Subject: ${classes.subject} </p>
                    <p>Date: ${new Date(classes.created_at).toLocaleDateString()}</p>
                    <p class = "Sent" id = "Sent" > <button> Sent </button> </p>
                </div>   `;
            container.appendChild(projectDiv);
        }
        else if (type == "3"){
            const projectDiv = document.createElement('div');
        projectDiv.classList.add('classes');
    
        const img = document.createElement('img');
        img.src = "/src/class.png";
        img.alt = "Ảnh lớp học";  
    
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('cl_2');
  
        const nameHeading = document.createElement('h3');
        nameHeading.textContent = `Class: ${classes.class_name}`;
   
        const idSubjectParagraph = document.createElement('p');
        idSubjectParagraph.textContent = `ID: ${classes.class_id} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Subject: ${classes.subject}`; // \u00A0 là khoảng trắng không ngắt dòng
 
        const dateParagraph = document.createElement('p');
        dateParagraph.textContent = `Date: ${new Date(classes.created_at).toLocaleDateString()}`;

        const viewClassButton = document.createElement('button');
        viewClassButton.textContent = 'View Class';
    
        const addClassParagraph = document.createElement('p');
        addClassParagraph.classList.add('addClass')
        addClassParagraph.appendChild(viewClassButton);
    
        projectDiv.addEventListener("click", function() {
            openClass(classes.class_id);
        });
    
        infoDiv.appendChild(nameHeading);
        infoDiv.appendChild(idSubjectParagraph);
        infoDiv.appendChild(dateParagraph);
        infoDiv.appendChild(addClassParagraph);
    
        projectDiv.appendChild(img);
        projectDiv.appendChild(infoDiv);
        container.appendChild(projectDiv);
        }  
    });
}






