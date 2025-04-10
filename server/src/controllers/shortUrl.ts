import express, { Request, Response } from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async(req:Request,res:Response)=>{
    try{
        const { fullUrl } = req.body;
        const urlFound = await urlModel.find({fullUrl: fullUrl });
        if(urlFound.length > 0){
            res.status(409).send({message:"This Url Is already here in a data please have a look on Table Data",data: urlFound});
        }else{
            const shortUrl = await urlModel.create({fullUrl});
            res.status(201).send(fullUrl);
        }
    }catch (error){
        res.status(500).send({"message" : "Something gone wrong",error});
    }
}
export const getAllUrl = async(req:Request,res:Response)=>{
    try{
        const shortUrls = await urlModel.find().sort({ createdAt:-1 });
        if(shortUrls.length < 0 ){
            res.status(404).send({"message":"shortUrl not found"});
        }else{
            res.status(200).send(shortUrls);
        }
    }catch(error){
        res.status(500).send({"message" : "Something gone wrong"});
    }
}
export const getUrl = async(req:Request,res:Response)=>{
    try{
        const shortUrl = await urlModel.findOne({shortUrl: req.params.id});
        if(!shortUrl){
            res.status(404).send({"message":"fullUrl not found"});
        }else{
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`);
        }
    }catch(error){  
        res.status(500).send({"message" : "Something gone wrong"});
    }
    
}
export const deleteUrl = async(req:Request,res:Response)=>{
    try{
        const shortUrl = await urlModel.findByIdAndDelete({ _id : req.params.id});
        if(shortUrl){
            res.status(200).send({"message":"Deleted"});
        }
    }catch(error){
        res.status(500).send({"message" : "Something gone wrong"});
    }
}   