import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';

interface DataPoint {
  year: number;
  value: number;
}

const data: DataPoint[] = [
  { year: 2014, value: 50 },
  { year: 2015, value: 120 },
  { year: 2016, value: 240 },
  { year: 2017, value: 410 },
  { year: 2018, value: 650 },
  { year: 2019, value: 980 },
  { year: 2020, value: 1420 },
  { year: 2021, value: 1950 },
  { year: 2022, value: 2650 },
  { year: 2023, value: 3500 },
  { year: 2024, value: 4600 },
];

const D3ImpactChart: React.FC = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const svgRef = useRef<SVGSVGElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            if (!entries || !entries.length) return;
            const { width } = entries[0].contentRect;
            setDimensions({ width, height: Math.min(400, Math.max(250, width * 0.5)) });
        });
        
        if (wrapperRef.current) {
            resizeObserver.observe(wrapperRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (!svgRef.current || dimensions.width === 0) return;

        const { width, height } = dimensions;
        const margin = { top: 40, right: 30, bottom: 40, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const isDark = theme === 'dark';
        const textColor = isDark ? '#e2e8f0' : '#475569';
        const gridColor = isDark ? '#334155' : '#e2e8f0';
        const primaryColor = '#0A92EF';

        // Clear previous SVG content
        d3.select(svgRef.current).selectAll("*").remove();
        
        // Remove old tooltips
        d3.select(wrapperRef.current).selectAll(".d3-tooltip").remove();

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Scales
        const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => new Date(d.year.toString())) as [Date, Date])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value) || 0])
            .range([innerHeight, 0])
            .nice();

        // Area Generator
        const area = d3.area<DataPoint>()
            .x(d => xScale(new Date(d.year.toString())))
            .y0(innerHeight)
            .y1(d => yScale(d.value))
            .curve(d3.curveMonotoneX);

        // Line Generator
        const line = d3.line<DataPoint>()
            .x(d => xScale(new Date(d.year.toString())))
            .y(d => yScale(d.value))
            .curve(d3.curveMonotoneX);

        // Grid lines
        const yAxisGrid = d3.axisLeft(yScale)
            .tickSize(-innerWidth)
            .tickFormat(() => "")
            .ticks(6);

        svg.append('g')
            .attr('class', 'y-grid')
            .call(yAxisGrid)
            .selectAll("line")
            .attr("stroke", gridColor)
            .attr("stroke-dasharray", "4,4");
        
        svg.select('.y-grid .domain').remove();

        // X Axis
        const xAxis = d3.axisBottom(xScale).ticks(d3.timeYear.every(2));
        svg.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(xAxis)
            .selectAll("text")
            .attr("fill", textColor)
            .style("font-size", "12px")
            .style("font-family", "inherit");

        // Y Axis
        const yAxis = d3.axisLeft(yScale).ticks(6);
        svg.append("g")
            .call(yAxis)
            .selectAll("text")
            .attr("fill", textColor)
            .style("font-size", "12px")
            .style("font-family", "inherit")
            .text((d: any) => d >= 1000 ? `${d/1000}k` : d);

        svg.selectAll(".domain").attr("stroke", gridColor);
        svg.selectAll(".tick line").attr("stroke", gridColor);

        // Gradient
        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", "area-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", primaryColor)
            .attr("stop-opacity", 0.5);

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", primaryColor)
            .attr("stop-opacity", 0.0);

        // Draw Area
        const pathArea = svg.append("path")
            .datum(data)
            .attr("fill", "url(#area-gradient)")
            .attr("d", area);

        // Draw Line
        const pathLine = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", primaryColor)
            .attr("stroke-width", 3)
            .attr("d", line);

        // Tooltip setup
        const tooltip = d3.select(wrapperRef.current)
            .append("div")
            .attr("class", "d3-tooltip absolute hidden bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-xl rounded-lg p-4 text-sm pointer-events-none z-10 transition-opacity duration-200")
            .style("opacity", 0);

        // Dots and interactivity
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(new Date(d.year.toString())))
            .attr("cy", d => yScale(d.value))
            .attr("r", 5)
            .attr("fill", isDark ? '#1e293b' : '#ffffff')
            .attr("stroke", primaryColor)
            .attr("stroke-width", 2)
            .style("cursor", "pointer")
            .on("mouseover", (event, d) => {
                d3.select(event.currentTarget)
                    .transition().duration(200)
                    .attr("r", 8)
                    .attr("fill", primaryColor);

                const wrapperRect = wrapperRef.current?.getBoundingClientRect();
                const wrapperLeft = wrapperRect?.left || 0;
                const wrapperTop = wrapperRect?.top || 0;
                
                // Get pointer coordinates relative to the wrapper
                const [x, y] = d3.pointer(event, wrapperRef.current);

                tooltip.transition().duration(200).style("opacity", 1);
                tooltip.html(`
                    <div class="font-bold text-gray-900 dark:text-white text-base">${d.year}</div>
                    <div class="text-primary mt-1 font-semibold">${d.value.toLocaleString()} Tonnes CO₂e</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">Cumulative Reduction</div>
                `)
                .style("left", `${x + 15}px`)
                .style("top", `${y - 40}px`)
                .classed("hidden", false);
            })
            .on("mousemove", (event) => {
                const [x, y] = d3.pointer(event, wrapperRef.current);
                tooltip
                    .style("left", `${x + 15}px`)
                    .style("top", `${y - 40}px`);
            })
            .on("mouseout", (event) => {
                d3.select(event.currentTarget)
                    .transition().duration(200)
                    .attr("r", 5)
                    .attr("fill", isDark ? '#1e293b' : '#ffffff');

                tooltip.transition().duration(200).style("opacity", 0)
                    .on("end", () => tooltip.classed("hidden", true));
            });

        // Animation on load
        const totalLength = (pathLine.node() as SVGPathElement).getTotalLength();
        
        pathLine
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(1500)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
            
        pathArea
            .style("opacity", 0)
            .transition()
            .duration(1500)
            .delay(200)
            .style("opacity", 1);

        svg.selectAll(".dot")
            .style("opacity", 0)
            .transition()
            .duration(500)
            .delay((_, i) => 1500 + i * 50)
            .style("opacity", 1);

        return () => {
            d3.select(wrapperRef.current).selectAll(".d3-tooltip").remove();
        }

    }, [dimensions, theme]);

    return (
        <div className="w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-6 md:p-8 relative">
             <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-primary dark:text-white">Carbon Reduction Impact</h3>
                    <p className="text-text-light dark:text-slate-400 mt-2">Cumulative CO₂e Tonnes avoided over the last decade</p>
                </div>
                <div className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary px-4 py-2 rounded-lg inline-flex items-center gap-2 max-w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="font-bold text-lg">4,600t</span>
                </div>
             </div>
             <div ref={wrapperRef} className="w-full h-full relative" style={{ minHeight: '300px' }}>
                <svg ref={svgRef} className="w-full h-full overflow-visible font-sans"></svg>
             </div>
        </div>
    );
};

export default D3ImpactChart;
