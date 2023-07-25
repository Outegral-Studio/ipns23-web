export const fetcher = (url) => 
    fetch(url, {
        headers: {
            "X-Api-Header": "ipns_23_web"
        }
    }).then((res) => res.json());