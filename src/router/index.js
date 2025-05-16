import PaperCheckProLayout  from "@/pages/Layout";
import PaperInfo from "@/pages/PaperInfo";
import PaperInfoCompletion from "@/pages/PaperInfoCompletion";
import PaperInfoEnhancement from "@/pages/PaperInfoEnhancement";
import PaperInfoEditor from "@/pages/PaperInfoEditor";
import{createBrowserRouter} from "react-router-dom";
import PortalPag from "@/pages/Home";
import PaperCnInfo from "@/pages/PaperCnInfo";
import PaperCnInfoCompletion from "@/pages/PaperCnInfoCompletion";
import PaperCnInfoEnhancement from "@/pages/PaperCnInfoEnhancement";
import PaperCnInfoEditor from "@/pages/PaperCnInfoEditor";
const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <PaperCheckProLayout />,
            children: [
                {
                    index: true,
                    element: <PortalPag />

                },
                {
                    path: "/paper/info/query",
                    element: <PaperInfo />
                },
                {
                    path: "/paper/completion",
                    element: <PaperInfoCompletion />
                },
                {
                    path: "/paper/enhancement",
                    element: <PaperInfoEnhancement />
                },
                {
                    path:"/papercn/info/query",
                    element:<PaperCnInfo />
                },
                {
                    path:"/papercn/completion",
                    element:<PaperCnInfoCompletion />
                },
                {
                    path:"/papercn/enhancement",
                    element:<PaperCnInfoEnhancement />
                },
                {
                    path: "/paper/editor",
                    element: <PaperInfoEditor />
                },
                {
                    path: "/papercn/editor",
                    element: <PaperCnInfoEditor />
                    }
            ]   
        }
    ]
);
export default router;