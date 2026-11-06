import test from "node:test";
import assert from "node:assert/strict";
import {providerStatus,generateReply} from "../server/providers.js";
test("provider status never exposes credentials",()=>{const r=providerStatus({GEMINI_API_KEY:"secret-value",GEMINI_MODEL:"test-model",OPENAI_API_KEY:""});assert.deepEqual(r.gemini,{configured:true,model:"test-model"});assert.deepEqual(r.openai,{configured:false,model:"gpt-4.1-mini"});assert.equal(JSON.stringify(r).includes("secret-value"),false);});
test("unsupported provider is rejected",async()=>{await assert.rejects(()=>generateReply({provider:"unknown",messages:[]},{}),/Unsupported provider/);});
test("missing Gemini key gives actionable error",async()=>{await assert.rejects(()=>generateReply({provider:"gemini",messages:[]},{}),/GEMINI_API_KEY/);});
test("missing OpenAI key gives actionable error",async()=>{await assert.rejects(()=>generateReply({provider:"openai",messages:[]},{}),/OPENAI_API_KEY/);});
