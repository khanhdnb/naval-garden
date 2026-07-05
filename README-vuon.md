# Vườn học — Website (Quartz + Cloudflare Pages)

Đây là mã nguồn trang web *digital garden* của mình, dựng bằng [Quartz v4](https://quartz.jzhao.xyz).
Nội dung học nằm trong `content/` (Markdown). Mỗi lần push lên GitHub → Cloudflare Pages tự build & deploy.

## Cấu trúc
- `content/` — nội dung web (notes, actions, index). Đây là thứ mình sửa thường xuyên.
- `quartz.config.ts` — cấu hình (tên trang, màu, ngôn ngữ vi-VN).
- `.node-version` = 22 — Cloudflare dùng Node 22 để build.

## Cài đặt Cloudflare Pages (làm 1 lần)
1. Vào https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Chọn repo GitHub này.
3. Build settings:
   - **Framework preset:** None (hoặc Quartz nếu có)
   - **Build command:** `npx quartz build`
   - **Build output directory:** `public`
   - **Environment variable:** `NODE_VERSION` = `22` (nếu Cloudflare không tự đọc `.node-version`)
4. **Save and Deploy.** Vài phút sau có link `https://<tên>.pages.dev`.

## Thêm chương mới (quy trình thường ngày)
1. Thêm/sửa file `.md` trong `content/notes/` hoặc `content/actions/` (nhớ frontmatter `title:`).
2. Cập nhật liên kết trong `content/index.md`.
3. `git add . && git commit -m "them chuong X" && git push`
4. Cloudflare tự deploy lại. Xong.

## Build thử tại máy (tùy chọn)
```
npx quartz build --serve
```
Mở http://localhost:8080
