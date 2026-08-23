import { useState } from "react";
import { motion } from "framer-motion";

function LayoutAnchor({ anchorX = 0.5, anchorY = 0.5 }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={container}>
      <motion.div
        layout
        layoutDependency={expanded}
        style={{
          ...parent,
          width: expanded ? 300 : 150,
          height: expanded ? 300 : 150,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        onClick={() => setExpanded(!expanded)}
      >
        <motion.div
          layout
          layoutDependency={expanded}
          layoutAnchor={{ x: anchorX, y: anchorY }}
          style={{
            ...child,
            width: expanded ? 100 : 70,
            height: expanded ? 100 : 70,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            delay: 0.8,
          }}
        >
          <motion.div
            layout
            layoutDependency={expanded}
            style={{
              ...crosshair,
              left: `${anchorX * 100}%`,
              top: `${anchorY * 100}%`,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: 0.8,
            }}
          >
            <div style={crosshairH} />
            <div style={crosshairV} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LayoutAnchor;

/** ==============   Styles   ================ */

const container: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
};

const parent: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "var(--layer)",
  border: "1px solid var(--border)",
  borderRadius: 20,
  cursor: "pointer",
};

const child: React.CSSProperties = {
  position: "relative",
  width: 70,
  height: 70,
  borderRadius: 14,
  backgroundColor: "hsl(240, 50%, 55%)",
  overflow: "visible",
};

const crosshairSize = 20;

const crosshair: React.CSSProperties = {
  position: "absolute",
  width: crosshairSize,
  height: crosshairSize,
  marginLeft: -crosshairSize / 2,
  marginTop: -crosshairSize / 2,
  pointerEvents: "none",
};

const crosshairH: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: 0,
  left: 0,
  top: "50%",
  borderTop: "1px dashed rgba(255, 255, 255, 0.7)",
};

const crosshairV: React.CSSProperties = {
  position: "absolute",
  width: 0,
  height: "100%",
  left: "50%",
  top: 0,
  borderLeft: "1px dashed rgba(255, 255, 255, 0.7)",
};
