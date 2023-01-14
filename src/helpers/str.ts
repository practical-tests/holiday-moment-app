const fill = (charReplace: string, str: string, value: string) => {
  let index = 0;
  return str
    .split("")
    .map((c) => {
      if (value.length < index + 1) return "";
      if (c !== charReplace) return c;
      let char = value[index];
      index++;
      return char;
    })
    .join("");
};

const replaceChars = (str: string, charFill: string) => {
  return str
    .split("")
    .map((char) => {
      if (/[^A-Za-z0-9]/.test(char)) return char;
      return charFill;
    })
    .join("");
};

const str = {
  fill,
  replaceChars,
};

export { str };
