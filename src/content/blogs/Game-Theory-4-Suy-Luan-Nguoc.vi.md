---
title: "[Game Theory] Tập 4: Đi trước hay đi sau? Suy luận ngược"
date: "2026-11-03"
category: "Game Design"
tags: "Game Theory"
excerpt: "Năm tên cướp biển chia 100 đồng vàng, và tên đầu đàn giữ được 98 đồng. Tập này về những trò chơi đi lần lượt: cách giải chúng từ cuối lên đầu, vì sao lời đe dọa thường vô giá trị, và vì sao con người không chơi như lý thuyết."
color: "var(--pale-green)"
draft: false
---

# Câu đố năm tên cướp biển

Ở cuối [Tập 3](/blog/Game-Theory-3-Chien-Luoc-Hon-Hop), mình để lại một câu đố. Nhắc lại luật:

- Năm tên cướp biển A, B, C, D, E (thứ bậc giảm dần) cần chia **100 đồng vàng**.
- Tên có thứ bậc cao nhất đề xuất một cách chia, rồi cả nhóm bỏ phiếu, kể cả người đề xuất.
- Nếu có **ít nhất một nửa** số phiếu đồng ý, vàng được chia như đề xuất. Nếu không, người đề xuất bị ném xuống biển, và tên kế tiếp đề xuất lại.
- Mỗi tên ưu tiên **sống sót** trước, rồi tới **nhiều vàng**, và nếu số vàng như nhau thì thích **ném người khác xuống biển** hơn.

Đa số người nghe lần đầu đoán rằng A sẽ gặp nguy, vì bốn tên còn lại có thể hùa nhau ném A xuống biển để chia phần to hơn. Một số người đoán A phải chia gần đều để mua phiếu.

Đáp án thật: A đề xuất **giữ 98 đồng**, cho C và E mỗi người 1 đồng, B và D không được gì. Đề xuất này được thông qua.

Nghe vô lý? Bí quyết nằm ở việc **không bắt đầu từ A**. Hãy bắt đầu từ cuối.

## I. Trò chơi tuần tự

### 1. Khi người sau nhìn thấy nước đi của người trước

Ba tập trước, mọi người chơi đều chọn **cùng lúc**: không ai biết người kia đã chọn gì. Rất nhiều trò chơi không như vậy. Trong cờ vua, cờ caro, đàm phán, đấu giá công khai, người chơi đi **lần lượt**, và mỗi người biết rõ những gì đã xảy ra trước đó. Những trò này gọi là **trò chơi tuần tự** (sequential game).

Ma trận không còn là công cụ phù hợp nữa. Thay vào đó, ta vẽ **cây trò chơi** (game tree): mỗi nút là một thời điểm có người ra quyết định, mỗi nhánh là một lựa chọn, và ở cuối mỗi nhánh là payoff.

Ví dụ: bạn đang có quán cà phê duy nhất trên một con phố. Hùng đang cân nhắc mở quán thứ hai. Nếu Hùng mở, bạn chọn **hợp tác** (giữ giá, chia khách) hoặc **phá giá** để đuổi Hùng đi, nhưng phá giá thì cả hai cùng lỗ:

```
Hùng
├── Không mở quán ................ (Bạn 10, Hùng 0)
└── Mở quán
    └── Bạn
        ├── Hợp tác .............. (Bạn 5, Hùng 3)
        └── Phá giá .............. (Bạn 1, Hùng −2)
```

### 2. Giải từ dưới lên

Cách giải trò chơi tuần tự rất tự nhiên: **bắt đầu từ những quyết định cuối cùng**, rồi lần ngược lên.

- **Nút cuối:** giả sử Hùng đã mở quán. Lúc đó bạn so sánh hợp tác (5) với phá giá (1), và chọn **hợp tác**.
- **Nút đầu:** Hùng biết bạn sẽ hợp tác nếu mình mở quán. Vậy mở quán cho Hùng 3, không mở cho 0. Hùng **mở quán**.

Kết quả: Hùng mở quán, bạn hợp tác, payoff (5, 3).

Phương pháp này gọi là **quy nạp ngược** (backward induction). Nó dựa trên một giả định quan trọng: mỗi người chơi tin rằng những người đi sau sẽ hành động lý trí, khi tới lượt họ.

## II. Lời đe dọa không đáng tin

### 1. Một cân bằng Nash kỳ lạ

