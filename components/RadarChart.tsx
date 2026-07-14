/*
  Gráfico de radar (spider chart) en SVG puro — sin librerías externas.
  Muestra las 8 inteligencias normalizadas a 0-100.
*/

export interface RadarDatum {
  label: string;
  /** valor normalizado 0-100 */
  value: number;
  colorVar: string;
}

interface RadarChartProps {
  data: RadarDatum[];
  /** color del área/polígono principal */
  accentVar?: string;
  size?: number;
}

export function RadarChart({
  data,
  accentVar = "var(--terracota)",
  size = 420,
}: RadarChartProps) {
  const n = data.length;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.36;
  const rings = [0.25, 0.5, 0.75, 1];
  // Margen horizontal extra para que las etiquetas largas (Interpersonal,
  // Intrapersonal…) no se corten a los lados del SVG.
  const padX = size * 0.28;

  const angleFor = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  const pointFor = (i: number, r: number) => {
    const a = angleFor(i);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  };

  // Polígono de datos
  const dataPoints = data.map((d, i) =>
    pointFor(i, (Math.max(0, Math.min(100, d.value)) / 100) * radius)
  );
  const dataPath = dataPoints.map((p) => p.join(",")).join(" ");

  return (
    <svg
      viewBox={`${-padX} 0 ${size + padX * 2} ${size}`}
      className="mx-auto h-auto w-full max-w-[500px]"
      role="img"
      aria-label={
        "Gráfico de radar de las 8 inteligencias: " +
        data.map((d) => `${d.label} ${d.value}%`).join(", ")
      }
    >
      {/* Anillos de la rejilla */}
      {rings.map((ring) => {
        const pts = data
          .map((_, i) => pointFor(i, ring * radius).join(","))
          .join(" ");
        return (
          <polygon
            key={ring}
            points={pts}
            fill="none"
            stroke="var(--line)"
            strokeWidth={1}
          />
        );
      })}

      {/* Ejes */}
      {data.map((d, i) => {
        const [x, y] = pointFor(i, radius);
        return (
          <line
            key={`axis-${i}`}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="var(--line)"
            strokeWidth={1}
          />
        );
      })}

      {/* Área de datos */}
      <polygon
        points={dataPath}
        fill={accentVar}
        fillOpacity={0.22}
        stroke={accentVar}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* Vértices con color de cada inteligencia */}
      {dataPoints.map((p, i) => (
        <circle
          key={`vtx-${i}`}
          cx={p[0]}
          cy={p[1]}
          r={4.5}
          fill={data[i].colorVar}
          stroke="var(--paper)"
          strokeWidth={1.5}
        />
      ))}

      {/* Etiquetas */}
      {data.map((d, i) => {
        const [x, y] = pointFor(i, radius + size * 0.075);
        const anchor =
          Math.abs(x - cx) < 6 ? "middle" : x > cx ? "start" : "end";
        return (
          <text
            key={`lbl-${i}`}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize={size * 0.032}
            fontWeight={600}
            fill={d.colorVar}
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
