import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";


const ContentContext = createContext({
    url: '',
    onClickMarkAsComplete: () => { }  
})