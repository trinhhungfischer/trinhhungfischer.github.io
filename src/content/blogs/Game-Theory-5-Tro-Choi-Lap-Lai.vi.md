---
title: "[Game Theory] Tập 5: Chơi mãi thì sẽ hợp tác"
date: "2026-11-03"
category: "Game Design"
tags: "Game Theory"
excerpt: "Song đề tù nhân chơi một lần thì ai cũng phản bội. Chơi mãi thì sao? Một giải đấu giữa các chương trình máy tính năm 1980 cho thấy chiến lược đơn giản nhất lại thắng: ăn miếng trả miếng."
color: "var(--pale-green)"
draft: true
---

# Giải câu đố Tập 4

Ở cuối [Tập 4](/blog/Game-Theory-4-Suy-Luan-Nguoc), mình hỏi: nếu bạn và Hùng chơi song đề tù nhân **đúng 100 ván**, và cả hai đều biết con số 100, thì sao?

Quy nạp ngược cho một đáp án rất buồn. Ván 100 không có tương lai, nên cả hai khai. Biết vậy, ván 99 cũng không có gì để giữ, nên cả hai cũng khai. Lần ngược lên, cả hai **khai ở mọi ván**, kể cả ván đầu tiên. 100 ván chơi cũng chẳng khác gì một ván.

Thế nhưng người thật không chơi như vậy. Năm 1986, Reinhard Selten (người đã xuất hiện ở Tập 4) và Rolf Stoecker cho các cặp sinh viên chơi song đề tù nhân 10 ván liên tiếp, lặp lại nhiều lượt với các đối thủ khác nhau. Phần lớn các cặp **hợp tác ở những ván đầu**, và chỉ bắt đầu phản bội khi gần tới ván cuối. Càng chơi nhiều lượt, thời điểm phản bội càng sớm hơn một chút, nhưng sự hợp tác ở giữa trận vẫn không biến mất.

Câu hỏi của tập này: **vì sao con người hợp tác, và khi nào sự hợp tác đó bền vững?**

## I. Cái bóng của tương lai

### 1. Khi không ai biết lúc nào kết thúc

Thứ phá hỏng hợp tác trong câu đố trên là **ván cuối cùng**. Có ván cuối thì có điểm bắt đầu cho quy nạp ngược. Nhưng ngoài đời, rất hiếm khi ta biết chắc mình gặp ai đó lần cuối là lúc nào. Bạn không biết đây có phải lần cuối mua phở ở quán đầu ngõ không, hay lần cuối làm việc chung với một đồng nghiệp.

Hãy mô hình hóa điều đó: sau mỗi ván, trò chơi **tiếp tục với xác suất $\delta$**, và dừng với xác suất $1 - \delta$. Con số $\delta$ (đọc là "delta") đo **mức độ quan trọng của tương lai**. Khi $\delta$ gần 1, hai người gần như chắc chắn còn gặp lại. Khi $\delta$ gần 0, mỗi ván gần như là ván cuối.

Từ tập này, mình sẽ dùng thang điểm của Robert Axelrod, người sẽ xuất hiện ngay bên dưới. Mỗi ván, mỗi người được:

| | Hùng hợp tác | Hùng phản bội |
|---|---|---|
| **Bạn hợp tác** | (3, 3) | (0, 5) |
| **Bạn phản bội** | (5, 0) | (1, 1) |

Theo ký hiệu ở Tập 1: $T = 5$, $R = 3$, $P = 1$, $S = 0$. Vẫn thỏa $T > R > P > S$, nên mỗi ván riêng lẻ vẫn là một song đề tù nhân.

### 2. Khi nào hợp tác là lựa chọn lý trí?

Giả sử Hùng chơi một chiến lược rất nghiêm khắc: **hợp tác cho tới khi bạn phản bội một lần, sau đó phản bội mãi mãi**. Bạn có nên giữ hợp tác không?

- **Nếu bạn luôn hợp tác**, mỗi ván bạn được 3. Tổng kỳ vọng là $3 + 3\delta + 3\delta^2 + \dots = \dfrac{3}{1 - \delta}$.
- **Nếu bạn phản bội ngay**, ván này bạn được 5, nhưng từ ván sau Hùng phản bội mãi mãi, và tốt nhất bạn chỉ được 1 mỗi ván. Tổng kỳ vọng là $5 + \dfrac{\delta}{1 - \delta}$.

Hợp tác tốt hơn khi

$$
\frac{3}{1 - \delta} \geq 5 + \frac{\delta}{1 - \delta}
\quad \Longleftrightarrow \quad
\delta \geq \frac{1}{2}
$$

