import { reactive } from "vue";

const user = reactive({
	isSignedIn: false,
	name: "",
	role: "",
	jwt: "",
});

function setUser({ name, role, jwt }) {
	user.isSignedIn = true;
	user.name = name;
	user.role = role;
	user.jwt = jwt;
}

function unsetUser() {
	user.isSignedIn = false;
	user.name = "";
	user.role = "";
	user.jwt = "";
	localStorage.removeItem("isSignedIn");
	localStorage.removeItem("jwt");
}

export default function useUserStore() {
	return { user, setUser, unsetUser };
}
