const url = "http://localhost:3000/api";

export async function getBlogs(request) {
    return request.get(url);
}

export async function getBlog(request, id) {
    return request.get(`${url}/${id}`);
}

export async function postBlog(request, title, content) {
    return request.post(url, {
        form: {
            title: title,
            content: content
        }
    });
}

export async function PutBlog(request, id, title, content) {
    return request.put(`${url}/${id}`, {
        form: {
            title: title,
            content: content
        }
    });
}

export async function DeleteBlog(request, id) {
    return request.delete(`${url}/${id}`);
}