Tổng quát hơn, với bất kỳ song đề tù nhân nào, điều kiện là

$$
\delta \geq \frac{T - R}{T - P}
$$

Tử số $T - R$ là **cám dỗ**: phản bội thì được thêm bao nhiêu ở ván này. Mẫu số $T - P$ đo **cái giá** của việc mất đi sự hợp tác về lâu dài. Hợp tác bền vững khi tương lai đủ quan trọng để át được cám dỗ của hiện tại. Axelrod gọi điều này là **cái bóng của tương lai** (the shadow of the future).

### 3. Quá nhiều cân bằng

Khi $\delta$ đủ lớn, "hợp tác mãi mãi" trở thành một cân bằng Nash. Nhưng "phản bội mãi mãi" cũng vẫn là cân bằng: nếu Hùng luôn phản bội thì bạn hợp tác cũng chẳng để làm gì. Và còn vô số cân bằng khác ở giữa, như hợp tác hai ván rồi phản bội một ván, theo một quy ước nào đó mà cả hai cùng theo.

Kết quả này được gọi là **định lý dân gian** (folk theorem), vì nó được các nhà lý thuyết trò chơi biết tới và truyền tai nhau từ những năm 1950, trước khi có ai đứng tên công bố. Đại ý: khi trò chơi lặp lại đủ lâu, **gần như mọi kết cục** mà mỗi bên đều được nhiều hơn mức "phản bội mãi mãi" đều có thể duy trì như một cân bằng.

Đây là tin vừa tốt vừa xấu. Tốt vì hợp tác **có thể** tồn tại giữa những người hoàn toàn ích kỷ. Xấu vì lý thuyết không nói nó **sẽ** tồn tại. Giống như ở Tập 2, khi có nhiều cân bằng, câu hỏi thật sự là: cân bằng nào sẽ xảy ra, và chiến lược nào sẽ dẫn tới nó?

## II. Giải đấu của Axelrod

### 1. Cuộc thi giữa các chương trình máy tính

Năm 1980, nhà khoa học chính trị Robert Axelrod ở Đại học Michigan có một ý tưởng: thay vì tranh luận lý thuyết, hãy **tổ chức một giải đấu**. Ông mời các chuyên gia lý thuyết trò chơi, kinh tế học, tâm lý học, toán học gửi về những chương trình máy tính chơi song đề tù nhân lặp lại. Mỗi chương trình đấu vòng tròn với tất cả các chương trình khác, mỗi trận 200 ván, và tổng điểm quyết định thứ hạng.

Giải đầu tiên có 14 chương trình, cộng thêm một chương trình chơi ngẫu nhiên. Có những chương trình rất phức tạp, dùng thống kê để đoán đối thủ, tìm cách phản bội đúng lúc để kiếm thêm điểm.

Người thắng là chương trình **ngắn nhất**: **Tit-for-Tat**, do nhà toán học kiêm nhà tâm lý học Anatol Rapoport gửi tới. Luật của nó chỉ có hai dòng:

1. Ván đầu tiên: **hợp tác**.
2. Từ ván thứ hai: **làm đúng điều đối thủ vừa làm ở ván trước**.

Ăn miếng trả miếng. Không hơn.

Axelrod công bố kết quả, phân tích vì sao Tit-for-Tat thắng, rồi tổ chức giải thứ hai. Lần này có 62 chương trình, cộng thêm chương trình ngẫu nhiên, và ai cũng biết Tit-for-Tat đã thắng giải trước. Nhiều người thiết kế chương trình riêng để khắc chế nó. Kết quả: **Tit-for-Tat lại thắng**.

### 2. Bốn phẩm chất

Axelrod rút ra bốn đặc điểm chung của những chiến lược thành công:

- **Tử tế** (nice): không bao giờ là người phản bội trước.
- **Biết trả đũa** (retaliatory): bị phản bội thì đáp trả ngay, để không bị lợi dụng.
- **Biết tha thứ** (forgiving): khi đối thủ quay lại hợp tác, mình cũng quay lại, không để thù hận kéo dài.
- **Rõ ràng** (clear): hành vi đơn giản, dễ đoán, để đối thủ nhanh chóng hiểu rằng hợp tác với mình là có lợi.

