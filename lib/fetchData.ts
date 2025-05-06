import axios from "axios";
import axiosInstance from "./axiosInstance";
import { unstable_cache } from "next/cache";



export const getAttacks = unstable_cache(async ()=>{
    try{
        const res = await axiosInstance.get(`attack`);
        if(res?.status === 200){
            return {
                success:true,
                data:res?.data
            }
        }
    }catch(error){
        if (axios.isAxiosError(error) && error?.response) {
            return {
                success:false,
                message:error?.response?.data?.message
            }
          } else {
            return {
                success:false,
                message:"Something went wrong"
            }
          }
    }
},['attacks'],{tags:['attacks']})