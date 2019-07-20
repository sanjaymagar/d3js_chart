function drawLineAreaChart(){
    data1 =[      {
        date  : '2005-02-22',        
        value : 80
      },
       {
        date  : '2006-02-23',        
        value : 101
      },
       {
        date  : '2007-03-24',        
        value : 81
      },
  {
        date  : '2009-03-25',        
        value : 32
      },
  {
        date  : '2010-08-26',        
        value : 88
      },
  {
        date  : '2011-03-26',        
        value : 88
      },
  {
        date  : '2016-03-27',        
        value : 45
      }];

function drawLineChart(data)
{
    
   
    
// set the dimensions and margins of the graph
var margin = {};
    
    
    var breakPoint = 768;
      var $container = $('#lineChart');
       var winWidth = $container.outerWidth();
        margin.top = 20;
       margin.right = winWidth < breakPoint ? 0 : 20;
       margin.left = winWidth < breakPoint ? 0 : 30;
       margin.bottom = 50;
      var width = winWidth - margin.left - margin.right;
       var height = .4 * width;

   
    
// parse the date / time
var parseTime = d3.timeParse("%Y-%m-%d");

// set the ranges
var x = d3.scaleTime().range([43, width-43]);
var y = d3.scaleLinear().range([height, 0]);

// define the area
var area = d3.area()
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y(d.value); });

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });



var svg = d3.select("#lineChartSVG")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)  
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "rgb(251, 252, 252)")
    .attr("transform", "translate(-" + margin.left + ",-" + margin.top + ")");

//Prepare data
 data = data.map( function( d ) {
      d.date = parseTime( d.date );      
      return d;
    } );
//Prepare start data for animation  
startData = data.map( function( d ) {
        return {
          date  : d.date,
          value : 0
        };
      } ),


  // scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })+20]);//tutaj dodaje 20 żeby był odstęp od góry

  // add the area
    svg.append("path")
       .data([startData])
       .attr("class", "lineChart--area")
       .attr("d", area)
        .transition()
        .duration( 1500 )
        .attrTween( 'd', tween( data, area ) );





  // add the valueline path.
  svg.append("path")
      .data([startData])
      .attr("class", "lineChart--areaLine")
      .attr("d", valueline)
      .transition()
        .duration( 1500 )
        .delay( 1500 / 2 )
        .attrTween( 'd', tween( data, valueline ) )
        .on( 'end', function() {
                  drawCircles( data );
                } );

  // add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
      
   
  // add the X gridlines
  svg.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(make_x_gridlines()
          .tickSize(-height)
          .tickFormat("")
      )

  // add the Y gridlines
  svg.append("g")			
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
      )

 
      
      
        var detailWidth  = 80,
        detailHeight = 49,
        detailMargin = 5;
      
       function drawCircles( data ) {
        circleContainer = svg.append( 'g' );

        data.forEach( function( datum, index ) {
          drawCircle( datum, index );
        } );
      }
      
          function drawCircle( datum, index ) {
      circleContainer.datum( datum )
                    .append( 'circle' )
                    .attr( 'class', 'lineChart--circle' )
                    .attr( 'r', 0 )
                    .attr(
                      'cx',
                      function( d ) {
                        return x( d.date ) ;
                      }
                    )
                    .attr(
                      'cy',
                      function( d ) {
                        return y( d.value );
                      }
                    )
                    .on( 'mouseenter', function( d ) {
                      d3.select( this )
                        .attr(
                          'class',
                          'lineChart--circle lineChart--circle__highlighted' 
                        )
                        .attr( 'r', 7 );
                      
                        d.active = true;
                        
                        showCircleDetail( d );
                    } )
                    .on( 'mouseout', function( d ) {
                      d3.select( this )
                        .attr(
                          'class',
                          'lineChart--circle' 
                        )
                        .attr( 'r', 6 );
                      
                      if ( d.active ) {
                        hideCircleDetails();
                        
                        d.active = false;
                      }
                    } )
                    .on( 'click touch', function( d ) {
                      if ( d.active ) {
                        showCircleDetail( d )
                      } else {
                        hideCircleDetails();
                      }
                    } )
                    .transition()
                    .delay( 1500 / 10 * index )
                    .attr( 'r', 6 );
    }
    
   
      
       function hideCircleDetails() {
      circleContainer.selectAll( '.lineChart--bubble' )
                      .remove();
    }
    var formatTime = d3.timeFormat("%Y-%m-%d");
    
    function showCircleDetail( data ) {
      var details = circleContainer.append( 'g' )
                        .attr( 'class', 'lineChart--bubble' )
                        .attr(
                          'transform',
                          function() {
                            var result = 'translate(';
                            
                            result += x( data.date )-detailWidth/2;
                            result += ', ';
                            result += y( data.value ) - detailHeight - detailMargin;
                            result += ')';
                            
                            return result;
                          }
                        );
      
      details.append( 'path' )
              .attr( 'd', 'm 2.3282035,0.4498068 c -1.3388283,0 -2.4241631,1.084582 -2.4241631,2.42342 l 0,36.0962242 c 0,1.338418 1.08392804,2.42342 2.4248475,2.42342 l 33.4616981,0 c 3.69124,3.008365 0.04659,-0.04956 3.709414,3.072089 3.570983,-3.048454 0.0041,-0.02624 3.637879,-3.072089 l 33.529241,0 c 1.341411,0 2.42884,-1.084582 2.42884,-2.42342 l 0,-36.0962242 c 0,-1.338418 -1.089345,-2.42342 -2.424164,-2.42342 l -74.3435925,0 z m 0,0' )
              .attr( 'width', detailWidth )
              .attr( 'height', detailHeight );
      
      var text = details.append( 'text' )
                        .attr( 'class', 'lineChart--bubble--text' );
      
      text.append( 'tspan' )
          .attr( 'class', 'lineChart--bubble--label' )
          .attr( 'x', detailWidth / 2 )
          .attr( 'y', detailHeight / 3 )
          .attr( 'text-anchor', 'middle' )
          .text( formatTime(data.date) );
      
      text.append( 'tspan' )
          .attr( 'class', 'lineChart--bubble--value' )
          .attr( 'x', detailWidth / 2 )
          .attr( 'y', detailHeight / 4 * 2.8 )
          .attr( 'text-anchor', 'middle' )
          .text( data.value );
    }
     
    //help functions
     function tween( b, callback ) {
      return function( a ) {
        var i = d3.interpolateArray( a, b );

        return function( t ) {
          return callback( i ( t ) );
        };
      };
    }  
    
        // gridlines in x axis function
    function make_x_gridlines() {		
        return d3.axisBottom(x)
            .ticks(20)
    }

    // gridlines in y axis function
    function make_y_gridlines() {		
        return d3.axisLeft(y)
            .ticks(20)
    }  
    
}

drawLineChart(data1);
}