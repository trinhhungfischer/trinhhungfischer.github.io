# Game Theory Lab: ý tưởng và brief cho dự án mới

## 1. Định vị

Một trang web độc lập, giống Mini Puzzle Lab (deploy riêng trên Vercel, giới thiệu trên trang Dự án của blog), gồm nhiều **thí nghiệm tương tác** về lý thuyết trò chơi. Mỗi thí nghiệm dài 5–10 phút, kể chuyện từng bước: người chơi tự làm trước, giải thích hiện ra sau.

Khác với *The Evolution of Trust* của Nicky Case ở ba điểm:

- **Viết cho người làm game.** Mỗi thí nghiệm kết thúc bằng một câu hỏi thiết kế, giống mục "Góc Game Designer" trong series blog.
- **Bối cảnh Việt Nam, song ngữ Việt/Anh:** chợ xe máy cũ, làng chài, xe bánh mì, phố cà phê.
- **Mỗi thí nghiệm gắn với một tập** của series "Học Game Theory cùng Hùng", và ngược lại.

Nhân vật, hình vẽ và kịch bản đều tự làm mới. Không dựng lại nhân vật hay trình tự màn chơi của *The Evolution of Trust*. Chỗ nào trùng chủ đề thì dẫn link sang trang gốc.

## 2. Danh sách thí nghiệm

| # | Tên | Ý tưởng | Tập liên quan |
|---|---|---|---|
| 1 | **Balance Lab** (thí nghiệm chủ lực) | Người chơi đóng vai designer: chỉnh payoff của một hệ thống khắc chế (3–5 phe), rồi xem meta tiến hóa theo replicator dynamics qua từng "mùa giải". Có thử thách dạng "đưa phe X lên 30% mà không buff X". | 2, 3, 7 |
| 2 | **Làng chài** | Hồ cá chung của một làng. Người chơi đặt luật cho làng (hạn mức, giám sát, phạt tăng dần, ai được làm luật) theo nguyên tắc của Ostrom, rồi xem đàn cá và mức hợp tác qua nhiều năm. | 5, 7 |
| 3 | **Chợ xe cũ** | Người chơi là người mua ở một chợ xe máy cũ. Xem thị trường sụp đổ theo mô hình Akerlof, rồi bật các công cụ bảo hành, kiểm định, đánh giá người bán để cứu chợ. | 6 |
| 4 | **Phố bánh mì** | Kéo xe bánh mì của mình dọc con phố, các xe máy phản ứng lại. Tăng số xe từ 2 lên 5 và xem chúng dồn về đâu (mô hình Hotelling). | 1 |
| 5 | **Bot đọc vị** | Oẳn tù tì với một bot biết học. Chấm điểm "độ khó đoán" của người chơi, rồi cho người chơi tự thiết kế AI đối thủ với núm vặn độ ngẫu nhiên. | 3 |
| 6 | **Hũ xu** | Đấu giá một hũ xu cùng hàng chục bot, mỗi bot có ước lượng riêng. Lời nguyền người thắng hiện ra qua nhiều ván. | 6 |
| 7 | **Bàn cướp biển** | Sandbox tự đặt luật bỏ phiếu (cần bao nhiêu phiếu, ai đề xuất trước), rồi xem quy nạp ngược tự giải ra kết quả. | 4 |
| 8 | **Ghép đôi** | Kéo thả thứ tự ưu tiên của học sinh và trường, xem thuật toán Gale–Shapley chạy từng bước. Thử khai gian để thấy là không có lợi. | 7 |
| 9 | **Đoán 2/3 (nhiều người)** | Người đọc gửi số thật và xem mình có đang thắng không. Cần backend, ví dụ Supabase, và chạy một vòng chơi kéo dài mãi mãi. | 7 |

## 3. Phong cách giao diện: cuốn sổ nháp vẽ tay

