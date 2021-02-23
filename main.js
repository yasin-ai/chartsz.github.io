/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------|
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
am4core.globalAdapter.addAll(2)
var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.padding(40, 40, 40, 40);
chart.numberFormatter.numberFormat = "#,###.";
var label = chart.plotContainer.createChild(am4core.Label);
label.x = am4core.percent(97);
label.y = am4core.percent(95);
label.horizontalCenter = "right";
label.verticalCenter = "middle";
label.dx = -15;
label.fontSize = 50;

var playButton = chart.plotContainer.createChild(am4core.PlayButton);
playButton.x = am4core.percent(97);
playButton.y = am4core.percent(95);
playButton.dy = -2;
playButton.verticalCenter = "middle";
playButton.events.on("toggled", function(event) {
  if (event.target.isActive) {
    play();
  }
  else {
    stop();
  }
})

var stepDuration = 4000;

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "network";
categoryAxis.renderer.minGridDistance = 1;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.disabled = false;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.rangeChangeEasing = am4core.ease.linear;
valueAxis.rangeChangeDuration = stepDuration;
valueAxis.extraMax = 0.1;

var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryY = "network";
series.dataFields.valueX = "MAU";
series.tooltipText = "{valueX.value}"
series.columns.template.strokeOpacity = 0;
series.columns.template.column.cornerRadiusBottomRight = 5;
series.columns.maxColumns = 1
series.columns.template.column.cornerRadiusTopRight = 5;
series.interpolationDuration = stepDuration;
series.interpolationEasing = am4core.ease.linear;
var labelBullet = series.bullets.push(new am4charts.LabelBullet())
labelBullet.label.horizontalCenter = "right";
labelBullet.label.text = "{values.valueX.workingValue}";
labelBullet.label.textAlign = "end";
labelBullet.label.dx = -10;
labelBullet.label.maxColumns = 1;
chart.zoomOutButton.disabled = true;

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
series.columns.template.adapter.add("fill", function(fill, target){
  return chart.colors.getIndex(target.dataItem.index);
});

var year = 2003;
label.text = year.toString();

var interval;

function play() {
  interval = setInterval(function(){
    nextYear();
  }, stepDuration)
  nextYear();
}

function stop() {
  if (interval) {
    clearInterval(interval);
  }
}

function nextYear() {
  year++

  if (year > 2030) {
    year = 2003;
  }

  var newData = allData[year];
  var itemsWithNonZero = 0;
  for (var i = 0; i < chart.data.length; i++) {
    chart.data[i].MAU = newData[i].MAU;
    if (chart.data[i].MAU > 0) {
      itemsWithNonZero++;
      
    }
  }
  
    if(itemsWithNonZero > 25){
    itemsWithNonZero = 25
  }
  
  

  if (year == 2003) {
    series.interpolationDuration = stepDuration / 4;
    valueAxis.rangeChangeDuration = stepDuration / 4;
  }
  else {
    series.interpolationDuration = stepDuration;
    valueAxis.rangeChangeDuration = stepDuration;
  }

  chart.invalidateRawData();
  label.text = year.toString();

  categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });
}


categoryAxis.sortBySeries = series;

