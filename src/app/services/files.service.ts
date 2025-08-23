export class FilesHandling {
  public static convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // When the file is read successfully, return the Base64 string
      reader.onloadend = () => {
        resolve(reader.result as string); // Base64 string
      };

      // If there's an error reading the file, reject the promise
      reader.onerror = (error) => {
        reject(error);
      };

      // Read the file as a data URL (Base64)
      reader.readAsDataURL(file);
    });
  }
}
