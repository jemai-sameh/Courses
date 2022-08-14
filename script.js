const form = document.querySelector("form")
const ul = document.querySelector(".list-group")
/*
db.collection("courses").get()
.then(res=>res.docs.forEach(course=>{
    console.log("c",course.id);
    addLiCourse(course.data().title,course.data().createdAt,course.id);
    }))
.catch(err=>console.log(err))*/
db.collection("courses").onSnapshot(snapshot => {
    snapshot.docChanges().forEach(course => {
        if (course.type == "added")
            addLiCourse(course.doc.data().title, course.doc.data().createdAt, course.doc.id);
        if (course.type == "removed")
            deleteCourse(course.doc.id)
    })
});

const addCours = (title, date) => {
    const createDocument = db.collection('courses')
        .doc();
    createDocument.set({
        title: title,
        createdAt: date//firebase.firestore.Timestemp.fromDate(new Date())
    })
        .then((res) => {
            // createDocument.get().then(res=>addLiCourse(res.data().title,res.data().createdAt,res.id))
            createDocument.onSnapshot(res =>
                addLiCourse(res.data().title, res.data().createdAt, res.id)
            )
        })
        .catch(e => console.err("Error", e))
}
const addLiCourse = (title, createdAt, id) => {
    const li = document.createElement("li");
    li.setAttribute("class", "list-group-item list-group-item-action")

    const h5 = document.createElement("h5");
    h5.textContent = title;
    li.append(h5)
    li.setAttribute("data-id", id)


    const span = document.createElement("span");
    span.textContent = createdAt.toDate().toDateString();
    li.append(span)


    const button = document.createElement("button");
    button.textContent = "Delete";

    button.setAttribute("class", "btn btn-danger btn-sm my-3")
    li.append(button)

    const i = document.createElement("i")
    i.setAttribute("class", "icon-remove-sign")

    button.append(i)

    ul.append(li)
}

const pattern = /^[a-zA-Z]*$/;
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let title = form.course;
    if (pattern.test(title.value)) {
        title.style.borderColor = "#43fd43b8";
        let date = new Date()
        addCours(title.value, date);
    } else {
        title.style.borderColor = "red";

    }
})



const deleteCourse = id => {
    const courses = document.querySelectorAll("li");
    courses.forEach(course => {
        if (course.getAttribute('data-id') === id) {
            course.remove()
        }
    })
}

ul.addEventListener('click', e => {
    if (e.target.tagName == "BUTTON") {
        if (confirm("Are you sure to delete this course?")) {
            let id = e.target.parentElement.getAttribute("data-id")
            db.collection("courses").doc(id).delete()
                .then(() => {
                    console.log("deleted")
                    e.target.remove()
                })
                .catch(err => {
                    console.log("error", err)
                    console.log("Not deleted")
                })
        }

    }
})