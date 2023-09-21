
const baseUrl = "http://127.0.0.1:8080";

export const Operations = {
    getAll: 'Get All',
    get: 'Get by ID',
    delete: 'Delete by ID',
    save: 'Save',
}

export const Entities = {
    Film: "film",
    Language: "language",
    Actor: "actor",
    Category: "category",
    Address: "address",
    Customer: "customer",
    Store: "store",
    City: "city",
    Rental: "rental",
    Inventory: "inventory",
}

const Method = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE',
}


export async function getAll(entity) {
    const response = await fetch(baseUrl + '/' + entity);

    const json = await response.json();
    return json;
}

export async function getAllFilmsByCategoryId(categoryId) {

    const response = await fetch(baseUrl + '/film/category?id=' + categoryId);

    const json = await response.json();

    return json;
}

export async function getRandomFilmSelection(limit) {

    const response = await fetch(baseUrl + '/film/random/' + limit);

    const json = await response.json();

    return json;
}
export async function getPopularFilms(limit) {

    const response = await fetch(baseUrl + '/film/popular/' + limit);

    const json = await response.json();

    return json;
}

export async function getCustomerByEmail(email) {
    console.log(email);
    try {
        const response = await fetch(baseUrl + '/' + Entities.Customer + "/email",
            {
                headers:
                {
                    'Content-Type': 'application/json',
                },
                method: Method.POST,
                body: JSON.stringify({ "email": email })
            });

        const json = await response.json();

        return json;

    }
    catch (e) {
        console.error(e);
        return null;
    }
}
export async function getInventoriesByFilmIdAndStoreId(filmId, storeId) {

    try {
        const response = await fetch(baseUrl + '/' + Entities.Inventory + "?filmId=" + filmId + "&storeId=" + storeId,
            {
                method: Method.GET,
            });

        const json = await response.json();

        return json;

    }
    catch (e) {
        console.error(e);
        return null;
    }
}

export async function save(entity, obj) {

    try {
        const response = await fetch(baseUrl + '/' + entity,
            {
                headers:
                {
                    'Content-Type': 'application/json',
                },
                method: Method.POST,
                body: JSON.stringify(obj)
            });

        const json = await response.json();
        return json;
    }
    catch (e) {
        return null;
    }
}

export async function getById(entity, id) {

    const response = await fetch(baseUrl + '/' + entity + '/' + id,
        {
            method: Method.GET
        });

    const json = await response.json();
    return json;
}

export async function deleteById(entity, id) {

    await fetch(baseUrl + '/' + entity + '/' + id,
        {
            method: Method.DELETE
        });
}