import { createRouter, createWebHistory } from "vue-router";
import homeRoutes from "../modules/home/router";
import spacesRoutes from "../modules/spaces/router";
import dashboardRoutes from "../modules/dashboard/router";
import bookSpaceRoutes from "../modules/bookSpace/router";
import authRoutes from "../modules/auth/router";
import addSpaceRoutes from "../modules/addSpace/router";
import bookingManagementRoutes from "../modules/bookingManagement/router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...homeRoutes,
        ...spacesRoutes,
        ...dashboardRoutes,
        ...bookSpaceRoutes,
        ...authRoutes,
        ...addSpaceRoutes,
        ...bookingManagementRoutes,
    ],
});

export default router;