Và còn một sự thật thú vị: Tit-for-Tat **không bao giờ thắng trong một trận đơn lẻ nào**. Trong mỗi trận, nó chỉ có thể hòa hoặc thua đối thủ một chút, vì nó không bao giờ phản bội trước. Nó vô địch vì nó giúp **cả hai bên** cùng đạt điểm cao trong rất nhiều trận, trong khi những chiến lược "thắng" từng trận lại kéo cả hai về mức điểm thấp.

### 3. Tự tổ chức giải đấu

Dưới đây là một giải đấu thu nhỏ với tám chiến lược. Mỗi cặp đấu với nhau (kể cả với bản sao của chính mình, như Axelrod đã làm), mỗi trận 200 ván. Điểm hiển thị là **điểm trung bình mỗi ván**, cao nhất là 5, hợp tác trọn vẹn là 3.

Widget có hai chế độ. **Đấu vòng tròn** là giải đấu giống của Axelrod. **Tiến hóa** mô phỏng một thí nghiệm khác mà Axelrod làm sau đó: coi mỗi chiến lược là một "loài" trong một quần thể, và sau mỗi thế hệ, loài nào kiếm được nhiều điểm trước quần thể hiện tại thì đông lên, loài nào kiếm ít thì thưa đi.

Thử các kịch bản sau:

1. **Không nhiễu, đấu vòng tròn.** Năm chiến lược tử tế chiếm năm vị trí đầu, ba chiến lược "xấu tính" đứng cuối. Nhưng Ăn miếng trả miếng chưa chắc đứng đầu: các chiến lược tử tế đối xử với nhau y hệt nhau (hợp tác suốt), nên khác biệt giữa chúng chỉ đến từ cách đối phó với ba kẻ còn lại.
2. **Không nhiễu, tiến hóa.** Ba chiến lược xấu tính sống được một thời gian nhờ "ăn" những chiến lược ngây thơ như *Luôn hợp tác* và *Ngẫu nhiên*. Nhưng khi con mồi thưa dần, chúng chỉ còn gặp những đối thủ biết trả đũa, và cả ba đều tuyệt chủng. Trong thí nghiệm gốc của Axelrod, Ăn miếng trả miếng là loài đông nhất ở cuối mô phỏng.
3. **Môi trường khắc nghiệt.** Bỏ hết các chiến lược tử tế, chỉ để lại *Ăn miếng trả miếng*, *Luôn phản bội*, *Ngẫu nhiên* và *Lén lút*. Ăn miếng trả miếng vẫn đứng đầu: nó không để ai lợi dụng mình lâu.
4. **Bật nhiễu 5%**: mỗi nước đi có 5% khả năng bị "đánh nhầm" thành nước ngược lại. Xem cả hai chế độ. Chuyện gì xảy ra với Ăn miếng trả miếng và Thù dai?

Vì có yếu tố ngẫu nhiên, mỗi lần bấm **Chạy lại** con số sẽ hơi khác, nhưng bức tranh chung thì giữ nguyên.

<axelrod-tournament>
</axelrod-tournament>

## III. Khi có hiểu lầm

### 1. Vòng xoáy trả đũa

Nếu bạn đã thử kịch bản cuối, bạn sẽ thấy khi có nhiễu, bảng đấu vòng tròn trở nên sát nút, có lúc *Luôn phản bội* còn chen được vào nhóm đầu. Còn ở chế độ tiến hóa, Ăn miếng trả miếng và Thù dai gần như tuyệt chủng, nhường chỗ cho hai chiến lược mà mình sẽ giới thiệu ngay sau đây. Lý do nằm ở chính điểm mạnh của chúng.

Với Thù dai, chuyện quá rõ: chỉ một lần đối thủ đánh nhầm là Thù dai phản bội mãi mãi, dù đối thủ có tử tế đến đâu. Với Ăn miếng trả miếng, vấn đề tinh tế hơn.

Hãy tưởng tượng hai người cùng chơi Ăn miếng trả miếng, đang hợp tác vui vẻ. Bỗng một nước đi của bạn bị "đánh nhầm" thành phản bội. Ván sau Hùng trả đũa. Ván sau nữa bạn trả đũa lại lần trả đũa đó. Hai người bị kẹt trong một vòng **luân phiên trả đũa** dài vô tận, cho tới khi một lần nhiễu khác may mắn kéo cả hai về hợp tác, hoặc đẩy cả hai vào phản bội lẫn nhau mãi mãi.

Ngoài đời, nhiễu là chuyện thường: một tin nhắn bị hiểu sai, một lời hứa không giữ được vì lý do khách quan, một đồng đội lỡ tay. Một chiến lược chỉ biết trả đũa chính xác sẽ biến mỗi hiểu lầm nhỏ thành một mối thù.

