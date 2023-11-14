function init_chart(data) {
    console.log(data);
    if(!data["Business/First class"]) data["Business/First class"] = 0;
    if(!data["Economy/premium Economy"]) data["Economy/premium Economy"] = 0;

    var options = {
        title: {
            text: "Number of Tickets Per Class",
            fontSize:"16",
            fontWeight: 'bold',
            fontFamily: "Arial"

        },
        axisX: {
            gridThickness: 0
        },
        axisY: {
            gridThickness: 0,
        },
        theme: "dark1",
        backgroundColor: "transparent",
        data: [              
        {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: [
                { label: "Business/First class",  y: data["Business/First class"], color: "#00B398"  },
                { label: "Economy/premium Economy", y: data["Economy/premium Economy"], color: "#00B398"  }
            ]
        }
        ]
    };
    
    $("#chartContainer").CanvasJSChart(options);
}

const init_fleet_chart = data => {
    if(!data["Large car > 2800 CC "]) data["Large car > 2800 CC "] = 0;
    if(!data["Medium/Small car < 2800 CC "]) data["Medium/Small car < 2800 CC "] = 0;

    var options = {
        title: {
            text: "Number of vehicles per vehicle size",
            fontSize:"16",
            fontWeight: 'bold',
            fontFamily: "Arial"
        },
        axisX: {
            gridThickness: 0
        },
        axisY: {
            gridThickness: 0,
            gridColor: 10
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }]
        },
        theme: "dark1",
        backgroundColor: "transparent",
        data: [              
        {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: [
                { label: "Large car > 2800 CC ",  y: data["Large car > 2800 CC "], color: "#0072bc"  },
                { label: "Medium/Small car < 2800 CC ", y: data["Medium/Small car < 2800 CC "], color: "#0072bc"  }
            ]
        }
        ]
    };
    
    $("#chartContainer").CanvasJSChart(options);
} 
