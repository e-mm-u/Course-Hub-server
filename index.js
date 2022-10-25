const express = require('express');
const app = express();

const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors);

const categories = require('./data/courseCategory.json');
const courses = require('./data/courseDetails.json');

app.get('/', (req,res)=>{
    res.send('Welcome to your homemade Course Api')
});
// get the categories json data 
app.get('/course_categories', (req,res)=>{
    res.json(categories);
})
// get filtered courses based on dynamic course-category-id
app.get('/course_category/:id', (req, res)=>{
    const id = req.params.id;
    if(id==='00'){
        res.json(courses);
    }else{
        const category_courses = courses.filter(course => course.category_id === id)
        res.json(category_courses);
    }
})

// get all courses 
app.get('/courses', (req,res)=>{
    res.json(courses);
})

// get the course details based on dynamic course id 
app.get('/course/:id', (req,res)=>{
    const id = req.params.id;
    const course_detail = courses.find(course => course.course_id === id)
    res.json(course_detail);
});

app.listen(port, ()=>{
    console.log('course server api is running on port ', port);
})