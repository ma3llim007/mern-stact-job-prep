import { Suspense } from "react";
import "./App.css";
import HeavyComputation from "./components/HeavyComputation";
import UserComponent from "./components/UserComponent";

function App() {
    return (
        <>
            <Suspense fallback={<p>Loading....</p>}>
                <UserComponent />
            </Suspense>
        </>
    );
}

export default App;
