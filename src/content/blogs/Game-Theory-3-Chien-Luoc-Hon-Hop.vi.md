---
title: "[Game Theory] Tập 3: Oẳn tù tì và nghệ thuật khó đoán"
date: "2026-11-03"
category: "Game Design"
tags: "Game Theory"
excerpt: "Có những trò chơi mà lựa chọn nào cũng có thể bị bắt bài. Lời giải của Nash: đừng chọn, hãy tung đồng xu. Nhưng tung với tỉ lệ bao nhiêu, và vì sao tỉ lệ đó lại do đối thủ quyết định?"
color: "var(--pale-green)"
draft: false
---

# Giải câu đố Tập 2

Ở cuối [Tập 2](/blog/Game-Theory-2-Can-Bang-Nash), mình để bạn thử trò **Chẵn lẻ**: hai người cùng ngửa một đồng xu, giống mặt thì bạn thắng, khác mặt thì Hùng thắng. Ma trận không có ô nào viền cam, nghĩa là không có cân bằng Nash nào trong các lựa chọn "thuần túy" Sấp hay Ngửa.

Lý do rất dễ thấy. Nếu bạn luôn ra Sấp, Hùng sẽ luôn ra Ngửa. Biết Hùng luôn ra Ngửa, bạn sẽ đổi sang Ngửa. Biết vậy, Hùng lại đổi sang Sấp... Vòng tròn này không bao giờ dừng, vì **bất kỳ lựa chọn cố định nào cũng có thể bị bắt bài**.

Lời giải hóa ra đơn giản đến bất ngờ: **đừng chọn**. Hãy để một đồng xu thật chọn giúp bạn, mỗi mặt một nửa. Khi đó, Hùng có thông minh đến đâu cũng không đoán được bạn sẽ ra gì, vì chính bạn cũng không biết.

Tập này là về ý tưởng đó: **chọn ngẫu nhiên một cách có chủ đích**.

## I. Chiến lược hỗn hợp

### 1. Chọn một xác suất thay vì chọn một nước đi

Cho tới giờ, mỗi chiến lược là một lựa chọn cụ thể: Khai, Im lặng, Hươu, Thỏ. Ta gọi chúng là **chiến lược thuần túy** (pure strategy).

Một **chiến lược hỗn hợp** (mixed strategy) là một cách **trộn** các chiến lược thuần túy theo những xác suất nhất định. Ví dụ "ra Sấp với xác suất 70%, Ngửa với xác suất 30%" là một chiến lược hỗn hợp. Chiến lược thuần túy chỉ là trường hợp đặc biệt: ra Sấp với xác suất 100%.

Khi đối thủ chơi hỗn hợp, payoff của bạn không còn là một con số chắc chắn mà là một **giá trị kỳ vọng**: trung bình bạn nhận được bao nhiêu nếu chơi rất nhiều ván.

### 2. Giải trò Chẵn lẻ

Giả sử Hùng ra Sấp với xác suất $q$, và ra Ngửa với xác suất $1 - q$. Nhắc lại luật: giống mặt bạn được $+1$, khác mặt bạn mất $1$. Payoff kỳ vọng của bạn:

- Nếu bạn ra **Sấp**: thắng khi Hùng ra Sấp, thua khi Hùng ra Ngửa, nên được $q - (1 - q) = 2q - 1$.
- Nếu bạn ra **Ngửa**: ngược lại, được $(1 - q) - q = 1 - 2q$.

Bây giờ hãy nhìn từ phía Hùng:

- Nếu $q > \frac{1}{2}$, Hùng ra Sấp nhiều hơn, thì Sấp cho bạn payoff dương. Bạn sẽ luôn ra Sấp và thắng dần.
- Nếu $q < \frac{1}{2}$, bạn sẽ luôn ra Ngửa và cũng thắng dần.
- Chỉ khi $q = \frac{1}{2}$, cả hai lựa chọn của bạn đều cho kỳ vọng bằng $0$. Bạn **không khai thác được gì**.