var allData = {
  "2003": [
    {
      "network": "Bill Gates",
      "MAU": 60
    },
    {
      "network": "Larry Ellison",
      "MAU": 47
    },
    {
      "network": "Paul Allen",
      "MAU": 28
    },

    {
      "network": "Warren Buffet",
      "MAU": 25
    },
    {
      "network": "Kaal Albreth",
      "MAU": 20
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 20
    },
    {
      "network": "S watson",
      "MAU": 20
    },
    {
      "network": "Masayoshi Son",
      "MAU": 19.4
    },
    {
      "network": "Michele Dell",
      "MAU": 19.1
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 16.1
    },
    {
      "network": "John Watson",
      "MAU": 15
    },
    {
      "network": "Alice Watson",
      "MAU": 15
    },
    {
      "network": "Helen Watson",
      "MAU": 14
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 10
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 8
    },
    {
      "network": "Carlos Slim",
      "MAU": 8
    },
    {
      "network": "Bernard Arnault",
      "MAU": 7
    },
    {
      "network": "Li Ka-shing",
      "MAU": 6
    },
    {
      "network": "Amancio Ortega",
      "MAU": 3
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 3
    },
    {
      "network": "David Thomson",
      "MAU": 2.3
    },
    {
      "network": "Anil Ambani",
      "MAU": 2
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 1.9
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 2
    },
    {
      "network": "Karl Albrecht",
      "MAU": 1.4
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 1.2
    },
    {
      "network": "Theo Albrecht",
      "MAU": 1.2
    },
    {
      "network": "Eike Batista",
      "MAU": 1.2
    },
    {
      "network": "Christy Walton",
      "MAU": 1
    },
    {
      "network": "Stefan Persson",
      "MAU": 1
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 1
    },
    {
      "network": "David Koch",
      "MAU": 1
    },
    {
      "network": "Charles Koch",
      "MAU": 1
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 1
    },
    {
      "network": "Jeff Bezos",
      "MAU": 1
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 1
    },
    {
      "network": "Larry Page",
      "MAU": 1
    },
    {
      "network": "Elon Musk",
      "MAU": 1
    },
    {
      "network": "Yasin Ansari",
      "MAU": 1
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 1
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 1
    },
    {
      "network": "Ajfar Sk",
      "MAU": 1
    }
  ],
  "2004":  [
    {
      "network": "Bill Gates",
      "MAU": 46.6
    },
    {
      "network": "Larry Ellison",
      "MAU": 0
    },
    {
      "network": "Paul Allen",
      "MAU": 21
    },

    {
      "network": "Warren Buffet",
      "MAU": 42.9
    },
    {
      "network": "Kaal Albreth",
      "MAU": 23
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 21.5
    },
    {
      "network": "S watson",
      "MAU": 20
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 19.1
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 16.1
    },
    {
      "network": "John Watson",
      "MAU": 20
    },
    {
      "network": "Alice Watson",
      "MAU": 20
    },
    {
      "network": "Helen Watson",
      "MAU": 20
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 0
    },
    {
      "network": "Bernard Arnault",
      "MAU": 0
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 0
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 0
    },
    {
      "network": "Jeff Bezos",
      "MAU": 0
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2005":  [
    {
      "network": "Bill Gates",
      "MAU": 46.5
    },
    {
      "network": "Larry Ellison",
      "MAU": 18.4
    },
    {
      "network": "Paul Allen",
      "MAU": 21
    },

    {
      "network": "Warren Buffet",
      "MAU": 44
    },
    {
      "network": "Kaal Albreth",
      "MAU": 18.5
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 23.7
    },
    {
      "network": "S watson",
      "MAU": 18.3
    },
    {
      "network": "Masayoshi Son",
      "MAU": 19.4
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 25
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 23
    },
    {
      "network": "Carlos Slim",
      "MAU": 23.8
    },
    {
      "network": "Bernard Arnault",
      "MAU": 0
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 0
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 0
    },
    {
      "network": "Jeff Bezos",
      "MAU": 0
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2006":  [
    {
      "network": "Bill Gates",
      "MAU": 52
    },
    {
      "network": "Larry Ellison",
      "MAU": 47
    },
    {
      "network": "Paul Allen",
      "MAU": 22
    },

    {
      "network": "Warren Buffet",
      "MAU": 42
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 20
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 18.8
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 23.5
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 28
    },
    {
      "network": "Carlos Slim",
      "MAU": 30
    },
    {
      "network": "Bernard Arnault",
      "MAU": 21
    },
    {
      "network": "Li Ka-shing",
      "MAU": 19.6
    },
    {
      "network": "Amancio Ortega",
      "MAU": 0
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 0
    },
    {
      "network": "Jeff Bezos",
      "MAU": 0
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2007":  [
    {
      "network": "Bill Gates",
      "MAU": 56
    },
    {
      "network": "Larry Ellison",
      "MAU": 0
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 52
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 32
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 33
    },
    {
      "network": "Carlos Slim",
      "MAU": 49
    },
    {
      "network": "Bernard Arnault",
      "MAU": 26
    },
    {
      "network": "Li Ka-shing",
      "MAU": 23
    },
    {
      "network": "Amancio Ortega",
      "MAU": 24
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 26.5
    },
    {
      "network": "David Thomson",
      "MAU": 22
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 0
    },
    {
      "network": "Jeff Bezos",
      "MAU": 0
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2008": [
    {
      "network": "Bill Gates",
      "MAU": 58
    },
    {
      "network": "Larry Ellison",
      "MAU": 0
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 62
    },
    {
      "network": "Kaal Albreth",
      "MAU": 27
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 45
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 60
    },
    {
      "network": "Bernard Arnault",
      "MAU": 0
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 0
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 42
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 30
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 28
    },
    {
      "network": "Karl Albrecht",
      "MAU": 27
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 43
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 0
    },
    {
      "network": "Jeff Bezos",
      "MAU": 0
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2009": [
    {
      "network": "Bill Gates",
      "MAU": 40
    },
    {
      "network": "Larry Ellison",
      "MAU": 22.5
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 37
    },
    {
      "network": "Kaal Albreth",
      "MAU": 21
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 20
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 19.3
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 22
    },
    {
      "network": "Carlos Slim",
      "MAU": 0
    },
    {
      "network": "Bernard Arnault",
      "MAU": 0
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 18
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 19.5
    },
    {
      "network": "Theo Albrecht",
      "MAU": 18.8
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 0
    },
    {
      "network": "Jeff Bezos",
      "MAU": 0
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2010": [
    {
      "network": "Bill Gates",
      "MAU": 53
    },
    {
      "network": "Larry Ellison",
      "MAU": 28
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 47
    },
    {
      "network": "Kaal Albreth",
      "MAU": 23.5
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 28.7
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 53.5
    },
    {
      "network": "Bernard Arnault",
      "MAU": 27.5
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 25
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 29
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 27
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 0
    },
    {
      "network": "Jeff Bezos",
      "MAU": 0
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2011": [
    {
      "network": "Bill Gates",
      "MAU": 56
    },
    {
      "network": "Larry Ellison",
      "MAU": 39.5
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 50
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 1
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 31
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 74
    },
    {
      "network": "Bernard Arnault",
      "MAU": 41
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 31
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 27
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 30
    },
    {
      "network": "Christy Walton",
      "MAU": 26
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 0
    },
    {
      "network": "Jeff Bezos",
      "MAU": 0
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2012": [
    {
      "network": "Bill Gates",
      "MAU": 61
    },
    {
      "network": "Larry Ellison",
      "MAU": 36
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 44
    },
    {
      "network": "Kaal Albreth",
      "MAU": 25
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 69
    },
    {
      "network": "Bernard Arnault",
      "MAU": 41
    },
    {
      "network": "Li Ka-shing",
      "MAU": 25.5
    },
    {
      "network": "Amancio Ortega",
      "MAU": 37
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 30
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 30
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 0
    },
    {
      "network": "Jeff Bezos",
      "MAU": 0
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2013": [
    {
      "network": "Bill Gates",
      "MAU": 67
    },
    {
      "network": "Larry Ellison",
      "MAU": 43
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 53.5
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 0
    },
    {
      "network": "Bernard Arnault",
      "MAU": 29
    },
    {
      "network": "Li Ka-shing",
      "MAU": 31
    },
    {
      "network": "Amancio Ortega",
      "MAU": 57
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 30
    },
    {
      "network": "David Koch",
      "MAU": 34
    },
    {
      "network": "Charles Koch",
      "MAU": 34
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 0
    },
    {
      "network": "Jeff Bezos",
      "MAU": 0
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2014": [
    {
      "network": "Bill Gates",
      "MAU": 76
    },
    {
      "network": "Larry Ellison",
      "MAU": 48
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 58
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 30
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 72
    },
    {
      "network": "Bernard Arnault",
      "MAU": 0
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 64
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 38
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 36
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 40
    },
    {
      "network": "Charles Koch",
      "MAU": 40
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 0
    },
    {
      "network": "Jeff Bezos",
      "MAU": 0
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2015": [
    {
      "network": "Bill Gates",
      "MAU": 80
    },
    {
      "network": "Larry Ellison",
      "MAU": 54
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 72
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 77
    },
    {
      "network": "Bernard Arnault",
      "MAU": 0
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 64
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 40
    },
    {
      "network": "Christy Walton",
      "MAU": 41.7
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 40.1
    },
    {
      "network": "David Koch",
      "MAU": 43
    },
    {
      "network": "Charles Koch",
      "MAU": 43
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 0
    },
    {
      "network": "Jeff Bezos",
      "MAU": 0
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2016": [
    {
      "network": "Bill Gates",
      "MAU": 75
    },
    {
      "network": "Larry Ellison",
      "MAU": 43
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 60
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 50
    },
    {
      "network": "Bernard Arnault",
      "MAU": 0
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 67
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 39
    },
    {
      "network": "Charles Koch",
      "MAU": 39
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 44
    },
    {
      "network": "Jeff Bezos",
      "MAU": 45.5
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 40
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2017": [
    {
      "network": "Bill Gates",
      "MAU": 86
    },
    {
      "network": "Larry Ellison",
      "MAU": 52
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 75
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 54
    },
    {
      "network": "Bernard Arnault",
      "MAU": 0
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 72
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 48
    },
    {
      "network": "Charles Koch",
      "MAU": 48
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 56
    },
    {
      "network": "Jeff Bezos",
      "MAU": 72
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 47
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2018": [
    {
      "network": "Bill Gates",
      "MAU": 90
    },
    {
      "network": "Larry Ellison",
      "MAU": 58
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 84
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 67
    },
    {
      "network": "Bernard Arnault",
      "MAU": 72
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 70
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 60
    },
    {
      "network": "Charles Koch",
      "MAU": 60
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 71
    },
    {
      "network": "Jeff Bezos",
      "MAU": 112
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2019": [
    {
      "network": "Bill Gates",
      "MAU": 96
    },
    {
      "network": "Larry Ellison",
      "MAU": 62
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 82
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 64
    },
    {
      "network": "Bernard Arnault",
      "MAU": 76
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 72
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 62
    },
    {
      "network": "Jeff Bezos",
      "MAU": 132
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 55
    },
    {
      "network": "Larry Page",
      "MAU": 50
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2020": [
    {
      "network": "Bill Gates",
      "MAU": 98
    },
    {
      "network": "Larry Ellison",
      "MAU": 59
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 67
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 54
    },
    {
      "network": "Alice Watson",
      "MAU": 54
    },
    {
      "network": "Helen Watson",
      "MAU": 54
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 67
    },
    {
      "network": "Bernard Arnault",
      "MAU": 76
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 55
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 54
    },
    {
      "network": "Jeff Bezos",
      "MAU": 113
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 0
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2021": [
    {
      "network": "Bill Gates",
      "MAU": 134
    },
    {
      "network": "Larry Ellison",
      "MAU": 80
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 88
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 67
    },
    {
      "network": "Bernard Arnault",
      "MAU": 116
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 88
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 60
    },
    {
      "network": "Charles Koch",
      "MAU": 60
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 71
    },
    {
      "network": "Jeff Bezos",
      "MAU": 185
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 83.5
    },
    {
      "network": "Elon Musk",
      "MAU": 200
    },
    {
      "network": "Yasin Ansari",
      "MAU": 0
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 0
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2022": [
    {
      "network": "Bill Gates",
      "MAU": 130
    },
    {
      "network": "Larry Ellison",
      "MAU": 77
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 80
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 68
    },
    {
      "network": "Bernard Arnault",
      "MAU": 70
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 70
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 60
    },
    {
      "network": "Charles Koch",
      "MAU": 60
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 100
    },
    {
      "network": "Jeff Bezos",
      "MAU": 200
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 210
    },
    {
      "network": "Yasin Ansari",
      "MAU": 76
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 70
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 0
    },
    {
      "network": "Ajfar Sk",
      "MAU": 0
    }
  ],
  "2023": [
    {
      "network": "Bill Gates",
      "MAU": 117
    },
    {
      "network": "Larry Ellison",
      "MAU": 70
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 77
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 79
    },
    {
      "network": "Bernard Arnault",
      "MAU": 78
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 0
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 55
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 112
    },
    {
      "network": "Jeff Bezos",
      "MAU": 201
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 225
    },
    {
      "network": "Yasin Ansari",
      "MAU": 83
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 88
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 76
    },
    {
      "network": "Ajfar Sk",
      "MAU": 60
    }
  ],
  "2024": [
    {
      "network": "Bill Gates",
      "MAU": 100
    },
    {
      "network": "Larry Ellison",
      "MAU": 113
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 90
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 77
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 67
    },
    {
      "network": "Bernard Arnault",
      "MAU": 0
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 0
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 116
    },
    {
      "network": "Jeff Bezos",
      "MAU": 210
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 0
    },
    {
      "network": "Elon Musk",
      "MAU": 213
    },
    {
      "network": "Yasin Ansari",
      "MAU": 130
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 125
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 111
    },
    {
      "network": "Ajfar Sk",
      "MAU": 90
    }
  ],
  "2025": [
    {
      "network": "Bill Gates",
      "MAU": 113
    },
    {
      "network": "Larry Ellison",
      "MAU": 89
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 77
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 0
    },
    {
      "network": "Bernard Arnault",
      "MAU": 72
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 0
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 167
    },
    {
      "network": "Jeff Bezos",
      "MAU": 180
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 115
    },
    {
      "network": "Elon Musk",
      "MAU": 200
    },
    {
      "network": "Yasin Ansari",
      "MAU": 177
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 179
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 150
    },
    {
      "network": "Ajfar Sk",
      "MAU": 124
    }
  ],
  "2026": [
    {
      "network": "Bill Gates",
      "MAU": 113
    },
    {
      "network": "Larry Ellison",
      "MAU": 123
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 0
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 0
    },
    {
      "network": "Bernard Arnault",
      "MAU": 0
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 70
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 60
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 150
    },
    {
      "network": "Jeff Bezos",
      "MAU": 188
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 123
    },
    {
      "network": "Elon Musk",
      "MAU": 240
    },
    {
      "network": "Yasin Ansari",
      "MAU": 230
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 200
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 240
    },
    {
      "network": "Ajfar Sk",
      "MAU": 120
    }
  ],
  "2027": [
    {
      "network": "Bill Gates",
      "MAU": 140
    },
    {
      "network": "Larry Ellison",
      "MAU": 127
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 0
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 67
    },
    {
      "network": "Bernard Arnault",
      "MAU": 0
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 0
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 60
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 198
    },
    {
      "network": "Jeff Bezos",
      "MAU": 219
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 167
    },
    {
      "network": "Elon Musk",
      "MAU": 200
    },
    {
      "network": "Yasin Ansari",
      "MAU": 230
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 219
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 200
    },
    {
      "network": "Ajfar Sk",
      "MAU": 167
    }
  ],
  "2028": [
    {
      "network": "Bill Gates",
      "MAU": 130
    },
    {
      "network": "Larry Ellison",
      "MAU": 122
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 0
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 0
    },
    {
      "network": "Bernard Arnault",
      "MAU": 0
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 70
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 60
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 200
    },
    {
      "network": "Jeff Bezos",
      "MAU": 230
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 166
    },
    {
      "network": "Elon Musk",
      "MAU": 214
    },
    {
      "network": "Yasin Ansari",
      "MAU": 300
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 310
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 299
    },
    {
      "network": "Ajfar Sk",
      "MAU": 156
    }
  ],
  "2029": [
    {
      "network": "Bill Gates",
      "MAU": 156
    },
    {
      "network": "Larry Ellison",
      "MAU": 158
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 0
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 0
    },
    {
      "network": "Bernard Arnault",
      "MAU": 72
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 0
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 133
    },
    {
      "network": "Charles Koch",
      "MAU": 60
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 123
    },
    {
      "network": "Jeff Bezos",
      "MAU": 150
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 200
    },
    {
      "network": "Larry Page",
      "MAU": 210
    },
    {
      "network": "Elon Musk",
      "MAU": 260
    },
    {
      "network": "Yasin Ansari",
      "MAU": 370
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 338
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 367
    },
    {
      "network": "Ajfar Sk",
      "MAU": 210
    }
  ],
  "2030": [
    {
      "network": "Bill Gates",
      "MAU": 177
    },
    {
      "network": "Larry Ellison",
      "MAU": 233
    },
    {
      "network": "Paul Allen",
      "MAU": 0
    },

    {
      "network": "Warren Buffet",
      "MAU": 0
    },
    {
      "network": "Kaal Albreth",
      "MAU": 0
    },
    {
      "network": "Al Walled Bin Talal",
      "MAU": 0
    },
    {
      "network": "S watson",
      "MAU": 0
    },
    {
      "network": "Masayoshi Son",
      "MAU": 0
    },
    {
      "network": "Michele Dell",
      "MAU": 0
    },
    {
      "network": "Kenneth Roy Thomson",
      "MAU": 0
    },
    {
      "network": "John Watson",
      "MAU": 0
    },
    {
      "network": "Alice Watson",
      "MAU": 0
    },
    {
      "network": "Helen Watson",
      "MAU": 0
    },
    {
      "network": "Laxmi Mittal",
      "MAU": 0
    },
    {
      "network": "Ingvar Kamprad",
      "MAU": 0
    },
    {
      "network": "Carlos Slim",
      "MAU": 0
    },
    {
      "network": "Bernard Arnault",
      "MAU": 0
    },
    {
      "network": "Li Ka-shing",
      "MAU": 0
    },
    {
      "network": "Amancio Ortega",
      "MAU": 170
    },
    {
      "network": "Sheldon Adelson",
      "MAU": 0
    },
    {
      "network": "David Thomson",
      "MAU": 0
    },
    {
      "network": "Anil Ambani",
      "MAU": 0
    },
    {
      "network": "Kushal Pal Singh",
      "MAU": 0
    },
    {
      "network": "Oleg Deripaska",
      "MAU": 0
    },
    {
      "network": "Karl Albrecht",
      "MAU": 0
    },
    {
      "network": "Mukesh Ambani",
      "MAU": 0
    },
    {
      "network": "Theo Albrecht",
      "MAU": 0
    },
    {
      "network": "Eike Batista",
      "MAU": 0
    },
    {
      "network": "Christy Walton",
      "MAU": 0
    },
    {
      "network": "Stefan Persson",
      "MAU": 0
    },
    {
      "network": "Liliane Bettencourt",
      "MAU": 0
    },
    {
      "network": "David Koch",
      "MAU": 0
    },
    {
      "network": "Charles Koch",
      "MAU": 0
    },
    {
      "network": "Mark Zuckerberg",
      "MAU": 222
    },
    {
      "network": "Jeff Bezos",
      "MAU": 233
    },
    {
      "network": "Michael Bloomberg",
      "MAU": 0
    },
    {
      "network": "Larry Page",
      "MAU": 280
    },
    {
      "network": "Elon Musk",
      "MAU": 277
    },
    {
      "network": "Yasin Ansari",
      "MAU": 470
    },
    {
      "network": "Ejaz Mahmood",
      "MAU": 400
    },
    {
      "network": "Sharay Ahmed",
      "MAU": 334
    },
    {
      "network": "Ajfar Sk",
      "MAU": 333
    }
  ],

}

chart.data = JSON.parse(JSON.stringify(allData[year]));
categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

series.events.on("inited", function() {
  setTimeout(function() {
    playButton.isActive = true; // this          starts interval
  }, 2000)
})
