import express, { response } from "express";
import data from "./data/MOCK_DATA.json" assert { type: "json" };

const app = express();

const PORT = 3000;

//use public folder
app.use(express.static("public"));
//use images route
app.use("/images", express.static("images"));

//Using express.json and express.urlencoded
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.json(data);
});

//POST - express.json and express.urlencoded
app.post("/item", (request, response) => {
  console.log(request.body);
  response.send(request.body);
});

app.get("/download", (request, response) => {
  response.download("images/mountains_2.jpeg");
});

app.get("/redirect", (request, response) => {
  response.redirect("https://www.linkedin.com/learning/?u=43268076");
});

app.get(
  "/next",
  (request, response, next) => {
    console.log("The response will be sent by the next function.");
    next();
  },
  (request, response) => {
    response.send("I just set up a route with a second callback.");
  }
);

app
  .route("/class")
  .get((request, response) => {
    //response.send("get");
    throw new Error();
  })
  .post((request, response) => {
    response.send("post");
  })
  .put((request, response) => {
    response.send("put");
  })
  .delete((request, response) => {
    response.send("delete");
  });

//routing get
app.get("/class/:id", (request, response) => {
  const studentID = Number(request.params.id);
  const student = data.filter((student) => student.id === studentID);
  response.send(student);
});

app.post("/create", (request, response) => {
  response.send("This is a POST request at /create");
});

app.put("/edit", (request, response) => {
  response.send("This is a PUT request at /edit");
});

app.delete("/delete", (request, response) => {
  response.send("This is a Delete request at /delete");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("you done fucked up!");
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}!`);
  //console.log(data);
});
