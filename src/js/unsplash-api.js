import axios from "axios";

const credentials = {
    applicationsId: 629723,
    accessKey: 'NlolqDG36t30fAlIGSLIRe_2hRRKzp5STeOT303vNqo',
    secretKey: 'Uwj0HQadMlAQKRg_EJm-_aKVDC81yJoB0Nc0CnW-scI'
}

axios.defaults.baseURL = "https://api.unsplash.com";

export default async function getPhotos(query, page) {
    return await axios.get('/search/photos', {
        headers: {
            Authorization: `Client-ID ${credentials.accessKey}`
        },
        params: {
            query: query,
            per_page: 12,
            page: page
        }
    });
}