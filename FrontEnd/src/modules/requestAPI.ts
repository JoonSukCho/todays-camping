import axios, { AxiosInstance } from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*',
    }
});

type HttpMethod = 'get' | 'post';

export const requestAPI = async (url: string, method: HttpMethod, params: any) => {
    const response = await axiosInstance({
        baseURL: 'https://api.odcloud.kr/api',
        url,
        method,
        data: params,
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        if (err.response) {
            console.log(`Server Error\n url: ${url}\n${err.response.status}${err.response.statusText}`);
            return { error: err.response.status };
        }

        if (err.request) {
            console.log(`Network Error\n url: ${url}\n ${err.code}`);
            return { error: err.code };
        }

        return { error: err.message };
    });


    return response;
}