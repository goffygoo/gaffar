import axios from "axios";
import { SERVER } from "./config.js";

export const preventServerFromSleeping = () => {
    setInterval(() => {
        try {
            axios.get(SERVER)
        } catch (err) {

        }
    }, 300000)
}