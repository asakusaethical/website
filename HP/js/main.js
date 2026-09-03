/* ==========================================================================
   浅草エシカルプロジェクト｜main.js
   1. ハンバーガーメニュー
   2. スクロールでヘッダーの背景を切り替え
   3. スクロールに合わせた表示アニメーション
   4. 画像が未設置のときのプレースホルダー表示
   5. お問い合わせフォームの暫定ガード（送信先未設定のため）
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 1. ハンバーガーメニュー ---------- */
  var toggle  = document.getElementById('navToggle');
  var nav     = document.getElementById('globalNav');
  var overlay = document.getElementById('navOverlay');

  function openNav() {
    nav.classList.add('is-open');
    overlay.hidden = false;
    // hidden を外した直後にクラスを付けてフェードさせる
    requestAnimationFrame(function () { overlay.classList.add('is-open'); });
    document.body.classList.add('is-nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'メニューを閉じる');
  }

  function closeNav() {
    nav.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('is-nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'メニューを開く');
    window.setTimeout(function () {
      if (!nav.classList.contains('is-open')) { overlay.hidden = true; }
    }, 400);
  }

  if (toggle && nav && overlay) {
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) { closeNav(); } else { openNav(); }
    });

    overlay.addEventListener('click', closeNav);

    // メニュー内リンクをタップしたら閉じる
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });

    // Escキーで閉じる
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { closeNav(); }
    });

    // PC幅に戻したときは状態をリセット
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && nav.classList.contains('is-open')) { closeNav(); }
    });
  }

  /* ---------- 2. ヘッダーの背景切り替え ---------- */
  var header = document.getElementById('header');

  function onScroll() {
    if (!header) { return; }
    header.classList.toggle('is-scrolled', window.scrollY > 80);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 3. 表示アニメーション ---------- */
  var targets = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 4. 画像プレースホルダー ---------- */
  // images/ に写真を置くまでの間、枠が崩れないようにダミー表示にする
  document.querySelectorAll('img').forEach(function (img) {
    // コトトリちゃん・ロゴは枠を持たないため対象外
    if (img.classList.contains('kototori')) { return; }
    if (img.closest('.logo, .footer__logo')) { return; }

    function markEmpty() {
      if (img.classList.contains('hero__img')) {
        img.style.display = 'none';   // ヒーローは下地のグラデーションを見せる
        return;
      }
      var box = img.parentElement;
      if (box) { box.classList.add('is-empty'); }
    }

    img.addEventListener('error', markEmpty);
    // キャッシュ済みで既に失敗している場合
    if (img.complete && img.naturalWidth === 0) { markEmpty(); }
  });

  /* ---------- 5. イベント詳細のポップアップ ---------- */
  // ＃タグ（data-modal="◯◯"）を押すと id="modal-◯◯" の <dialog> が開きます
  document.querySelectorAll('[data-modal]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var dialog = document.getElementById('modal-' + trigger.dataset.modal);
      if (!dialog) { return; }
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');   // 古いブラウザ向け
      }
      document.body.classList.add('is-modal-open');
    });
  });

  document.querySelectorAll('.modal').forEach(function (dialog) {
    function closeModal() {
      if (typeof dialog.close === 'function') { dialog.close(); }
      else { dialog.removeAttribute('open'); }
    }

    var closeBtn = dialog.querySelector('.modal__close');
    if (closeBtn) { closeBtn.addEventListener('click', closeModal); }

    // 背景（暗い部分）をクリックしても閉じます
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) { closeModal(); }
    });

    dialog.addEventListener('close', function () {
      document.body.classList.remove('is-modal-open');
      dialog.querySelector('.modal__inner').scrollTop = 0;
    });
  });

  /* ---------- 6. お問い合わせフォーム（Googleフォームへ送信） ---------- */
  // 非表示のiframeへ送信することで、Googleの画面に遷移せずページ内で完結させます。
  // Googleからの応答は別ドメインのため中身を読めません。そこで「iframeの読み込みが
  // 終わった＝送信できた」とみなして完了メッセージに切り替えています。
  var form = document.getElementById('contactForm');
  var target = document.getElementById('gformTarget');
  var thanks = document.getElementById('formThanks');

  if (form && target && thanks) {
    var submitted = false;
    var button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function () {
      // ブラウザの必須チェックを通過したときだけここに来ます
      submitted = true;
      if (button) {
        button.disabled = true;
        button.textContent = '送信中…';
      }
    });

    // iframeはページ表示直後にも1度loadが起きるため、送信後の1回だけを拾います
    target.addEventListener('load', function () {
      if (!submitted) { return; }
      form.hidden = true;
      thanks.hidden = false;
      thanks.setAttribute('tabindex', '-1');
      thanks.focus();
    });
  }
})();
