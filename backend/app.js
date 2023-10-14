import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  next();
});

app.get('/courses', async (req, res) => {
  const { max, search } = req.query;
  const coursesFileContent = await fs.readFile('./data/courses.json');
  let courses = JSON.parse(coursesFileContent);

  if (search) {
    courses = courses.filter((course) => {
      const searchableText = `${course.title} ${course.description}`;
      return searchableText.toLowerCase().includes(search.toLowerCase());
    });
  }

  if (max) {
    courses = courses.slice(courses.length - max, courses.length);
  }

  res.json({
    courses: courses.map((course) => ({
      id: course.id,
      title: course.title,
      image: course.image,
      duration: course.duration,
    })),
  });
});

app.get('/courses/images', async (req, res) => {
  const imagesFileContent = await fs.readFile('./data/images.json');
  const images = JSON.parse(imagesFileContent);

  res.json({ images });
});

app.get('/courses/:id', async (req, res) => {
  const { id } = req.params;

  const coursesFileContent = await fs.readFile('./data/courses.json');
  const courses = JSON.parse(coursesFileContent);

  const course = courses.find((course) => course.id === id);

  if (!course) {
    return res
      .status(404)
      .json({ message: `For the id ${id}, no course could be found.` });
  }

  setTimeout(() => {
    res.json({ course });
  }, 1000);
});

app.post('/courses', async (req, res) => {
  const { course } = req.body;

  if (!course) {
    return res.status(400).json({ message: 'course is required' });
  }
  if (
    !course.title?.trim() ||
    !course.description?.trim() ||
    !course.duration?.trim() ||
    !course.image?.trim() 
  ) {
    return res.status(400).json({ message: 'Invalid data provided.' });
  }

  const coursesFileContent = await fs.readFile('./data/courses.json');
  const courses = JSON.parse(coursesFileContent);

  const newcourse = {
    id: Math.round(Math.random() * 10000).toString(),
    ...course,
  };

  courses.push(newcourse);

  await fs.writeFile('./data/courses.json', JSON.stringify(courses));

  res.json({ course: newcourse });
});

app.put('/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { course } = req.body;

  if (!course) {
    return res.status(400).json({ message: 'course is required' });
  }

  if (
    !course.title?.trim() ||
    !course.description?.trim() ||
    !course.duration?.trim() ||
    !course.image?.trim() 
  ) {
    return res.status(400).json({ message: 'Invalid data provided.' });
  }

  const coursesFileContent = await fs.readFile('./data/courses.json');
  const courses = JSON.parse(coursesFileContent);

  const courseIndex = courses.findIndex((course) => course.id === id);

  if (courseIndex === -1) {
    return res.status(404).json({ message: 'course not found' });
  }

  courses[courseIndex] = {
    id,
    ...course,
  };

  await fs.writeFile('./data/courses.json', JSON.stringify(courses));

  setTimeout(() => {
    res.json({ course: courses[courseIndex] });
  }, 1000);
});

app.delete('/courses/:id', async (req, res) => {
  const { id } = req.params;

  const coursesFileContent = await fs.readFile('./data/courses.json');
  const courses = JSON.parse(coursesFileContent);

  const courseIndex = courses.findIndex((course) => course.id === id);

  if (courseIndex === -1) {
    return res.status(404).json({ message: 'course not found' });
  }

  courses.splice(courseIndex, 1);

  await fs.writeFile('./data/courses.json', JSON.stringify(courses));

  setTimeout(() => {
    res.json({ message: 'course deleted' });
  }, 1000);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
