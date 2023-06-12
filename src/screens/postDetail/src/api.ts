import axios from 'axios';
import { showLoading, hideLoading } from 'components/Loading';
import { BASE_URL } from 'configs/api';
import axiosInstance from 'services/api-requests';
import Storages, { KeyStorage } from 'utils/storages';
import { showCustomToast } from 'utils/toast';
import { IToken } from 'constants';

export const getPostComments = async (postId: number) => {
    const url = `/comments?limit=100`;
    try {
        showLoading();
        const res: { returnValue: [] } = await axiosInstance.get(url, {
            params: {
                postId,
            },
        });
        hideLoading();
        console.log(res.returnValue);
        return res.returnValue;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const deleteComments = async (commentId: number) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);
    const url = `/comments/${commentId}`;
    try {
        showLoading();
        const res = await axiosInstance.delete(url, {
            headers: { Authorization: `Bearer ${tokenInfo.accessToken}` },
        });
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const putComments = async (commentId: number, content: string) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);
    const url = `/comments`;
    try {
        showLoading();
        const res = await axiosInstance.put(
            url,
            { commentId, content },
            {
                headers: { Authorization: `Bearer ${tokenInfo.accessToken}` },
            }
        );
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const createComment = async (content, parentCommentId, postId) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);
    const response = await axios.post(
        `${BASE_URL}/comments/`,
        { content, parentCommentId, postId },
        { headers: { Authorization: `Bearer ${tokenInfo.accessToken}` } }
    );
    return response.data;
};

export const getPosts = async (topics?: string, keyword?: string) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);
    const response = await axios.get(`${BASE_URL}/posts/user-tourguide?limit=100`, {
        headers: { Authorization: `Bearer ${tokenInfo.accessToken}` },
    });
    return response.data;
};

export const checkIsLiked = async (postId: number) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);
    const response = await axios.put(
        `${BASE_URL}/users/check-favorite`,
        { postId },
        {
            headers: { Authorization: `Bearer ${tokenInfo.accessToken}` },
        }
    );
    return response.data.returnValue;
};

export const likePost = async (postId: number) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);
    const response = await axios.put(
        `${BASE_URL}/users/favorite`,
        { postId },
        {
            headers: { Authorization: `Bearer ${tokenInfo.accessToken}` },
        }
    );
    return response.data.returnValue;
};

export const reportPost = async (postId: number, content: string) => {
    // showLoading();
    const response = await axiosInstance.post(`reports/post`, { postId, content });
    // hideLoading();
    return response;
};
