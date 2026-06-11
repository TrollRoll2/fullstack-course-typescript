import express from 'express';
import calculateBmi from './bmiCalculator.ts';
import calculateExercises from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    const bmiRange = calculateBmi({ height, weight });
    res.send({ height, weight, bmi: bmiRange});
  } else {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).send({ error: 'parameters missing' });
  };

  if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
    return res.status(400).send({ error: 'malformatted parameters' });
  };

  if (daily_exercises.some((x) => typeof x !== 'number') || isNaN(target)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  };

  const result = calculateExercises({ dailyExercise: daily_exercises.map(Number), targetExercise: Number(target) });

  return res.send(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});