const express = require("express");
const rout = express.Router();
const con = require("../connection");

var path = require("path");
const { Connection, Request } = require("tedious");

rout.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + "/../home.html"));
});



rout.post("/scatter_call", (request,response) => {
  var frm = request.body.smin;
  var to = request.body.smax;
  var cntry = request.body.cnt;
  // console.log("ScatterPlot::" + request.body.code)
  // var code = request.body.code;
  var execute = `select year, Smokers from s where Entity = '${cntry}' and Year >= ${frm} and Year <= ${to}`;
  // var execute = `select top 5 year,NumberTerroristIncidents from ti where code = '${code}'`;
  const query = new Request(execute, (err, fieldscount, fields) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`${fieldscount} row(s) returned`);
      console.log(fields);
      response.json(fields);
    }
  });
  con.execSql(query);
});

rout.post("/bar_chart", (request,response) => {

  console.log("in" + request.body.input1)
  var ip1 = request.body.input1;
  var ip2 = request.body.input2;
  var country = request.body.country;
  var execute = `select year, Smokers from s where Entity = '${country}' and Year >= ${ip1} and Year <= ${ip2}`;
  // var execute = `select top 5 year,NumberTerroristIncidents from ti where year between ${ip1} and ${ip2}`;
  const query = new Request(execute, (err, fieldscount, fields) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`${fieldscount} row(s) returned`);
      console.log(fields);
      response.json(fields);
    }
  });
  con.execSql(query);
});


rout.post("/pie_chart", (request,response) => {

  // console.log("in" + request.body.input1)
  var ip1 = request.body.input1;
  var ip2 = request.body.input2;
  var country = request.body.country;
    // newObj.input1 = $scope.input1;
    // newObj.input2 = $scope.input2;
 //var execute = `select code,sum(prevalence) as sum from sp where  prevalence< 5 group by code;`
  //var execute = `select year,NumberTerroristIncidents from ti where year between ${ip1} and ${ip2}`
  // var execute = `select top 5 year,NumberTerroristIncidents from ti where year between ${ip1} and ${ip2}`;
 // console.log(request.body.year1)
 var execute = `select year, Smokers from s where Entity = '${country}' and Year >= ${ip1} and Year <= ${ip2}`;
  const query = new Request(execute, (err, fieldscount, fields) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`${fieldscount} row(s) returned`);
      //console.log(fields);

      response.json(fields);
    }
  });
  con.execSql(query);
});
// ####################################################################################

rout.post("/pie_chart1", (request,response) => {

  console.log("in" + request.body.code)
  var ip1 = request.body.code;
  
 //var execute = `select code,sum(prevalence) as sum from sp where  prevalence< 5 group by code;`
  var execute = `select year,NumberTerroristIncidents from ti where year between ${ip1} and ${ip2}`
  // var execute = `select top 5 year,NumberTerroristIncidents from ti where code = '${ip1}'`;
 // console.log(request.body.year1)
  const query = new Request(execute, (err, fieldscount, fields) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`${fieldscount} row(s) returned`);
      //console.log(fields);

      response.json(fields);
    }
  });
  con.execSql(query);
});

module.exports = rout;
