import { createContext } from "react";
import { useTGBotUtils } from "../api/TGBotAPIUtils";

//create empty context
export const TGBotContext = createContext(null);

export function TGBotProvider ({children}) {
    const botUtils = useTGBotUtils()
    return (
        <TGBotContext.Provider value = {botUtils}>
            {children}
        </TGBotContext.Provider>
    )
}