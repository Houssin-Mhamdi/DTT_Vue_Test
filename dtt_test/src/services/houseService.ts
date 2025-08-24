import apiClient from "./apiClient";
import type { House, NewHousePayload } from "@/types";
import type { AxiosResponse } from "axios";

//fetching all houses
export const getHouses = (): Promise<AxiosResponse<House[]>> => {
  return apiClient.get<House[]>("/houses");
};

// fetch a single house by its ID
export const getHouseById = (id: number): Promise<AxiosResponse<House>> => {
  return apiClient.get<House>(`/houses/${id}`);
};

// create a new house
export const createHouse = (
  data: NewHousePayload
): Promise<AxiosResponse<House>> => {
  return apiClient.post<House>("/houses", data);
};

// delete a house by its ID
export const deleteHouse = (id: number): Promise<AxiosResponse<void>> => {
  return apiClient.delete<void>(`/houses/${id}`);
};

export const uploadHouseImage = (
  houseId: number,
  image: File
): Promise<AxiosResponse<void>> => {
  const formData = new FormData();
  formData.append("image", image);

  return apiClient.post<void>(`/houses/${houseId}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateHouse = (
  id: number,
  data: NewHousePayload
): Promise<AxiosResponse<House>> => {
  return apiClient.post<House>(`/houses/${id}`, data);
};
