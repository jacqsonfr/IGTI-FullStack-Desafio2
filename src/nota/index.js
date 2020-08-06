import { promises } from 'fs';

const { readFile } = promises;

//EndPoint For Fifth Question
export async function getNota(request, response) {
  try {
    const { student, subject } = request.query;

    const json = await readFile('./grades.json');
    const { grades } = JSON.parse(json);

    const filterGrade = grades.filter((grade) => {
      if (grade.student === student && grade.subject === subject) {
        return grade;
      }
    });

    if (filterGrade.length == 0) {
      return response.status(403).send();
    }

    const sumNota = filterGrade.reduce((acc, cur) => (acc += cur.value), 0);

    return response.json(sumNota);
  } catch (error) {
    console.log(error);
    return response.status(400).send('Error To Get the Value');
  }
}

//EndPoint For Sixth Question
export async function getMedia(request, response) {
  try {
    const { subject, type } = request.query;

    const json = await readFile('./grades.json');
    const { grades } = JSON.parse(json);

    const filterGrade = grades.filter((grade) => {
      if (grade.subject === subject && grade.type === type) {
        return grade;
      }
    });

    if (filterGrade.length == 0) {
      return response.status(403).send();
    }

    const sumNota = filterGrade.reduce((acc, cur) => (acc += cur.value), 0);
    const media = sumNota / filterGrade.length;

    return response.json(media);
  } catch (error) {
    console.log(error);
    return response.status(400).send('Error To Get the Media');
  }
}

//EndPoint For Seventh Question
export async function getTop3(request, response) {
  try {
    const { subject, type } = request.query;

    const json = await readFile('./grades.json');
    const { grades } = JSON.parse(json);

    const filterGrade = grades
      .filter((grade) => {
        if (grade.subject === subject && grade.type === type) {
          return grade;
        }
      })
      .sort((a, b) => {
        return b.value - a.value;
      });

    if (filterGrade.length == 0) {
      return response.status(403).send();
    }

    let top3 = [];
    let i = 3;
    if (filterGrade.length < 3) {
      i = filterGrade.length;
    }

    for (let index = 0; index < i; index++) {
      top3.push(filterGrade[index]);
    }

    return response.json(top3);
  } catch (error) {
    console.log(error);
    return response.status(400).send('Error To Get Top3');
  }
}
