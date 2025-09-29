import { createRouter, createWebHistory } from "vue-router";
import homeRoutes from "../modules/home/router";
import spacesRoutes from "../modules/spaces/router";
import dashboardRoutes from "../modules/dashboard/router";
import bookSpaceRoutes from "../modules/bookSpace/router";
import authRoutes from "../modules/auth/router";
import addSpaceRoutes from "../modules/addSpace/router";
import bookingRoutes from "../modules/booking/router";
import inboxRoutes from "../modules/inbox/router";
import spaceDetailsRoutes from "../modules/spaceDetails/router";
import editSpaceRoutes from "../modules/editSpace/router";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...homeRoutes,
        ...spacesRoutes,
        ...dashboardRoutes,
        ...bookSpaceRoutes,
        ...authRoutes,
        ...addSpaceRoutes,
		...bookingRoutes,
		...inboxRoutes,
		...spaceDetailsRoutes,
		...editSpaceRoutes,
    ],
});

export default router;
