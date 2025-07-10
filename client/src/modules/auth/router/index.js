import AuthView from "../AuthView.vue";
import SignIn from "../pages/SignIn.vue";
import SignUp from "../pages/SignUp.vue";


export default [
	{
		path: "/auth",
		component: AuthView,
		children: [
			{
				path: "sign-in",
				component: SignIn,
			},
			{
				path: "sign-up",
				component: SignUp,
			},
		],
	}
];
