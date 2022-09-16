// export const api = 'http://localhost:2000/api';
// export const generatePublicUrl = (filename) => {
//     return `http://localhost:2000/public/${filename}`;
// }

const baseUrl = "https://riz-ecommerce-mern-back-end.herokuapp.com";
//const baseUrl = "http://localhost:2000";

export const api = `${baseUrl}/api`;

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};