import { Response, Request } from "express";
import bcrypt from "bcrypt";
import SystemUser from "../models/systemUserModel";
import { AuthRequest } from "../middleware/authMiddleware";
import { createHistoryEntry } from "./HistoryController";
import { Types } from "mongoose";
const saltRounds = 10;

//USER REGISTER
export const registerUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const {
    first_name,
    last_name,
    middle_name,
    username,
    password,
    email,
    roles,
    history,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new SystemUser({
      first_name,
      middle_name,
      last_name,
      username,
      password: hashedPassword,
      email,
      is_active: true,
    });
    const savedUser = await newUser.save();

    try {
      await createHistoryEntry({
        entityID: savedUser!._id as Types.ObjectId,
        entityType: "SystemUser",
        action: "create",
        status: "created",
        changedValues: savedUser,
        ipAddress: req.ip,
        createdUser: req.user!.id,
        timestamp: new Date(),
      });
    } catch (historyError) {
      console.error("History entry creation error:", historyError);
    }

    res
      .status(200)
      .json({ message: "Kullanıcı başarıyla kaydedildi", user: savedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kullanıcı kaydı sırasında bir hata oluştu", error });
  }
};

//GET USERS
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await SystemUser.find();
    if (!users || users.length === 0) {
      console.info("No users found in the database.");
      res.status(404).json({ message: "Kullanıcılar bulunamadı" });
      return;
    }
    console.info(`Fetched ${users.length} users from the database.`);
    res.status(200).json(users);
  } catch (error: any) {
    console.error("An error occurred while fetching users:", error);
    res.status(500).json({
      message: "Sunucu hatası, kullanıcılar getirilemedi",
      error: error.message,
    });
  }
};

//GET USER
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { first_name, middle_name, last_name, username, email } = req.body;

    const query: any = {};

    if (first_name) query.first_name = first_name;
    if (middle_name) query.middle_name = middle_name;
    if (last_name) query.last_name = last_name;
    if (username) query.username = username;
    if (email) query.email = email;

    if (Object.keys(query).length === 0) {
      res
        .status(400)
        .json({ message: "En az bir sorgu parametresi belirtmelisiniz." });
      return;
    }

    const user = await SystemUser.findOne(query);

    if (!user) {
      res.status(404).json({ message: "Kullanıcı bulunamadı" });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message);
      res.status(500).json({
        message: "Sunucu hatası, kullanıcı getirilemedi",
        error: error.message,
      });
    } else {
      console.error("An unknown error occurred:", error);
      res.status(500).json({ message: "Bilinmeyen bir hata oluştu" });
    }
  }
};

//EDIT USER
export const editSystemUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.params.id;
  const updatedData = req.body;
  const saltRounds = 10;

  try {
    const existingUser = await SystemUser.findById(userId);

    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Şifre değişikliği için kontrol
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(
        updatedData.password,
        saltRounds
      );
    }

    // Değişen değerleri belirleme
    const changedValues: Record<string, any> = {};
    Object.keys(updatedData).forEach((key) => {
      if ((existingUser as any)[key] !== updatedData[key]) {
        changedValues[key] = {
          old: (existingUser as any)[key],
          new: updatedData[key],
        };
      }
    });

    // Eğer değişiklik yoksa işlem yapmadan çık
    if (Object.keys(changedValues).length === 0) {
      res.status(200).json({ message: "No changes detected" });
      return;
    }

    // Kullanıcı güncellemesi
    const updatedUser = await SystemUser.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true }
    );

    // Tarihçeye kayıt
    await createHistoryEntry({
      entityID: existingUser!._id as Types.ObjectId,
      entityType: "SystemUser",
      action: "edit",
      changedValues,
      status: "updated",
      ipAddress: req.ip,
      createdUser: req.user!.id,
      timestamp: new Date(),
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
