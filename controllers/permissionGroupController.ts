import { Response } from "express";
import { PermissionGroupModel } from "../models/permissionGroupModel"; // Doğru modeli içe aktar
import { AuthRequest } from "../middleware/authMiddleware";

export const createPermissionGroup = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { name, code, description, permissions, isActive } = req.body; // `permissions` eklendi
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ message: "User information is missing." });
    return;
  }

  // Zorunlu alanların kontrolü
  if (!name || !code) {
    res.status(400).json({
      message: "Missing required fields: name or code.",
    });
    return;
  }

  try {
    // Yeni permission group nesnesi oluşturma
    const newPermissionGroup = new PermissionGroupModel({
      name,
      code,
      description,
      permissions: permissions || [], // Gelen `permissions` veya boş bir dizi
      createdUser: userId,
      isActive: isActive ?? true, // Varsayılan değer true
    });

    // Veritabanına kaydetme
    const savedPermissionGroup = await newPermissionGroup.save();

    res.status(201).json({
      message: "Permission Group başarıyla kaydedildi.",
      permissionGroup: savedPermissionGroup,
    });
    return;
  } catch (error) {
    console.error("Permission Group creation error:", error);
    res.status(500).json({
      message: "Permission Group kaydı sırasında bir hata oluştu.",
      error: error instanceof Error ? error.message : "Unknown error.",
    });
    return;
  }
};


export const getPermissionGroups = async (
  req:AuthRequest,
  res:Response
): Promise <void> => {
  try {
    const permissionGroups = await PermissionGroupModel.find();
    if (!permissionGroups || permissionGroups.length === 0) {
      console.info("No permissionGroups found in the database.");
      res.status(404).json({ message: "permissionGroups bulunamadı" });
      return;
    }
    console.info(`Fetched ${permissionGroups.length} users from the database.`);
    res.status(200).json(permissionGroups);
  } catch (error: any) {
    console.error("An error occurred while fetching permissionGroups:", error);
    res.status(500).json({
      message: "Sunucu hatası, permissionGroups getirilemedi",
      error: error.message,
    });
  }
}