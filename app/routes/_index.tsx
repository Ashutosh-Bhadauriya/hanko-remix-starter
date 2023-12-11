import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", display: "flex", justifyContent: "center", alignItems:"center", marginTop: "100px"}}>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}
