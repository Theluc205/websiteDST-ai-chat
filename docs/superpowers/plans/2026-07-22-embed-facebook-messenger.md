# Embedded Facebook Messenger Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the website-only AI chat panel on the current Luc website with the real Facebook Page `messages` interface so visitors can message the DST Group Page and receive replies from the existing Messenger bot.

**Architecture:** A focused `FacebookMessengerChat` client component owns the floating panel, lazy iframe, Escape handling, and `m.me` fallback. `WebsiteApp` keeps the existing open-token coordination used by every CTA, while `FloatingContactButtons` changes only its user-facing Messenger label. Facebook receives the messages directly; the website never handles Facebook credentials or message contents.

**Tech Stack:** React 19, TypeScript, lucide-react, Facebook Page Plugin iframe, Node test runner, Vinext/Vite, GitHub Pages.

## Global Constraints

- Preserve the existing Luc website layout, pages, navigation, and content.
- Use Page URL `https://www.facebook.com/profile.php?id=61592072642755`.
- Use fallback URL `https://m.me/61592072642755`.
- The embedded plugin must use the real `messages` tab and must not imitate a Facebook conversation.
- Do not place Page Access Tokens, App Secrets, Gemini keys, or Facebook cookies in frontend code.
- Load Facebook content only after the visitor explicitly opens chat.
- Publishing to `theluc205.github.io` requires a merge or write access to `Theluc205/websiteDST-ai-chat`.
- Before implementation, ensure the feature branch is based on `origin/main` and does not contain the obsolete website-chat commit `4a05e77`.

---

### Task 1: Lock the Messenger embed contract with tests

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: the existing source-inspection test pattern based on `readFile(...)`.
- Produces: assertions that define the Page ID, real `messages` plugin, lazy rendering, fallback link, app wiring, and secret boundary.

- [ ] **Step 1: Replace the old Web Chat source assertions with a failing Messenger embed test**

```js
test("embeds the real DST Facebook Messenger interface safely", async () => {
  const [messengerSource, appSource, floatingSource] = await Promise.all([
    readFile(new URL("../app/FacebookMessengerChat.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/WebsiteApp.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/FloatingContactButtons.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(messengerSource, /facebook\.com\/plugins\/page\.php/);
  assert.match(messengerSource, /tabs.*messages/);
  assert.match(messengerSource, /61592072642755/);
  assert.match(messengerSource, /m\.me\/61592072642755/);
  assert.match(messengerSource, /loading="lazy"/);
  assert.match(messengerSource, /hasOpened/);
  assert.match(appSource, /FacebookMessengerChat/);
  assert.doesNotMatch(appSource, /AiConsultantChat/);
  assert.match(floatingSource, /Messenger/);
  assert.doesNotMatch(
    `${messengerSource}\n${appSource}\n${floatingSource}`,
    /PAGE_ACCESS_TOKEN|APP_SECRET|GEMINI_API_KEY|c_user|xs=/,
  );
});
```

- [ ] **Step 2: Run the focused test and verify it fails for the missing component**

Run: `node --test tests/rendered-html.test.mjs`

Expected: FAIL with `ENOENT` for `app/FacebookMessengerChat.tsx` or an assertion that `FacebookMessengerChat` is not wired.

- [ ] **Step 3: Commit the test contract**

```bash
git add tests/rendered-html.test.mjs
git commit -m "test: define embedded Messenger contract"
```

---

### Task 2: Replace AI Chat with the real Facebook messages panel

**Files:**
- Create: `app/FacebookMessengerChat.tsx`
- Modify: `app/WebsiteApp.tsx`
- Modify: `app/components/FloatingContactButtons.tsx`
- Modify: `app/globals.css`
- Delete: `app/AiConsultantChat.tsx`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `openToken: number` from `WebsiteApp` and the existing floating-panel CSS positioning.
- Produces: `FacebookMessengerChat({ openToken }: { openToken: number })` and a real Page Plugin iframe.

- [ ] **Step 1: Add the focused Messenger panel component**

```tsx
"use client";

import { ExternalLink, MessageCircle, Minimize2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const PAGE_URL = "https://www.facebook.com/profile.php?id=61592072642755";
const MESSENGER_URL = "https://m.me/61592072642755";

function pagePluginUrl() {
  const query = new URLSearchParams({
    href: PAGE_URL,
    tabs: "messages",
    width: "500",
    height: "590",
    small_header: "true",
    adapt_container_width: "true",
    hide_cover: "false",
    show_facepile: "false",
  });
  return `https://www.facebook.com/plugins/page.php?${query.toString()}`;
}

