import React, { useEffect, useRef, useState } from "react";
import DrawLandmarkCanvas from "./DrawLandmarkCanvas";
import FaceLandmarkManager from "@/class/FaceLandmarkManager";

const FaceLandmarkCanvas = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastVideoTimeRef = useRef(-1);
  const requestRef = useRef(0);

  const [videoSize, setVideoSize] = useState<{
    width: number;
    height: number;
  }>();
  const [categories, setCategories] = useState<any[]>([]);

  const animate = () => {
    if (
      videoRef.current &&
      videoRef.current.currentTime !== lastVideoTimeRef.current
    ) {
      lastVideoTimeRef.current = videoRef.current.currentTime;
      try {
        const faceLandmarkManager = FaceLandmarkManager.getInstance();
        const landmarks = faceLandmarkManager.detectLandmarks(
          videoRef.current,
          Date.now()
        );
        setCategories(landmarks.faceBlendshapes[0].categories);
      } catch (e) {
        console.log(e);
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const getUserCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setVideoSize({
              width: videoRef.current!.offsetWidth,
              height: videoRef.current!.offsetHeight,
            });
            videoRef.current!.play();
            requestRef.current = requestAnimationFrame(animate);
          };
        }
      } catch (e) {
        console.log(e);
        alert("Failed to load webcam!");
      }
    };
    getUserCamera();

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center relative">
        <video
          className="w-full h-auto"
          ref={videoRef}
          loop={true}
          muted={true}
          autoPlay={true}
          playsInline={true}
        ></video>
        {videoSize && (
          <DrawLandmarkCanvas
            videoWidth={videoSize.width}
            videoHeight={videoSize.height}
          />
        )}
      </div>
      <div className="mt-7">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 w-full">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center">
              <div className="w-1/2">{category.categoryName}</div>
              <div className="w-1/2">
                <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${category.score * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaceLandmarkCanvas;
