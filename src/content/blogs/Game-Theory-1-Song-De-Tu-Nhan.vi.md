---
title: "[Game Theory] Tập 1: Hai tên tù và một lựa chọn tồi"
date: "2026-11-03"
category: "Game Design"
tags: "Game Theory"
excerpt: "Mở đầu series Học Game Theory cùng Hùng: hai người cùng chọn điều tốt nhất cho bản thân, và cùng nhận về một kết cục tệ hại. Chuyện gì đã xảy ra?"
color: "var(--pale-green)"
draft: true
---

# Lời mở đầu

Mỗi lần bạn chọn giá cho một món hàng, chọn đi đường nào để tránh tắc, hay chọn hero trong một trận game xếp hạng, kết quả không chỉ phụ thuộc vào lựa chọn của bạn. Nó còn phụ thuộc vào lựa chọn của những người khác, và họ cũng đang nghĩ xem bạn sẽ chọn gì.

**Lý thuyết trò chơi** (game theory) là môn học về những tình huống như vậy. Chữ "trò chơi" nghe có vẻ vui, nhưng nó bao gồm cả chiến tranh lạnh, đấu giá tần số viễn thông, và cả chuyện hai quán cà phê đối diện nhau đua giảm giá.

Series này có 7 tập. Mình sẽ cố gắng giữ toán ở mức tối thiểu, mỗi tập đều có một phần để bạn tự chơi trước khi đọc phân tích, và vì đây là blog về làm game, tập nào cũng sẽ có một mục **Góc Game Designer**.

Người chơi cùng bạn xuyên suốt series là Hùng. Trong các bảng, **bạn luôn là người chọn theo hàng**, còn **Hùng chọn theo cột**.

Bắt đầu thôi.

## I. Câu chuyện trong phòng thẩm vấn

### 1. Tình huống

Bạn và Hùng bị bắt vì nghi cùng gây ra một vụ trộm. Cảnh sát chỉ có đủ bằng chứng cho một tội nhẹ hơn, nên họ cần lời khai. Hai người bị đưa vào hai phòng riêng, không cách nào liên lạc với nhau, và mỗi người nhận được cùng một lời đề nghị:

- Nếu **cả hai im lặng**, mỗi người chỉ bị xử tội nhẹ: **1 năm** tù.
- Nếu **một người khai** còn người kia im lặng, người khai được thả ngay (**0 năm**) vì hợp tác với điều tra, người im lặng nhận mức án nặng nhất: **10 năm**.
- Nếu **cả hai cùng khai**, lời khai của ai cũng bớt giá trị, mỗi người nhận **5 năm**.

Viết gọn lại thành một bảng, mỗi ô ghi số năm tù theo thứ tự (Bạn, Hùng):

| | Hùng im lặng | Hùng khai |
|---|---|---|
| **Bạn im lặng** | (1, 1) | (10, 0) |
| **Bạn khai** | (0, 10) | (5, 5) |

Bạn sẽ chọn gì? Hãy thử trước khi đọc tiếp. Hùng trong mô phỏng đã chọn xong, nhưng bạn chỉ được biết sau khi chọn. Chơi vài chục ván và để ý ba con số bên dưới.

<pd-single>
</pd-single>

### 2. Lập luận của một người tỉnh táo

Ngồi trong phòng thẩm vấn, bạn không biết Hùng chọn gì. Nhưng bạn có thể xét từng trường hợp:

- **Giả sử Hùng im lặng.** Nếu bạn cũng im lặng, bạn ngồi tù 1 năm. Nếu bạn khai, bạn được về nhà. **Khai tốt hơn.**
- **Giả sử Hùng khai.** Nếu bạn im lặng, bạn ngồi tù 10 năm. Nếu bạn khai, bạn ngồi 5 năm. **Khai vẫn tốt hơn.**

