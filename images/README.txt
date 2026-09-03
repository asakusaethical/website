■ 写真（このフォルダに以下のファイル名で置くと、そのまま表示されます）
　未設置の場合は、ダミーの枠が表示されます。

member01.jpg     … 鈴木 那美さん（配置済み・水色の着物）
member02.jpg     … 宮本 紗代さん（配置済み・紺の着物）
member03.jpg     … 金子 菜々美さん（配置済み・生成りの着物）

　※ 全身写真のため、CSSで顔まわりを拡大して丸く切り抜いています。
　　 css/style.css の「.member:nth-child(n) .member__photo img」で
　　 object-position（表示位置）と transform: scale（寄り具合）を調整できます。
　　 明るさは .member__photo img の filter: brightness(1.08) で少し持ち上げています。
（活動セクションは写真を使わない一覧レイアウトに変更したため、
　activity01〜03.jpg は不要になりました。写真は各イベントの
　ポップアップ内〈images/events/〉で見せています）
ogp.jpg          … SNSシェア用画像　1200×630px

logo.png         … ロゴ（配置済み・1080×1080px）
　　　　　　　　　　 ヘッダー／フッター／ファビコンに使用しています。
　　　　　　　　　　 白背景のPNGのため、ヘッダーでは mix-blend-mode: multiply、
　　　　　　　　　　 フッター（濃色背景）では白い丸の中に置いています。

※ ファイルサイズは1枚300KB以下を目安に圧縮してください（表示速度のため）。


■ photos/（活動写真・いただいた10点）
　10点すべてを、ヒーロー下部の流れる帯で使用しています。

kimono-trio.jpg    … 着物3人・浅草寺
umeshigoto.jpg     … 梅仕事の会
temple-reading.jpg … 本堂での読書
natsumoude.jpg     … 夏詣・浴衣のみなさん
dokushokai.jpg     … カフェでの読書会
hanami-tea.jpg     … 桜の下のお茶会
machiaruki.jpg     … まち歩きの集合写真
study.jpg          … 勉強会
kimono-group.jpg   … 着物7人・浅草寺前
temple-books.jpg   … 本堂での読書会の集合写真

※ 帯の写真を差し替える・増やすときは、index.html の .marquee__track の中に
　 同じ順番で2組ならべてください（2組で1周ぶんになり、途切れずにループします）。

※ 現状は撮影データのままで1枚あたり0.3〜1.7MBあります。表示速度のため、
　 長辺1600px・300KB以下を目安に圧縮したものへ差し替えるのがおすすめです
　 （同じファイル名で上書きすればそのまま反映されます）。


■ events/（イベント詳細ポップアップの写真）
　活動セクションの＃タグを押すと開くポップアップで使っています。

fukufuku-rack.jpg     … 思い出タグのついた洋服のラック（横長・上部に大きく表示）
fukufuku-tag.jpg      … 思い出タグを書き込むところ
fukufuku-exchange.jpg … 服を手渡しながら話す様子
fukufuku-blouse.jpg   … 交換した刺繍ブラウスを手に

cleanup-group.jpg     … ライトアップされた浅草寺の前で記念撮影（横長）
cleanup-street.jpg    … 夜の江戸通りでのごみ拾い（横長）

irodoru-hanami.jpg    … 桜の下でのお花見（人生彩る会・横長）
　※このほか「人生彩る会」では images/photos/natsumoude.jpg（夏詣）と
　　 umeshigoto.jpg（梅仕事）も使っています
kimonobu-lesson.jpg   … 着物や帯について学ぶ様子（浅草きもの部・横長）
kimonobu-asakusa.jpg  … 着物で浅草寺へ（浅草きもの部・横長）
collab-masuhiro.jpg   … 酒商升宏さんでのテイスティング（コラボイベント・横長）

※ 他のイベントの詳細を増やすときは
　 ①index.html の＃タグを <button class="hash-btn" data-modal="◯◯"> にする
　 ②同じ場所にある <dialog id="modal-◯◯"> を複製して中身を差し替える
　 の2つでOKです（JavaScriptの修正は不要）。


■ character/（コトトリちゃん）
　いただいた「ロゴ_各ポーズ」5点を、用途がわかる名前にして配置しています。

kototori-fly.jpg    … 飛ぶポーズ　→ Instagram見出し
kototori-stand.jpg  … 正面立ち　　→ Aboutの見出し、お問い合わせの丸バッジ
kototori-point.jpg  … 筆を掲げて振り向く　→ メンバー見出し
kototori-cheer.jpg  … 筆を掲げて歩く　　　→ 活動見出し
kototori-walk.jpg   … 歩く　　　　　　　　→ Newsの見出し、フッターの丸バッジ

※ 元画像が白背景のJPGのため、CSSの mix-blend-mode: multiply で背景になじませています。
　 背景を透過したPNG版があれば、同じファイル名で差し替えると、より綺麗に表示されます
　 （その場合は css/style.css の .kototori から mix-blend-mode の指定を外してください）。
