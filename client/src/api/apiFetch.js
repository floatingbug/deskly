import useUserStore from "@/stores/useUserStore.js";


const { user } = useUserStore();
const API_URL = import.meta.env.VITE_API_URL;


export default async function apiFetch({ path, options, addJwt = false }) {
    const url = `${API_URL}${path}`;

    if (addJwt && user.isSignedIn) options.headers.authorization = user.jwt;
    else if (addJwt) options.headers.authorization = localStorage.getItem("jwt");

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error);
    }
}
