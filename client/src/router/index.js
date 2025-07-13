import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from "../modules/home/router";
import spacesRoutes from "../modules/spaces/router";
import dashboardRoutes from "../modules/dashboard/router";
import bookSpaceRoutes from "../modules/bookSpace/router";
import authRoutes from "../modules/auth/router";
import myBookingRoutes from "../modules/myBookings/router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	  ...homeRoutes,
	  ...spacesRoutes,
	  ...dashboardRoutes,
	  ...bookSpaceRoutes,
	  ...authRoutes,
	  ...myBookingRoutes,
  ],
})

export default router
