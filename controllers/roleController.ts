// permissionController.ts
import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { Types } from "mongoose";
import { RolesModel } from "../models/rolesModel";
import { createHistoryEntry } from "../utils/history";
import { addRolesToUser } from "../utils/systemuser";

export const createRole = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { name, code, description, permission_groups, users, is_active } =
    req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ message: "User information missing" });
    return;
  }

  try {
    const newRole = new RolesModel({
      name,
      code,
      description,
      permission_groups,
      users,
      createdUser: userId,
      is_active: true,
    });

    const savedRole = await newRole.save();

    const { _id, createdAt, updatedAt, ...changedValues } =
      savedRole.toObject();
    try {
      await createHistoryEntry({
        entityID: savedRole!._id as Types.ObjectId,
        entityType: "Role",
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

    if (users && users.length > 0) {
      for (const _id of users) {
        await addRolesToUser(_id, savedRole._id as Types.ObjectId); // Her kullanıcıya rol ekle
      }
    }

    res.status(200).json({
      message: "Permission başarıyla kaydedildi",
      permission: {
        id: savedRole._id,
        name: savedRole.name,
        code: savedRole.code,
        group: savedRole.permission_groups,
        is_active: savedRole.is_active,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Permission kaydı sırasında bir hata oluştu", error });
  }
};

export const getRoles = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const roles = await RolesModel.find()
      .populate("permission_groups")
      .populate({
        path: "users",
        select: "-createdAt -updatedAt -createdUser -__v ",
      })
      .exec();
    if (!roles || roles.length === 0) {
      console.info("No roles found in the database.");
      res.status(404).json({ message: "roles bulunamadı" });
      return;
    }
    console.info(`Fetched ${roles.length} roles from the database.`);
    res.status(200).json(roles);
  } catch (error: any) {
    console.error("An error occurred while fetching roles:", error);
    res.status(500).json({
      message: "Sunucu hatası, roles getirilemedi",
      error: error.message,
    });
  }
};
