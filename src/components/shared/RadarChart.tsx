import React from 'react';

export interface RadarDataPoint {
  axis: string;
  value: number; // 0 - 100
}

export interface RadarChartProps {
  data: RadarDataPoint[];
  size?: number;
  color?: string;
  fillColor?: string;
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  size = 280,
  color = '#00daf3',
  fillColor = 'rgba(0, 218, 243, 0.25)',
  className,
}) => {
  const center = size / 2;
  const radius = (size / 2) * 0.75;
  const numPoints = data.length;

  if (numPoints < 3) return null;

  // Calculate coordinates for a polygon vertex
  const getCoordinates = (index: number, val: number) => {
    const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
    const r = (radius * val) / 100;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Concentric background grid rings (25%, 50%, 75%, 100%)
  const rings = [0.25, 0.5, 0.75, 1.0];

  // Polygon path for values
  const polygonPoints = data
    .map((d, i) => {
      const { x, y } = getCoordinates(i, d.value);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid Rings */}
        {rings.map((ring, idx) => {
          const ringPoints = data
            .map((_, i) => {
              const { x, y } = getCoordinates(i, ring * 100);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={idx}
              points={ringPoints}
              fill="none"
              stroke="#22304d"
              strokeWidth="1"
              strokeDasharray={idx === rings.length - 1 ? 'none' : '3,3'}
            />
          );
        })}

        {/* Axes from center to each vertex */}
        {data.map((_, i) => {
          const { x, y } = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#22304d"
              strokeWidth="1"
            />
          );
        })}

        {/* Value Polygon */}
        <polygon
          points={polygonPoints}
          fill={fillColor}
          stroke={color}
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Value Points */}
        {data.map((d, i) => {
          const { x, y } = getCoordinates(i, d.value);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#060e20"
              stroke={color}
              strokeWidth="2"
              className="hover:r-6 transition-all cursor-pointer"
            />
          );
        })}

        {/* Axis Labels */}
        {data.map((d, i) => {
          const { x, y } = getCoordinates(i, 118);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] font-mono fill-slate-300 select-none font-medium"
            >
              {d.axis} ({d.value}%)
            </text>
          );
        })}
      </svg>
    </div>
  );
};
