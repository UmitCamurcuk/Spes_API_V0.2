// permissionController.ts
import { Response } from "express";
import { PermissionModel } from "../models/permissionModel";
import { AuthRequest } from "../middleware/authMiddleware";

export const createPermission = async (
  req: AuthRequest,  
  res: Response
): Promise<void> => {
  const { name, code, description, type, group, is_active } = req.body;
  const userId = req.user?.id;  

  if (!userId) {
    res.status(400).json({ message: "User information missing" });
    return;
  }

  try {
    const newPermission = new PermissionModel({
      name,
      code,
      description,
      type,
      group,
      createdUser: userId,  
      is_active: true,
    });

    const savedPermission = await newPermission.save();
    res.status(200).json({
      message: "Permission başarıyla kaydedildi", 
      user: savedPermission
    });
  } catch (error) {
    res.status(500).json({ message: "Permission kaydı sırasında bir hata oluştu", error });
  }
};


export const getPermissions = async (
  req:AuthRequest,
  res:Response
): Promise <void> => {
  try {
    const permissions = await PermissionModel.find()
    .populate("permissions")
    .exec()
    if (!permissions || permissions.length === 0) {
      console.info("No permissions found in the database.");
      res.status(404).json({ message: "permissions bulunamadı" });
      return;
    }
    console.info(`Fetched ${permissions.length} users from the database.`);
    res.status(200).json(permissions);
  } catch (error: any) {
    console.error("An error occurred while fetching permissions:", error);
    res.status(500).json({
      message: "Sunucu hatası, permissions getirilemedi",
      error: error.message,
    });
  }
}