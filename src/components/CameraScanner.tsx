import { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Capacitor } from "@capacitor/core";
import { useCamera } from "@/hooks/useCamera";

interface CameraScannerProps {
  onImageCapture: (imageData: string) => void;
}

export const CameraScanner = ({ onImageCapture }: CameraScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { takePicture, pickFromGallery, isLoading } = useCamera();
  const isNative = Capacitor.isNativePlatform();

  const startCamera = async () => {
    // Use native camera on mobile
    if (isNative) {
      const imagePath = await takePicture();
      if (imagePath) {
        setPreview(imagePath);
        onImageCapture(imagePath);
        toast.success("Image captured! Analyzing plant...");
      }
      return;
    }

    // Use web camera on desktop
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (error) {
      toast.error("Unable to access camera. Please check permissions.");
      console.error("Camera error:", error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        setPreview(imageData);
        onImageCapture(imageData);
        stopCamera();
        toast.success("Image captured! Analyzing plant...");
      }
    }
  };

  const handleFileUpload = async (event?: React.ChangeEvent<HTMLInputElement>) => {
    // Use native gallery on mobile
    if (isNative && !event) {
      const imagePath = await pickFromGallery();
      if (imagePath) {
        setPreview(imagePath);
        onImageCapture(imagePath);
        toast.success("Image uploaded! Analyzing plant...");
      }
      return;
    }

    // Use web file input on desktop
    const file = event?.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setPreview(imageData);
        onImageCapture(imageData);
        toast.success("Image uploaded! Analyzing plant...");
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="overflow-hidden shadow-medium">
      <div className="relative bg-muted">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Captured plant"
              className="w-full h-[400px] object-cover"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4"
              onClick={clearPreview}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : isScanning ? (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 border-4 border-primary/30 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-accent">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <Camera className="h-16 w-16 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">
                Scan a plant to identify it
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 flex gap-3">
        {!isScanning && !preview && (
          <>
            <Button 
              onClick={startCamera} 
              className="flex-1"
              disabled={isLoading}
            >
              <Camera className="mr-2 h-4 w-4" />
              {isLoading ? "Loading..." : "Open Camera"}
            </Button>
            {!isNative && (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            )}
            <Button
              variant="secondary"
              onClick={() => isNative ? handleFileUpload() : fileInputRef.current?.click()}
              className="flex-1"
              disabled={isLoading}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isLoading ? "Loading..." : "Upload Image"}
            </Button>
          </>
        )}
        {isScanning && (
          <>
            <Button onClick={captureImage} className="flex-1">
              Capture
            </Button>
            <Button variant="secondary" onClick={stopCamera} className="flex-1">
              Cancel
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};
