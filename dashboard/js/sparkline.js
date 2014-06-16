(function(){
        
      d3.sparkline = function(){
        var  sparkline_w = 411,
             sparkline_h = 25,
             id = sparklineId,
             title = sparklineTitle,
             current = sparklineCurrent,
             statistic = sparklineStatistic;
         
        function sparkline(g){
           g.each(function(d, i) {

            //var statisticz = statistic.call(this, d, i).slice().sort(d3.descending),
            var  statisticz = statistic.call(this, d, i),
                 g = d3.select(this);
                 
            var sparkline_x = d3.scale.linear().range([0, sparkline_w/20*13]).domain([0,statisticz.length-1]),
                sparkline_y = d3.scale.linear().range([sparkline_h, 0]).domain([d3.max(statisticz),d3.min(statisticz)]);
               //sparkline_y = d3.scale.linear().range([sparkline_h, 0]).domain([statisticz[0],statisticz[12]]);           
             
            var trend = g.append("g")
                  .attr("class","trend")
                  .attr("id",id)
                  .attr("title",title)
                  .attr("width", sparkline_w)
                  .attr("height", sparkline_h * 2);
            
            trend.append("rect")
                .attr("width",sparkline_w)
                .attr("height",sparkline_h*2)
                .attr("class","trend_rect")
                .style("fill","white")
                .style("opacity",0.001);
                
            trend.append("text")
                .text(title)
                .attr("class","sparkline_title")
                .attr("y", 6)
                .attr("dy", ".71em")
               .style("text-anchor", "start");
               
            trend.append("text")
                .text(current)
                .attr("class","sparkline_current")
                .attr("transform","translate("+(sparkline_w/20*14)+","+(sparkline_h *2) +")")
                .style("display","none")
                .attr("y", 6)
                .attr("dy", "-.25em")
                .style("text-anchor", "start");
                
           var line = d3.svg.line()
                .x(function(d,i) { return sparkline_x(i); })
                .y(function(d) { return sparkline_y(d); })  
                
            var path = trend.append("path")
                .attr("class","trend_line")
                .attr("d", line(statisticz))
                .attr("transform","translate(0,"+(sparkline_h)+")");
            
            var f_2012 = statisticz[12];
            
            var circle = trend.append("circle")
                .attr("cx",sparkline_w/20*13)
                .attr("cy",(sparkline_y(f_2012)))
                .attr("r",7)
                .attr("class","trend_end_point")
                .style("fill","white")
                .style("display","none")
                .attr("transform","translate(0,"+(sparkline_h)+")");
             
            var circle = trend.append("circle")
                .attr("cx",sparkline_w/20*13)
                .attr("cy",(sparkline_y(f_2012)))
                .attr("r",4)
                .attr("class","trend_end_point")
                .style("display","none")
                .attr("transform","translate(0,"+(sparkline_h)+")");
              
            trend.append("rect")
                .attr("class","cover")
                .attr("width",sparkline_w/20*13)
                .attr("height",sparkline_h+4)
                .attr("x",0)
                .style("fill","white")
                .style("stroke","white")
                .attr("transform","translate(0,"+(sparkline_h-2)+")");
              
             d3.selectAll(".cover").transition().duration(1000).attr("x",sparkline_w/20*13+1).attr("width",-1);
              
             d3.selectAll(".trend_end_point").transition().delay(1000).style("display","block");
             
             d3.selectAll(".sparkline_current").transition().delay(1000).style("display","block");
              
             d3.selectAll(".trend_line").attr("stroke-width",.5);
                  
              });  
              
                //x-axis to key foster care trend
                /***************temporary************************/
            var xScale = d3.scale.linear().range([0, sparkline_w/20*13]).domain([2000,2012]);
            
            var formatValue = d3.format("");
            
            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .tickFormat(function(d) { return formatValue(d).replace('20', '\''); }) // format year 2012 -> '12
                //.tickFormat(d3.format(""))
                .ticks(6);
                    
             d3.select("#svg_trend")
                .append("g")
                .attr("class", "sparkline_axis")
                .attr("transform", "translate("+margin_t.left+","+ ((height_t + margin_t.top + margin_t.bottom)*5 + 20) +")") // note: not define height_t, margin_t variables
                .call(xAxis); 
             
             var lines = new Array();
             
             for(var j = 0; j<13; j++){
                lines[j] = (sparkline_w/20*13)/12 * j;
             }
             
             
             
             //y-axis lines
             d3.select("#svg_trend")
                 .append("g")
                 .attr("class", "sparkline_lines")
                 .selectAll("line")
                 .data(lines).enter()
                 .append("line")
                 .attr("id",function(d, i){ return "y_lines_" + i;})
                 .attr("x1",function(d){ return d; })
                 .attr("y1",0)
                 .attr("x2",function(d){ return d; })
                 .attr("y2",(height_t + margin_t.top + margin_t.bottom)*5 + 20)
                 .style("stroke","#aaa")
                 .style("stroke-width",.5)
                 .style("stroke-opacity",.5)
                 .attr("transform", "translate("+(margin_t.left)+",0)");
             /**************************************************/    
        }        
              
        sparkline.sparkline_w = function(_) {
            if (!arguments.length) return sparkline_w;
            sparkline_w = _;
            return sparkline;
        }
                
        sparkline.sparkline_h = function(_) {
            if (!arguments.length) return sparkline_h;
            sparkline_h = _;
            return sparkline;
        }
        
        sparkline.id = function(_) {
            if (!arguments.length) return id;
            id = _;
            return sparkline; 
        
        };
        
        sparkline.title = function(_) {
            if (!arguments.length) return title;
            title = _;
            return sparkline; 
        
        };
        
        sparkline.current = function(_) {
            if (!arguments.length) return current;
            current = _;
            return sparkline; 
        
        };
        
        sparkline.statistic = function(_) {
            if (!arguments.length) return statistic;
            statistic = _;
            return sparkline; 
        
        };
        
        sparkline.frequency = function(_) {
            if (!arguments.length) return frequency;
            frequency = _;
            return sparkline; 
        
        };
        
        sparkline.id = function(_) {
            if (!arguments.length) return id;
            id = _;
            return sparkline; 
        
        };
        
           return sparkline;  
        };
        
        function sparklineLength(d) {
            return d;
        }
        
        function sparklineId(d){
            return d.id;
        }
        
        function sparklineTitle(d){
            return d.title;
        }
        
        function sparklineCurrent(d){
            return d.current;
        }
        
        function sparklineStatistic(d){
            return d.statistic;
        }
        
        function sparklineRanges(d) {
            return d.ranges;
        }
        
    })();