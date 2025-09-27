import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Polygon, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLOR } from '#/theme';

interface HexagonProps {
  size?: number;
  color?: string;
  borderWidth?: number;
  borderColor?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
  gradient?: boolean;
  gradientColors?: string[];
  rotation?: number;
}

export const Hexagon: React.FC<HexagonProps> = ({
  size = 100,
  color = COLOR.light[200],
  borderWidth = 0,
  borderColor = COLOR.black,
  style,
  children,
  gradient = false,
  gradientColors = [COLOR.light[100], COLOR.light[200]],
  rotation = 0,
}) => {
  const center = size / 2;
  const radius = center - borderWidth / 2;

  // Calculate hexagon points (6 vertices)
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    // Start from the top point (subtract 90 degrees to start at top)
    const angle = (i * 60 - 90) * (Math.PI / 180);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  const pointsString = points.join(' ');
  const fillColor = gradient ? 'url(#hexagonGradient)' : color;

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: [{ rotate: `${rotation}deg` }] }}
      >
        {gradient && (
          <Defs>
            <LinearGradient
              id="hexagonGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="0%" stopColor={gradientColors[0]} />
              <Stop offset="100%" stopColor={gradientColors[1]} />
            </LinearGradient>
          </Defs>
        )}

        <Polygon
          points={pointsString}
          fill={fillColor}
          stroke={borderColor}
          strokeWidth={borderWidth}
        />
      </Svg>

      {children && (
        <View style={[styles.childrenContainer, { width: size, height: size }]}>
          {children}
        </View>
      )}
    </View>
  );
};

// Hexagon with flat top (different orientation)
export const HexagonFlat: React.FC<HexagonProps> = ({
  size = 100,
  color = COLOR.light[200],
  borderWidth = 0,
  borderColor = COLOR.black,
  style,
  children,
  gradient = false,
  gradientColors = [COLOR.light[100], COLOR.light[200]],
}) => {
  const center = size / 2;
  const radius = center - borderWidth / 2;

  // Calculate hexagon points with flat top (start from 0 degrees)
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = i * 60 * (Math.PI / 180);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  const pointsString = points.join(' ');
  const fillColor = gradient ? 'url(#hexagonFlatGradient)' : color;

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {gradient && (
          <Defs>
            <LinearGradient
              id="hexagonFlatGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="0%" stopColor={gradientColors[0]} />
              <Stop offset="100%" stopColor={gradientColors[1]} />
            </LinearGradient>
          </Defs>
        )}

        <Polygon
          points={pointsString}
          fill={fillColor}
          stroke={borderColor}
          strokeWidth={borderWidth}
        />
      </Svg>

      {children && (
        <View style={[styles.childrenContainer, { width: size, height: size }]}>
          {children}
        </View>
      )}
    </View>
  );
};

// Hexagon with rounded corners
export const HexagonRounded: React.FC<HexagonProps & { 
  cornerRadius?: number;
  width?: number;
  height?: number;
  leftExtension?: number;
  rightExtension?: number;
}> = ({
  size = 100,
  color = COLOR.light[200],
  borderWidth = 0,
  borderColor = COLOR.black,
  style,
  children,
  gradient = false,
  gradientColors = [COLOR.light[100], COLOR.light[200]],
  cornerRadius = 8,
  width,
  height,
  leftExtension = 0,
  rightExtension = 0,
}) => {
  // Use custom width/height if provided, otherwise use size
  const hexWidth = width || size;
  const hexHeight = height || size;
  const totalWidth = hexWidth + leftExtension + rightExtension;
  const centerX = leftExtension + hexWidth / 2;
  const centerY = hexHeight / 2;
  const radiusX = (hexWidth / 2) - borderWidth / 2;
  const radiusY = (hexHeight / 2) - borderWidth / 2;
  
  // Create path with rounded corners and adjustable extensions
  const createRoundedHexagonPath = () => {
    const points: { x: number; y: number }[] = [];
    
    // Calculate hexagon points with custom width/height and extensions
    for (let i = 0; i < 6; i++) {
      const angle = ((i * 60) - 90) * (Math.PI / 180);
      let x = centerX + radiusX * Math.cos(angle);
      let y = centerY + radiusY * Math.sin(angle);
      
      // Apply left and right extensions to specific points
      // Points 1 and 2 are on the right side, points 4 and 5 are on the left side
      if (i === 1 || i === 2) { // Right side points
        x += rightExtension;
      } else if (i === 4 || i === 5) { // Left side points
        x -= leftExtension;
      }
      
      points.push({ x, y });
    }

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      const prev = points[i - 1];
      const next = points[(i + 1) % points.length];

      // Calculate control points for rounded corners
      const dx1 = current.x - prev.x;
      const dy1 = current.y - prev.y;
      const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

      const dx2 = next.x - current.x;
      const dy2 = next.y - current.y;
      const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

      const factor = Math.min(cornerRadius / len1, cornerRadius / len2, 0.5);

      const cp1x = current.x - dx1 * factor;
      const cp1y = current.y - dy1 * factor;

      const cp2x = current.x + dx2 * factor;
      const cp2y = current.y + dy2 * factor;

      path += ` L ${cp1x} ${cp1y} Q ${current.x} ${current.y} ${cp2x} ${cp2y}`;
    }

    // Close the path
    const first = points[0];
    const last = points[points.length - 1];
    const dx = first.x - last.x;
    const dy = first.y - last.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const factor = Math.min(cornerRadius / len, 0.5);

    const cp1x = first.x - dx * factor;
    const cp1y = first.y - dy * factor;

    path += ` L ${cp1x} ${cp1y} Q ${first.x} ${first.y} ${points[0].x} ${points[0].y} Z`;

    return path;
  };

  const fillColor = gradient ? 'url(#hexagonRoundedGradient)' : color;
  const totalHeight = hexHeight;
  
  return (
    <View style={[{ width: totalWidth, height: totalHeight }, style]}>
      <Svg width={totalWidth} height={totalHeight} viewBox={`0 0 ${totalWidth} ${totalHeight}`}>
        {gradient && (
          <Defs>
            <LinearGradient
              id="hexagonRoundedGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="0%" stopColor={gradientColors[0]} />
              <Stop offset="100%" stopColor={gradientColors[1]} />
            </LinearGradient>
          </Defs>
        )}

        <Path
          d={createRoundedHexagonPath()}
          fill={fillColor}
          stroke={borderColor}
          strokeWidth={borderWidth}
        />
      </Svg>

      {children && (
        <View style={[styles.childrenContainer, { width: totalWidth, height: totalHeight }]}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  childrenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default Hexagon;
