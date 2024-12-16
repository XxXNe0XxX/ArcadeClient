import React, { useRef, useEffect, useState } from "react";

const ASCIIVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false); // State to control animation

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const asciiRef = useRef(null);
  let lastRenderTime = 0; // To control FPS

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const asciiDiv = asciiRef.current;

    const context = canvas.getContext("2d");

    // Full density string for ASCII conversion (from dark to light)
    // const fullDensity = "Ñ@#W$9876543210?!abc;:+-=,._          ";
    const fullDensity = "    0123456789$W@#Ñ";

    // Variable to control the density level (number of characters used)
    let densityLevel = 50; // Percentage of the density string to use (1-100)

    // Function to get the adjusted density string based on densityLevel
    const getDensityString = (level) => {
      const length = Math.floor((fullDensity.length * level) / 100);
      return fullDensity.slice(0, length);
    };

    const desiredFPS = 30; // Desired FPS (you can adjust this)
    const frameDuration = 1000 / desiredFPS;

    const handlePlay = () => {
      const aspectRatio = video.videoWidth / video.videoHeight;

      // Increase width for higher resolution (adjust scale as needed)
      const scale = window.innerWidth < 720 ? 5 : 15; // Decrease this value for higher resolution
      const width = Math.floor(window.innerWidth / scale);
      const height = Math.floor(width / aspectRatio);

      canvas.width = width;
      canvas.height = height;

      // Adjust font size and line height based on scale
      const fontSize = window.innerWidth < 720 ? 16 : 40 - scale; // Adjust as needed
      const lineHeight = fontSize * 1.1;

      asciiDiv.style.fontSize = `${fontSize}px`;
      asciiDiv.style.lineHeight = `${lineHeight}px`;

      const density = getDensityString(densityLevel);

      const renderFrame = (time) => {
        if (time - lastRenderTime < frameDuration) {
          requestAnimationFrame(renderFrame);
          return;
        }
        lastRenderTime = time;

        context.drawImage(video, 0, 0, width, height);
        const imageData = context.getImageData(0, 0, width, height);
        const data = imageData.data;

        let asciiImage = "";
        for (let y = 0; y < height; y++) {
          let row = "";
          for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;
            const r = data[offset];
            const g = data[offset + 1];
            const b = data[offset + 2];
            const avg = (r + g + b) / 3;

            const len = density.length;
            const charIndex = Math.floor((avg / 255) * (len - 1));
            const c = density.charAt(charIndex);
            row += c === " " ? "&nbsp;" : c;
          }
          asciiImage += row + "<br/>";
        }
        asciiDiv.innerHTML = asciiImage;

        requestAnimationFrame(renderFrame); // Continue rendering
      };

      requestAnimationFrame(renderFrame);
    };

    // Use 'loadedmetadata' event to ensure video dimensions are available
    video.addEventListener("loadedmetadata", handlePlay);

    return () => {
      video.removeEventListener("loadedmetadata", handlePlay);
    };
  }, [isPlaying]);

  return (
    <div className="m-auto h-[600px] relative  flex justify-center items-center rounded-md overflow-hidden">
      <video
        ref={videoRef}
        src="assets/videook.mp4"
        style={{ display: "hidden" }} // Hide the video element
        autoPlay
        muted
        loop
        className="h-1 w-1"
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />{" "}
      {/* Hidden canvas */}
      <div
        ref={asciiRef}
        style={{
          fontFamily: "monospace",
          whiteSpace: "pre",
          backgroundColor: "", // Optional: Background color
          color: "white", // Optional: Text color
          // fontSize and lineHeight will be set dynamically
        }}
        className="absolute "
      ></div>
    </div>
  );
};

export default ASCIIVideo;
