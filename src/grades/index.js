import { promises } from 'fs';

const { readFile, writeFile } = promises;

export async function index(request, response) {
  try {
    const grades = await readFile('./grades.json');
    return response.json(JSON.parse(grades));
  } catch (error) {
    console.log(error);
    return response.status(400).send('Error to get Grade');
  }
}

//EndPoint For First Question
export async function create(request, response) {
  try {
    const { student, subject, type, value } = request.body;
    const json = await readFile('./grades.json');
    let { nextId, grades } = JSON.parse(json);
    const id = nextId++;

    const newGrade = {
      id,
      student,
      subject,
      type,
      value,
      timestamp: new Date(),
    };

    grades.push(newGrade);

    await writeFile('./grades.json', JSON.stringify({ nextId, grades }));

    return response.json(newGrade);
  } catch (error) {
    console.log(error);
    return response.status(400).send('Error To Create Grade');
  }
}

//EndPoint For Second Question
export async function update(request, response) {
  try {
    const { id, student, subject, type, value } = request.body;
    const json = await readFile('./grades.json');
    let { nextId, grades } = JSON.parse(json);

    const updateGrade = grades.filter((grade) => grade.id === id);

    if (updateGrade.length == 0) {
      return response.status(403).send();
    }

    grades = grades.map((grade) => {
      if (grade.id === id) {
        const { timestamp } = grade;
        grade = { id, student, subject, type, value, timestamp };
      }
      return grade;
    });

    await writeFile('./grades.json', JSON.stringify({ nextId, grades }));

    return response.send('Grade Updated');
  } catch (error) {
    console.log(error);
    return response.status(400).send('Error To Update Grade');
  }
}

//EndPoint For Third Question
export async function del(request, response) {
  try {
    const { id } = request.params;

    const json = await readFile('./grades.json');
    let { nextId, grades } = JSON.parse(json);

    const delGrade = grades.filter((grade) => grade.id === parseInt(id));

    if (delGrade.length == 0) {
      return response.status(403).send();
    }

    grades = grades.filter((grade) => grade.id !== parseInt(id));

    await writeFile('./grades.json', JSON.stringify({ nextId, grades }));

    return response.send('Grade Deleted');
  } catch (error) {
    console.log(error);
    return response.status(400).send('Error To Delete Grade');
  }
}
//EndPoint For Fourth Question
export async function getGrade(request, response) {
  try {
    const { id } = request.params;

    const json = await readFile('./grades.json');
    let { grades } = JSON.parse(json);

    const getGrade = grades.filter((grade) => grade.id === parseInt(id));

    if (getGrade.length == 0) {
      return response.status(403).send();
    }

    return response.json(getGrade);
  } catch (error) {
    console.log(error);
    return response.status(400).send('Error To Get Grade');
  }
}