Vậy Hùng buộc phải chơi đúng 50/50, nếu không sẽ bị bạn bắt bài. Lập luận y hệt cho bạn. Cặp chiến lược **(50/50, 50/50)** là cân bằng Nash của trò Chẵn lẻ: khi người kia đã trộn 50/50, bạn đổi sang tỉ lệ nào cũng không khá hơn, nên không ai muốn đổi ý.

Đây chính là cân bằng mà ma trận ở Tập 2 không thể hiện được: nó không nằm ở ô nào cả, mà nằm **giữa** các ô.

## II. Nguyên lý bàng quan

### 1. Trộn để đối thủ không còn gì để chọn

Có một chi tiết trong lời giải trên rất đáng chú ý. Ta không tìm $q$ của Hùng bằng cách hỏi *"tỉ lệ nào tốt nhất cho Hùng?"*. Ta tìm nó bằng cách hỏi:

> Hùng phải trộn với tỉ lệ nào để **bạn** thấy mọi lựa chọn đều như nhau?

Đó là **nguyên lý bàng quan** (indifference principle), công cụ chính để tính cân bằng hỗn hợp:

> Trong một cân bằng hỗn hợp, mỗi người chơi trộn sao cho **đối thủ bàng quan** giữa các lựa chọn mà đối thủ đang dùng.

Lý do: nếu bạn thấy một lựa chọn tốt hơn hẳn lựa chọn kia, bạn sẽ chỉ dùng lựa chọn đó, và không còn "trộn" gì nữa. Bạn chỉ sẵn lòng tung đồng xu khi hai mặt đồng xu dẫn tới kết quả như nhau.

Hệ quả nghe rất ngược đời: **tỉ lệ trộn của bạn được quyết định bởi payoff của đối thủ**, không phải payoff của bạn.

### 2. Đá penalty

Hãy thử với một tình huống mà quyết định hỗn hợp diễn ra thật, hàng nghìn lần mỗi năm: đá phạt đền. Cầu thủ chọn sút bên **trái** hay bên **phải**, thủ môn chọn đổ người sang trái hay phải. Bóng đi quá nhanh nên thủ môn phải đoán trước, và đó là một trò chơi cùng lúc.

Giả sử tỉ lệ ghi bàn như sau. Trái và phải đều tính theo hướng nhìn của cầu thủ, thủ môn đổ đúng hướng thì khó ghi hơn, và cầu thủ này sút trái chắc hơn sút phải:

| Tỉ lệ ghi bàn | Thủ môn đổ trái | Thủ môn đổ phải |
|---|---|---|
| **Sút trái** | 60% | 95% |
| **Sút phải** | 90% | 50% |

Đây là trò chơi **tổng bằng không**: cầu thủ muốn tỉ lệ này cao, thủ môn muốn nó thấp. Không có cân bằng thuần túy: sút trái thì thủ môn sẽ đổ trái, thủ môn đổ trái thì cầu thủ sẽ sút phải, và cứ thế.

**Thủ môn trộn thế nào?** Gọi $q$ là xác suất thủ môn đổ trái. Thủ môn phải làm cầu thủ bàng quan giữa sút trái và sút phải:

$$
0{,}60\,q + 0{,}95\,(1 - q) = 0{,}90\,q + 0{,}50\,(1 - q)
$$

Giải ra $q = 0{,}6$. Thủ môn đổ trái 60% số lần.

**Cầu thủ trộn thế nào?** Gọi $k$ là xác suất sút trái. Cầu thủ phải làm thủ môn bàng quan giữa đổ trái và đổ phải:

$$
0{,}60\,k + 0{,}90\,(1 - k) = 0{,}95\,k + 0{,}50\,(1 - k)
$$

Giải ra $k = \frac{8}{15} \approx 0{,}53$. Cầu thủ sút trái khoảng 53% số lần.

Thay ngược lại, tỉ lệ ghi bàn ở cân bằng là **74%**, và đây là điều thú vị nhất: ở cân bằng, tỉ lệ ghi bàn khi sút trái **bằng đúng** tỉ lệ ghi bàn khi sút phải, đều là 74%. Cầu thủ "giỏi bên trái hơn", nhưng thủ môn đã đổ sang trái nhiều hơn để bù lại, cho tới khi lợi thế đó biến mất hoàn toàn.

