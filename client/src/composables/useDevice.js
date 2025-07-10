import {reactive} from "vue";


const device = reactive({
	size: 0,
});


device.size = window.innerWidth;

window.addEventListener("resize", () => {
	device.size = window.innerWidth;
});


export default function useDevice(){
	return {device};
}
