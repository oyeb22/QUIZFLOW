/**
 * QuizFlow Pro — Bootstrap
 * Resolves the GAS script URL from multiple sources.
 * Include this script FIRST on every GitHub Pages HTML file.
 *
 * Priority order:
 *   1. sessionStorage (set on previous page load)
 *   2. ?script= URL parameter
 *   3. ?gasUrl= URL parameter (legacy)
 *   4. Hardcoded fallback (update this when your GAS URL changes)
 *
 * Usage:
 *   const scriptUrl = QuizFlowConfig.getScriptUrl();
 *   const response  = await QuizFlowConfig.post('actionName', { key: 'value' });
 */

var QuizFlowConfig = (function() {
  // ── UPDATE THIS when you redeploy GAS as a new deployment ──
  var FALLBACK_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

  function getScriptUrl() {
    try {
      // 1. sessionStorage (fastest, set on prior page)
      var stored = sessionStorage.getItem('qf_script_url');
      if (stored && stored.indexOf('script.google.com') !== -1) return stored;
    } catch(e) {}

    // 2. URL parameters
    var params = new URLSearchParams(window.location.search);
    var fromParam = params.get('script') || params.get('gasUrl');
    if (fromParam && fromParam.indexOf('script.google.com') !== -1) {
      try { sessionStorage.setItem('qf_script_url', fromParam); } catch(e) {}
      return fromParam;
    }

    // 3. Hardcoded fallback
    return FALLBACK_SCRIPT_URL;
  }

  function getLoginUrl() {
    return getScriptUrl() + '?page=login';
  }

  function getSuperadminUrl() {
    return getScriptUrl() + '?page=superadmin';
  }

  function getSchoolAdminUrl() {
    return getScriptUrl() + '?page=schooladmin';
  }

  function getTeacherUrl() {
    return getScriptUrl() + '?page=teacher';
  }

  function getLiveHostUrl() {
    return getScriptUrl() + '?page=livehost';
  }

  function getPricingUrl(opts) {
    var url = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '') + '/pricing.html';
    url += '?script=' + encodeURIComponent(getScriptUrl());
    if (opts && opts.schoolName) url += '&schoolName=' + encodeURIComponent(opts.schoolName);
    if (opts && opts.plan)       url += '&plan=' + encodeURIComponent(opts.plan);
    if (opts && opts.renew)      url += '&renew=true';
    return url;
  }

  async function post(action, payload) {
    var url = getScriptUrl();
    var response = await fetch(url, {
      method:  'POST',
      body:    JSON.stringify(Object.assign({ action: action }, payload || {}))
    });
    return response.json();
  }

  function getToken() {
    try { return sessionStorage.getItem('qf_token') || ''; } catch(e) { return ''; }
  }

  function setToken(token) {
    try { sessionStorage.setItem('qf_token', token); } catch(e) {}
  }

  function clearSession() {
    try { sessionStorage.clear(); } catch(e) {}
  }

  async function authPost(action, payload) {
    return post(action, Object.assign({ token: getToken() }, payload || {}));
  }

  return {
    getScriptUrl:     getScriptUrl,
    getLoginUrl:      getLoginUrl,
    getSuperadminUrl: getSuperadminUrl,
    getSchoolAdminUrl:getSchoolAdminUrl,
    getTeacherUrl:    getTeacherUrl,
    getLiveHostUrl:   getLiveHostUrl,
    getPricingUrl:    getPricingUrl,
    post:             post,
    authPost:         authPost,
    getToken:         getToken,
    setToken:         setToken,
    clearSession:     clearSession
  };
})();
