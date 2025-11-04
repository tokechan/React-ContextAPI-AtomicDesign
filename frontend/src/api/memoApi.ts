import axios from "axios";
import { API_URL } from "../config";

//メモの型定義
export interface Memo {
    id?: number;
    content: string;
    status: string;
    creator: string;
    completed: boolean;
    created_at?: string;
    updated_at?: string;
}

//Axiosインスタンスの生成
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// リクエストインターセプターを追加して、トークンを設定
apiClient.interceptors.request.use(
    (config) => {
        // ローカルストレージからトークンを取得
        const token = localStorage.getItem('token');
        
        // トークンがある場合、Authorizationヘッダーに設定
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//メモ一覧の取得
export const getMemos = async (): Promise<Memo[]> => {
    try {
        const response = await apiClient.get('/memos');
        return response.data;
    } catch (error) {
        console.error('メモの取得に失敗しました', error);
        throw error;
    }
};

//特定のメモの取得
export const getMemo = async (id: number): Promise<Memo> => {
    try {
        const response = await apiClient.get(`/memos/${id}`);
        return response.data;
    } catch (error) {
        console.error(`ID ${id} のメモの取得に失敗しました`, error);
        throw error;
    }
};

//メモの作成
export const createMemo = async (memoData: Memo): Promise<Memo> => {
    try {
        const response = await apiClient.post('/memos', memoData);
        return response.data;
    } catch (error) {
        console.error('メモの作成に失敗しました', error);
        throw error;
    }
};

//メモの更新
export const updateMemo = async (id: number, memoData: Memo): Promise<Memo> => {
    try {
        const response = await apiClient.put(`/memos/${id}`, memoData);
        return response.data;
    } catch (error) {
        console.error(`ID ${id} のメモの更新に失敗しました`, error);
        throw error;
    }
};

//メモの削除
export const deleteMemo = async (id: number): Promise<void> => {
    try {
        await apiClient.delete(`/memos/${id}`);
    } catch (error) {
        console.error(`ID ${id} のメモの削除に失敗しました`, error);
        throw error;
    }
};
