// permissionController.ts
import { Response } from "express";
import { PermissionModel } from "../models/permissionModel";
import { AuthRequest } from "../middleware/authMiddleware";
import { Types } from "mongoose";
import { createHistoryEntry } from "../utils/history";

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
    
    const { _id, createdAt, updatedAt, ...changedValues } = savedPermission.toObject();
    try {
      await createHistoryEntry({
        entityID: savedPermission!._id as Types.ObjectId,
        entityType: "Permission",
        action: "create",
        status: "created",
        changedValues,
        ipAddress: req.ip,
        createdUser: req.user!.id,
        timestamp: new Date(),
      });
    } catch (historyError) {
      console.error("History entry creation error:", historyError);
    }

    res.status(200).json({
      message: "Permission başarıyla kaydedildi", 
      permission: {
        id: savedPermission._id,
        name: savedPermission.name,
        code: savedPermission.code,
        group: savedPermission.group,
        is_active: savedPermission.isActive,
        createdAt: savedPermission.createdAt,
      },
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
    .populate("group")
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