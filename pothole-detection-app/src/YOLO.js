// YOLOComponent.js
import React, { useState, useRef } from 'react';
import * as onnx from 'onnxjs';
import axios from 'axios';

const YOLOComponent = () => {
  const [inferenceResult, setInferenceResult] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const imageInputRef = useRef(null);

  const handleImageUpload = async () => {
    try {
      // Get the uploaded image file
      const fileInput = imageInputRef.current;
      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        console.error('No image selected.');
        return;
      }

      const imageFile = fileInput.files[0];
      const imageUrl = URL.createObjectURL(imageFile);

      // Load the ONNX model
      const modelPath = '/best.onnx';
      const modelData = await axios.get(modelPath, {
        responseType: 'arraybuffer',
      });
      const model = new onnx.InferenceSession(new Uint8Array(modelData.data));

      setModelLoaded(true);

      // Create an HTML image element
      const img = new Image();

      // Wait for the image to load before running inference
      img.onload = async () => {
        try {
          // Ensure that the model is loaded successfully before running inference
          if (!modelLoaded) {
            console.error('ONNX model is not loaded yet.');
            return;
          }

          // Preprocess the image (adjust dimensions and values based on your model's input requirements)
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 416;
          canvas.height = 416;
          ctx.drawImage(img, 0, 0, 416, 416);
          const imageData = ctx.getImageData(0, 0, 416, 416).data;
          const inputArray = new Float32Array(imageData).map(
            (val) => val / 255.0
          );

          // Run inference
          const outputMap = await model.run([inputArray]);

          // Process the outputMap as needed
          console.log('Inference results:', outputMap);
          setInferenceResult(outputMap);
        } catch (error) {
          console.error('Error running inference:', error);
        }
      };

      img.src = imageUrl;
    } catch (error) {
      console.error('Error loading or running the ONNX model:', error);
    }
  };

  return (
    <div>
      <h2>YOLO Component</h2>
      <input type="file" accept="image/*" ref={imageInputRef} />
      <button onClick={handleImageUpload}>Run YOLO Inference</button>

      {inferenceResult && (
        <div>
          <h3>Inference Results:</h3>
          <pre>{JSON.stringify(inferenceResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default YOLOComponent;
