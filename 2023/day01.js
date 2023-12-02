const NOPE = Symbol("NOPE");

const cleanRawInput = (raw) => raw.trim().split(/\n/);

const numberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const solution1 = (input) =>
  input
    .map((code) => {
      var num = code.replace(/\D/g, "");
      return num.length && `${num.at(0)}${num.at(-1)}`;
    })
    .filter((code) => code)
    .reduce((acc, a) => acc + parseInt(a), 0);

const solution2 = (input) =>
  input.map((code) => {
    const regexp = `(?=(${Object.keys(numberMap).join('|')}))`;
    const set = [...code.matchAll(regexp)];
    let count = 0;
    set.forEach((match) => {
      const value = match[1];
      const index = match.index + count;
      count += numberMap[value].toString().length;      
      code = code.substring(0, index) + numberMap[value] + code.substring(index);
    })

    return code;
  });

function partOne(input, report, answer) {
  const result = solution1(input);
  report("Part one", result, answer);
}

function partTwo(input, report, answer) {
  const result = solution1(solution2(input));
  report("Part two", result, answer);
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw);

  partOne(input, report, 53974);
  partTwo(input, report, 52840);
};

