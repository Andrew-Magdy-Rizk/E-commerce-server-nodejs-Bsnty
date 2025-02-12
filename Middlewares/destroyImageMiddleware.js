import cloudinary from "../Config/cloudinary.js";

export const destroy = async (docement) => {
  // استخراج الـ public_id بشكل صحيح
  const public_id = docement
    .split("upload/")[1]
    .split("/")
    .slice(1, 3)
    .join("/")
    .split(".")[0]; // نحذف كل شيء قبل "upload/"

  console.log("Public_id:", public_id);

  // حذف الصورة من Cloudinary
  try {
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: "image",
    });
    console.log("Result:", result);
  } catch (error) {
    console.log("Error:", error);
    return next(error);
  }
};
