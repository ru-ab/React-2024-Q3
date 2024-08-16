const errorMessage = 'Failed to convert the image to base64 string.';

export async function convertImageToBase64(image?: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!image) {
      reject(new Error(errorMessage));
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', function (event) {
      if (!event.target || typeof event.target.result !== 'string') {
        reject(new Error(errorMessage));
        return;
      }

      resolve(event.target.result);
    });
    reader.addEventListener('error', function (error) {
      reject(error);
    });

    reader.readAsDataURL(image);
  });
}