### 3. Cầu thủ thật có chơi đúng Nash không?

Nghe có vẻ quá lý thuyết. Không cầu thủ nào đứng trước chấm phạt đền mà giải phương trình cả. Nhưng năm 2003, nhà kinh tế học Ignacio Palacios-Huerta phân tích khoảng 1.400 quả phạt đền trong các giải bóng đá chuyên nghiệp châu Âu, và kiểm tra đúng hai dự đoán của lý thuyết:

1. Với mỗi cầu thủ, tỉ lệ ghi bàn khi sút trái và khi sút phải phải **gần bằng nhau**.
2. Hướng sút của mỗi quả phải **không đoán được** từ các quả trước đó.

Dữ liệu khớp với cả hai. Tỉ lệ trộn thực tế của cầu thủ và thủ môn chỉ chênh vài phần trăm so với tỉ lệ cân bằng tính từ bảng ghi bàn. Một nghiên cứu khác về các trận chung kết Wimbledon (Walker và Wooders, 2001) cũng cho kết quả tương tự với hướng giao bóng trong tennis.

Những vận động viên này không học lý thuyết trò chơi. Họ học bằng hàng nghìn lần bị bắt bài, và những người sống sót ở đỉnh cao là những người đã tự "hội tụ" về cân bằng.

## III. Định lý Nash

Đến đây, ta có thể phát biểu đầy đủ kết quả đã nhắc ở Tập 2:

> **Định lý Nash (1950).** Mọi trò chơi có hữu hạn người chơi, mỗi người có hữu hạn chiến lược, đều có ít nhất một cân bằng Nash, nếu cho phép chiến lược hỗn hợp.

Chứng minh của Nash dùng một công cụ từ topo học: **định lý điểm bất động** (fixed point theorem). Ý tưởng trực quan: nếu bạn khuấy một cốc cà phê, rồi để nó lắng xuống, thì luôn có ít nhất một điểm trên mặt nước nằm đúng vị trí ban đầu của nó. Nash coi "mỗi người đổi sang phản ứng tốt nhất" như một lần khuấy trên tập hợp các tổ hợp chiến lược hỗn hợp, và một cân bằng chính là điểm không bị khuấy đi đâu cả.

Định lý này là lý do cân bằng Nash trở thành khái niệm trung tâm của cả ngành: bạn không bao giờ phải lo trò chơi mình đang phân tích "không có đáp án".

## IV. Oẳn tù tì với một cỗ máy biết học

### 1. Cân bằng là 1/3, nhưng con người không ngẫu nhiên

Với oẳn tù tì, nguyên lý bàng quan cho ngay đáp án: cân bằng duy nhất là ra Búa, Bao, Kéo mỗi thứ **một phần ba**. Lệch khỏi tỉ lệ đó một chút là đối thủ có cách khai thác.

Vấn đề là con người rất kém trong việc tạo ra ngẫu nhiên. Ở bài [Ba ảo tưởng xác suất](/blog/Probability-Illusions), ta đã thấy khi tự viết một chuỗi tung đồng xu, người ta đổi mặt quá thường xuyên và né những chuỗi dài. Oẳn tù tì cũng vậy. Một nghiên cứu năm 2014 của nhóm Wang, Xu và Zhou với hơn 300 sinh viên cho thấy người chơi có những thói quen khá rõ: người vừa thắng có xu hướng **giữ nguyên** nước vừa ra, người vừa thua có xu hướng **đổi** sang nước tiếp theo trong vòng Búa → Bao → Kéo.

Chỉ cần có thói quen, máy có thể học được nó.

### 2. Đấu với bot

Bot dưới đây không gian lận: nó chọn **trước** khi bạn bấm, chỉ dựa vào lịch sử các ván trước. Cách nó học rất đơn giản: nó ghi nhớ mỗi khi bạn vừa ra một nước nào đó và vừa thắng, hòa hay thua, thì ván sau bạn thường ra gì, rồi ra nước khắc chế. Hãy chơi khoảng 50 ván xem ai thắng.

