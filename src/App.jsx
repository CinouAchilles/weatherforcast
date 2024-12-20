import { useState, useEffect } from "react";
import "./App.css";
import Weather from "../component/Weather";

export default function App() {
    // State for the background image
    const [bgImage, setBgImage] = useState("");
    let [wea , upweath] = useState("")
    const weatherType = wea; 

    useEffect(() => {
        // Update the background based on the weather type
        if (weatherType === "sunny" || weatherType == "clear sky") {
            setBgImage("url('imgsicons/sunnybest.jpg')");
        } else if (weatherType === "rain" || weatherType == "shower rain") {
            setBgImage("url('imgsicons/droprain.jpg')");
        } else if (weatherType === "snow" || weatherType === "light snow") {
            setBgImage("url('imgsicons/snowbackgr.jpg')");
        } else if (weatherType === "clouds" || weatherType == "scattered clouds" || weatherType == "broken clouds" || weatherType == "overcast clouds") {
            setBgImage("url('imgsicons/cloudbackg.jpg')");
        } 
        else if (weatherType === "thender" || weatherType == "thunderstorm") {
            setBgImage("url('imgsicons/cloudthender.jpg')");
        } 
        else if (weatherType == "mist") {
            setBgImage("url('imgsicons/cloudthender.jpg')");
        } 
        else {
            setBgImage("url('imgsicons/sunfog.jpg')");
        }
    }, [weatherType]); 

    const dynamicStyle = {
        backgroundImage: bgImage,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: "100vh",
        fontFamily: "Poppins, sans-serif",
        color: "#ffffff",
        overflowY: "auto",
    };
    let alr = (data)=>{
        upweath(data);
    }
    return (
        <div style={dynamicStyle}>
            <Weather func2={alr}/>
        </div>
    );
}













