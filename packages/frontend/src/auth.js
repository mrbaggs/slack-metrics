const axios = require("axios");


export const authenticate = async function() {
  const init = await axios.get("http://localhost:1211/authGrant");
  console.log(init)

};

export default authenticate;