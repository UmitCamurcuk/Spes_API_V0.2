import { RolesModel } from "../../models/rolesModel";
import SystemUser from "../../models/systemUserModel";
import { Types } from "mongoose";

/**
 * Kullanıcıya rol ekler.
 * @param userId Kullanıcının ObjectId'si
 * @param roleId Eklenecek rolün ObjectId'si
 * @returns Güncellenmiş kullanıcı
 */
export const addUserToRoles = async (userId: Types.ObjectId, roleId: Types.ObjectId) => {
  try {
    const user = await SystemUser.findById(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }

    const role = await RolesModel.findById(roleId);
    if (!user) {
      throw new Error("Role bulunamadı");
    }

    const rolesArray = Array.isArray(user.roles) ? user.roles : [];
    if (!rolesArray.some((role) => role.equals(roleId))) {
      user.roles = [...rolesArray, roleId];
      const updatedUser = await user.save();
      return updatedUser;
    }

    return { message: "Bu rol zaten kullanıcıda mevcut" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Rol eklenirken hata oluştu: ${error.message}`);
    }
    throw new Error("Bilinmeyen bir hata oluştu.");
  }
};

/**
 * Kullanıcıdan rol çıkarır.
 * @param userId Kullanıcının ObjectId'si
 * @param roleId Çıkarılacak rolün ObjectId'si
 * @returns Güncellenmiş kullanıcı
 */
export const removeUserFromRoles = async (userId: Types.ObjectId, roleId: Types.ObjectId) => {
  try {
    const user = await SystemUser.findById(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }

    // Roller diziye zorla dönüştürülerek kontrol yapılır
    const rolesArray = Array.isArray(user.roles) ? user.roles : [];
    if (!rolesArray.some((role) => role.equals(roleId))) {
      return { message: "Bu rol kullanıcıda bulunmuyor" };
    }

    user.roles = rolesArray.filter((role) => !role.equals(roleId));
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Rol çıkarılırken hata oluştu: ${error.message}`);
    }
    throw new Error("Bilinmeyen bir hata oluştu.");
  }
};
