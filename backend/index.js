const express = require("express");
const app = express();
app.use(express.json());

let people = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send(
    `<h1 style="display: flex; justify-content: center;">Exercises 3.1 - 3.6</h1>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(people);
});

app.get("/info", (request, response) => {
  var header = `<p>Phonebook has info for ${people.length} people</p>`;
  var request_time = "<p>" + new Date().toString() + "</p>";
  response.send(header + request_time);
});

app.get("/api/persons/:id", (request, response) => {
  const { id } = request.params;
  const person = people.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const { id } = request.params;
  person = people.findIndex((p) => p.id == id);

  if (person < 0) {
    response.status(404).end();
    return;
  }

  people.splice(person, 1);
  response.status(204).end();
});

let generateId = () => {
  let genId = null;

  do {
    genId = Math.random() * (2e32 - 0) + 0;
  } while (people.findIndex((p) => p.id == genId) > 0);

  return genId;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }
  if (people.findIndex((p) => p.name == body.name) >= 0) {
    return response.status(400).json({
      error: "name already exists",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  people = people.concat(person);

  response.json(person);

  // console.log(people);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
