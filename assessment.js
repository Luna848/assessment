'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
//ボタンが押された時の処理
assessmentButton.onclick = () => {
  const userName = userNameInput.value;　//ユーザー入力を取得
  if (userName　=== "") {
    // 名前が空の時は処理を終了する
    return;
  }

// 診断結果表示エリアの作成
while (resultDivided.firstChild) {
  // 子どもの要素があるかぎり削除
  resultDivided.removeChild(resultDivided.firstChild);
}


//TODO　診断を実行して結果を表示する
const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);
// TODO ツイートエリアの作成
removeAllChildren(tweetDivided);
const anchor = document.createElement('a');
const hrefValue =
  'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';

anchor.setAttribute('href', hrefValue);
anchor.className = 'twitter-hashtag-button';
anchor.setAttribute('data-text', '診断結果の文章');
anchor.innerText = 'Tweet #あなたのいいところ';

tweetDivided.appendChild(anchor);



const script = document.createElement('script');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
tweetDivided.appendChild(script);

};


userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};





const answers = [
  '{userName}の変わらないところは身長です。{userName}はちっちゃくて身長的には可愛いです。',
  '{userName}の変わらないところは真面目なところです。{userName}は真面目で好きなものがありません。',
  '{userName}の変わらないところは可愛いところです。{userName}は学年でI番の人気者です。',
  '{userName}の変わらないところは厳しさです。{userName}は何事にもミスを許しません。',
  '{userName}の変わらないところは面白いところです。{userName}を悲しい時に頼ってみましょう。',
  '{userName}の変わらないところは頼りなさです。{userName}に頼らない方がいい。',
  '{userName}の変わらないところはわがままなところです。{userName}の言うことをきいてはなりません。',
  '{userName}の変わらないところはカッコいいです。{userName}は有名でファンもいます。',
  '{userName}のいいところは特にありません。日々の行動を見直しましょう。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('{userName}', userName);
  return result;
}

// テストコード
console.assert(
  assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
