// src/api/apiHelpers.ts
import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

// Define a generic function for API calls with proper typing for `data`
export const getData = async <T>(url: string): Promise<T> => {
  try {
    const response = await axiosInstance.get(url);
    // console.log('res => ', response.data);

    return response.data;
  } catch (error) {
    // Type-casting error to AxiosError
    if (error instanceof AxiosError) {
      throw error.response ? error.response.data : error.message;
    }
    throw error; // Handle non-Axios errors
  }
};

// export const postData = async <T, U>(url: string, data: U): Promise<T> => {
//   try {
//     const response = await axiosInstance.post(url, data);
//     return response.data;
//   } catch (error) {
//     // Type-casting error to AxiosError
//     if (error instanceof AxiosError) {
//       throw error.response ? error.response.data : error.message;
//     }
//     throw error;  // Handle non-Axios errors
//   }
// };

// POST request helper
export const postData = async <T, U>(url: string, data: U): Promise<T> => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response ? error.response.data : error.message;
    }
    throw error;
  }
};

// export const updateData = async <T, U>(url: string, data: U): Promise<T> => {
//   try {
//     const response = await axiosInstance.put(url, data);
//     return response.data;
//   } catch (error) {
//     // Type-casting error to AxiosError
//     if (error instanceof AxiosError) {
//       throw error.response ? error.response.data : error.message;
//     }
//     throw error;  // Handle non-Axios errors
//   }
// };

// PUT request helper
export const updateData = async <T, U>(url: string, data: U): Promise<T> => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response ? error.response.data : error.message;
    }
    throw error;
  }
};

export const deleteData = async <T>(url: string): Promise<T> => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    // Type-casting error to AxiosError
    if (error instanceof AxiosError) {
      throw error.response ? error.response.data : error.message;
    }
    throw error; // Handle non-Axios errors
  }
};

const API_BASE_URL = "http://localhost:5287/api/flashcards";

export const uploadBulkFlashcards = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file); // Append the selected file to the FormData

  try {
    // Send a POST request to the server with the file
    const response = await axiosInstance.post(
      `${API_BASE_URL}/bulk`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Return response data if successful
    return { success: true, message: response.data.message };
  } catch (error) {
    // Return error message if the request fails
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      };
    }
    throw error; // Handle non-Axios errors
  }
};
