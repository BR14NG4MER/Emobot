import React from "react"
import Sidebar from "../components/Sidebar"

export default function emobot() {
    return(
        <div className="grid grid-cols-2 w-2/6">
            <div>
                <Sidebar/>
            </div>
            <div>
                Hola
            </div>
        </div>
    )
}