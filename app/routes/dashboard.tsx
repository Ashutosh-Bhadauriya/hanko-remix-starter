import { useLoaderData, useNavigate } from "@remix-run/react";

import {
    Suspense,
    useEffect,
    useState,
} from "react";
import {
    type Hanko,
    register,
} from "~/utils/hanko.client";


export const loader = () => {
    return { hankoUrl: process.env.HANKO_API_URL };
};

function HankoProfile() {
    let data = useLoaderData<typeof loader>();
    let hankoUrl = data.hankoUrl || '';

    const [hanko, setHanko] = useState<Hanko>();
    const navigate = useNavigate();


    useEffect(() => {
        register(hankoUrl)
            .catch((error: Error) => {
                console.error(error.message);
            })
            .then((result) => {
                if (result) {
                    setHanko(result.hanko);
                }
            });
    }, [hankoUrl]);



    const logout = async () => {
        try {
            await hanko?.user.logout();
            navigate("/login");
            return;
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div className="">
            <Suspense fallback={"Loading..."}>
                <hanko-profile />
            </Suspense>
            <div>
                <button onClick={logout}>Logout</button>
                <button onClick={() => navigate("/protected")}>Access Protected page</button>
            </div>
        </div>
    )
}


const Dashboard = () => {

    return (
        <div>
            <HankoProfile />
        </div>
    )
}

export default Dashboard