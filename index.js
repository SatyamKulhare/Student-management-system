const express = require("express");

const app = express();

const port = 3000;

const path = require("path");

const methodOverride = require("method-override");

const {v4:uuidv4} = require("uuid");

app.use(express.urlencoded({extended : true}));

app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

app.use(methodOverride("__method"));

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));

let students = [
    {
        StudentID:uuidv4(),
        Name:'Satyam Kulhare',
        Contact:'7489522219',
        Course:'Btech'
    },
    {
        StudentID:uuidv4(),
        Name:'Shinchan Jaat',
        Contact:'7489522219',
        Course:'Btech'
    },
        {
        StudentID:uuidv4(),
        Name:'Doraemon Yadav',
        Contact:'7489522219',
        Course:'Btech'
    }
]

//CRUD OPERATIONS -->

app.get("/dashboard",(req,res)=>{
    res.render("index.ejs",{ students })
});

app.get("/dashboard/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/dashboard",(req,res)=>{
    let {Name,Contact,Course}=req.body;
    let StudentID = uuidv4();
    students.push({StudentID,Name,Contact,Course});
    res.redirect("/dashboard");
});

app.get("/dashboard/:StudentID", (req, res) => {

    let { StudentID } = req.params;

    console.log("URL ID:", StudentID);

    console.log("Students:", students);

    let student = students.find((s) => s.StudentID === StudentID);

    console.log("Found:", student);

    if (!student) {
        return res.send("Student Not Found");
    }

    res.render("show.ejs", { student });
});

app.get("/dashboard/:StudentID/edit", (req, res) => {
    let { StudentID } = req.params;

    let student = students.find((s) => s.StudentID === StudentID);

    res.render("edit.ejs", { student });
});

app.patch("/dashboard/:StudentID", (req, res) => {

    let { StudentID } = req.params;

    let { Name, Contact, Course } = req.body;

    let student = students.find((s) => s.StudentID === StudentID);

    student.Name = Name;
    student.Contact = Contact;
    student.Course = Course;

    res.redirect("/dashboard");
});

app.delete("/dashboard/:StudentID", (req, res) => {

    let { StudentID } = req.params;

    students = students.filter((student) => student.StudentID !== StudentID);

    res.redirect("/dashboard");
});

app.listen(port,()=>{
    console.log(`App listening on port: ${port}`);
});