# Quy chuẩn Commit & Đảm bảo Chất lượng Code

Để dự án luôn trong tình trạng ổn định và không làm gián đoạn quá trình Deploy tự động (GitHub Actions), chúng ta thống nhất quy trình sau trước khi Commit:

## 🔍 Bước 1: Kiểm tra lỗi cú pháp và Typescript
Chạy lệnh kiểm tra để không có lỗi type hoặc cú pháp React:
```bash
npm run lint
```

## 🏗️ Bước 2: Kiểm tra quá trình Build
Đảm bảo project có thể đóng gói (build) thành công mà không có lỗi:
```bash
npm run build
```

## 🚀 Bước 3: Commit & Push
Chỉ thực hiện `git push` khi cả hai bước trên đều vượt qua thành công (Exit code 0).

---
### ⚠️ Nguyên tắc vàng:
- **KHÔNG** commit code đang bị lỗi đỏ (lỗi cú pháp/logic build).
- Nếu phát hiện lỗi trong lúc build, phải sửa sạch lỗi trước khi thử lại bước commit.
- Mọi thay đổi quan trọng về giao diện 3D phải được build thử để tránh lỗi runtime trên trình duyệt.
