const form=document.querySelector("form")
const ul = document.querySelector(".list-group")

db.collection("courses").get()
.then(res=>res.docs.forEach(course=>{
    //console.log("c",course.data());
    let data=course.data();
    addLiCourse(data.title);
    }))
.catch(err=>console.log(err))

const addCours=(title,date)=>{
    db.collection('courses')
    .doc()
    .set({
        title: title,
        createdAt: date
    })
    .then(()=>alert("successfully"))
    .catch(e=>console.err("Error",e))
}
const addLiCourse=(title)=>{
    const li =document.createElement("li");
    li.textContent=title;
    li.setAttribute("class","list-group-item list-group-item-action")
    ul.append(li)
}

const pattern=/^[a-zA-Z]*$/;
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let title=form.course.value;
    if (pattern.test(title)){
        addLiCourse(title);
        let date=new Date()
        addCours(form.course.value,date);
    }
})





