import { describe, test } from 'bun:test';

const randomListOfAHundredNumbers = Array.from({ length: 1e2 }, () =>
  Math.floor(Math.random() * 1000)
);

const randomListOfTenThousandNumbers = Array.from({ length: 1e4 }, () =>
  Math.floor(Math.random() * 1000)
);

const randomListOfMillionNumbers = Array.from({ length: 1e6 }, () =>
  Math.floor(Math.random() * 1000)
);

const randomListOf100MillionNumbers = Array.from({ length: 1e8 }, () =>
  Math.floor(Math.random() * 1000)
);

const inputs: Record<string, number[]> = {
  small: randomListOfAHundredNumbers,
  medium: randomListOfTenThousandNumbers,
  big: randomListOfMillionNumbers,
  biggest: randomListOf100MillionNumbers,
};

describe('Iterate', () => {
  test.each(['small', 'medium', 'big'])('iterate over array', (size) => {
    console.time(`iterate(array) - ${size}`);
    for (let i = 0; i < inputs[size].length; i++) {}
    console.timeEnd(`iterate(array) - ${size}`);
  });

  test.each(['small', 'medium', 'big'])('iterate over set', (size) => {
    const aSet = new Set(inputs[size]);
    console.time(`iterate(set) - ${size}`);
    for (let number of aSet) {
    }
    console.timeEnd(`iterate(set) - ${size}`);
  });
});
