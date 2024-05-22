// import axios from 'axios';
//
// // Set up the global Axios interceptor
// axios.interceptors.request.use(
//     (config) => {
//         // Retrieve the token from localStorage
//         // const token = localStorage.getItem('TOKEN_KEY');
//         // if (token) {
//         //     // Add the Bearer token to the Authorization header
//         //     config.headers['Authorization'] = `Bearer ${token}`;
//         // }
//         // return config;
//     },
//     (error) => {
//         // Do something with request error
//         return Promise.reject(error);
//     }
// );
//
// axios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
//
// export default axios;