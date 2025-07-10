import {reactive} from "vue";


const user = reactive({
	isSignedIn: false,
	name: "",
	role: "",
});


export default function useUserStore(){
	return {user};
}
