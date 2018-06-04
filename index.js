const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./instructors');
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.json({
    data: data
  });
});

app.get('/:id', (req, res) => {
  var id = getInstructorById(data, req.params.id);
  if(!id) {
    res.status(404).json({
      error: "Instructor record does not exist at this id."
    });
  } else {
    res.json({
      data: id
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function getInstructorById(data, id) {
  for(let i = 0; i < data.length; i++) {
    if(data[i].id == id) {
      return data[i]
    }
  };
  return null;
};