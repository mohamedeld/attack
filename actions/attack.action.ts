"use server";

import axiosInstance from "@/lib/axiosInstance";
import { AttackData } from "@/lib/validations";
import axios from "axios";
import { revalidateTag } from "next/cache";

export const createAttack = async (data:AttackData)=>{
    try{
        const res = await axiosInstance.post(`attack`,data);
        if(res?.status === 201){
            revalidateTag("attacks");
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
export const updateAttack = async (id:string,data:AttackData)=>{
    try{
        const res = await axiosInstance.put(`attack/${id}`,data);
        if(res?.status === 200){
            revalidateTag("attacks");
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
export const deleteAttack = async (id:string)=>{
    try{
        const res = await axiosInstance.delete(`attack/${id}`);
        if(res?.status === 200){
            revalidateTag("attacks");
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

export const createFeedback = async (user:string,content:string)=>{
    try{
        const res = await axiosInstance.post(`feedback`,{
            user,content
        });
        if(res?.status === 201){
            revalidateTag("feedbacks");
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