Giả sử trước khi Hùng quyết định, bạn đi rêu rao khắp phố: *"Ai dám mở quán cà phê ở đây, tôi sẽ phá giá tới cùng!"* Hùng có nên sợ không?

Hãy viết trò chơi dưới dạng ma trận như ở Tập 2. Chiến lược của bạn bây giờ là một **kế hoạch**: "nếu Hùng mở quán thì tôi sẽ làm gì". Lần này bạn vẫn chọn theo hàng, Hùng chọn theo cột:

| | Hùng mở quán | Hùng không mở |
|---|---|---|
| **Bạn: nếu Hùng mở thì hợp tác** | (<u>5</u>, <u>3</u>) | (<u>10</u>, 0) |
| **Bạn: nếu Hùng mở thì phá giá** | (1, −2) | (<u>10</u>, <u>0</u>) |

Có **hai** ô được gạch chân cả hai số:

- (Hợp tác, Mở quán): đúng là kết quả của quy nạp ngược.
- (Phá giá, Không mở): nếu Hùng tin lời đe dọa và không mở quán, thì lời đe dọa không bao giờ bị thử thách, nên nó chẳng tốn của bạn đồng nào. Không ai muốn đơn phương đổi ý. Đây cũng là một cân bằng Nash.

Nhưng cân bằng thứ hai dựa trên một lời nói dối. Nếu Hùng **thật sự** mở quán, đến lúc đó bạn sẽ không phá giá, vì phá giá cho bạn 1 còn hợp tác cho bạn 5. Lời đe dọa này là một **lời đe dọa không đáng tin** (non-credible threat). Một Hùng lý trí sẽ thấy điều đó, và mở quán.

### 2. Cân bằng hoàn hảo trò chơi con

Năm 1965, nhà kinh tế học người Đức Reinhard Selten đưa ra một cách sàng lọc những cân bằng như vậy. Mỗi nút trong cây trò chơi, cùng với tất cả những gì nằm phía dưới nó, là một **trò chơi con** (subgame). Một cân bằng được gọi là **hoàn hảo trò chơi con** (subgame perfect equilibrium) nếu nó vẫn là cân bằng Nash **trong mọi trò chơi con**, kể cả những trò chơi con không bao giờ xảy ra trên thực tế.

Cân bằng (Phá giá, Không mở) bị loại vì trong trò chơi con "Hùng đã mở quán", phá giá không phải là lựa chọn tốt nhất của bạn. Quy nạp ngược tự động cho ra cân bằng hoàn hảo trò chơi con, vì nó buộc mỗi người phải hành động tốt nhất **ở mọi nút**.

Selten nhận giải Nobel Kinh tế năm 1994, cùng năm và cùng giải với John Nash và John Harsanyi.

### 3. Sức mạnh của việc tự trói tay mình

Vậy làm sao để lời đe dọa trở nên đáng tin? Câu trả lời ngược đời: **tự làm hại mình**, hay chính xác hơn, tự thay đổi payoff của mình để đến lúc đó, thực hiện lời đe dọa trở thành lựa chọn tốt nhất.

- Năm 207 trước Công nguyên, trong trận Cự Lộc, Hạng Vũ cho quân qua sông rồi **đập nồi, dìm thuyền**, chỉ mang theo lương ăn ba ngày. Rút lui không còn là một lựa chọn, nên quân Sở chỉ còn đường đánh tới cùng. Tích "phá phủ trầm chu" bắt nguồn từ đây.
- Năm 1519, Hernán Cortés cho phá hủy đoàn tàu của mình sau khi đổ bộ lên Mexico (câu chuyện thường được kể thành "đốt thuyền"), để binh lính không còn đường quay về.
- Trong kinh doanh, quán cà phê đương nhiệm có thể đầu tư sẵn thêm bàn ghế, thêm máy pha, thêm nhân viên. Khi đã bỏ tiền ra, việc bán rẻ để lấp đầy công suất trở nên có lời hơn so với khi chưa đầu tư. Lời đe dọa phá giá giờ đã đáng tin, và Hùng có thể sẽ không mở quán nữa.

Đây là lời giải của trò "con gà" ở Tập 2: tháo vô lăng ra và ném qua cửa sổ. Bằng cách **xóa bỏ một lựa chọn của chính mình**, bạn thay đổi cách đối thủ phản ứng. Trong lý thuyết trò chơi, có ít lựa chọn hơn đôi khi lại là một lợi thế.

