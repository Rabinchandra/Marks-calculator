var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");
var table = document.getElementById("table");
var search = document.getElementById("search");


class Student {
    constructor(name, roll, english, manipuri, maths, science, ssc, optional) {
        this.name = name;
        this.roll = roll;
        this.english = english;
        this.manipuri = manipuri;
        this.maths = maths;
        this.science = science;
        this.ssc = ssc;
        this.optional = optional;
        this.total = parseInt(english) + parseInt(manipuri) + parseInt(maths) + parseInt(science) + parseInt(ssc) + parseInt(optional);
        this.pc = (this.total/6).toFixed(2);
    }
 }

// UI
class UI {
    // Use on Page load and Sorting
    static displayStudents() {
        const students = Store.getStudent();

        students.forEach(student => UI.addStudentToList(student));
    }

    static addStudentToList(student) {
        var list = document.getElementById("item-list");
        var tr = document.createElement("tr");

        tr.innerHTML = `<td>${student.name}</td>
                        <td>${student.roll}</td>
                        <td class="tbo">${student.english}</td>
                        <td class="tbo">${student.manipuri}</td>
                        <td class="tbo">${student.maths}</td>
                        <td class="tbo">${student.science}</td>
                        <td class="tbo">${student.ssc}</td>
                        <td class="tbo">${student.optional}</td>
                        <td>${student.total}</td>
                        <td>${student.pc} %</td>
                        <td class="delete">X</td>`;
        list.appendChild(tr);
    }
    // removing
    static removeStudent(e) {
        var list = document.getElementById("item-list");
		if(e.target.className == "delete") {
            // Removing from displaying
            var item = e.target.parentElement;
            list.removeChild(item);

            // Removing from Storage
            var itemName = item.firstElementChild.innerText.toLowerCase();
            var itemRoll = parseInt(item.firstElementChild.nextElementSibling.innerText);
            const students = Store.getStudent();
            var modiStudents = [];
            console.log(itemName);
            students.forEach(function(student) {
                if(student.name.toLowerCase() != itemName && student.roll != itemRoll) {
                    modiStudents.push(student);
                }
            });
            localStorage.setItem("students", JSON.stringify(modiStudents));
        }
    }
}
// Storage
class Store {
    static getStudent() {
        var students;
         if(localStorage.getItem("students") == null) {
             students = [];
         } else {
             students = JSON.parse(localStorage.getItem("students"));
         }
         return students;
     }

     static addStudent(student) {
         const students = Store.getStudent();
         
         students.push(student);

         localStorage.setItem("students", JSON.stringify(students));
     }

}

// Events
document.addEventListener("DOMContentLoaded", UI.displayStudents);

form1.addEventListener("submit", (e) => {
    e.preventDefault();
    form2.style.opacity = "0";
    form1.style.opacity = "0";
    setTimeout(function() {
        form1.style.display = "none";
    }, 1500);
    form2.style.display = "block";
    setTimeout(function() {
        form2.style.opacity = "1";
    }, 1600);
})

form2.addEventListener("submit", (e) => {
    e.preventDefault();
    // Css part
    form2.style.opacity = 0;
    setTimeout(function() {
        form2.style.display = "none";
    }, 1500);
    setTimeout(function() {
        form1.style.display = "block";
    },1100)
    setTimeout(function() {
        form1.style.opacity = "1";
    }, 1200);

    // adding data
    var name = document.getElementById("name");
    var roll = document.getElementById("roll");
    var eng = document.getElementById("eng");
    var man = document.getElementById("man");
    var maths = document.getElementById("maths");
    var sc = document.getElementById("sc");
    var ssc = document.getElementById("ssc");
    var opt = document.getElementById("opt");

    var student = new Student(name.value, roll.value, eng.value, man.value, maths.value, sc.value, ssc.value, opt.value);
    Store.addStudent(student);
    UI.addStudentToList(student);
})

table.addEventListener("click", (e) => {
    UI.removeStudent(e);
});

search.addEventListener("mouseenter", function() {
    table.style.marginTop = "-250px";
    table.style.transition = "0.7s";
    form1.style.opacity = "0";
    form2.style.opacity = "0";
})

search.addEventListener("mouseleave", function() {
    table.style.marginTop = "100px";
    table.style.transition = "0.7s";
    form1.style.opacity = "1";
    form2.style.opacity = "1";
})

search.addEventListener("keydown", function() {
    var trs = document.querySelectorAll("tbody tr");
    trs.forEach(tr => {
        if(tr.firstElementChild.innerText.toLowerCase().indexOf(search.value.toLowerCase()) == -1) {
            tr.style.display = "none";
        } else {
            tr.style.display = "table-row";
        }
    })
})

// Focus on form and display off the table;
// var container = document.getElementById("container");

// container.addEventListener("mouseenter", function() {
//     // table.style.opacity = "0";
//     table.style.zIndex = "-1";
//     // console.log('mouseenter');
// }) 

// container.addEventListener("mouseleave", function() {
//     // table.style.opacity = "1";
//     table.style.top = "200%";
//     // console.log('mouseleave');
// }) 