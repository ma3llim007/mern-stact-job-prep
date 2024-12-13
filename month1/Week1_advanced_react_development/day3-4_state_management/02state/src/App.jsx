import { Suspense } from "react";
import "./App.css";
import RecoilCounter from "./components/RecoilCounter";
import UserData from "./components/UserData";
import Zustand from "./components/Zustand";

function App() {
    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <UserData />
            </Suspense>
        </>
    );
}

export default App;
