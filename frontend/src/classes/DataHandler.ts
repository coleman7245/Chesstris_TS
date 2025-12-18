class DataHandler {
    //NOTE: URL should take the form of 'http://mainurl/api/'. Add a verifier function to ensure proper input.

    public static async get(data : Object, apiURL : string) : Promise<any> {
        try {
            const response : Response = await fetch(`${apiURL}`,
                {
                    method : 'GET',
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(data)
                }
            );

            if (!response.ok)
                throw new Error(`${response.status}`);

            const convertedData : Promise<any> = await response.json();

            return convertedData;
        }
        catch(err) {
            console.log(err);
        }
    }

    public static async patch(data : Object, apiURL : string, instance : string) : Promise<any> {
        try {
            await fetch(`${apiURL}/${instance}`, 
                {
                    method : 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                    body : JSON.stringify(data)
                }
            );
        }
        catch(err) {
            console.log(err);
        }
    }

    public static async post(data : Object, apiURL : string) : Promise<any> {
        try {
            await fetch(`${apiURL}`, 
                {
                    method : 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                    body : JSON.stringify(data)
                }
            );
        }
        catch(err) {
            console.log(err);
        }
    }



    public static async put(data : Object, apiURL : string, instance : string) : Promise<any> {
        try {
            await fetch(`${apiURL}/${instance}`, 
                {
                    method : 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                    body : JSON.stringify(data)
                }
            );
        }
        catch(err) {
            console.log(err);
        }
    }
}

export default DataHandler;