Cả trang trông như **một cuốn sổ nháp** mà ai đó vừa ngồi vẽ để giải thích cho bạn: giấy, bút chì, bút bi, bút dạ quang, giấy nhớ. Mọi thứ hơi "lệch", hơi run tay, nhưng vẫn gọn gàng và dễ đọc.

Lấy cảm hứng từ cảm giác "giải thích bằng nét vẽ tay" của các explorable explanation như của Nicky Case, nhưng **toàn bộ hình vẽ, nhân vật và bố cục đều tự thiết kế**.

### 3.1. Giấy

- **Nền:** giấy ngà (khoảng `#f7f3e8`) với một lớp nhiễu hạt rất nhẹ, giống giấy thật. Không dùng ảnh nặng: tạo bằng SVG `feTurbulence` hoặc một ảnh noise nhỏ lặp lại.
- **Kiểu trang:** mỗi thí nghiệm chọn một kiểu giấy hợp nội dung.
  - Giấy kẻ ô cho các thí nghiệm có ma trận, đồ thị (Balance Lab, Bàn cướp biển).
  - Giấy kẻ dòng cho phần kể chuyện (Chợ xe cũ, Làng chài).
  - Giấy trơn cho các màn vẽ nhân vật.
- **Lề sổ:** đường kẻ lề màu đỏ nhạt bên trái trên desktop. Ghi chú bên lề đặt trong vùng này, trên điện thoại thì chuyển thành ghi chú chen giữa các đoạn.
- **Chi tiết sổ:** lỗ gáy lò xo ở mép trên trang chủ, góc giấy hơi quăn, vài vết băng dính giữ "ảnh chụp" hay giấy nhớ.

### 3.2. Nét vẽ

