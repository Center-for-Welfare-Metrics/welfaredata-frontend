import { useQueryClient } from "@tanstack/react-query";

import { QueryKeys } from "../../keys";
import { ProcessogramData } from "types/processogram-data";

function cloneProcessogramData(data: ProcessogramData): ProcessogramData {
  return {
    ...data,
    data: Object.fromEntries(
      Object.entries(data.data).map(([key, value]) => [key, { ...value }])
    ),
  };
}

/**
 * Hook to update a processogram data description in the cache
 * @returns {function} update - Function to update the cache
 */
export const useUpdateProcessogramDataOnCache = () => {
  const queryClient = useQueryClient();

  /**
   * Updates a specific field in the processogram data cache
   * @param processogram_id - The ID of the processogram to update
   * @param key - The specific key within the data object to update
   * @param description - The new description value to set
   */
  const update = (
    processogram_id: string,
    key: string,
    description: string
  ) => {
    queryClient.setQueryData<ProcessogramData>(
      [QueryKeys.PROCESSOGRAM_DATAS.ByID, processogram_id],
      (oldData) => {
        if (!oldData) return undefined;

        // Create a deep copy to avoid direct mutation
        const newData = cloneProcessogramData(oldData);

        // Update the description if the key exists
        if (newData.data && newData.data[key]) {
          newData.data[key].description = description;
        }

        return newData;
      }
    );
  };

  return { update };
};