## III. Giải bài toán cướp biển

Giờ ta quay lại năm tên cướp biển và áp dụng quy nạp ngược. Đừng hỏi "A nên làm gì?", hãy hỏi "nếu chỉ còn lại vài tên cuối cùng thì chuyện gì xảy ra?".

**Chỉ còn E.** E tự chia cho mình 100 đồng, và tự bỏ phiếu đồng ý.

**Còn D và E.** D đề xuất. Hai người cần ít nhất một phiếu, và phiếu của chính D là đủ. D lấy cả 100 đồng, E được 0.

**Còn C, D và E.** C cần 2 phiếu, tức là cần mua thêm một phiếu. Ai rẻ nhất? E biết nếu C bị ném xuống biển thì mình sẽ được 0 (xem trường hợp trên). Cho E **1 đồng** là E đã khá hơn, và E sẽ đồng ý. C lấy 99, D được 0, E được 1.

**Còn B, C, D và E.** B cần 2 phiếu trên 4. Nếu B bị ném, D sẽ được 0 (theo trường hợp trên). Cho D 1 đồng là đủ. B lấy 99, C được 0, D được 1, E được 0.

**Đủ năm tên.** A cần 3 phiếu trên 5, tức là mua thêm hai phiếu. Nếu A bị ném, C và E sẽ được 0. Cho mỗi người 1 đồng:

| A | B | C | D | E |
|---|---|---|---|---|
| **98** | 0 | 1 | 0 | 1 |

A, C và E đồng ý, đề xuất được thông qua.

Điều thú vị: B và D có thể rất tức giận, nhưng họ không làm gì được. Còn C và E sẽ nhận 1 đồng với lòng biết ơn, vì họ đã nhìn trước được rằng nếu không có A, họ chẳng được gì. Sức mạnh của A không đến từ thứ bậc, mà đến từ việc A **hiểu rõ những gì sẽ xảy ra nếu mình không còn**.

Bạn có thể thử với số cướp biển khác nhau và xem quy nạp ngược diễn ra từng bước. Mỗi hàng là một tình huống "chỉ còn lại $n$ tên cuối", các ô **viền cam** là những phiếu được mua.

<pirate-split>
</pirate-split>

Bạn sẽ thấy một quy luật xen kẽ: người đề xuất mua phiếu của những ai sẽ "trắng tay" ở bước sau, và những người đó cứ cách một người lại có một.

## IV. Lý thuyết và con người

Quy nạp ngược là một công cụ toán học rất đẹp. Nhưng nó đòi hỏi mọi người chơi phải lý trí hoàn toàn, và **tin** rằng mọi người khác cũng lý trí hoàn toàn, ở mọi bước. Khi đặt người thật vào những trò chơi như vậy, kết quả rất khác.

### 1. Trò chơi tối hậu thư

Đây là trò chơi tuần tự đơn giản nhất có thể nghĩ ra. Bạn được giao 100 nghìn đồng, và phải đề xuất chia cho Hùng một phần. Hùng chỉ có hai lựa chọn: **đồng ý**, thì chia theo đề xuất, hoặc **từ chối**, thì cả hai đều không được gì.

Quy nạp ngược cho đáp án rất rõ ràng:

- Hùng đứng trước bất kỳ đề xuất nào lớn hơn 0 sẽ đồng ý, vì có còn hơn không.
- Biết vậy, bạn chỉ cần chia cho Hùng **1 nghìn đồng** và giữ 99 nghìn.

Năm 1982, Werner Güth và cộng sự lần đầu cho người thật chơi trò này (gọi là Ultimatum Game), và nó đã được lặp lại hàng nghìn lần trên khắp thế giới kể từ đó. Kết quả gần như luôn giống nhau:

- Người đề xuất thường chia khoảng **40% đến 50%**, chứ không phải 1%.
- Những đề xuất dưới khoảng **20%** bị từ chối rất thường xuyên, khoảng một nửa số lần. Người nhận sẵn sàng **mất tiền** để trừng phạt một đề xuất mà họ thấy không công bằng.

