TS_TextComposite
================
## 概要
canvasに文字合成をおこなうテスト

## 検証内容
- canvasにinputから取得した文字列を合成、画像として出力する
- retinaで画像が引き延ばされてしまう対策
- 縦書きの検証(プレビューエリアとcanvasの差をプレビュー側で調整)
- スライダー・ボタンサイズ変更を追加したもの
- iOS縦書きで絵文字がうまく表現できないのを修正
- プレビューエリアをcanvasにする
- 自由度の高い斜め書き

## 検証先URL
http://bijutsushuppannetworks-inc.github.io/TS_TextComposite/

## 懸念事項
- 縦書き難しい。プレビューとcanvas合成後の画像の見た目を合わせるのが難しい。

## 参考
### iOS絵文字対応
iOSでの絵文字コード表  
http://punchdrunker.github.io/iOSEmoji/table_html/index.html
JavaScript Stringでサロゲートペアを扱う  
http://teppeis.hatenablog.com/entry/2014/01/surrogate-pair-in-javascript
