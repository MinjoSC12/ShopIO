const url = "https://6450255dba9f39c6ab74c6fa.mockapi.io/clients";

export const post = async (body) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            alert("Hubo un error");
            return;
        }

        const data = await response.json();

    }
    catch (error){
        console.error(error);
    }
};