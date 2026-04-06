<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>QuizFlow Pro</title>
  <style>
    body{margin:0;background:#0f1117;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;color:#a78bfa;}
    .msg{text-align:center;}
    .icon{font-size:48px;margin-bottom:16px;}
    p{color:#7c85a2;font-size:14px;margin-top:8px;}
  </style>
</head>
<body>
<div class="msg">
  <div class="icon">&#x26A1;</div>
  <div style="font-size:20px;font-weight:700;">QuizFlow Pro</div>
  <p>Redirecting to your exam...</p>
</div>
<script>
  // This page receives the exam link (oyeb22.github.io/QUIZFLOW/?email=...&code=...&script=...)
  // and immediately forwards all params to Exam.html.
  // The student's browser URL stays at the root — they never see Exam.html in the address bar.
  var params = window.location.search;
  if(params){
    window.location.replace('Exam.html' + params);
  } else {
    document.querySelector('p').textContent = 'Invalid link. Please go back to the exam portal.';
  }
</script>
</body>
</html>
