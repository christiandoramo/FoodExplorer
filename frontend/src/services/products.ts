import { toast } from "react-toastify";
import api from "./api";
import { Product } from "../interfaces/product";
import { PRODUCT_CATEGORY } from "../enums/category";

class ProductService {
  async createProduct(data: FormData): Promise<any> {
    try {
      const registerProductPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await api.post("products", data, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          await new Promise((res) => setTimeout(res, 2000));
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });

      return toast.promise(registerProductPromise, {
        pending: {
          render() {
            return `Registrando o produto`;
          },
          theme: "dark",
        },
        success: {
          render() {
            return `Novo produto criado com sucesso 👌`;
          },
        },
        error: {
          render({ data }: { data: any }) {
            return `${
              data?.response?.data?.message ||
              data?.message ||
              "Ocorreu um erro"
            }`;
          },
        },
      });
    } catch (error: any) {
      console.log(error);
      return error?.response?.message || error;
    }
  }

  async updateProduct(id: string, data: FormData): Promise<any> {
    try {
      const registerProductPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await api.patch(`products/update/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          await new Promise((res) => setTimeout(res, 2000));
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });

      return toast.promise(registerProductPromise, {
        pending: {
          render() {
            return `Atualizando o produto`;
          },
          theme: "dark",
        },
        success: {
          render() {
            return `Produto atualizado com sucesso 👌`;
          },
        },
        error: {
          render({ data }: { data: any }) {
            return `${
              data?.response?.data?.message ||
              data?.message ||
              "Ocorreu um erro"
            }`;
          },
        },
      });
    } catch (error: any) {
      console.log(error);
      return error?.response?.message || error;
    }
  }

  async deleteProduct(id: string): Promise<any> {
    try {
      const registerProductPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await api.delete(`products/delete/${id}`, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          await new Promise((res) => setTimeout(res, 2000));
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });

      return toast.promise(registerProductPromise, {
        pending: {
          render() {
            return `Deletando o produto`;
          },
          theme: "dark",
        },
        success: {
          render() {
            return `Produto deletado com sucesso 👌`;
          },
        },
        error: {
          render({ data }: { data: any }) {
            return `${
              data?.response?.data?.message ||
              data?.message ||
              "Ocorreu um erro"
            }`;
          },
        },
      });
    } catch (error: any) {
      console.log(error);
      return error?.response?.message || error;
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await api.get(`/products/show/${id}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error?.response?.message || error;
    }
  }
  async getProductsByCategory({
    limit,
    category,
    offset,
  }: {
    limit?: number;
    offset?: number;
    category?: PRODUCT_CATEGORY;
  }): Promise<Product[]> {
    try {
      const response = await api.get(
        `/products/search?category=${category}&offset=${offset}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error?.response?.message || error;
    }
  }
  async getProductsCategorized({
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  }): Promise<Product[][]> {
    try {
      const response = await api.get(
        `/products/index?offset=${offset}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error?.response?.message || error;
    }
  }

  async getProductsBySlug({
    limit,
    offset,
    slug,
  }: {
    limit?: number;
    offset?: number;
    slug: string;
  }): Promise<Product[]> {
    try {
      const response = await api.get(
        `/products/search?slug=${slug}&offset=${offset}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error?.response?.message || error;
    }
  }

  async findAllCategories(): Promise<any> {
    try {
      const response = await api.get(`/products/categories`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error?.response?.message || error;
    }
  }
}

export const productService = new ProductService();
