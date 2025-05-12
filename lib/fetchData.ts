import axios from "axios";
import { unstable_cache } from "next/cache";
import { baseUrl } from "./utils";
import axiosInstance from "./axiosInstance";



export const getAttacks = unstable_cache(async (page:number,limit:number,token:string)=>{
    try{
        const res = await axios.get(`${baseUrl}attack?page=${page}&limit=${limit}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
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

export const getUsers = unstable_cache(async (page:number,limit:number,token:string)=>{
    try{
        const res = await axios.get(`${baseUrl}auth?page=${page}&limit=${limit}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
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
},['users'],{tags:['users']})

export const getQuizes = unstable_cache(async (token:string)=>{
    try{
        const res = await axios.get(`${baseUrl}quiz`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
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
},['quizes'],{tags:['quizes']});


export const getFeedbacks = unstable_cache(async (token:string)=>{
    try{
        const res = await axios.get(`${baseUrl}feedback`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
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
},['feedbacks'],{tags:['feedbacks']});



export const getQuiz = async (id:string)=>{
    try{
        const res = await axiosInstance.get(`${baseUrl}quiz/${id}`);
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
}
export const getAttacQuiz = async (id:string)=>{
    try{
        const res = await axiosInstance.get(`${baseUrl}attack/${id}/question`);
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
}


