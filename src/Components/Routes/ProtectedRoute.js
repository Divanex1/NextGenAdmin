// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { getData } from "../Services/api";

// const ProtectedRoute = ({ component: Component }) => {
//     const navigate = useNavigate();
//     const [isAuthenticated, setIsAuthenticated] = useState(null);

//     useEffect(() => {
//         const validateToken = async () => {
//             const token = localStorage.getItem("adminToken");
//             if (!token) {
//                 setIsAuthenticated(false);
//                 navigate("/login", { replace: true });
//                 return;
//             }
//             // try {
//             //     const res = await getData("/admin/categories");
//             //     if (res?.status) {
//             //         setIsAuthenticated(true);
//             //     } else {
//             //         throw new Error("Invalid token");
//             //     }
//             // } catch (error) {
//             //     console.error("Token validation error:", error);
//             //     localStorage.removeItem("adminToken");
//             //     setIsAuthenticated(false);
//             //     toast.error("Token expired. Please log in again.", { toastId: "token-Id" });
//             //     navigate("/login", { replace: true });
//             // }
//         };

//         validateToken();
//     }, [navigate]);

//     if (isAuthenticated === null) {
//         return <div className="loading-spinner">Loading...</div>;
//     }

//     return isAuthenticated ? <Component /> : null;
// };

// export default ProtectedRoute;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getData } from "../Services/api";
// import { toast } from "react-toastify";

const ProtectedRoute = ({ component: Component }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("adminToken");
            if (!token) {
                setIsAuthenticated(false);
                navigate("/login", { replace: true });
                return;
            }

            // try {
            //     const res = await getData("/group-viewset");
            //     if (res?.code === 200) {
            //         setIsAuthenticated(true);
            //     } else {
            //         throw new Error("Invalid token");
            //     }
            // } catch (error) {
            //     const toastId = "token-Id"
            //     console.log("Token validation error:", error);
            //     localStorage.removeItem("token");
            //     setIsAuthenticated(false);
            //     if (!toast.isActive(toastId)) {
            //         toast.error("Token expired. Please log in again.",{toastId:toastId});
            //     }
            //     navigate("/login", { replace: true });
            // }
        };

        validateToken();
    }, [navigate]);
    // Set isAuthenticated to true if token exists (immediate check)
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);
    if (isAuthenticated === null) {
        return <p>Loading...</p>;
    }

    return isAuthenticated ? <Component /> : null;
};

export default ProtectedRoute;