### 2. Rộng lượng hơn một chút

Năm 1992, Martin Nowak và Karl Sigmund cho thấy một biến thể hoạt động tốt hơn nhiều trong môi trường có nhiễu: **Ăn miếng trả miếng rộng lượng** (Generous Tit-for-Tat). Nó giống hệt Tit-for-Tat, chỉ khác là khi bị phản bội, nó vẫn **hợp tác với một xác suất nhỏ** (trong giải đấu ở trên là 10%), thay vì luôn trả đũa. Chút rộng lượng đó đủ để phá vỡ vòng xoáy trả đũa, mà vẫn đủ nghiêm khắc để không bị kẻ luôn phản bội lợi dụng nhiều.

Một năm sau, cũng hai tác giả này giới thiệu một chiến lược khác: **Pavlov**, hay "thắng thì giữ, thua thì đổi". Pavlov lặp lại nước đi của mình nếu ván trước kết quả tốt (được 3 hoặc 5), và đổi nước nếu kết quả tệ (được 0 hoặc 1). Khi hai Pavlov gặp nhau và một bên bị nhiễu, cả hai cùng nhận kết quả tệ, cùng đổi, và chỉ sau hai ván là quay về hợp tác. Pavlov tự sửa lỗi mà không cần ai phải tha thứ.

Bài học của phần này có lẽ quen thuộc với bất kỳ ai từng sống chung với người khác: trong một thế giới có hiểu lầm, **tha thứ không phải là yếu đuối, mà là một chiến lược**.

## IV. Hợp tác ngoài đời

Khi đã biết nhìn, bạn sẽ thấy "cái bóng của tương lai" ở khắp nơi:

**Khách du lịch và khách quen.** Vì sao quán ở khu du lịch dễ "chặt chém" hơn quán trong ngõ nhà bạn? Với quán trong ngõ, bạn là khách quen, $\delta$ rất cao: một lần chặt chém là mất một khách lâu dài. Với khách du lịch, nhiều khả năng đây là lần gặp duy nhất, $\delta$ gần bằng 0, và đó là một song đề tù nhân chơi một lần.

**Đánh giá trên sàn thương mại điện tử.** Người mua và người bán trên mạng hiếm khi gặp lại nhau. Hệ thống đánh giá sao biến hàng nghìn giao dịch một lần thành **một trò chơi lặp lại giữa người bán và cả cộng đồng người mua**. Một lần lừa đảo không chỉ mất một khách, mà mất uy tín với tất cả những khách sau.

**"Sống và để người khác sống" trong chiến hào.** Axelrod dành một chương sách cho một ví dụ đáng kinh ngạc từ Thế chiến thứ nhất. Ở nhiều đoạn mặt trận phía Tây, các đơn vị lính Anh và Đức đóng quân đối diện nhau trong chiến hào suốt nhiều tháng. Dần dần, hai bên hình thành những thỏa thuận ngầm: không bắn vào giờ ăn, bắn pháo vào cùng một chỗ trống mỗi ngày như một nghi thức, đáp trả ngay nếu bên kia vi phạm. Những người lính không hề quen biết nhau, thậm chí là kẻ thù, nhưng họ ở **cùng một chỗ, lặp lại mỗi ngày**. Bộ chỉ huy hai bên phải liên tục luân chuyển quân và ra lệnh tấn công bất ngờ để phá vỡ sự hợp tác đó.

**Cartel.** Mặt trái của chuyện hợp tác: các công ty trong cùng một ngành cũng có thể "hợp tác" giữ giá cao với nhau mà không cần ký kết gì, chỉ nhờ cùng gặp nhau trên thị trường mỗi ngày. Đây chính là cặp quán cà phê ở Tập 1, nhưng chơi mãi. Luật cạnh tranh ở nhiều nước được thiết kế để phá vỡ kiểu hợp tác này.

## V. Góc Game Designer

### 1. Ghép trận ngẫu nhiên là chơi một lần

Một hiện tượng quen thuộc của các game online có ghép trận: người chơi cư xử tệ với đồng đội ngẫu nhiên hơn hẳn so với bạn bè. Nhìn bằng lăng kính hôm nay, lý do rất rõ: với một đồng đội ngẫu nhiên, khả năng gặp lại gần như bằng 0. Mỗi trận là một song đề tù nhân chơi một lần, và cái bóng của tương lai không tồn tại.

Rất nhiều tính năng xã hội trong game thực chất là cách **kéo dài cái bóng của tương lai**:

