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
    res.status(404).send("The course with the given id does not exist");
  }
  res.send(course);
});

app.get("/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

app.listen(port, () => {
  console.log(`Listening on the port ${port}...`);
});
