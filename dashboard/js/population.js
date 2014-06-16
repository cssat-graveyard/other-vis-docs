    (function(){
        
      d3.population = function(){
        var  population_w = 133,
             population_h = 80,
             padding = 10,
             id = populationId,
             title = populationTitle,
             statistic = populationStatistic,
             peak = populationPeak,
             nadir = populationNadir,
             formatAsPercentage = d3.format(".0%"),
             formatAsM = d3.format("M");
         
        function population(g){
           g.each(function(d, i) {

            var g = d3.select(this);
             
            var yScale = d3.scale.linear()
                         .domain([nadir.call(this, d), peak.call(this, d)])
                         .range([population_h - padding, padding]);

            var yAxis = d3.svg.axis()
                              .scale(yScale)
                              .orient("left")
                              .ticks(0);
            
            yAxis.tickFormat(formatAsPercentage);       
                   
            var svg = g.append("svg")
                     .attr("width", population_w)
                     .attr("height", population_h)
                     .attr("id",id)
                     .append("g");
            
            svg.append("rect")
                .attr("width",population_w)
                .attr("height",population_h)
                .attr("class","population_rect")
                .style("fill","white")
                .style("opacity",.005);
                       
            var axis = svg.append("g")
                    .attr("class", "population_axis")
                    .attr("transform", "translate(55,0)");
                
            axis.call(yAxis);
            
            axis.append("text")
                .attr("class","text_axis")
                .text(function(){
                    if(id.call(this, d) == "population_1" || id.call(this, d) == "population_2" || id.call(this, d) == "population_3"){
                        return formatAsPercentage(peak.call(this, d));
                    }else{
                        return peak.call(this, d) + "M";
                    }
                })
                .attr("transform", "translate(-10,0)")
                .attr("y", 9)
                .attr("dy", ".71em")
                .style("text-anchor", "end");
                
            axis.append("text")
                .attr("class","text_axis")
                .text(function(){
                    if(id.call(this, d) == "population_1" || id.call(this, d) == "population_2" || id.call(this, d) == "population_3"){
                        return formatAsPercentage(nadir.call(this, d));
                    }else{
                        return nadir.call(this, d) + "M";
                    }
                })
                .attr("y", 11)
                .style("text-anchor", "end")
                .attr("transform", "translate(-10," + ( population_h - 2 * padding ) + ")");
                
            svg.append("circle")
                .attr("class","circle_population_background")
                .attr("r",7)
                .attr("cx",55)
                .attr("cy",yScale(nadir.call(this, d)))
                .style("fill","white")
                .transition()
                .duration(500)
                .attr("cy",yScale(statistic.call(this, d)));
               //.attr("transform", "translate(0," + padding + ")");
                
            svg.append("circle")
                .attr("class","circle_population")
                .attr("r",5)
                .attr("cx",55)
                .attr("cy",yScale(nadir.call(this, d)))
                .transition()
                .duration(500)
                .attr("cy",yScale(statistic.call(this, d)));
                    
            svg.append("text")
                .attr("class","text_title")
                .text(title)
                .attr("y", 9)
                .attr("dy", ".71em")
                .style("text-anchor", "middle")
                .attr("transform", "translate(120," + ( population_h / 2 - 40 ) + ")");
                
            svg.append("text")
                .attr("class","text_statis")
                .text(function(){
                    if(id.call(this, d) == "population_1" || id.call(this, d) == "population_2" || id.call(this, d) == "population_3"){
                        return formatAsPercentage(statistic.call(this, d));
                    }else{
                        return statistic.call(this, d) + "M";
                    }
                })
                .attr("y", 3)
                .attr("dy", ".71em")
                .style("text-anchor", "middle")
                .attr("transform", "translate(120," + ( population_h / 2 ) + ")");    
             
                  });  
            }        
                  
            population.population_w = function(_) {
                if (!arguments.length) return population_w;
                population_w = _;
                return population;
            }
            
            population.population_h = function(_) {
                if (!arguments.length) return population_h;
                population_h = _;
                return population;
            }
                    
               return population;  
            };
            
                 
            function populationId(d) {
                return d.id;
            }
                    
            function populationTitle(d) {
                return d.title;
            }
                    
            function populationCurrent(d) {
                return d.current;
            }
                    
            function populationStatistic(d) {
                return d.statistic;
            }
                    
            function populationPeak(d) {
                return d.peak;
            }
                    
            function populationNadir(d) {
                return d.nadir;
            }
        
    })();