- **Danh sách bạn bè, bang hội, nhóm cố định:** biến người lạ thành người sẽ gặp lại.
- **Hệ thống uy tín và khen thưởng:** ví dụ hệ thống *Endorsement* trong Overwatch (2018), cho phép người chơi khen đồng đội sau trận, và mức uy tín hiển thị cho những người chơi tương lai. Giống đánh giá trên sàn thương mại điện tử, nó biến mỗi trận một lần thành một phần của trò chơi lặp lại với cả cộng đồng.
- **Ghép trận ưu tiên người đã từng chơi tốt với nhau**, hoặc cho phép chặn người chơi tệ: thay đổi xác suất gặp lại theo hành vi.

### 2. Thiết kế cho nhiễu

Trong game, "nhiễu" rất nhiều: lag, bấm nhầm, không hiểu ý đồng đội. Nếu hệ thống của bạn trừng phạt mọi hành vi xấu một cách tự động và nghiêm khắc (như Tit-for-Tat), mỗi sai sót nhỏ có thể khởi đầu một vòng trả đũa.

Hãy học từ Ăn miếng trả miếng rộng lượng và Pavlov:

- **Hình phạt nên có ngưỡng**: một lần lỡ tay giết đồng đội khác với mười lần.
- **Nên có đường quay lại**: điểm uy tín hồi phục dần theo thời gian, lệnh cấm có thời hạn.
- **Giúp người chơi phân biệt cố ý và vô tình**: hệ thống ping, câu chat nhanh "Xin lỗi", "Lỡ tay", tất cả đều là kênh để báo hiệu rằng một lần phản bội là nhiễu, không phải ý đồ.

### 3. Cẩn thận với điểm kết thúc

Như đã nhắc ở Tập 4: một mùa giải, một sự kiện, một server sắp đóng cửa đều là "ván cuối" mà ai cũng thấy trước. Hợp tác giữa người chơi thường sụp đổ khi điểm kết thúc tới gần. Nếu sự hợp tác đó quan trọng với trải nghiệm, hãy cân nhắc làm mờ điểm kết thúc, hoặc cho uy tín và quan hệ **mang sang** mùa sau, để tương lai không bao giờ thật sự kết thúc.

## VI. Tóm tắt

1. Trong trò chơi lặp lại mà không ai biết lúc nào kết thúc, hợp tác có thể là lựa chọn lý trí, nếu **tương lai đủ quan trọng**: $\delta \geq \frac{T - R}{T - P}$.
2. Giải đấu của Axelrod cho thấy chiến lược thắng là chiến lược **tử tế, biết trả đũa, biết tha thứ và rõ ràng**. Ăn miếng trả miếng không thắng trận nào, nhưng thắng cả giải.
3. Khi có nhiễu, cần **rộng lượng hơn một chút**. Hợp tác giữa người lạ có thể được xây dựng bằng cách làm cho họ gặp lại nhau: uy tín, cộng đồng, quan hệ lâu dài.

## Câu đố cho Tập 6

Bạn muốn bán chiếc xe máy mới mua được ba tháng. Xe rất tốt, bạn biết rõ điều đó. Nhưng người mua thì không biết: họ chỉ biết rằng ngoài kia có xe tốt và cũng có những chiếc xe "có vấn đề" mà chủ xe muốn bán tống bán tháo.

Vì sao chiếc xe gần như mới của bạn lại bị trả giá thấp hơn hẳn so với giá xe mới? Và nếu bạn là người bán xe tốt, bạn có thể làm gì để người mua tin mình? Đáp án ở [Tập 6](/blog/Game-Theory-6-Thong-Tin-Bat-Can-Xung).

## Tài liệu tham khảo

- R. Axelrod, *The Evolution of Cooperation*, Basic Books, 1984.
- R. Selten, R. Stoecker, "End Behavior in Sequences of Finite Prisoner's Dilemma Supergames", *Journal of Economic Behavior & Organization* 7(1), 47–70 (1986).
- M. A. Nowak, K. Sigmund, "Tit for tat in heterogeneous populations", *Nature* 355, 250–253 (1992).
- M. Nowak, K. Sigmund, "A strategy of win-stay, lose-shift that outperforms tit-for-tat in the Prisoner's Dilemma game", *Nature* 364, 56–58 (1993).
- [The Evolution of Trust — Nicky Case](https://ncase.me/trust/), một trò chơi tương tác rất hay về chính chủ đề này.
- [Repeated game — Wikipedia](https://en.wikipedia.org/wiki/Repeated_game)
