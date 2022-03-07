var axios = require("axios");
var data = JSON.stringify({
  collection: "data",
  database: "restData",
  dataSource: "Cluster0",
  projection: {
    _id: 1,
  },
  document: {
    name: "John Sample",
    age: 42,
  },
});

var config = {
  method: "post",
  url: "https://data.mongodb-api.com/app/data-nuutt/endpoint/data/beta/action/insertOne",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key": "",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

// food images
// <a href='https://www.freepik.com/psd/banner'>Banner psd created by graphicforest - www.freepik.com</a>
