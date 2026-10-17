import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage, configured } from "./firebase.js";
export async function compressImage(file, max = 1800, quality = 0.82) {
  if (!file.type.startsWith("image/")) throw Error("Choose an image file.");
  return new Promise((resolve, reject) => {
    const img = new Image(),
      url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height)),
        canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          blob
            ? resolve(
                new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {
                  type: "image/jpeg",
                }),
              )
            : reject(Error("Image compression failed."));
        },
        "image/jpeg",
        quality,
      );
    };
    img.onerror = () => reject(Error("Could not read image."));
    img.src = url;
  });
}
export async function uploadImage(file, path) {
  if (!configured) throw Error("Configure Firebase Storage to upload images.");
  const small = await compressImage(file);
  const target = ref(storage, `${path}/${Date.now()}-${small.name}`);
  await uploadBytes(target, small, { contentType: "image/jpeg" });
  return { url: await getDownloadURL(target), path: target.fullPath };
}
export async function deleteImage(path) {
  if (configured && path) await deleteObject(ref(storage, path));
}