export function FacebookMessengerChat({ openToken }: { openToken: number }) {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const pluginUrl = useMemo(pagePluginUrl, []);

  function showChat() {
    setHasOpened(true);
    setOpen(true);
  }

  useEffect(() => {
    if (!openToken) return;
    const frame = window.requestAnimationFrame(showChat);
    return () => window.cancelAnimationFrame(frame);
  }, [openToken]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <section className={`messenger-chat ${open ? "is-open" : ""}`} aria-label="Messenger DST Group">
      {hasOpened ? (
        <div className="messenger-chat-panel" hidden={!open} role="dialog" aria-modal="false" aria-label="Chat Messenger với DST Group">
          <header className="messenger-chat-header">
            <div><span><MessageCircle size={18} /> DST Group</span><p>Trò chuyện trực tiếp trên Facebook</p></div>
            <div className="messenger-chat-actions">
              <button type="button" onClick={() => setOpen(false)} aria-label="Thu nhỏ Messenger"><Minimize2 size={18} /></button>
              <button type="button" onClick={() => setOpen(false)} aria-label="Đóng Messenger"><X size={18} /></button>
            </div>
          </header>
          <iframe
            className="messenger-chat-frame"
            src={pluginUrl}
            title="Tin nhắn Facebook của DST Group"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="encrypted-media; clipboard-write; web-share"
          />
          <div className="messenger-chat-fallback">
            <p>Bạn cần đăng nhập Facebook để nhắn ngay trong website.</p>
            <a href={MESSENGER_URL} target="_blank" rel="noreferrer">Mở trong Messenger <ExternalLink size={15} /></a>
          </div>
        </div>
      ) : null}
      <button type="button" className="messenger-chat-toggle" onClick={() => open ? setOpen(false) : showChat()} aria-expanded={open}>
        <MessageCircle size={22} /><span><strong>Chat Messenger</strong><small>Bot DST phản hồi</small></span>
      </button>
    </section>
  );
}
```

- [ ] **Step 2: Wire the new component without changing route or CTA behavior**

In `app/WebsiteApp.tsx`, replace the import and render:

```tsx
import { FacebookMessengerChat } from "./FacebookMessengerChat";
```

```tsx
<FacebookMessengerChat openToken={chatToken} />
```

In `app/components/FloatingContactButtons.tsx`, keep `onOpenChat` and change the accessible copy to `Mở Messenger DST Group` / `Chat Messenger`.

- [ ] **Step 3: Add responsive panel styles and remove unused AI-only styles only when unreferenced**

Add `.messenger-chat`, `.messenger-chat-panel`, `.messenger-chat-frame`, `.messenger-chat-header`, `.messenger-chat-actions`, `.messenger-chat-fallback`, and `.messenger-chat-toggle` rules. Use `width: min(500px, calc(100vw - 32px))`, `height: min(720px, calc(100vh - 96px))`, and a mobile breakpoint that keeps the panel inside the viewport. Preserve existing color variables, shadows, and z-index conventions.

- [ ] **Step 4: Delete the obsolete website-only AI component**

Delete `app/AiConsultantChat.tsx` after `rg -n "AiConsultantChat" app tests` shows no remaining imports or assertions.

- [ ] **Step 5: Run the focused test and lint**

Run:

```bash
node --test tests/rendered-html.test.mjs
npm run lint
```

Expected: Messenger contract test PASS; lint exits 0 with no new errors.

- [ ] **Step 6: Commit the component replacement**

```bash
git add app/FacebookMessengerChat.tsx app/WebsiteApp.tsx app/components/FloatingContactButtons.tsx app/globals.css app/AiConsultantChat.tsx tests/rendered-html.test.mjs
git commit -m "feat: embed DST Facebook Messenger chat"
```

---

### Task 3: Build, verify, and prepare publication to the Luc website

**Files:**
- Verify: `outputs/gh-pages-dist/index.html`
- Verify: `.github/workflows/deploy-pages.yml`
- Modify only if needed: `README.md`

**Interfaces:**
- Consumes: `FacebookMessengerChat`, Page ID `61592072642755`, and the existing GitHub Pages static build.
- Produces: a tested branch and a reviewable push/PR for `Theluc205/websiteDST-ai-chat`.

- [ ] **Step 1: Run all project checks**

Run:

```bash
npm test
npm run build:github-pages
git diff --check
```

Expected: Vinext build passes, all Node tests pass, Vite writes `outputs/gh-pages-dist/index.html`, and `git diff --check` exits 0.

- [ ] **Step 2: Inspect the production bundle contract**

Run a script that loads the generated JavaScript asset referenced by `outputs/gh-pages-dist/index.html` and assert it contains `facebook.com/plugins/page.php`, `tabs`, `messages`, `61592072642755`, and `m.me/61592072642755`, but contains none of `PAGE_ACCESS_TOKEN`, `APP_SECRET`, or `GEMINI_API_KEY`.

- [ ] **Step 3: Verify the responsive interaction in a real browser**

At desktop width and a phone-sized viewport:

1. Open the published/local preview.
2. Click `Chat Messenger` and verify the panel is inside the viewport.
3. Verify the iframe exists only after the click and points to the Facebook Page Plugin.
4. Press Escape and verify the panel closes.
5. Open again and verify `Mở trong Messenger` targets `https://m.me/61592072642755`.
6. When logged into a permitted Facebook test account, send one message and confirm the existing DST bot replies in the same conversation.

- [ ] **Step 4: Commit any verification-driven corrections**

```bash
git add app tests README.md
git commit -m "fix: harden embedded Messenger experience"
```

Skip this commit if verification requires no code correction.

- [ ] **Step 5: Publish for Luc review**

First try `git push origin codex/embed-facebook-messenger`. If GitHub returns 403, push the same branch to the authorized personal fork and open a PR against `Theluc205/websiteDST-ai-chat:main`. Do not claim the exact Luc URL is updated until the owner merges or grants write access and GitHub Pages completes successfully.
