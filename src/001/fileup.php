<?php
// $flg = false;　// ファイルアップフラグ
// ファイルをアップ
// if (is_uploaded_file($_FILES["file"]["tmp_name"])) {
//     if (move_uploaded_file($_FILES["file"]["tmp_name"], $_FILES["file"]["name"])) {
//         $flg = true; // 成功
//     }
// }
// // 成功可否、ファイル名を返す
// echo json_encode(array('FLG' => $flg, 'NAME' => $_FILES["file"]["name"]));


if (is_uploaded_file($_FILES["file"]["tmp_name"])) {
  if (move_uploaded_file($_FILES["file"]["tmp_name"], "files/" . $_FILES["file"]["name"])) {
    echo $_FILES["file"]["name"] . "をアップロードしました。";
  } else {
    echo "ファイルをアップロードできません。";
  }
} else {
  echo "ファイルが選択されていません。";
}


?>