Sau đó bấm **"Để máy chơi ngẫu nhiên"**: một người chơi thật sự ngẫu nhiên (chơi đúng cân bằng 1/3) sẽ thay bạn chơi 50 ván. Để ý xem đường điểm số thay đổi thế nào.

<rps-bot>
</rps-bot>

### 3. Cân bằng là để phòng thủ

Nếu bạn chơi đủ lâu, khả năng cao là bot sẽ dẫn trước bạn. Còn người chơi ngẫu nhiên thì giữ điểm dao động quanh 0: bot không thắng được, nhưng người chơi ngẫu nhiên cũng không thắng được bot.

Đó là bản chất của chiến lược cân bằng trong trò tổng bằng không: nó là một chiến lược **phòng thủ hoàn hảo**. Không ai có thể khai thác bạn, nhưng bạn cũng không khai thác được ai. Muốn thắng một đối thủ có thói quen, bạn phải **rời khỏi cân bằng** để tấn công thói quen đó, và đúng lúc đó bạn cũng tự để lộ sơ hở. Đó là điều bot đang làm với bạn: nó không chơi 1/3, nó chơi theo những gì nó đoán được.

Các AI chơi poker mạnh nhất, như Libratus (2017) hay Pluribus (2019), lại chọn con đường phòng thủ: chúng chơi gần cân bằng và gần như không cố khai thác ai. Ở oẳn tù tì, chiến lược đó chỉ hòa. Nhưng poker phức tạp hơn nhiều, có rất nhiều nước đi tệ hẳn so với nước khác, nên mỗi lần con người lệch khỏi cân bằng là một lần tự đánh rơi tiền, và AI chỉ cần đứng yên để nhặt.

## V. Góc Game Designer

### 1. Buff Búa, người chơi ra Bao nhiều hơn

Hệ thống khắc chế kiểu oẳn tù tì có mặt ở khắp nơi: kỵ binh thắng cung thủ, cung thủ thắng bộ binh cầm giáo, giáo thắng kỵ binh. Hệ Lửa, Nước, Cỏ. Các bộ bài aggro, control, combo. Nếu ba bên cân đối, cân bằng là mỗi bên 1/3. Nhưng hệ thống thật hiếm khi cân đối hoàn toàn.

Giả sử bạn **buff Búa**: khi Búa thắng Kéo, người thắng được **2 điểm** thay vì 1. Mọi trường hợp thắng khác vẫn được 1 điểm. Người chơi sẽ ra Búa nhiều hơn chứ?

Gọi tỉ lệ của đối thủ là $r$ (Búa), $p$ (Bao), $s$ (Kéo). Payoff kỳ vọng của bạn:

- Ra **Búa**: thắng Kéo được 2, thua Bao mất 1, nên được $2s - p$.
- Ra **Bao**: thắng Búa được 1, thua Kéo mất 1, nên được $r - s$.
- Ra **Kéo**: thắng Bao được 1, thua Búa mất 2, nên được $p - 2r$.

Theo nguyên lý bàng quan, cả ba phải bằng nhau. Vì trò chơi đối xứng, giá trị chung đó là $0$, nên $p = 2s$, $r = s$ và $p = 2r$. Kết hợp với $r + p + s = 1$:

$$
r = \frac{1}{4}, \quad p = \frac{1}{2}, \quad s = \frac{1}{4}
$$

Búa được buff, nhưng tỉ lệ ra Búa ở cân bằng **giảm** từ 1/3 xuống 1/4. Thứ tăng lên là **Bao**, khắc tinh của Búa, lên tới một nửa. Còn Kéo, nạn nhân của Búa, cũng giảm.

Lý do vẫn là nguyên lý bàng quan: tỉ lệ của mỗi lựa chọn không do sức mạnh của chính nó quyết định, mà do nó cần thiết thế nào để giữ cho các lựa chọn khác cân bằng. Buff một lựa chọn trong vòng khắc chế thường làm **khắc tinh của nó** trở nên phổ biến. Đây là một hiện tượng mà người làm balance cho game đối kháng hay game thẻ bài gặp thường xuyên, và nó chỉ dễ hiểu khi bạn nhìn bằng lăng kính cân bằng hỗn hợp.

