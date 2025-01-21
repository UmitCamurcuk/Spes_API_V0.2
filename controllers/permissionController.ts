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
