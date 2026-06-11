interface BMIArguments {
  height: number;
  weight: number;
}

const parseBmi = (args: string[]): BMIArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (!isNaN(height) && !isNaN(weight)) {
    return { height, weight };
  } else {
    throw new Error('Provided values were not numbers!');
  };
};

const calculateBmi = (bmiValues: BMIArguments): string => {
  const heightM = bmiValues.height / 100;
  const Bmi = bmiValues.weight / (heightM*heightM);
  if (Bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (Bmi <= 17.0) {
    return 'Underweight (Moderate thinness)';
  } else if (Bmi <= 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (Bmi <= 25) {
    return 'Normal range';
  } else if (Bmi <= 30) {
    return 'Overweight (Pre-obese)';
  } else if (Bmi <= 35) {
    return 'Obese (Class I)';
  } else if (Bmi <= 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  } 
};

if (process.argv[1] === import.meta.filename) {
  console.log(calculateBmi(parseBmi(process.argv)));
};

export default calculateBmi;
