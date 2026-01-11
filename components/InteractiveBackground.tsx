import { useEffect, useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import type { Theme } from "../constants/theme";

export function InteractiveBackground({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      timeRef.current += 0.012;

      ctx.fillStyle = theme === "light" ? "#FFFFFF" : "#0F172A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const waveCount = 3;
      const baseColor = { r: 59, g: 130, b: 246 };

      for (let i = 0; i < waveCount; i++) {
        const waveOffset = (i / waveCount) * Math.PI * 2;
        const waveSpeed = 0.5 + i * 0.3;
        const waveAmplitude = 80 + i * 40;
        const waveFrequency = 0.003 + i * 0.002;

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        const alpha1 = theme === "light" ? 0.12 : 0.2;
        const alpha2 = theme === "light" ? 0.06 : 0.12;

        gradient.addColorStop(0, `rgba(${baseColor.r},${baseColor.g},${baseColor.b},${alpha1})`);
        gradient.addColorStop(0.5, `rgba(${baseColor.r + 30},${baseColor.g + 20},${baseColor.b + 10},${alpha2})`);
        gradient.addColorStop(1, `rgba(${baseColor.r},${baseColor.g},${baseColor.b},${alpha1})`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x <= canvas.width; x += 2) {
          const y =
            canvas.height / 2 +
            Math.sin(x * waveFrequency + timeRef.current * waveSpeed + waveOffset) * waveAmplitude +
            Math.cos(x * waveFrequency * 0.7 + timeRef.current * waveSpeed * 1.2) * (waveAmplitude * 0.5);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]);

  const bgColor = theme === "light" ? "#FFFFFF" : "#0F172A";

  if (Platform.OS !== "web") {
    return <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: bgColor }]} />;
  }

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { overflow: "hidden", backgroundColor: bgColor }]}>
      {Platform.OS === "web" && (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      )}
    </View>
  );
}