Trên thực tế, người chơi không tính toán như vậy, và meta mất một thời gian mới hội tụ. Ngay sau patch, Búa thường được chơi nhiều hơn thật, rồi người chơi Bao bắt đầu thắng đậm, rồi meta dần dịch chuyển. Nếu bạn chỉ nhìn số liệu tuần đầu tiên, bạn có thể rút ra kết luận ngược hoàn toàn.

### 2. AI đối thủ: không quá dễ đoán, không quá hoàn hảo

Bài học từ bot oẳn tù tì áp dụng trực tiếp cho AI trong game:

- Một AI có **quy luật cố định** sẽ bị người chơi bắt bài và khai thác. Đôi khi đó chính là điều bạn muốn: boss có "tell" rõ ràng trước mỗi đòn đánh để người chơi học và vượt qua.
- Một AI chơi **đúng cân bằng hỗn hợp** thì không thể bị khai thác, nhưng cũng không cho người chơi cảm giác "đọc được" đối thủ. Với người chơi, nó giống như đánh với một máy tung xúc xắc, và thường rất nhàm.
- Phần lớn AI hay nằm ở giữa: **có thói quen để người chơi học**, cộng thêm **một chút ngẫu nhiên** để việc học không quá dễ. Tỉ lệ ngẫu nhiên đó chính là núm vặn độ khó.

## VI. Tóm tắt

1. **Chiến lược hỗn hợp** là chọn ngẫu nhiên giữa các nước đi theo những xác suất nhất định. Nhờ nó, mọi trò chơi hữu hạn đều có cân bằng Nash (định lý Nash).
2. **Nguyên lý bàng quan:** ở cân bằng hỗn hợp, mỗi người trộn sao cho đối thủ thấy mọi lựa chọn như nhau. Tỉ lệ trộn của bạn được quyết định bởi payoff của **đối thủ**.
3. Chơi cân bằng là phòng thủ hoàn hảo nhưng không khai thác được ai. Con người không ngẫu nhiên giỏi, nên trong thực tế, ai học được thói quen của người kia sẽ thắng.

## Câu đố cho Tập 4

Từ trước tới giờ, mọi người chơi đều chọn **cùng lúc**. Tập sau, ta để họ đi **lần lượt**.

Năm tên cướp biển A, B, C, D, E (xếp theo thứ bậc từ cao xuống thấp) cần chia **100 đồng vàng**. Luật chia như sau:

- Tên có thứ bậc cao nhất đề xuất một cách chia. Cả nhóm, kể cả người đề xuất, bỏ phiếu.
- Nếu có **ít nhất một nửa** số phiếu đồng ý, vàng được chia theo đề xuất đó.
- Nếu không, người đề xuất bị ném xuống biển, và tên có thứ bậc cao nhất tiếp theo đề xuất lại từ đầu.

Mỗi tên cướp biển đều rất lý trí: ưu tiên số một là **sống sót**, ưu tiên số hai là **được nhiều vàng nhất**, và nếu hai lựa chọn cho số vàng như nhau thì tên đó thích **ném người khác xuống biển** hơn.

A nên đề xuất cách chia nào để vừa sống sót, vừa giữ được nhiều vàng nhất? Đáp án ở [Tập 4](/blog/Game-Theory-4-Suy-Luan-Nguoc) sẽ làm bạn bất ngờ.

## Tài liệu tham khảo

- J. F. Nash, "Non-Cooperative Games", *Annals of Mathematics* 54(2), 286–295 (1951).
- I. Palacios-Huerta, "Professionals Play Minimax", *Review of Economic Studies* 70(2), 395–415 (2003).
- M. Walker, J. Wooders, "Minimax Play at Wimbledon", *American Economic Review* 91(5), 1521–1538 (2001).
- Z. Wang, B. Xu, H.-J. Zhou, "Social cycling and conditional responses in the Rock-Paper-Scissors game", *Scientific Reports* 4, 5830 (2014).
- [Mixed strategy — Wikipedia](https://en.wikipedia.org/wiki/Strategy_(game_theory)#Mixed_strategy)
- [Rock paper scissors — Wikipedia](https://en.wikipedia.org/wiki/Rock_paper_scissors)