Đây có phải là bằng chứng lý thuyết trò chơi sai không? Hãy nhớ lại điều mình nói ở Tập 1: payoff là **mức độ thích**, không nhất thiết là tiền. Nếu người nhận cảm thấy bị xúc phạm khi nhận 1 nghìn, thì payoff của "đồng ý" có thể còn thấp hơn payoff của "từ chối và thấy kẻ tham lam mất trắng". Lý thuyết không sai, chỉ là ma trận ta viết ban đầu đã bỏ sót một phần quan trọng của con người: **cảm giác công bằng**.

Mức độ "công bằng" này cũng khác nhau giữa các nền văn hóa. Một nghiên cứu lớn của Joseph Henrich và cộng sự (2001) ở 15 cộng đồng quy mô nhỏ trên thế giới cho thấy mức chia trung bình dao động từ khoảng một phần tư tới hơn một nửa, tùy theo tập quán hợp tác và trao đổi của từng cộng đồng.

### 2. Chuỗi suy luận càng dài, càng dễ đứt

Quy nạp ngược trong bài cướp biển cần 5 bước. Có những trò chơi cần hàng trăm bước. Ví dụ nổi tiếng nhất là **trò chơi con rết** (centipede game): hai người lần lượt chọn "lấy" (kết thúc trò chơi, người lấy được phần lớn hơn của số tiền hiện có) hoặc "nhường" (số tiền tăng lên, và lượt chuyển sang người kia). Nếu cả hai cứ nhường, cả hai đều giàu to.

Quy nạp ngược nói rằng ở bước cuối, người chơi sẽ lấy. Biết vậy, người ở bước áp chót cũng nên lấy trước. Lần ngược lên tận đầu, người đi đầu tiên nên lấy ngay ở bước một, khi số tiền còn rất nhỏ. Trong các thí nghiệm của McKelvey và Palfrey (1992), gần như không ai làm vậy. Phần lớn người chơi nhường vài lượt trước khi lấy, và nhờ "phi lý trí" như vậy mà họ kiếm được nhiều tiền hơn hẳn so với những gì lý thuyết dự đoán.

Mỗi bước suy luận ngược đòi hỏi thêm một tầng niềm tin vào lý trí của người khác. Chỉ cần có một chút nghi ngờ rằng đối thủ sẽ không lấy ngay, việc nhường cũng đã là hợp lý.

## V. Góc Game Designer

### 1. Mọi trò chơi đi lần lượt đều đã có đáp án

Năm 1913, nhà toán học Ernst Zermelo chứng minh một kết quả mà về sau được coi là định lý đầu tiên của lý thuyết trò chơi. Phát biểu theo ngôn ngữ ngày nay: với cờ vua, hoặc bất kỳ trò chơi hai người nào đi lần lượt, có thông tin đầy đủ và chắc chắn kết thúc sau hữu hạn nước, thì **một trong ba điều sau là đúng**: bên trắng có cách chắc chắn thắng, bên đen có cách chắc chắn thắng, hoặc cả hai bên đều có cách chắc chắn ít nhất hòa.

Lý do chính là quy nạp ngược: về nguyên tắc, ta có thể giải cây trò chơi từ các thế cờ cuối lên tới nước đầu tiên. Cờ vua chưa được giải chỉ vì cây trò chơi quá lớn. Tic-tac-toe (cờ caro trên bàn 3×3) thì đã được giải từ lâu: hai người chơi hoàn hảo luôn hòa. Mình đã bàn ở [Bài 1 của GD Course](/blog/GD-Course-1-Meaningful-Choice) vì sao điều đó làm nó hết vui với người lớn.

Với game designer, đây là một lời cảnh báo. Trò chơi càng nhỏ, càng đầy đủ thông tin, càng ít ngẫu nhiên, thì càng gần với việc **bị giải**. Một khi người chơi tìm ra đáp án, mọi lựa chọn đều trở nên hiển nhiên, và không còn quyết định thú vị nào nữa. Các designer thường chống lại điều này bằng cách làm cây trò chơi phình to ra (nhiều quân, nhiều lá bài), giấu bớt thông tin (bài trên tay, sương mù chiến tranh), hoặc thêm yếu tố ngẫu nhiên.

### 2. Cân bằng lợi thế đi trước

Trong rất nhiều trò chơi đối kháng, người đi trước có lợi. Có vài cách quen thuộc để cân bằng lại:

