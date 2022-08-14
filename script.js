const form=document.querySelector("form")
const ul = document.querySelector(".list-group")

db.collection("courses").get()
.then(res=>res.docs.forEach(course=>{
    console.log("c",course.id);
    addLiCourse(course.data().title,course.data().createdAt,course.id);
    }))
.catch(err=>console.log(err))

const addCours=(title,date)=>{
    const createDocument=db.collection('courses')
    .doc();
    createDocument.set({
        title: title,
        createdAt: date
    })
    .then(()=>{
        createDocument.get().then(res=>addLiCourse(res.data().title,res.data().createdAt,res.id))
    })
    .catch(e=>console.err("Error",e))
}
const addLiCourse=(title,createdAt,id)=>{
    const li =document.createElement("li");
    li.textContent=title;
    li.setAttribute("class","list-group-item list-group-item-action")
    
    const span =document.createElement("span");
    span.textContent=createdAt.toDate().toDateString();
   // span.setAttribute("id",id)

    li.append(span)
    
    ul.append(li)
}

const pattern=/^[a-zA-Z]*$/;
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let title=form.course.value;
    if (pattern.test(title)){
        let date=new Date()
        addCours(form.course.value,date);
    }
})