- **Mọi khung, nút, đường kẻ, biểu đồ đều vẽ bằng nét tay**, không dùng `border` thẳng tắp của CSS.
  - [Rough.js](https://roughjs.com/) để vẽ hình chữ nhật, đường tròn, mũi tên, đồ thị kiểu phác thảo trên SVG hoặc canvas.
  - [perfect-freehand](https://github.com/steveruizok/perfect-freehand) cho các nét bút có độ dày thay đổi, như gạch chân, khoanh tròn hay mũi tên chú thích.
- **Cố định "độ run" bằng seed** cho mỗi phần tử, để nét không đổi hình mỗi lần render. Chỉ "rung" khi có chủ đích.
- **Hiệu ứng "nét sôi" (line boil):** với nhân vật và các điểm nhấn, đổi luân phiên 2–3 biến thể nét mỗi khoảng 150ms, như hoạt hình vẽ tay. Tắt hoàn toàn khi người dùng bật `prefers-reduced-motion`.
- **Chú thích tay:** mũi tên cong chỉ vào con số quan trọng kèm một dòng chữ viết tay ("đây nè!", "lạ chưa?"). Đây là cách chính để dẫn mắt người đọc thay cho tooltip.

### 3.3. Bảng màu như hộp bút

Màu ít, mỗi màu có một vai trò rõ ràng như dụng cụ thật:

| Dụng cụ | Màu gợi ý | Dùng cho |
|---|---|---|
| Bút chì | xám than `#3a3a3a` | Nét chính, chữ, khung |
| Bút bi xanh | `#2f5bd3` | Lựa chọn của người chơi, link |
| Bút dạ đỏ | `#d64545` | Phản bội, thua, cảnh báo, gạch bỏ |
| Bút dạ xanh lá | `#2e9e5b` | Hợp tác, thắng, kết quả tốt |
| Dạ quang vàng | `#ffe066` (trong suốt khoảng 60%) | Tô sáng con số, ô cân bằng Nash |
| Giấy nhớ | vàng, hồng, xanh nhạt | Gợi ý, thử thách, "Góc Game Designer" |

Ô cân bằng Nash được **tô dạ quang** thay vì viền cam như trên blog. Chiến lược trội được **khoanh tròn bằng bút bi**, chiến lược bị trội bị **gạch bỏ bằng bút đỏ**. Như vậy chính cách vẽ đã kể lại phương pháp giải.

### 3.4. Chữ viết

- **Chữ viết tay cho tiêu đề, chú thích, lời thoại nhân vật.** Font phải hỗ trợ **đầy đủ dấu tiếng Việt**. Các lựa chọn trên Google Fonts có tiếng Việt: *Patrick Hand*, *Pangolin*, *Mali*, *Itim*. Phải kiểm tra trực tiếp các chữ như "ặ", "ữ", "ợ", "Đ" trước khi chốt.
- **Chữ thân bài dài dùng một font tròn, dễ đọc** (ví dụ *Nunito* hoặc *Be Vietnam Pro*). Đọc đoạn văn dài bằng chữ viết tay rất mệt.
- Số liệu trong bảng và đồ thị dùng chữ viết tay dạng số đều nét, hoặc một font monospace mềm.

### 3.5. Nhân vật và minh họa

- **Bộ nhân vật riêng, vẽ đơn giản bằng vài nét:** Hùng (người dẫn chuyện của series blog) và vài nhân vật phụ gắn với bối cảnh Việt Nam, như cô bán bánh mì, ông chủ chợ xe, trưởng làng chài. Biểu cảm chủ yếu qua mắt, miệng và dáng.
- **Đồ vật vẽ tay:** xe máy, xe bánh mì, hũ xu, con cá, đồng vàng. Mỗi thứ là một SVG nhỏ có 2–3 biến thể nét để dùng cho hiệu ứng nét sôi.
- **Không dùng lại** nhân vật, hình dạng hay bảng màu nhân vật của *The Evolution of Trust*.

### 3.6. Bố cục và chuyển trang

- **Mỗi thí nghiệm là một chuỗi "trang sổ".** Mỗi trang có một ý, một thao tác và một câu kết. Nút **"Lật trang →"** ở góc dưới phải, có thanh tiến trình dạng các chấm vẽ tay.
- **Hiệu ứng lật trang nhẹ:** trượt cộng xoay vài độ, dưới 300ms. Không làm hiệu ứng 3D nặng.
- **Nút bấm** là các khung vẽ tay. Khi rê chuột thì nét đậm lên, khi bấm thì "lún" xuống 2px như ấn lên giấy.
- **Thanh trượt** là một đường kẻ tay với núm là một chấm mực. **Công tắc** là một ô vuông được đánh dấu ✓ bằng bút bi.
- **Trang chủ** là trang mục lục của cuốn sổ. Mỗi thí nghiệm là một tấm thẻ dán băng dính, có hình minh họa nhỏ, nhãn *mới* hoặc *đang vẽ*, và số tập blog liên quan.

### 3.7. Chế độ tối: bảng đen

Thay vì chỉ đảo màu, chế độ tối biến cuốn sổ thành **bảng đen**:

- nền xanh đen phấn;
- nét vẽ phấn trắng hơi nhòe;
- màu nhấn chuyển sang phấn màu.

Giữ nguyên bố cục và vai trò màu ở mục 3.3.

### 3.8. Những điều không được hy sinh

- **Dễ đọc trên điện thoại** ở bề rộng 375px. Nét vẽ tay không được làm vỡ bố cục hay tạo cuộn ngang.
- **Độ tương phản** chữ trên giấy đạt tối thiểu WCAG AA. Chữ là chữ thật (chọn và copy được), không phải ảnh.
- **Hiệu năng:** cache các nét Rough.js theo seed, không vẽ lại mỗi frame. Biểu đồ có hàng trăm điểm thì vẽ trên canvas.
- **Tôn trọng `prefers-reduced-motion`:** tắt nét sôi và hiệu ứng lật trang.

## 4. MVP đề xuất

- Trang chủ dạng "phòng thí nghiệm" liệt kê các thí nghiệm, có trạng thái *mới* / *đang làm*.
- Ba thí nghiệm đầu tiên: **Balance Lab**, **Làng chài**, **Chợ xe cũ**. Đây là ba thứ blog chưa có widget, và đều có góc nhìn cho người làm game.
- Giao diện sổ nháp vẽ tay theo mục 3, gồm cả chế độ bảng đen.
- Song ngữ Việt/Anh, ngôn ngữ giữ trên URL (`?lang=vi`) giống blog.
- Chạy tốt trên điện thoại ở bề rộng 375px, không cần backend.
- Deploy lên Vercel. Sau đó thêm một mục vào `src/data/projects_vi.json` và `projects_en.json` của blog, và thêm link "Thử trong Game Theory Lab" ở các tập liên quan.

## 5. Những điều cần bạn quyết khi mở session mới

- Tên chính thức: *Game Theory Lab*? *Hùng's Game Theory Lab*?
- Tên repo và stack. Đề xuất Vite + React + TypeScript giống blog, để tái sử dụng được các component `src/components/GameTheory*.tsx` làm điểm khởi đầu.
- Có làm thí nghiệm nhiều người chơi (số 9) ngay không, hay để sau vì cần backend.
- Font viết tay chính (*Patrick Hand*, *Pangolin*, *Mali* hay *Itim*). Nên xem thử từng font với một đoạn tiếng Việt có nhiều dấu.

## 6. Brief để dán vào session mới

> Tạo một dự án web mới, độc lập, tên tạm "Game Theory Lab", theo mô hình Mini Puzzle Lab: repo riêng, Vite + React + TypeScript, deploy lên Vercel. Trang gồm các thí nghiệm tương tác về lý thuyết trò chơi viết cho người làm game, song ngữ Việt/Anh với ngôn ngữ giữ trên URL bằng `?lang=`. Mỗi thí nghiệm kể chuyện từng bước: người chơi thao tác trước, giải thích hiện ra sau.
>
> Giao diện như một cuốn sổ nháp vẽ tay: giấy ngà có hạt, giấy kẻ ô hoặc kẻ dòng, nét vẽ run tay bằng Rough.js và perfect-freehand (có seed cố định), bảng màu theo hộp bút (bút chì, bút bi xanh, dạ đỏ, dạ xanh lá, dạ quang vàng, giấy nhớ), font viết tay có đủ dấu tiếng Việt cho tiêu đề và chú thích, font tròn dễ đọc cho thân bài. Mỗi thí nghiệm là một chuỗi trang sổ có nút lật trang. Chế độ tối là bảng đen phấn trắng. Tắt hiệu ứng nét sôi khi người dùng bật `prefers-reduced-motion`.
>
> Nhân vật, hình vẽ và kịch bản phải mới hoàn toàn. Không dựng lại *The Evolution of Trust* của Nicky Case, chỉ dẫn link tới đó khi trùng chủ đề.
>
> MVP gồm trang chủ dạng phòng thí nghiệm và 3 thí nghiệm:
> 1. **Balance Lab**: chỉnh payoff của một hệ thống khắc chế, xem meta tiến hóa theo replicator dynamics, có thử thách.
> 2. **Làng chài**: tài nguyên chung với các luật theo nguyên tắc của Ostrom.
> 3. **Chợ xe cũ**: thị trường "quả chanh" và các công cụ cứu chợ.
>
> Các component `GameTheory*.tsx` trong repo blog `trinhhungfischer.github.io` có thể làm điểm khởi đầu. Mỗi thí nghiệm kết thúc bằng một câu hỏi cho designer và link tới tập blog liên quan trong series "Học Game Theory cùng Hùng".
>
> Hoàn thành khi: chạy tốt ở bề rộng 375px, không lỗi console, build thành công, và đã deploy lên Vercel. Ý tưởng chi tiết, gồm toàn bộ mô tả giao diện ở mục 3, nằm trong `docs/game-theory-lab-ideas.md` của repo blog.
