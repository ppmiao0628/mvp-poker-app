import axios from 'axios';

const BASE_URL = 'https://ppmiao.top/poker/api';

export interface PokerItem {
  id: number;
  uid: string;
  title: string;
  desc: string;
  img: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListResponse {
  ret_code: number;
  success: boolean;
  data: PokerItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface DetailResponse {
  ret_code: number;
  success: boolean;
  data: PokerItem;
  message: string;
}

export const fetchPokerList = async (page: number = 1, pageSize: number = 10): Promise<ListResponse> => {
  const response = await axios.get(`${BASE_URL}/cms`, {
    params: { page, pageSize }
  });
  return response.data;
};

export const fetchPokerDetail = async (id: number): Promise<DetailResponse> => {
  const response = await axios.get(`${BASE_URL}/cms/${id}`);
  return response.data;
};