# Kế hoạch series "Học Game Theory cùng Hùng" (7 tập)

## 1. Quy ước chung

| Mục | Quy ước |
|---|---|
| File | `src/content/blogs/Game-Theory-<N>-<Slug>.vi.md` |
| Tiêu đề | `[Game Theory] Tập N: <tên tập>` (giống kiểu `[GD Course] Bài N`) |
| Front matter | `category: "Game Design"`, `tags: "Game Theory"`, `color: "var(--pale-green)"`, `draft: true` cho tới khi xuất bản |
| Giọng văn | Xưng "mình", gọi "bạn", giống bài Bertrand / Probability Illusions. Hùng là người chơi cùng người đọc trong các ví dụ |
| Toán | KaTeX (`$...$`, `$$...$$`) như các bài Math hiện có, chỉ dùng khi cần |
| Ma trận payoff | Bảng markdown, ô ghi `(payoff hàng, payoff cột)`. Quy ước: người chơi hàng là **Bạn** (người đọc), người chơi cột là **Hùng** |
| Component tương tác | `src/components/GameTheory*.tsx`, dùng chung `src/components/GameTheory.css`, đăng ký tag kebab-case trong `src/pages/BlogPost.tsx` |
| Độ dài | Khoảng 2.000 đến 3.000 chữ mỗi tập, đọc trong 10 đến 15 phút |

## 2. Khung cố định cho mỗi tập

1. **Mở bài bằng một tình huống** (khoảng 1 đoạn): một câu chuyện hoặc câu đố, chưa nhắc thuật ngữ.
2. **Giải đáp câu đố của tập trước** (từ tập 2 trở đi).
3. **Khái niệm chính** (2 đến 3 mục `## I, II, III`), mỗi khái niệm đi kèm một ví dụ đời thường.
4. **Component tương tác**: người đọc tự chơi trước, sau đó mới đọc phân tích.
5. **Góc Game Designer**: blog này viết cho dân làm game, nên tập nào cũng có một mục áp dụng khái niệm vào thiết kế game.
6. **Tóm tắt 3 ý** và **câu đố cho tập sau**.

## 3. Chi tiết từng tập

### Tập 1: Hai tên tù và một lựa chọn tồi
- **Slug:** `Game-Theory-1-Song-De-Tu-Nhan`
- **Mở bài:** Hùng và bạn bị bắt, mỗi người bị thẩm vấn ở một phòng riêng.
- **Mục chính:**
  - I. Một trò chơi gồm những gì: người chơi, chiến lược, payoff, cách đọc ma trận
  - II. Chiến lược trội, và loại dần các chiến lược bị trội (ví dụ ma trận 3x3)
  - III. Khi lý trí cá nhân dẫn tới kết cục tập thể tệ: hai quán cà phê giảm giá, chạy đua vũ trang, doping
- **Tương tác:** `<pd-single>` cho bạn chọn Khai/Im lặng với Hùng (máy), rồi hiện kết quả và thống kê lựa chọn
- **Góc Game Designer:** cơ chế co-op/phản bội trong các game sinh tồn, party game kiểu "chia hay cướp"
- **Câu đố cho tập 2:** hai người hẹn gặp ở Hà Nội mà quên hẹn chỗ. Bạn sẽ đến đâu?

### Tập 2: Cân bằng Nash, khi không ai muốn đổi ý
- **Slug:** `Game-Theory-2-Can-Bang-Nash`
- **Mở bài:** giải câu đố "hẹn gặp" và giới thiệu khái niệm điểm tiêu điểm (Schelling point).
- **Mục chính:**
  - I. Phản ứng tốt nhất (best response)
  - II. Cân bằng Nash: định nghĩa trực quan, tìm bằng phương pháp gạch chân
  - III. Nhiều cân bằng: Battle of the Sexes, Stag Hunt, Chicken. Cân bằng không đồng nghĩa với tối ưu
- **Tương tác:** `<nash-finder>` gồm ma trận 2x2 sửa được payoff, tự gạch chân best response và tô các ô Nash
- **Góc Game Designer:** meta game và các chiến thuật "ổn định", lý do người chơi hay hội tụ về một vài lựa chọn
- **Câu đố cho tập 3:** có cách nào thắng oẳn tù tì lâu dài không?

### Tập 3: Oẳn tù tì và nghệ thuật khó đoán
- **Slug:** `Game-Theory-3-Chien-Luoc-Hon-Hop`
- **Mục chính:**
  - I. Không có cân bằng thuần túy thì sao? Chiến lược hỗn hợp
  - II. Nguyên lý bàng quan: tính xác suất cân bằng cho bài toán đá penalty
  - III. Định lý Nash và dữ liệu thật: tỉ lệ sút trái/phải của cầu thủ chuyên nghiệp
- **Tương tác:** `<rps-bot>` cho chơi oẳn tù tì với bot học theo chuỗi Markov. Người chơi càng có thói quen thì càng thua
- **Liên kết:** dẫn sang [Probability Illusions](/blog/Probability-Illusions) (con người không ngẫu nhiên giỏi, giống chuyện đồng xu giả)
- **Góc Game Designer:** cân bằng kiểu oẳn tù tì (counter system), AI đối thủ không nên quá dễ đoán
- **Câu đố cho tập 4:** 5 tên cướp biển chia 100 đồng vàng

