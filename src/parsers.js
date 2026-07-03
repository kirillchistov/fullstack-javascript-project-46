const parse = (content, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(content);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default parse;
