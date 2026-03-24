import { getConnectedClient } from "../database.mjs";

const getCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("todosdb").collection("todos");
    return collection;
};

export default getCollection;