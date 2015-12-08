if (Meteor.isClient) {
Meteor.startup(function(){
var w = 500;
var h = 500;
var dataset = {
        nodes: [
          { name: "", id:0, x: w/2, y:h/2, fixed:true, radius:15 },
                { name: "Orange", id:1, x:w/2, y:100, fixed: true, radius:40 },
                { name: "Green", id:2, x:w/12*3, y:h/6*2, fixed: true, radius:10 },
                { name: "Red", id:3, x:w/4*3, y:h/6*4, fixed: true, radius:10 },
                { name: "Purple", id:4, x:w/4, y:h/4*3, fixed: true, radius:40 },
                { name: "Brown", id:5, x:w-w/12*4, y:h/6*2, fixed: true, radius:10 }          
        ],
        links: [
                { source: 0, target: 0 },
                { source: 1, target: 0 },
                { source: 2, target: 0 },
                { source: 3, target: 0 },
                { source: 4, target: 0 },
                { source: 5, target: 0 }
        ]
};

var force = d3.layout.force()
                     .nodes(dataset.nodes)
                     .links(dataset.links)
                     .size([w, h])
                     .start();

var colors = d3.scale.category10();

//Create SVG element
var svg = d3.select("svg")
            .attr("width", w)
            .attr("height", h);

var gnodes = svg.selectAll("g.gnode")
             .data(dataset.nodes)
             .enter()
             .append("g")
             .classed("gnode", true);

var node = gnodes.append("circle")
          .attr("class", "fnode")
          .attr("r", function(d){
            return d.radius
          })
          .attr("y", function(d){
            if(["Orange", "Brown", "Green"].indexOf(d.name) >=0 ){
              return -(d.radius + 10);
            } else {
              return d.radius + 20;
            }
          })
          .style("fill", "#555555")           

// Append the labels to each group
var labels = gnodes
          .append("text")
          .text(function(d) { return d.name; })
          .attr("text-anchor", "middle")
          .attr("y", function(d){
            if(["Orange", "Brown", "Green"].indexOf(d.name) >=0 ){
              return -(d.radius + 10);
            } else {
              return d.radius + 20;
            }
          });

var link = svg.selectAll("line")
            .data(dataset.links)
            .enter()
            .append("svg:line")
            .style({stroke:"#555555", "stroke-width":2});

    
        
  force.on("tick", function() {

    link.attr("x1", function(d) { return d.source.x; })
         .attr("y1", function(d) { return d.source.y; })
         .attr("x2", function(d) { return d.target.x; })
         .attr("y2", function(d) { return d.target.y; });
    
    gnodes.attr("transform", function(d){
      return 'translate(' + [d.x, d.y] + ')';
    })
        
  });

})

}
