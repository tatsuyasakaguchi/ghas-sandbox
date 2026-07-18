// ⚠️ 意図的に脆弱なコード。CodeQL コードスキャンの検証専用。
// 本番では絶対に真似しないこと。
const express = require("express");
const { exec } = require("child_process");
const mysql = require("mysql"); // 実インストール不要（CodeQL は静的解析）

const app = express();
const db = mysql.createConnection({ host: "localhost", user: "root", database: "app" });

// 脆弱性1: SQL インジェクション（ユーザー入力を文字列連結でクエリに埋め込み）
app.get("/user", (req, res) => {
  const id = req.query.id;
  const query = "SELECT * FROM users WHERE id = " + id; // CodeQL: js/sql-injection
  db.query(query, (err, rows) => {
    res.json(rows);
  });
});

// 脆弱性2: コマンドインジェクション（ユーザー入力を shell に渡す）
app.get("/ping", (req, res) => {
  const host = req.query.host;
  exec("ping -c 1 " + host, (err, stdout) => { // CodeQL: js/command-line-injection
    res.send(stdout);
  });
});

// 脆弱性3: リフレクテッド XSS（サニタイズなしで入力を出力）
app.get("/hello", (req, res) => {
  res.send("<h1>Hello " + req.query.name + "</h1>"); // CodeQL: js/reflected-xss
});

app.listen(3000);
