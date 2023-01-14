import axios, { AxiosError, AxiosResponse } from "axios";

const sleep = (delay: number) => {
    return new Promise((resolve => {
        setTimeout(resolve, delay)
    }))
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// axios.interceptors.request.use(config => {
//     const token = store.commonStore.token;
//     if (token && config.headers) config.headers = {Authorization: `Bearer ${token}`}
//     return config;
// })

axios.interceptors.response.use(async respone => {
    if (process.env.NODE_ENV === 'development') await sleep(1000);

    // const pagination = respone.headers['pagination'];
    // if(pagination){
    //     respone.data = new PaginatedResult(respone.data, JSON.parse(pagination));
    //     return respone as AxiosResponse<PaginatedResult<any>>
    // }
    return respone;
}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
        case 400:
            /* if (config.method === 'get' && (data as any).errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }     
            if(typeof data === 'string'){
                toast.error(data);
            }  */
            // const dulieu = data as any;
            // if (dulieu.errors) {
            //     const modelStateErrors = [];
            //     for (const key in dulieu.errors) {
            //         if (dulieu.errors[key]) {
            //             modelStateErrors.push(dulieu.errors[key]);
            //         }
            //     }
            //     throw modelStateErrors.flat();
            // } else {
            //     //toast.error(dulieu);
            // }
            break;
        case 401:
            //toast.error('unauthorised!');
            break;
        case 404:
            //router.navigate('/not-found');
            break;
        case 500:
            //store.commonStore.setServerError(data as any);
            //router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

//const response = <T>(response: AxiosResponse<T>) => response;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),

    upload: <T>(url: string, body: {}, onUploadProgress: any) => axios.post<T>(url, body, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    }).then(responseBody),
}

const Files = {
    uploadFiles: (formData: FormData, onUploadProgress: any) => requests.upload<void>(`/UpLoadFiles`, formData, onUploadProgress)
}


const agent = {
    Files,
}

export default agent;