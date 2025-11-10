import { useState, useRef, useEffect } from "react";
import { Camera, Upload, X, Maximize, Minimize } from "lucide-react";
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { takePicture, pickFromGallery, isLoading } = useCamera();
  const isNative = Capacitor.isNativePlatform();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
      toast.error('Unable to toggle fullscreen mode');
    }
  };

  const startCamera = async () => {
    // Use native camera on mobile apps
    if (isNative) {
      const imagePath = await takePicture();
      if (imagePath) {
        setPreview(imagePath);
        onImageCapture(imagePath);
        toast.success("Image captured! Analyzing plant...");
      }
      return;
    }

    // Use web camera on desktop/mobile browsers
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error("Camera not supported on this device. Please upload an image instead.");
        return;
      }

      const constraints = {
        video: { 
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsScanning(true);
        
        // Auto-enter fullscreen on mobile browsers
        if (containerRef.current && window.innerWidth <= 768) {
          try {
            await containerRef.current.requestFullscreen();
          } catch (error) {
            console.log('Fullscreen not available:', error);
          }
        }
      }
    } catch (error: any) {
      console.error("Camera error:", error);
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        toast.error("Camera permission denied. Please allow camera access or upload an image.");
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        toast.error("No camera found. Please upload an image instead.");
      } else {
        toast.error("Unable to access camera. Please try uploading an image.");
      }
    }
  };

  const stopCamera = async () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
    
    // Exit fullscreen when stopping camera
    if (isFullscreen && document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.log('Exit fullscreen error:', error);
      }
    }
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
    <div ref={containerRef} className={isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}>
      <Card className={`overflow-hidden shadow-medium ${isFullscreen ? 'h-full flex flex-col border-0 rounded-none bg-black' : ''}`}>
        <div className={`relative bg-muted touch-none ${isFullscreen ? 'flex-1 bg-black' : ''}`}>
          {preview ? (
            <div className="relative h-full">
              <img
                src={preview}
                alt="Captured plant"
                className={`w-full object-cover ${isFullscreen ? 'h-full' : 'h-[60vh] min-h-[300px] max-h-[600px]'}`}
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 z-10"
                onClick={clearPreview}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : isScanning ? (
            <div className={`relative overflow-hidden ${isFullscreen ? 'h-full' : 'h-[60vh] min-h-[300px] max-h-[600px]'}`}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-4 border-primary/30 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 border-2 border-accent">
                  <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-l-4 border-accent"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-r-4 border-accent"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-l-4 border-accent"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-r-4 border-accent"></div>
                </div>
              </div>
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 z-10"
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
              {/* Capture and Cancel buttons overlaid on video in fullscreen */}
              {isFullscreen && (
                <div className="absolute bottom-8 left-0 right-0 flex gap-4 px-6 z-20">
                  <Button onClick={captureImage} className="flex-1" size="lg">
                    Capture
                  </Button>
                  <Button variant="secondary" onClick={stopCamera} className="flex-1" size="lg">
                    Cancel
                  </Button>
                </div>
              )}
              {!isFullscreen && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4 pointer-events-none">
                  <p className="text-center text-sm text-muted-foreground">
                    Position plant within the frame
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className={`flex items-center justify-center ${isFullscreen ? 'h-full' : 'h-[400px]'}`}>
              <div className="text-center space-y-4">
                <Camera className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">
                  Scan a plant to identify it
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Show buttons in card footer only when NOT in fullscreen scanning mode */}
        {(!isFullscreen || !isScanning) && (
          <div className="p-4 sm:p-6 flex gap-3 bg-background">
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
                    capture="environment"
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
            {isScanning && !isFullscreen && (
              <>
                <Button onClick={captureImage} className="flex-1" size="lg">
                  Capture
                </Button>
                <Button variant="secondary" onClick={stopCamera} className="flex-1" size="lg">
                  Cancel
                </Button>
              </>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
