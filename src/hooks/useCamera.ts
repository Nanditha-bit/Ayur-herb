import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export const useCamera = () => {
  const [isLoading, setIsLoading] = useState(false);

  const takePicture = async () => {
    setIsLoading(true);
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      setIsLoading(false);
      return image.webPath;
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Camera Error",
        description: "Failed to capture image. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };

  const pickFromGallery = async () => {
    setIsLoading(true);
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });

      setIsLoading(false);
      return image.webPath;
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Gallery Error",
        description: "Failed to select image. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };

  return {
    takePicture,
    pickFromGallery,
    isLoading
  };
};
