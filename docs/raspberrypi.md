# Raspberry Piでradiko録音する際にやってみたこと

## 経緯

- いつも録音していたWindows機が破壊された
- 週に4日は深夜ラジオを録音している
- 物理的にダウンサイジングしたかった
- 放置してたRaspberry Piを思い出した

## 準備
- Raspberry Pi 1 Model B
- OS導入済み
- すでに以前からの前提として、ローカルLAN内で固定IP化
- 無線LANアダプタは導入済み
 - 実はWiFiアダプタがなかなか認識しなかった
 - スリープ防止の意味もありwireless-power offにしておく（`/etc/network/interfaces` の編集）

### 必要なものをインストール

```
$ sudo apt-get install rtmpdump swftools libxml2-utils ffmpeg
```

ホームディレクトリの下にbinディレクトリを作成するとパスが通るので作成。

スクリプト自体は下記参照しつつ、一部変更。

```
$ mkdir ~/bin
$ cd ~/bin
$ wget https://gist.github.com/raw/3956266/0dc83895770e26a7c37104d896a150c8bb1dffbb/rec_radiko.sh
$ chmod +x rec_radiko.sh
```

rec_radiko.shの行頭を変更

```
#!/bin/sh
↓
#!/bin/bash
```

ファイル名もコロンだと化けるので変更。

```
date=`date '+%Y-%m-%d-%H:%M'`
↓
date=`date '+%Y-%m-%d-%H_%M'`
```

ビットレートも

```
ffmpeg -y -i "/tmp/${channel}_${date}" -acodec libmp3lame -ab 128k "${outdir}/${channel}_${date}.mp3"
↓
ffmpeg -y -i "/tmp/${channel}_${date}" -acodec libmp3lame -ab 32k "${outdir}/${channel}_${date}.mp3"
```


### 録音テスト

1分間だけTBSを録音してみる。
保存ファイルは `/home/pi/radiko`

```
rec_radiko.sh TBS 1 ~/radiko
```

## 録音ファイルをDropboxにアップ

容量の関係もあるので、Dropboxにアップロード。しかも自動で。

Dropbox-Uploaderをダウンロードします。

```
$ cd
$ git clone https://github.com/andreafabrizi/Dropbox-Uploader.git
$ cd Dropbox-Uploader
$ chmod 755 dropbox_uploader.sh
$ mv dropbox_uploader.sh ~/bin/
```

### Dropbox側にアプリの登録

スクリプトの準備はできても、Dropbox側にアプリ登録をしないと使えません。
[https://www.dropbox.com/developers/apps](https://www.dropbox.com/developers/apps)

- CreateAppをクリック
- Dropbox APIを選択
- 必要なアクセス権を選択（App folderかFull Dropboxか）
- App名を記入
- App keyとApp secretを確認

### Dropbox-Uploaderの初期設定

起動します

```
$ ./dropbox_uploader.sh
```

先ほど確認したApp keyとApp Secretを聞かれるので、順に入力します。
指定されたURLをコピってブラウザでアクセスし、許可します。

Raspberry Piの画面に戻ってEnterで完了。

### アップロードテスト

```
$ dropbox_uploader.sh upload [local_file] [remote_file]
```

## 自動化

[こちらの偉大なる先人のスクリプト](http://shinyamatsuyama.blogspot.jp/2013/06/raspberrypiradiko.html)を参考にさせてもらいました。

ファイル名を`rec-and-upload.sh`として、ファイルに実行権をつけておきます。

### cron作成

```
$ crontab -e
```

編集します

```
0 1 * * 2 /home/pi/bin/rec-and-upload.sh TBS 120
```

これで月曜深夜（正確には火曜 AM1:00〜3;00）にTBSラジオ録音→Dropboxへアップロード→削除が自動で出来るようになりました。

あとは録音する番組分を設定。

これで快適な深夜ラジオのある生活に。
