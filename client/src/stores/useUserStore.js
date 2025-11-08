import { reactive } from "vue";

const user = reactive({
	_id: "",
	isSignedIn: false,
	name: "",
	role: "",
	jwt: "",
});

function setUser({ name, role, jwt, _id }) {
	user.isSignedIn = true;
	user._id= _id;
	user.name = name;
	user.role = role;
	user.jwt = jwt;
}

function unsetUser() {
	user.isSignedIn = false;
	user._id = "";
	user.name = "";
	user.role = "";
	user.jwt = "";
	localStorage.removeItem("isSignedIn");
	localStorage.removeItem("jwt");
}

export default function useUserStore() {
	return { user, setUser, unsetUser };
}
