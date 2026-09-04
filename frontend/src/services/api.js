import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/upload/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

export const processDocument = async (documentId, chunkSize = 500, chunkOverlap = 100) => {
    const res = await api.post(`/process/${documentId}`, null, {
        params: {
            chunk_size: chunkSize,
            chunk_overlap: chunkOverlap
        }
    });
    return res.data;
};

export default api;