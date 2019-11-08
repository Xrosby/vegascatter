function setScatterPlot(year) {



    conditionString = "datum.year ==" + year
   
    var scatterElement = {
        $schema: "https://vega.github.io/schema/vega-lite/v4.json",
        repeat: {
            row: ["avgInc", "homelessPercent", "crimePercent", "unemployedPercent"],
            column: ["avgInc", "homelessPercent", "crimePercent", "unemployedPercent"]
        },
        spec: {
            width: 500,
            height: 500,
            data: {
                url: "data.json"
            },
            selection: "",
            mark: "point",
            "calculate": "'https://en.wikipedia.org/wiki/' + datum.State",
            "as": "url",
            description: "State",
            selection: {
                brush: {
                    type: "interval",
                    resolve: "union",
                    on: "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
                    translate: "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
                    zoom: "wheel![event.shiftKey]"
                },
                grid: {
                    type: "interval",
                    resolve: "global",
                    bind: "scales",
                    translate: "[mousedown[!event.shiftKey], window:mouseup] > window:mousemove!",
                    zoom: "wheel![!event.shiftKey]"
                }
            },
            encoding: {
                "tooltip": {
                    "field": "State",
                    "type": "nominal"
                },
                "href": {
                    "field": "url",
                    "type": "nominal"
                },
                x: {
                    "field": {
                        "repeat": "column"
                    },
                    "type": "quantitative"
                },
                y: {
                    field: {
                        "repeat": "row"
                    },
                    type: "quantitative",
                    axis: {
                        "minExtent": 30
                    }
                },
                color: {
                    condition: {
                        field: "State",
                        test: conditionString
                    },
                    value: "#ffffff"
                }
            }
        }
    }
   

    vegaEmbed("#scatter", scatterElement);

}

// Assign the specification to a local variable vlSpec.
var vlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    data: {
        url: "data.json"
    },

    mark: 'bar',
    encoding: {
        y: {
            field: 'State',
            type: 'nominal'
        },
        x: {
            field: 'avgInc',
            type: 'quantitative',
            sort: "ascending",
            axis: {
                title: 'Average income'
            }
        }
    }
};

// Embed the visualization in the container with id `vis`
//vegaEmbed('#vis', vlSpec);