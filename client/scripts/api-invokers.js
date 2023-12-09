const API_ENDPOINT = "http://localhost:8080";
const API_ROOT = `${API_ENDPOINT}/api/books`;

async function  getdata()
{
    const url = API_ROOT;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });

    return response.ok ? await response.json() : null;
}



async function newdataentry(data) {

    let url = `${API_ROOT}`
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    return response.ok ? await response.json() : null;
}


async function updateentry(data,id)
{
    let url=`${API_ROOT}/${id}`
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.ok ? await response.json() : null;
}