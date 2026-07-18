# Secret scanning / Push protection の検証手順

初期コミットにはあえて本物形式のシークレットを入れていません
（履歴を汚さないため、かつ最初の push を通すため）。
リポジトリを push して **Settings → Code security で Secret scanning と Push protection を ON にしてから** 以下を試します。

## Push protection を体感する（おすすめ）

1. 適当なファイルに、パートナー連携済みフォーマットのダミートークンを1行追記する
   - 例: AWS アクセスキー形式 `AKIAIOSFODNN7EXAMPLE`（※これはAWS公式のドキュメント用サンプル値）
   - より確実に反応させたい場合は、Stripe / GitHub PAT などの形式を使う
2. `git add` → `git commit` → `git push`
3. **push がブロックされ**、「シークレットが検出されました」という画面が出れば成功
   - 「これはテストなので許可」と選べば push を通すこともできる（＝挙動確認できる）

## Secret scanning アラートを見る

Push protection を OFF にした状態で上記トークンを含む commit を push すると、
ブロックはされず **Security → Secret scanning にアラート**が上がる。
どちらの挙動も切り替えて確認するのがおすすめ。
