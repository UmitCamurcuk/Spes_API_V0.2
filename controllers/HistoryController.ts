import { IHistory } from "../interfaces/history.interface";
import History from "../models/historyModel";
import { Response, Request } from "express";

export const createHistoryEntry = async (entry: Partial<IHistory>): Promise<void> => {
    try {
      await History.create(entry);
    } catch (error) {
      console.error("Failed to create history entry:", error);
      throw new Error("Failed to create history entry");
    }
  };

  export const getHistory = async (req: Request, res: Response): Promise<void> => {
    try {

      const { entityID, entityType, action, createdUser, } = req.body;
  
      const query: any = {};
  
      if (entityID) query.entityID = entityID;
      if (entityType) query.entityType = entityType;
      if (action) query.action = action;
      if (createdUser) query.createdUser = createdUser;
  
      if (Object.keys(query).length === 0) {
        res
          .status(400)
          .json({ message: "En az bir sorgu parametresi belirtmelisiniz." });
        return;
      }
      console.log(query)
      const history = await History.findOne(query);
  
      if (!history) {
        res.status(404).json({ message: "History bulunamadı" });
        return;
      }
  
      res.status(200).json(history);
    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Error fetching user:", error.message);
        res.status(500).json({
          message: "Sunucu hatası, history getirilemedi",
          error: error.message,
        });
      } else {
        console.error("An unknown error occurred:", error);
        res.status(500).json({ message: "Bilinmeyen bir hata oluştu" });
      }
    }
  };