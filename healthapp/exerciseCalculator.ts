interface ExerciseArguments {
  dailyExercise: number[];
  targetExercise: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExercises = (args: string[]): ExerciseArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const targetExercise = Number(args.at(-1));
  const dailyExercise = args.slice(2, -1).map(x => Number(x));

  if (!dailyExercise.some(x => isNaN(x)) && !isNaN(targetExercise)) {
    return { dailyExercise, targetExercise };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (exerciseValues: ExerciseArguments): Result => {
  const targetExercise = exerciseValues.targetExercise;
  const dailyExercise = exerciseValues.dailyExercise;
  const periodLength = dailyExercise.length;
  const averageExercise = dailyExercise.reduce((x, y) => x + y) / periodLength;
  let rating: number;
  let ratingDescription: string;

  if (targetExercise * 1.1 < averageExercise) {
    rating = 3;
    ratingDescription = 'You overshot your goals! Great job, keep it up!';
  } else if (targetExercise * 0.9 > averageExercise) {
    rating = 1;
    ratingDescription = 'You did not reach your goals. You need to exercise more!';
  } else {
    rating = 2;
    ratingDescription = 'You exercised a reasonable amount. How about you try getting in a little bit more next time?';
  }

  return {
    periodLength: periodLength,
    trainingDays: dailyExercise.filter(d => (d !== 0)).length,
    success: averageExercise >= targetExercise,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetExercise,
    average: averageExercise,
  };
};

if (process.argv[1] === import.meta.filename) {
  console.log(calculateExercises(parseExercises(process.argv)));
};

export default calculateExercises;
