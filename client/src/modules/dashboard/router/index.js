import DashboardView from "../DashboardView.vue";
import DashboardUser from "../pages/user/DashboardUser.vue";
import DashboardHost from "../pages/host/DashboardHost.vue";


export default [
	{
		path: "/dashboard",
		component: DashboardView,
		children: [
			{
				path: "user",
				component: DashboardUser,
			},
			{
				path: "host",
				component: DashboardHost,
			},
		],
	},
];
