const onlyNumbers = (str: string) => {
  const numbers = (str.match(/\d+/g) || []).join("");
  return numbers;
};

const numbers = { onlyNumbers };

export { numbers };
