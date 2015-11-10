# nodebrewインストール時につまづいたこと

homebrewでnode.jsを管理しようと思って
nodebrewをインストールしようとしたらハマったのでメモ。


## 環境
- OSX Yosemite 10.10.5

確認

```
$ brew -v
Homebrew 0.9.5 (git revision dbd78; last commit 2015-11-07)
```

インストール

```
$ nodebrew install-binary stable
```

ここで失敗。
nodebrew自体のコマンドは動いているが、fetch後に謎のエラー。
エラーログとっとくの忘れた...

## 解決方法

ここを参照。
[https://github.com/hokaccha/nodebrew#install](https://github.com/hokaccha/nodebrew#install)


```
curl -L http://git.io/nodebrew  | perl - setup
```

これが重要。

どうしてこうなったか。

```
$ brew info nodebrew

nodebrew: stable 0.8.1, HEAD
Node.js version manager
https://github.com/hokaccha/nodebrew
/usr/local/Cellar/nodebrew/0.8.1 (7 files, 48K) *
  Built from source
From: https://github.com/Homebrew/homebrew/blob/master/Library/Formula/nodebrew.rb
==> Caveats
Add path:
  export PATH=$HOME/.nodebrew/current/bin:$PATH
```

ん？

```
nodebrew: stable 0.8.1 HEAD
```
homebrewで入れようとすると、
nodebrewが0.8.1になっている。

なるほど、
curlで入れるとnodebrew 0.9.2がインストールされたのでエラー解消。
バージョン指定等々でのnodeをインストールできる。

インストール完了したら

```
$ nodebrew use stable
$ node -v
$ npm -v
```

使用するバージョンの指定と、バージョンが確認できたら終了です。
