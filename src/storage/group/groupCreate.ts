import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "utils/AppError";

export async function groupCreate(newGroup: string) {
  try {
    const storageGroups = await groupsGetAll();

    const groupAlreadyExists = storageGroups.includes(newGroup);

    if (groupAlreadyExists) {
      throw new AppError("Já existe um grupo cadastro com esse nome.");
    }

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify([...storageGroups, newGroup])
    );
  } catch (error) {
    throw error;
  }
}
