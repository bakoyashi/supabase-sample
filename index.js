// 「dotenv」パッケージを読み込みます。「dotenv」は、.envファイルから環境変数を読み込むためのパッケージです。
require('dotenv').config();

// 「express」、「supabase-js」パッケージを読み込みます。「express」はWebサーバーを構築するためのフレームワーク、「supabase-js」はSupabaseと通信するためのクライアントライブラリです。
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

// Expressアプリケーションを生成します。
const app = express();

// テンプレートエンジンとして「ejs」を設定します。これにより、サーバー側でHTMLを動的に生成することができます。
app.set('view engine', 'ejs');

// 環境変数からSupabaseのURLと公開鍵を取得します。
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Supabaseのクライアントを生成します。これにより、JavaScriptからSupabaseと通信できます。
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ルートパス（'/'）へのGETリクエストが来たときの処理を定義します。
app.get('/', async (req, res) => {

  // Supabaseから全てのデータを取得します。
  let { data, error } = await supabase
    .from('your-table-name')
    .select('*');

  // データ取得に失敗した場合はエラーメッセージをコンソールに表示します。
  if (error) {
    console.log('Error: ', error);
    return res.render('index', { data: [] });
  } else {
    // データ取得に成功した場合はそのデータをレンダリングします。
    return res.render('index', { data: data });
  }
});

// 環境変数からポート番号を取得します。環境変数が定義されていない場合は3000をデフォルト値として使用します。
const PORT = process.env.PORT || 3000;

// Expressアプリケーションを起動し、指定したポートで待ち受けを開始します。
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
