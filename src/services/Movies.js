import Socket from "../util/Socket";
import { movieEPs } from "../Config.json";

const { searchEP, browseEP, getEP, thumbnailEP, peopleEP, peopleSearchEP, peopleGetEP } = movieEPs;

async function search(params) {
    const data = {params: params};
    return await Socket.GETWITHPARAMS(searchEP, data);
}

async function browse(phrase, params) {
    const data = {params: params};
    return await Socket.GETWITHPARAMS(browseEP+phrase, data);
}

async function get(movie_id) {
    return await Socket.GET(getEP+movie_id);
}

async function thumbnail(movie_ids) {
    const payload = {
        movie_ids: movie_ids
    };

    return await Socket.POST(thumbnailEP, payload);
}

async function people(params) {
    const data = {params: params};
    return await Socket.GETWITHPARAMS(peopleEP, data);
}

async function peopleSearch(params) {
    const data = {params: params};
    return await Socket.GETWITHPARAMS(peopleSearchEP, data);
}

async function peopleGet(person_id) {
    return await Socket.GET(peopleGetEP+person_id);
}

export default {
    search,
    browse,
    get,
    thumbnail,
    people,
    peopleSearch,
    peopleGet
}