- **Komi trong cờ vây:** quân trắng đi sau được cộng sẵn điểm, 6,5 điểm theo luật Nhật và 7,5 điểm theo luật Trung Quốc. Phần lẻ 0,5 để không bao giờ có kết quả hòa.
- **Luật chiếc bánh (pie rule):** người thứ nhất đi nước đầu, rồi người thứ hai được chọn **tiếp tục với vai đi sau, hoặc đổi phe** để nhận luôn thế cờ đó. Giống như chia bánh: một người cắt, người kia chọn trước. Người đi đầu buộc phải chọn một nước đi "vừa đủ tốt", không quá mạnh cũng không quá yếu. Các trò như Hex hay Havannah dùng luật này.
- **Cho người đi sau thêm tài nguyên:** trong Hearthstone, người đi sau được thêm một lá bài và một lá The Coin cho thêm 1 mana dùng một lần.

Có những lúc đi **sau** lại có lợi, vì người đi sau có thêm thông tin. Trong giai đoạn cấm chọn của các game MOBA, lượt chọn cuối cùng (last pick) rất có giá trị, vì người chọn cuối có thể chọn tướng khắc chế đội bạn mà không sợ bị khắc chế lại. Hệ thống cấm chọn xen kẽ chính là một cách cân bằng giữa lợi thế đi trước (giành tướng mạnh) và lợi thế đi sau (biết thông tin).

### 3. Người chơi luôn nhìn về điểm kết thúc

Quy nạp ngược còn có một hệ quả mà designer làm game nhiều người chơi cần biết: **khi người chơi biết trò chơi sắp kết thúc, hành vi của họ thay đổi**.

Trong một mùa giải có ngày kết thúc cố định, những thỏa thuận ngầm giữa các người chơi hay bang hội thường sụp đổ vào những ngày cuối, vì không còn tương lai để giữ uy tín nữa. Chuyện này dẫn thẳng sang câu đố của tập sau.

## VI. Tóm tắt

1. Trò chơi **tuần tự** được biểu diễn bằng cây trò chơi và được giải bằng **quy nạp ngược**: giải từ nước đi cuối lên nước đi đầu.
2. Một số cân bằng Nash dựa trên **lời đe dọa không đáng tin**. **Cân bằng hoàn hảo trò chơi con** loại bỏ chúng. Muốn đe dọa đáng tin, phải tự thay đổi payoff của mình, tức là **cam kết**.
3. Con người thật quan tâm tới **công bằng** và không suy luận ngược được quá nhiều bước. Lý thuyết vẫn đúng, nếu ta viết payoff đúng với con người.

## Câu đố cho Tập 5

Quay lại song đề tù nhân ở Tập 1. Lần này bạn và Hùng chơi **đúng 100 ván liên tiếp** với nhau, và cả hai đều biết rõ con số 100.

Áp dụng quy nạp ngược:

- Ở ván 100, không còn tương lai, nên đó chỉ là một song đề tù nhân bình thường. Cả hai sẽ khai.
- Biết ván 100 chắc chắn cả hai khai, ván 99 cũng không có gì để giữ, nên cả hai cũng khai...
- Lần ngược lên, cả hai khai ở **mọi** ván, kể cả ván đầu tiên.

Nhưng nếu có cơ hội, bạn có thật sự chơi như vậy không? Và điều gì thay đổi nếu không ai biết **khi nào** trò chơi kết thúc? Đáp án ở [Tập 5](/blog/Game-Theory-5-Tro-Choi-Lap-Lai).

## Tài liệu tham khảo

- R. Selten, "Spieltheoretische Behandlung eines Oligopolmodells mit Nachfrageträgheit", *Zeitschrift für die gesamte Staatswissenschaft* 121, 301–324 (1965).
- W. Güth, R. Schmittberger, B. Schwarze, "An Experimental Analysis of Ultimatum Bargaining", *Journal of Economic Behavior & Organization* 3(4), 367–388 (1982).
- J. Henrich et al., "In Search of Homo Economicus: Behavioral Experiments in 15 Small-Scale Societies", *American Economic Review* 91(2), 73–78 (2001).
- R. D. McKelvey, T. R. Palfrey, "An Experimental Study of the Centipede Game", *Econometrica* 60(4), 803–836 (1992).
- I. Stewart, "A Puzzle for Pirates", *Scientific American* 280(5), 98–99 (1999).
- [Backward induction — Wikipedia](https://en.wikipedia.org/wiki/Backward_induction)
- [Subgame perfect equilibrium — Wikipedia](https://en.wikipedia.org/wiki/Subgame_perfect_equilibrium)
