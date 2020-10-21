const isProduction = process.env.NODE_ENV === 'production';

const base = {};

const development = {
  ...base,
  apiUrl: 'http://localhost:8000/',
};

const production = {
  ...base,
  apiUrl: 'https://ghost-todo.herokuapp.com/',
};

export default isProduction ? production : development;