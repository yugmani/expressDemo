const express = require("express");
const Joi = require("joi");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const courses = [
  { id: 1, name: "Javascript" },
  { id: 2, name: "html" },
  { id: 3, name: "css" },
  { id: 4, name: "python" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => {
    return c.id === parseInt(req.params.id);
  });

  if (!course) {
    return res.status(404).send("The course with the given id does not exist");
  }
  res.send(course);
});

app.get("/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body); //result.error

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  //Look up the course
  //If does not exist, return 404
  const course = courses.find((c) => {
    return c.id === parseInt(req.params.id);
  });

  if (!course) {
    return res.status(404).send("The course with the given id does not exist");
  }

  //Validate
  //if invalid, return 400 - Bad request
  //  const result = validateCourse(req.body);
  const { error } = validateCourse(req.body); //result.error

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Update course
  //Return the updated course
  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  console.log(schema.validate(course));
  return schema.validate(course);
}

app.delete("/api/courses/:id", (req, res) => {
  //Look up the course
  //Does not exist, return 404
  const course = courses.find((c) => {
    return c.id === parseInt(req.params.id);
  });

  if (!course) {
    return res.status(404).send("The course with the given id does not exist");
  }

  //delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  //Return the same course
  res.send(course);
});

app.listen(port, () => {
  console.log(`Listening on the port ${port}...`);
});
