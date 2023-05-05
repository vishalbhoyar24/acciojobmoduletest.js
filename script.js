fetch("https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json").then((data)=>{
    return  data.json();
  
})
.then((objectArray)=>{

    let arr = [];
    objectArray.forEach((student)=>{
        let obj = {};
        obj.id = student.id;
        obj.fullName = student.first_name + " " + student.last_name;
        obj.image = student.img_src;
        obj.gender = student.gender;
        obj.studentClass = student.class;
        obj.marks = student.marks;
        if(student.passing == true){
            obj.passing = "Passed";
        }else{
            obj.passing = "Failed";
        }
        obj.email = student.email;
        arr.push(obj);
    });
   
    let table = document.querySelector(".table");
    let tableBody = document.querySelector(".table-body");
    let flag = false;
    // function for adding data to table
    function addingData(arr){
        if(flag == true){
            table.children[1].remove();
            flag = false;
        }

        arr.forEach(student=>{
            let tr = document.createElement("tr");
            tr.innerHTML = `<th>${student.id}</th>
            <td><img src="${student.image}" alt="image">${student.fullName}</td>
            <td>${student.gender}</td>
            <td>${student.studentClass}</td>
            <td>${student.marks}</td>
            <td>${student.passing}</td>
            <td>${student.email}</td>`;
            tableBody.append(tr);
        });
    }
    addingData(arr);

    
    let sortAccending = document.querySelector(".ascending");
    sortAccending.addEventListener("click", AccendingSort)
    function AccendingSort(){
        // console.log("hello");
        arr.sort((a, b)=>{
            let smallA = a.fullName.toLowerCase();
            let smallB = b.fullName.toLowerCase();
            return (smallA > smallB) ? 1:-1;
        });
        tableBody.textContent = "";
        addingData(arr);
    }


    // sorting form Z to A
    let sortDecending = document.querySelector(".descending");
    sortDecending.addEventListener("click", decendingSort);
    function decendingSort(){
        arr.sort((a, b)=>{
            let smallA = a.fullName.toLowerCase();
            let smallB = b.fullName.toLowerCase();
            return (smallA > smallB) ? -1:1;
        });
        tableBody.textContent = "";
        addingData(arr);
    }

    //  sort by marks
    let sortMarks = document.querySelector(".marks");
    sortMarks.addEventListener("click", sortingMarks);
    function sortingMarks(){
        arr.sort((a, b)=>{
           return (a.marks - b.marks);
        });
        tableBody.textContent = "";
        addingData(arr);
    }



    // sort by passing
    let sortpassing = document.querySelector(".passing");
    sortpassing.addEventListener("click", sortingPass);
    function sortingPass(){
        let newArr = arr.filter(student=>{
            if(student.passing == "Passed"){
                return student;
            }
        });
        tableBody.textContent = "";
        addingData(newArr);
    }


    // sort by class
    let sortClass = document.querySelector(".class");
    sortClass.addEventListener("click", sortingClass);
    function sortingClass(){
        arr.sort((a, b)=>{
           return (a.studentClass - b.studentClass);
        });
        tableBody.textContent = "";
        addingData(arr);
    }


  // sort by gender
  let sortGender = document.querySelector(".gender");
  sortGender.addEventListener("click", sortingGender);
  function sortingGender(){
      let maleArr = arr.filter(student=>{
          if(student.gender == "Male"){
              return student;
          }
      });
      let femaleArr = arr.filter(student=>{
          if(student.gender == "Female"){
              return student;
          }
      })
      tableBody.textContent = "";
      addingData(maleArr);
      let table = document.querySelector(".table");
      let tableSkeleton = document.createElement("table");
      tableSkeleton.classList.add("table", "table-bordered");
      tableSkeleton.innerHTML = `
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Gender</th>
          <th scope="col">Class</th>
          <th scope="col">Marks</th>
          <th scope="col">Passing</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody class="table-body">    
      </tbody>`
      table.append(tableSkeleton);
      let femaleTable = table.children[1].querySelector(".table-body");
      femaleArr.forEach(student=>{
          let tr = document.createElement("tr");
          tr.innerHTML = `<th>${student.id}</th>
          <td><img src="${student.image}" alt="image">${student.fullName}</td>
          <td>${student.gender}</td>
          <td>${student.studentClass}</td>
          <td>${student.marks}</td>
          <td>${student.passing}</td>
          <td>${student.email}</td>`;
          femaleTable.append(tr);
      });
      flag = true;

  }
})


