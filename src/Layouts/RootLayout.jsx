import { Outlet } from "react-router-dom";
import Aside from "../components/Aside";

export default function RootLayout(){
    return (
        <div id="container">
        <Aside/>
        <main className="main">
            <header className="header">
                <h1 className="title">Today <span className="actual_date">2024-04-22</span></h1>
            </header>
            <main className="content">
               <Outlet/>
            </main>
        </main>
    </div>
    )
}