---
description: Commit Policy Workflow – Đảm bảo Code luôn ổn định
---

Đây là quy trình bắt buộc phải thực hiện trước khi thực hiện bất kỳ lệnh **Git Commit** nào.

1. Chạy lệnh kiểm tra TypeScript (Linting):
```powershell
npm run lint
```

2. Chạy lệnh Build thử toàn bộ dự án:
// turbo
```powershell
npm run build
```

3. Nếu cả hai bước trên đều thành công (không có lỗi màu đỏ), thực hiện Commit:
```powershell
git commit -m "mô tả thay đổi"
```

4. Đưa code lên GitHub:
```powershell
git push origin main
```

---
**Quy tắc:** Chỉ được phép commit khi bước 1 và 2 hoàn thành với mã thoát 0 (Success).
