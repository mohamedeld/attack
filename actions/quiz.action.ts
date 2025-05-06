'use server';

import axiosInstance from "@/lib/axiosInstance";
import { QuizData } from "@/lib/validations";
import axios from "axios";
import { revalidateTag } from "next/cache";


export const createQuiz = async (data:QuizData)=>{
    try{
        const res = await axiosInstance.post(`quiz`,data);
        if(res?.status === 201){
            revalidateTag("quizes");
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

export const updateQuiz = async (id:string,data:QuizData)=>{
    try{
        const res = await axiosInstance.put(`quiz/${id}`,data);
        if(res?.status === 200){
            revalidateTag("quizes");
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
export const deleteQuiz = async (id:string)=>{
    try{
        const res = await axiosInstance.delete(`quiz/${id}`);
        if(res?.status === 200){
            revalidateTag("quizes");
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