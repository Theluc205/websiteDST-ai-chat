# Thiết kế nhúng Facebook Messenger vào website DST

## Mục tiêu

Giữ nguyên giao diện và nội dung hiện tại tại
`https://theluc205.github.io/websiteDST-ai-chat/`, nhưng thay cửa sổ AI Chat nội bộ
bằng giao diện nhắn tin Facebook thật của Page DST Group:

- Page: `https://www.facebook.com/profile.php?id=61592072642755`
- Messenger fallback: `https://m.me/61592072642755`
- Tin nhắn phải đi vào Facebook Page Inbox và được bot DST Group hiện tại xử lý.

## Phương án đã chọn

Nhúng Facebook Page Plugin với tab `messages` vào một panel nổi theo phong cách
hiện tại của website. Đây là plugin chính thức của Meta và cho phép người đã
đăng nhập Facebook nhắn trực tiếp cho Page ngay trên website.

Không dùng iframe của trang `facebook.com/profile.php` và không tự mô phỏng một
cuộc hội thoại Facebook. Iframe trang Facebook thông thường bị hạn chế nhúng và
giao diện mô phỏng sẽ không tạo cuộc trò chuyện thật trong Page Inbox.

## Trải nghiệm người dùng

1. Nút nổi ở góc phải mang nhãn `Chat Messenger` và biểu tượng Messenger.
2. Khi khách bấm, website mới tải iframe Page Plugin để hạn chế tải tài nguyên và
   theo dõi bên thứ ba trước khi khách chủ động mở chat.
3. Panel hiển thị tab `messages` của Page DST Group. Khách đã đăng nhập Facebook
   có thể nhắn ngay trong trang; tin nhắn đi qua webhook Messenger đang hoạt động.
4. Panel luôn có nút `Mở trong Messenger`. Nút này dùng liên kết `m.me` khi khách
   chưa đăng nhập, trình duyệt chặn cookie bên thứ ba hoặc plugin không hiển thị.
5. Khách có thể đóng panel bằng nút đóng hoặc phím Escape. Giao diện co lại phù
   hợp màn hình điện thoại và không che nội dung chính.

## Thành phần và luồng dữ liệu

- `FacebookMessengerChat`: quản lý trạng thái mở/đóng, chỉ tạo iframe sau lần mở
  đầu tiên và cung cấp liên kết dự phòng.
- `FloatingContactButtons`: nút chat hiện tại tiếp tục mở panel mới nên bố cục
  website không thay đổi.
- Iframe dùng endpoint chính thức `facebook.com/plugins/page.php`, `tabs=messages`
  và URL Page DST Group.
- Tin nhắn không đi qua frontend hoặc Worker Web Chat của website. Facebook gửi
  sự kiện đến webhook Messenger hiện có; bot DST Group trả lời qua Send API.

## Bảo mật và quyền riêng tư

- Không đưa Page Access Token, App Secret, Gemini API key hoặc cookie Facebook
  vào mã website.
- Chỉ tải nội dung Facebook sau hành động mở chat của khách.
- Dùng HTTPS, `referrerPolicy="strict-origin-when-cross-origin"` và tiêu đề iframe
  rõ ràng cho khả năng truy cập.
- Không đọc nội dung iframe vì khác origin; website chỉ điều khiển panel bao ngoài.

## Xử lý lỗi

- Luôn hiển thị nút `Mở trong Messenger` bên dưới iframe.
- Có mô tả ngắn rằng khách cần đăng nhập Facebook để dùng chat nhúng.
- Nếu plugin bị trình duyệt chặn, khách vẫn vào đúng cuộc trò chuyện Page bằng
  liên kết `m.me/61592072642755`.

## Kiểm thử và tiêu chí hoàn thành

- TypeScript, lint, build ứng dụng và build GitHub Pages thành công.
- Test xác nhận iframe dùng đúng Page ID, `tabs=messages`, lazy render và liên kết
  `m.me`; không có secret trong frontend.
- Kiểm tra trực tiếp trên desktop và màn hình hẹp: mở/đóng panel, iframe hiển thị,
  liên kết dự phòng mở đúng cuộc trò chuyện.
- Gửi một tin nhắn thử từ tài khoản Facebook có quyền test và xác nhận bot DST
  Group trả lời trong cùng cuộc trò chuyện.

## Triển khai

Mã nguồn sẽ được thực hiện trên nhánh `codex/embed-facebook-messenger`. Việc đưa
lên chính xác URL `theluc205.github.io` yêu cầu quyền ghi vào repository
`Theluc205/websiteDST-ai-chat` hoặc chủ repository merge nhánh/PR chứa thay đổi.

