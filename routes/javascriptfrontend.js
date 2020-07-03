var app = angular.module("demo", []);

app.controller("Hello", function ($scope, $http) {
  $scope.showscatter = function () {
    // console.log("Scatter is been defined" + $scope.code);
    var newObj = {};
    // $scope.newObj.code = $scope.code;
    // console.log($scope.newObj);
    newObj.smin = $scope.smin;
    newObj.smax = $scope.smax;
    newObj.cnt = $scope.cnt;
    // console.log(dat);
    $http.post("/home/scatter_call", newObj).then(function (response) {
      $scope.data = response.data;
      scatterChart($scope.data);
    });
  
  };
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  $scope.piefuncall = function () {
    console.log("Pie Chart is been defined" + $scope.input1);
    //$scope.newObj = {};
    var newObj = {};
    newObj.country = $scope.countryname;
    newObj.input1 = Number($scope.input1);
    newObj.input2 = Number($scope.input2);
    console.log(newObj);
    var input = $scope.input1;
    $http.post("/home/pie_chart", newObj).then(
      function (response) {
        $scope.data = response.data;
        pieChart($scope.data, newObj);

        // This function handles success
      },
      function (response) {
        // this function handles error
      }
    );
  };
  // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

 
  $scope.barfuncall = function () {
    console.log("Bar Chart is been defined" + $scope.input1);
    //$scope.newObj = {};
    var newObj = {};
    newObj.country = $scope.countryname;
    newObj.input1 = Number($scope.input1);
    newObj.input2 = Number($scope.input2);
    console.log(newObj);
    // var input = $scope.input1;
    $http.post("/home/bar_chart", newObj).then(
      function (response) {
        $scope.data = response.data;
        barChart($scope.data);

        // This function handles success
      },
      function (response) {
        // this function handles error
      }
    );
  };

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  $scope.barfuncall_multiple = function () {
    console.log("Bar Chart is been defined" + $scope.input1);
    //$scope.newObj = {};
    var newObj = {};
    newObj.input1 = $scope.input1;
    newObj.input2 = $scope.input2;
    console.log(newObj);
    // var input = $scope.input1;
    $http.post("/home/bar_chart", newObj).then(
      function (response) {
        $scope.data = response.data;
        barchart_multiple($scope.data);

        // This function handles success
      },
      function (response) {
        // this function handles error
      }
    );
  };

  function scatterChart(data1) {
    console.log("data1" + $scope.data);

    var result = [];
    for (var i = 0; i < data1.length; i++) {
      var data_final = {};
      data_final["x"] = Number(data1[i].year.value);
      data_final["y"] = Number(data1[i].Smokers.value);

      result.push(data_final);
    }
    console.log("result" + data_final);

    $(document).ready(function () {
      var chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
      };
      var title = {
        text: "Data in Bar-Chart Plot",
      };
      var tooltip = {
        pointFormat: "{point.x}: <b>{point.y:.1f}</b>",
      };
      var plotOptions = {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",

          dataLabels: {
            enabled: true,
            format: "<b>{point.x}</b>: {point.y:.1f}",
            style: {
              color:
                (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                "black",
            },
          },
        },
      };

      var series = [
        {
          type: "scatter",
          name: "Year and Number of Incidents",
          data: result,
        },
      ];
      var json = {};
      json.chart = chart;
      json.title = title;
      json.tooltip = tooltip;
      json.series = series;
      json.plotOptions = plotOptions;
      $("#containerscar").highcharts(json);
    });
  }

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  function pieChart(data1,newObj) {
    console.log("data1" + data1);

    var result = [];
    for (var i = 0; i < data1.length; i++) {
      var data_final = {};
      data_final["x"] = data1[i].year.value;
      data_final["y"] = data1[i].Smokers.value;

      result.push(data_final);
    }
    console.log("result" + data_final);

    $(document).ready(function () {
      var chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
      };
      // var chart= {
      //   renderTo: 'asset_allocation_bottom_left_div'
      // };
      var title = {
        text: "Data in pie chart from "+newObj.input1 +"to"+ newObj.input2+"",
      };
      var tooltip = {
        pointFormat: "{point.x}: <b>{point.percentage:.1f}%</b>",
      };
      var plotOptions = {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",

          dataLabels: {
            enabled: true,
            format: "{point.percentage:.1f}%",
            style: {
              color:
                (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                "black",
            },
          },
        },

      };

      var series = [
        {
          type: "pie",
          name: "Browser share",
          data: result,
          dataLabels: {
            verticalAlign: 'top',
            enabled: true,
            color: '#000000',
            connectorWidth: 1,
            distance: -30,
            connectorColor: '#000000',
            formatter: function() {
                return Math.round(this.percentage) + ' %';
            }
          }
        }
      ];
      var exporting = {
        enabled: false
      };
      var credits = {
        enabled: false
      };
      var json = {};
      json.chart = chart;
      json.title = title;
      json.tooltip = tooltip;
      json.series = series;
      json.plotOptions = plotOptions;
      $("#container").highcharts(json);
    });
  }



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  function barChart(data1) {
    console.log("data1" + $scope.data);

    var result = [];
    for (var i = 0; i < data1.length; i++) {
      var data_final = {};
      data_final["x"] = Number(data1[i].year.value);
      data_final["y"] = Number(data1[i].Smokers.value);

      result.push(data_final);
    }
    console.log("result" + data_final);

    $(document).ready(function () {
      var chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        // valueLabel.locationX = 1,
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
      };
      var title = {
        text: "Data in bar chart",
      };
      var tooltip = {
        pointFormat: "{point.x}: <b>{point.percentage:.1f}</b>",
      };
      var plotOptions = {
        bar: {
          allowPointSelect: true,
          cursor: "pointer",

          dataLabels: {
            enabled: true,
            
          
    
            format: "<b>{point.y:.1f}</b>: {point.percentage:.1f} ",
            inside: true,
            crop: false,
            overflow: 'none',
            align: 'right',
            style: {
              color:
                (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                "black",
            },
          },
        },
      };

      var series = [
        {
          type: "bar",
          name: "Browser share",
          data: result,
          color: 'green',
        },
      ];
      var json = {};
      json.chart = chart;
      json.title = title;
      json.tooltip = tooltip;
      json.series = series;
      json.plotOptions = plotOptions;
      $("#containerBar").highcharts(json);
    });
  }



});

