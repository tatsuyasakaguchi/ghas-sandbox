# ghas-sandbox（GitHub Advanced Security 検証用）

> ⚠️ **このリポジトリは意図的に脆弱です。** GitHub Advanced Security（コードスキャン / シークレットスキャン / Dependabot）の
> 動作検証だけを目的にした使い捨てサンドボックスです。**本番で使ったり、参考にしたりしないでください。**

## 何を検証できるか

| 機能 | 引っかけネタ | 期待される結果 |
|---|---|---|
| CodeQL コードスキャン | `src/app.js` の SQL インジェクション / コマンドインジェクション | Security → Code scanning にアラート |
| Dependabot | `package.json` の古い脆弱依存（lodash / minimist） | Security → Dependabot にアラート＋修正PR |
| Secret scanning / Push protection | `docs/secret-test.md` の手順で後から検証 | push がブロック、または Security にアラート |

## 有効化手順（push 後に GitHub 上で）

Settings → **Code security** で以下を ON:

1. **Dependabot alerts** ＋ **Dependabot security updates**
2. **Secret scanning** ＋ **Push protection**
3. **Code scanning** → CodeQL → 付属の `.github/workflows/codeql.yml` が走る（または Default setup を有効化）