Dù Hùng làm gì, khai luôn giúp bạn bớt được năm tù. Đó cũng là lý do trong mô phỏng ở trên, con số "Nếu ván nào cũng khai" không bao giờ lớn hơn số năm bạn thật sự phải ngồi. Hùng trong mô phỏng chọn hoàn toàn ngẫu nhiên, vậy mà chiến lược "luôn khai" vẫn thắng bất kể vận may.

Hùng ngồi ở phòng bên cạnh, cũng tỉnh táo như bạn, cũng lập luận y hệt. Kết quả: **cả hai cùng khai, mỗi người 5 năm.**

Trong khi đó, nếu cả hai cùng im lặng, mỗi người chỉ mất 1 năm. Hai người lý trí, mỗi người đều chọn điều tốt nhất cho bản thân, và cùng nhau đi tới một kết cục tệ hơn hẳn so với một lựa chọn khác mà cả hai đều thích hơn.

Đây là **song đề tù nhân** (Prisoner's Dilemma), có lẽ là ví dụ nổi tiếng nhất của cả ngành lý thuyết trò chơi. Nó được hai nhà toán học Merrill Flood và Melvin Dresher đưa ra ở tổ chức RAND năm 1950. Câu chuyện hai tên tù được Albert Tucker thêm vào sau đó, khi ông cần giải thích bài toán cho một lớp sinh viên tâm lý học.

## II. Một trò chơi gồm những gì?

Trước khi đi xa hơn, mình cần thống nhất vài từ vựng. Mọi trò chơi trong series này đều được mô tả bằng ba thứ:

1. **Người chơi**: những ai đang ra quyết định. Ở đây là bạn và Hùng.
2. **Chiến lược**: những lựa chọn mà mỗi người chơi có. Ở đây mỗi người có hai chiến lược: *Im lặng* và *Khai*.
3. **Payoff** (phần thưởng): mỗi người chơi được gì ứng với mỗi tổ hợp lựa chọn của tất cả mọi người.

Điểm mấu chốt nằm ở chữ **tổ hợp**. Payoff của bạn không chỉ phụ thuộc vào việc bạn chọn gì, mà phụ thuộc vào việc **cả hai** chọn gì. Đó là thứ phân biệt lý thuyết trò chơi với bài toán tối ưu thông thường. Khi bạn chọn đường đi làm, con đường không "nghĩ" gì về bạn. Khi bạn chọn giá bán, đối thủ thì có.

### 1. Payoff là mức độ thích, không phải tiền

Trong bảng ở trên, số càng nhỏ càng tốt, vì đó là năm tù. Để thống nhất cho cả series, mình sẽ luôn quy ước **payoff càng lớn càng tốt**. Muốn vậy chỉ cần đổi dấu: ngồi tù $t$ năm tương ứng với payoff $-t$.

| | Hùng im lặng | Hùng khai |
|---|---|---|
| **Bạn im lặng** | (−1, −1) | (−10, 0) |
| **Bạn khai** | (0, −10) | (−5, −5) |

Payoff không nhất thiết là tiền hay năm tù. Nó là một con số thể hiện người chơi **thích** kết cục đó tới mức nào. Một người tù có lương tâm, cảm thấy day dứt cả đời nếu phản bội bạn mình, sẽ có payoff khác hẳn cho ô "khai khi Hùng im lặng". Nếu ta đổi payoff, ta đang mô tả một trò chơi khác.

Đây là chỗ nhiều người phê bình lý thuyết trò chơi hiểu nhầm. Lý thuyết không giả định con người ích kỷ. Nó chỉ giả định mỗi người làm điều tốt nhất **theo thang đo của chính họ**. Nếu thang đo đó có tính cả lòng tốt, thì lòng tốt đã nằm sẵn trong con số.

### 2. Cách đọc ma trận payoff

Bảng trên được gọi là **ma trận payoff**, hay dạng chuẩn (normal form) của trò chơi. Cách đọc:

- Bạn chọn **hàng**, Hùng chọn **cột**, hai người chọn cùng lúc và không biết lựa chọn của nhau.
- Ô giao giữa hàng và cột là kết cục. Số thứ nhất là payoff của bạn, số thứ hai là của Hùng.
- Khi bạn so sánh các lựa chọn của mình, bạn đứng yên ở **một cột** và đi dọc theo các hàng, chỉ nhìn **số thứ nhất**. Hùng thì ngược lại: đứng yên ở một hàng, đi ngang qua các cột, chỉ nhìn **số thứ hai**.

Chữ "cùng lúc" không có nghĩa là cùng một giây. Nó chỉ có nghĩa là lúc chọn, không ai biết người kia đã chọn gì. Hai bạn trong hai phòng thẩm vấn có thể khai cách nhau vài tiếng, đó vẫn là một trò chơi "cùng lúc". Những trò chơi mà người sau **nhìn thấy** nước đi của người trước sẽ được bàn ở Tập 4.

## III. Chiến lược trội

### 1. Định nghĩa

Lập luận "dù Hùng làm gì thì khai vẫn tốt hơn" có một cái tên: *Khai* là **chiến lược trội nghiêm ngặt** (strictly dominant strategy) của bạn.

Nói chính xác hơn, chiến lược $A$ **trội nghiêm ngặt** so với chiến lược $B$ nếu với **mọi** lựa chọn $h$ của Hùng, $A$ đều cho payoff **lớn hơn** $B$:

$$
u(A, h) > u(B, h) \quad \forall h
$$

Ở đây $u(A, h)$ là payoff của bạn khi bạn chọn $A$ còn Hùng chọn $h$, và $\forall h$ đọc là "với mọi $h$". Nếu dấu $>$ được nới lỏng thành $\geq$ (và có ít nhất một chỗ lớn hơn hẳn), ta gọi là **trội yếu** (weakly dominant). Ta sẽ gặp lại trội yếu ở Góc Game Designer.

Kiểm tra với song đề tù nhân: cột "Hùng im lặng" có $0 > -1$, cột "Hùng khai" có $-5 > -10$. Cả hai cột đều đúng.

Nếu bạn có một chiến lược trội nghiêm ngặt, bài toán của bạn trở nên rất dễ: chọn nó, không cần đoán đối thủ làm gì. Ngược lại, một chiến lược **bị trội** (dominated) là chiến lược mà một người chơi lý trí sẽ không bao giờ chọn, vì luôn có một lựa chọn khác tốt hơn trong mọi tình huống.

### 2. Khi không ai có chiến lược trội: loại dần từng lớp

Phần lớn trò chơi không may mắn như vậy. Nhưng ngay cả khi không có chiến lược nào trội hẳn mọi chiến lược khác, ta vẫn có thể **loại dần** những chiến lược bị trội. Hãy xem một ví dụ.

Bạn và Hùng mỗi người có một xe bánh mì, cùng bán trên một con phố dài. Con phố chia làm 5 đoạn bằng nhau, mỗi đoạn có 100 khách. Mỗi sáng, mỗi người chọn đỗ xe ở một trong 5 đoạn. Khách lười đi bộ, nên ai cũng mua ở xe **gần mình nhất**, và nếu hai xe cách đều thì khách chia đôi.

Bảng dưới đây chỉ ghi **số khách của bạn**. Hàng là đoạn phố bạn đỗ xe, cột là đoạn phố Hùng đỗ xe. Tổng số khách luôn là 500, nên số khách của Hùng là 500 trừ đi con số trong ô.

| Bạn ↓ Hùng → | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **1** | 250 | 100 | 150 | 200 | 250 |
| **2** | 400 | 250 | 200 | 250 | 300 |
| **3** | 350 | 300 | 250 | 300 | 350 |
| **4** | 300 | 250 | 200 | 250 | 400 |
| **5** | 250 | 200 | 150 | 100 | 250 |

Nhìn bảng, không có hàng nào lớn hơn mọi hàng khác ở tất cả các cột. Chẳng hạn khi Hùng đỗ ở đoạn 1, đoạn 2 cho bạn 400 khách, nhiều hơn đoạn 3 (350). Vậy đoạn 3 chưa phải là chiến lược trội.

Nhưng hãy so **đoạn 1** với **đoạn 2**: ở cả 5 cột, đoạn 2 đều cho nhiều khách hơn ($400 > 250$, $250 > 100$, $200 > 150$, $250 > 200$, $300 > 250$). Vậy đoạn 1 bị trội nghiêm ngặt, không ai lý trí lại đỗ ở đó. Tương tự, đoạn 5 bị đoạn 4 trội. Vì trò chơi đối xứng, Hùng cũng sẽ không đỗ ở đoạn 1 hay đoạn 5.

**Lớp thứ nhất bị loại.** Bây giờ bạn biết Hùng chỉ còn chọn giữa đoạn 2, 3, 4. Bảng thu gọn lại:

| Bạn ↓ Hùng → | 2 | 3 | 4 |
|---|---|---|---|
| **2** | 250 | 200 | 250 |
| **3** | 300 | 250 | 300 |
| **4** | 250 | 200 | 250 |

Trong bảng mới này, đoạn 3 trội nghiêm ngặt cả đoạn 2 lẫn đoạn 4. **Lớp thứ hai bị loại**, và chỉ còn lại một kết cục: cả hai cùng đỗ ở **giữa phố**, mỗi người 250 khách.

Cách làm này gọi là **loại bỏ lặp các chiến lược bị trội** (iterated elimination of strictly dominated strategies). Để ý điều quan trọng: ở lớp thứ hai, lập luận của bạn đã dựa trên việc **bạn tin Hùng lý trí**, rằng Hùng sẽ không đỗ ở đoạn 1 hay 5. Mỗi lớp loại bỏ đòi hỏi thêm một tầng niềm tin: tôi biết bạn lý trí, tôi biết bạn biết tôi lý trí... Ở Tập 7 ta sẽ thấy con người thật thường chỉ suy luận được vài tầng như vậy.

Còn một điều thú vị nữa. Với khách hàng, kết cục này không tốt chút nào: người ở hai đầu phố phải đi bộ xa nhất có thể. Nếu bạn đỗ ở đoạn 2 và Hùng ở đoạn 4, hai người vẫn chia đều 250 khách, còn khách thì đi bộ ít hơn hẳn. Nhưng đó không phải là thứ mà hai chủ xe bánh mì cân nhắc. Đây chính là mô hình của Harold Hotelling (1929), và nó giải thích vì sao các cửa hàng cạnh tranh trực tiếp hay mọc sát nhau, vì sao các đảng chính trị hay dạt về phía giữa, và vì sao các game cùng thể loại ra cùng mùa thường trông giống nhau một cách đáng ngờ.

## IV. Song đề tù nhân ở khắp nơi

Câu chuyện hai tên tù chỉ là cái vỏ. Thứ làm nên song đề tù nhân là **cấu trúc payoff**. Gọi:

- $R$ (Reward): payoff khi cả hai cùng hợp tác,
- $T$ (Temptation): payoff khi bạn phản bội còn người kia hợp tác,
- $S$ (Sucker): payoff khi bạn hợp tác còn người kia phản bội,
- $P$ (Punishment): payoff khi cả hai cùng phản bội.

Bất cứ tình huống nào thỏa mãn

$$
T > R > P > S
$$

đều là một song đề tù nhân. Với ví dụ phòng thẩm vấn: $T = 0$, $R = -1$, $P = -5$, $S = -10$. Điều kiện $T > R$ và $P > S$ khiến phản bội trở thành chiến lược trội. Điều kiện $R > P$ khiến kết cục cùng phản bội tệ hơn kết cục cùng hợp tác. Hai điều kiện đó đặt cạnh nhau tạo nên cái "song đề".

Nhìn qua lăng kính này, bạn sẽ thấy nó ở khắp nơi:

**Hai quán cà phê đối diện nhau.** Mỗi quán chọn giữ giá hay giảm giá. Lợi nhuận mỗi ngày (triệu đồng):

| | Hùng giữ giá | Hùng giảm giá |
|---|---|---|
| **Bạn giữ giá** | (10, 10) | (4, 14) |
| **Bạn giảm giá** | (14, 4) | (6, 6) |

Giảm giá là chiến lược trội của cả hai, và cả hai cùng kết thúc ở mức 6 triệu thay vì 10. Đó là lý do một số ngành phải có luật cấm các công ty **thỏa thuận** giữ giá với nhau: với người tiêu dùng, song đề tù nhân giữa các công ty lại là một điều tốt.

**Chạy đua vũ trang.** Hai quốc gia, mỗi bên chọn tăng hay không tăng ngân sách quân sự. Không bên nào muốn yếu hơn bên kia, nên cả hai cùng tăng, cùng tốn kém, và cán cân sức mạnh vẫn y như cũ.

**Doping trong thể thao.** Nếu không ai dùng doping, cuộc thi công bằng. Nhưng nếu đối thủ không dùng, bạn dùng thì bạn thắng. Nếu đối thủ dùng, bạn không dùng thì bạn thua chắc. Kết cục: nhiều người cùng dùng, cùng chịu rủi ro sức khỏe, và cuộc thi vẫn chỉ có một người về nhất.

**Đứng lên xem hòa nhạc.** Một người đứng lên thì nhìn rõ hơn. Ai cũng đứng lên thì không ai nhìn rõ hơn, và ai cũng mỏi chân.

Điểm chung của tất cả: **lợi ích cá nhân và lợi ích tập thể kéo về hai hướng khác nhau**. Khi đó, những cá nhân hoàn toàn lý trí vẫn có thể cùng nhau tạo ra một kết cục mà không ai muốn.

## V. Góc Game Designer

### 1. Split or Steal

Năm 2007, game show *Golden Balls* của Anh có một vòng chơi cuối rất nổi tiếng. Hai người chơi cùng tranh một khoản tiền thưởng, mỗi người bí mật chọn một trong hai quả bóng: **Split** (chia) hoặc **Steal** (cướp).

- Cả hai chọn Split: mỗi người nhận một nửa.
- Một người Steal, một người Split: người Steal lấy toàn bộ.
- Cả hai Steal: không ai nhận được gì.

Gọi tổng tiền là 2 phần:

| | Đối thủ Split | Đối thủ Steal |
|---|---|---|
| **Bạn Split** | (1, 1) | (0, 2) |
| **Bạn Steal** | (2, 0) | (0, 0) |

Trông rất giống song đề tù nhân, nhưng hãy nhìn kỹ cột thứ hai. Khi đối thủ Steal, bạn Split hay Steal cũng đều nhận 0. Ở đây $P = S$, nên Steal chỉ là chiến lược **trội yếu**, không phải trội nghiêm ngặt. Khác biệt nhỏ đó mở ra một khe hở chiến thuật. Trong một tập phát sóng năm 2008, một người chơi tên Nick tuyên bố thẳng với đối thủ: "Tôi chắc chắn sẽ chọn Steal, nhưng nếu anh chọn Split, tôi hứa sẽ chia lại tiền cho anh sau chương trình". Đối thủ không còn lý do để chọn Steal, vì Steal cũng chỉ nhận về 0. Anh ta chọn Split. Và đến lúc mở bóng, Nick cũng chọn Split.

Thay đổi một con số trong ma trận là thay đổi cả cách người chơi suy nghĩ. Đó là điều mà game designer làm hằng ngày.

### 2. Thiết kế có chủ đích, hoặc vô tình

Song đề tù nhân là một công cụ rất mạnh khi bạn **muốn** tạo căng thẳng giữa người chơi. Các game sinh tồn nhiều người chơi, những game có cơ chế liên minh rồi phản bội, hay các party game kiểu "chia hay cướp" đều cố ý đặt người chơi vào ma trận $T > R > P > S$. Nỗi day dứt khi chọn chính là thứ tạo nên trải nghiệm.

Nhưng nó cũng là một cái bẫy khi bạn **không muốn** mà vẫn tạo ra nó. Vài ví dụ thường gặp:

- **Chia loot theo kiểu "ai nhặt được là của người đó"** trong game co-op. Hợp tác (để đồ cho người cần) là tốt cho cả đội, nhưng nhặt trước luôn có lợi cho cá nhân. Kết quả là người chơi lao vào tranh đồ thay vì đánh boss.
- **Bảng xếp hạng chỉ tính điểm cá nhân** trong một chế độ chơi đồng đội. Mỗi người tối ưu chỉ số của mình, và đội thua.
- **Tài nguyên dùng chung không giới hạn** trên server: mỗi người khai thác càng nhiều càng tốt, cho tới khi tài nguyên cạn kiệt cho tất cả. Ta sẽ quay lại chuyện này ở Tập 7 dưới tên gọi *bi kịch mảnh đất công*.

Khi phát hiện một song đề tù nhân ngoài ý muốn, cách sửa hiệu quả nhất gần như không bao giờ là "nhắc người chơi hãy tử tế". Cách sửa là **đổi payoff**: chia loot riêng cho từng người, thưởng điểm theo kết quả đội, đặt hạn mức khai thác. Khi ma trận không còn thỏa $T > R > P > S$, hành vi sẽ tự thay đổi theo.

Một câu hỏi nên đặt ra khi review bất kỳ hệ thống nhiều người chơi nào: **lựa chọn tốt nhất cho một người có trùng với lựa chọn tốt nhất cho cả nhóm không?** Nếu câu trả lời là không, hãy chắc chắn rằng đó là điều bạn muốn.

## VI. Tóm tắt

1. Một trò chơi gồm **người chơi**, **chiến lược** và **payoff**. Payoff của mỗi người phụ thuộc vào lựa chọn của **tất cả** mọi người.
2. Nếu một chiến lược luôn tốt hơn mọi chiến lược khác **bất kể đối thủ làm gì**, đó là chiến lược trội. Khi không có, ta có thể **loại dần** các chiến lược bị trội, với điều kiện tin rằng đối thủ cũng lý trí.
3. Trong **song đề tù nhân**, lựa chọn lý trí của từng người dẫn tới một kết cục mà cả hai đều thấy tệ. Muốn thoát ra, cách hiệu quả nhất là thay đổi luật chơi.

## Câu đố cho Tập 2

Bạn và Hùng hẹn gặp nhau ở Hà Nội vào một ngày cụ thể, nhưng cả hai **quên hẹn giờ và địa điểm**, và không có cách nào liên lạc với nhau. Nếu hai người đến cùng một chỗ, cùng một lúc, thì gặp được nhau. Nếu không, chuyến đi coi như hỏng.

Ở đây không có chiến lược nào trội cả. Không ai muốn lừa ai, hai người chỉ muốn **gặp nhau**. Vậy bạn sẽ đến đâu, và lúc mấy giờ?

Hãy ghi lại câu trả lời của mình. Ở [Tập 2](/blog/Game-Theory-2-Can-Bang-Nash), mình sẽ kể bạn nghe vì sao phần lớn mọi người lại chọn giống nhau đến bất ngờ, và từ đó đi tới khái niệm quan trọng nhất của cả ngành: **cân bằng Nash**.

## Tài liệu tham khảo

- A. Dixit, B. Nalebuff, *Thinking Strategically*, W. W. Norton, 1991.
- W. Poundstone, *Prisoner's Dilemma*, Doubleday, 1992.
- H. Hotelling, "Stability in Competition", *The Economic Journal* 39, 41–57 (1929).
- [Prisoner's dilemma — Wikipedia](https://en.wikipedia.org/wiki/Prisoner%27s_dilemma)
- [Strategic dominance — Wikipedia](https://en.wikipedia.org/wiki/Strategic_dominance)
- [Golden Balls — Wikipedia](https://en.wikipedia.org/wiki/Golden_Balls)
