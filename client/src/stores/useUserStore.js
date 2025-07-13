import {reactive} from "vue";


const user = reactive({
	isSignedIn: false,
	name: "",
	role: "",
	jwt: "",
	bookings: [],
});


function setUser({name, role, jwt}){
	user.isSignedIn = true;
	user.name = name;
	user.role = role;
	user.jwt = jwt;
}

function unsetUser(){
	user.isSignedIn = false;
	user.name = "";
	user.role = "";
	user.jwt = "";
}

function setUserStoreBookings(bookings){
	user.bookings = bookings;
}


export default function useUserStore(){
	return {user, setUser, unsetUser, setUserStoreBookings};
}
