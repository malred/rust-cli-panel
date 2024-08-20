import "./App.css";
import Sidebar from './components/Sidebar'
import {Outlet} from "react-router-dom";

function App() {
    // async function greet() {
    //     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    //     setGreetMsg(await invoke("greet", {name}));
    // }
    return (
        <div className={'container'}>
            <Sidebar/>
            <Outlet/>
        </div>
    )
}

export default App;
