'use server';

import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const login = async (phone:string,password:string)=>{
    try{
        const res = await axiosInstance.post(`auth/login`,{phone,password});
        if(res?.status === 200){
            (await cookies()).set("token",res?.data?.token,{
                httpOnly:true,
                maxAge: 60 * 60 * 24, // 1 day
                secure:true,
                sameSite:"lax"
            })
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

export const register = async (userName:string,phone:string,password:string)=>{
    try{
        const res = await axiosInstance.post(`auth/signUp`,{userName,phone,password});
        if(res?.status === 201){
            return {
                success:true,
                message:"User Crreated Successfully"
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

export const getSession = async ()=>{
    const token = (await cookies())?.get("token")?.value;
    try{
        const res = await axiosInstance.get('auth/me',{
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
}


export const logout = async ()=>{
    try{
        (await cookies()).set("token", "", {
            httpOnly: true,
            maxAge: 0, // Expire immediately
            secure: true,
            sameSite: "lax"
        });
    }catch(error){
        return {
            success:false,
            message:(error as Error)?.message || "Something went wrong"
        }
    }
}

export const updateUser = async (id:string,userName:string)=>{
    try{
        const res = await axiosInstance.put(`auth/${id}`,userName);
        if(res?.status === 200){
            revalidateTag("users");
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

export const deleteUser = async (id:string)=>{
    try{
        const res = await axiosInstance.delete(`auth/${id}`);
        if(res?.status === 200){
            (await cookies()).set("token", "", {
                httpOnly: true,
                maxAge: 0, // Expire immediately
                secure: true,
                sameSite: "lax"
            });
            revalidateTag("users");
            return {
                success:true,
                message:"User deleted successfully"
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


