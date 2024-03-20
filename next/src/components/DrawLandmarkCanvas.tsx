import React, { useEffect, useRef } from "react";
import FaceLandmarkManager from "@/class/FaceLandmarkManager";

interface DrawLandmarkCanvasProps {
  videoWidth: number;
  videoHeight: number;
}

const DrawLandmarkCanvas = ({ videoWidth, videoHeight }: DrawLandmarkCanvasProps) => {
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);

  const animate = () => {
    if (drawCanvasRef.current) {
      drawCanvasRef.current.width = videoWidth;
      drawCanvasRef.current.height = videoHeight;
      const faceLandmarkManager = FaceLandmarkManager.getInstance();
      faceLandmarkManager.drawLandmarks(drawCanvasRef.current);
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!requestRef.current) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };
  }, []);

  return (
    <canvas
      className="absolute top-0 left-0 w-full h-full"
      style={{ width: videoWidth, height: videoHeight, transform: "scaleX(-1)" }}
      ref={drawCanvasRef}
    ></canvas>
  );
};

export default DrawLandmarkCanvas;