### Tập 4: Đi trước hay đi sau? Suy luận ngược
- **Slug:** `Game-Theory-4-Suy-Luan-Nguoc`
- **Mục chính:**
  - I. Cây trò chơi và quy nạp ngược (giải bài cướp biển từng bước)
  - II. Cân bằng hoàn hảo trò chơi con, lời đe dọa không đáng tin, giá trị của commitment (chuyện Cortés đốt thuyền)
  - III. Ultimatum Game: lý thuyết nói một đằng, người thật làm một nẻo
- **Tương tác:** `<pirate-split>` chọn số cướp biển (2 đến 7), xem lời giải quy nạp ngược hiện ra từng bước
- **Góc Game Designer:** game theo lượt, lợi thế người đi trước, và cách cân bằng (komi trong cờ vây, pie rule)
- **Câu đố cho tập 5:** nếu song đề tù nhân được chơi 100 lần thì bạn có còn khai không?

### Tập 5: Chơi mãi thì sẽ hợp tác
- **Slug:** `Game-Theory-5-Tro-Choi-Lap-Lai`
- **Mục chính:**
  - I. Trò chơi lặp lại hữu hạn: quy nạp ngược làm hợp tác sụp đổ
  - II. Lặp vô hạn và chiết khấu tương lai: điều kiện để hợp tác tồn tại (công thức $\delta$)
  - III. Giải đấu Axelrod và Tit-for-Tat: tử tế, biết trả đũa, biết tha thứ, rõ ràng
- **Tương tác:** `<axelrod-tournament>` cho chọn các chiến thuật (TFT, luôn phản bội, Grudger, Random, Pavlov...), chạy round-robin và xem bảng xếp hạng. Có thêm tham số "nhiễu"
- **Góc Game Designer:** hệ thống uy tín, giao dịch giữa người chơi trong MMO, lý do game nên có tương tác lặp lại
- **Câu đố cho tập 6:** vì sao xe vừa mua xong đem bán lại đã mất giá?

### Tập 6: Khi không ai biết hết, thông tin là vũ khí
- **Slug:** `Game-Theory-6-Thong-Tin-Bat-Can-Xung`
- **Mục chính:**
  - I. Thị trường "quả chanh" (Akerlof)
  - II. Phát tín hiệu (bằng cấp theo mô hình Spence, đuôi công) và sàng lọc (gói bảo hiểm)
  - III. Đấu giá: kín giá thứ nhất và giá thứ hai, vì sao nên trả đúng giá trị thật trong đấu giá Vickrey, lời nguyền người thắng
- **Tương tác:** `<auction-sim>` cho bạn đấu giá với vài bot, đổi giữa luật giá thứ nhất và giá thứ hai, rồi so lợi nhuận
- **Góc Game Designer:** fog of war, bluff trong poker và các game bài, sàn đấu giá trong game
- **Câu đố cho tập 7:** đoán một số từ 0 đến 100 sao cho gần nhất với 2/3 trung bình. Người đọc gửi câu trả lời trước khi đọc tập 7

### Tập 7: Game theory ngoài đời, và những giới hạn của nó
- **Slug:** `Game-Theory-7-Ngoai-Doi-Thuc`
- **Mục chính:**
  - I. Đoán 2/3: level-k thinking và cuộc thi sắc đẹp của Keynes
  - II. Game theory tiến hóa: Diều hâu và Bồ câu, ESS
  - III. Bi kịch mảnh đất công và Ostrom, thiết kế cơ chế (ghép cặp hiến thận, tuyển sinh theo Gale–Shapley)
  - IV. Giới hạn: con người không hoàn toàn lý trí
- **Tương tác:** `<hawk-dove>` mô phỏng quần thể diều hâu/bồ câu theo thời gian, chỉnh được V và C
- **Góc Game Designer:** game designer chính là người thiết kế cơ chế. Mỗi luật chơi là một mechanism
- **Kết series:** sơ đồ tóm tắt 7 tập, sách đọc thêm (*Thinking Strategically*, *The Evolution of Cooperation*, *Game Theory 101*)

## 4. Quy trình cho mỗi tập

1. Viết bản nháp nội dung (`draft: true`), chèn placeholder cho component
2. Code component tương tác, đăng ký trong `BlogPost.tsx`
3. Chạy dev server, kiểm tra trên desktop, mobile, dark mode
4. Soát lại: số liệu, payoff, link tập trước/sau, câu đố
5. Đổi `draft: false`, mở PR trên nhánh `blog/game-theory-<N>`

## 5. Lịch đề xuất

| Tuần | Tập | Component |
|---|---|---|
| 1 | Tập 1 | `<pd-single>` (đơn giản, dùng để dựng CSS chung) |
| 2 | Tập 2 | `<nash-finder>` |
| 3 | Tập 3 | `<rps-bot>` |
| 4 | Tập 4 | `<pirate-split>` |
| 5 | Tập 5 | `<axelrod-tournament>` (phức tạp nhất, nên chừa thêm thời gian) |
| 6 | Tập 6 | `<auction-sim>` |
| 7 | Tập 7 | `<hawk-dove>` |

Khi một tập xuất bản, nên cập nhật đoạn cuối của tập trước để thêm link "Đọc tiếp".
