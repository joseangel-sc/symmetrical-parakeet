import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SingleNode: React.FC = () => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current);
      svg.append('circle')
        .attr('r', 20) // radius
        .attr('cx', 50) // x position
        .attr('cy', 500) // y position
        .style('fill', 'blue'); // color
    }
  }, []);

  return <svg ref={ref} width="100px" height="100px" />;
};

export default SingleNode;

