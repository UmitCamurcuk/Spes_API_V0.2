import { IHistory } from "../../interfaces/history.interface";
import History from "../../models/historyModel";

export const createHistoryEntry = async (entry: Partial<IHistory>): Promise<void> => {
    try {
      await History.create(entry);
    } catch (error) {
      console.error("Failed to create history entry:", error);
      throw new Error("Failed to create history entry");
    }
  };

