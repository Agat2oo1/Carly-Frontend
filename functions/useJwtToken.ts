import { useRecoilState } from "recoil";
import { jwtToken } from "../recoil/jwtToken"
import UserData from "../models/UserData";
import { useRouter } from "next/router";
import { decode } from 'base-64';
import { useEffect, useState } from "react";

export const useJwtToken = () => {
  const [token, _] = useRecoilState(jwtToken);
    
  return token;
}

export const useJwtTokenData = () => {
  const token = useJwtToken();
  if (token === undefined)
    return undefined;
  return JSON.parse(decode(token.split('.')[1])) as UserData;
}

export const useTokenExpirationTime = () => {
  const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);
  const userData = useJwtTokenData();
  const now = Math.floor(Date.now() / 1000);

  const calcTimeLeft = () => {
    const now = Math.floor(Date.now() / 1000);
    const left = (userData?.exp ?? 0) - now;
    setTimeLeft(left);
  }

  useEffect(() => {
    if (userData !== undefined) {
      const timer = setInterval(calcTimeLeft, 1000);
      return () => clearInterval(timer);
    }
  }, [userData])

  if (timeLeft === undefined)
    return "Loading..."
  
  const hours = String(Math.floor(timeLeft / 3600));
  const minutes = String(Math.floor((timeLeft % 3600) / 60));
  const seconds = String(timeLeft % 60);

  return hours.padStart(2, '0') + ':' + minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');
}
