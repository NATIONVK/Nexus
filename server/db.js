import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
const filename=process.env.DATABASE_PATH||"./data/nexus.sqlite";
fs.mkdirSync(path.dirname(path.resolve(filename)),{recursive:true});
const db=new Database(filename);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.exec("CREATE TABLE IF NOT EXISTS conversations(id TEXT PRIMARY KEY,title TEXT NOT NULL,created_at TEXT NOT NULL,updated_at TEXT NOT NULL); CREATE TABLE IF NOT EXISTS messages(id TEXT PRIMARY KEY,conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,role TEXT NOT NULL CHECK(role IN ('user','assistant')),content TEXT NOT NULL,provider TEXT,model TEXT,created_at TEXT NOT NULL); CREATE INDEX IF NOT EXISTS idx_messages_conversation_created ON messages(conversation_id,created_at);");
export function listConversations(){return db.prepare("SELECT c.*,(SELECT content FROM messages m WHERE m.conversation_id=c.id ORDER BY m.created_at DESC LIMIT 1) AS preview FROM conversations c ORDER BY updated_at DESC LIMIT 100").all();}
export function getConversation(id){const row=db.prepare("SELECT * FROM conversations WHERE id=?").get(id);if(!row)return null;return {...row,messages:db.prepare("SELECT id,role,content,provider,model,created_at FROM messages WHERE conversation_id=? ORDER BY created_at").all(id)};}
export function ensureConversation(id,title,now){db.prepare("INSERT OR IGNORE INTO conversations(id,title,created_at,updated_at) VALUES(?,?,?,?)").run(id,title,now,now);}
export function addMessage(m){db.prepare("INSERT INTO messages(id,conversation_id,role,content,provider,model,created_at) VALUES(?,?,?,?,?,?,?)").run(m.id,m.conversation_id,m.role,m.content,m.provider??null,m.model??null,m.created_at);db.prepare("UPDATE conversations SET updated_at=? WHERE id=?").run(m.created_at,m.conversation_id);}
export function deleteConversation(id){return db.prepare("DELETE FROM conversations WHERE id=?").run(id).changes>0;}
