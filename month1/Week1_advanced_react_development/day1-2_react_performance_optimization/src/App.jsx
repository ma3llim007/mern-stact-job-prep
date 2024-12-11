import "./App.css";
import CallBackComponent from "./components/CallBackComponent";
import DebouncedSearch from "./components/DebouncedSearch";
import MemoComponest from "./components/MemoComponent";
import MemoHookComponent from "./components/MemoHookComponent";
import ReactWindowComponent from "./components/ReactWindowComponent";
import ZustandComponent from "./components/ZustandComponent";

function App() {
    const title = "React Memo";
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <>
            <DebouncedSearch />
        </>
    );
}

export default App;
