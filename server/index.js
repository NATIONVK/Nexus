import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { randomUUID } from "node:crypto";
import { addMessage,deleteConversation,ensureConversation,getConversation,listConversations } from "./db.js";
import { generateReply,providerStatus } from "./providers.js";
const app=express();
const port=Number(process.env.PORT||8787);
app.use(helmet());
app.use(cors({origin:(process.env.CORS_ORIGIN||"http://localhost:5173").split(",").map(x=>x.trim())}));
app.use(express.json({limit:"256kb"}));
app.use("/api/",rateLimit({windowMs:60000,limit:45,standardHeaders:"draft-7",legacyHeaders:false}));
app.get("/api/health",(_req,res)=>res.json({ok:true,service:"NEXUS AI API",version:"0.1.0"}));
app.get("/api/providers",(_req,res)=>res.json(providerStatus()));
app.get("/api/conversations",(_req,res)=>res.json(listConversations()));
app.get("/api/conversations/:id",(req,res)=>{const item=getConversation(req.params.id);if(!item)return res.status(404).json({error:"Conversation not found."});res.json(item);});
app.delete("/api/conversations/:id",(req,res)=>{if(!deleteConversation(req.params.id))return res.status(404).json({error:"Conversation not found."});res.status(204).end();});
app.post("/api/chat",async(req,res)=>{
 const {conversationId,message,provider}=req.body||{};
 if(typeof message!=="string"||!message.trim()||message.length>8000)return res.status(400).json({error:"Message must contain 1–8,000 characters."});
 if(provider&&!["gemini","openai"].includes(provider))return res.status(400).json({error:"Unknown provider."});
 const id=conversationId||randomUUID(),now=new Date().toISOString(),existing=getConversation(id);
 if(conversationId&&!existing)return res.status(404).json({error:"Conversation not found."});
 ensureConversation(id,message.trim().slice(0,60),now);
 addMessage({id:randomUUID(),conversation_id:id,role:"user",content:message.trim(),created_at:now});
 try{
  const history=[...(existing?.messages||[]),{role:"user",content:message.trim()}].slice(-20);
  const result=await generateReply({provider,messages:history});
  const reply={id:randomUUID(),conversation_id:id,role:"assistant",content:result.text,provider:result.provider,model:result.model,created_at:new Date().toISOString()};
  addMessage(reply);res.json({conversationId:id,reply,provider:result.provider,model:result.model});
 }catch(error){res.status(502).json({conversationId:id,error:error.message||"AI provider request failed.",userMessageSaved:true});}
});
app.listen(port,"0.0.0.0",()=>process.stdout.write("NEXUS API listening on :"+port+"\n"));
