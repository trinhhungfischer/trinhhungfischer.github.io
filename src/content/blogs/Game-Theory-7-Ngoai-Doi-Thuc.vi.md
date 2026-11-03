---
title: "[Game Theory] Tập 7: Game theory ngoài đời, và những giới hạn của nó"
date: "2026-11-03"
category: "Game Design"
tags: "Game Theory"
excerpt: "Tập cuối của series: con người suy luận được mấy tầng, vì sao diều hâu và bồ câu cùng tồn tại, làm sao cộng đồng tự quản được tài nguyên chung, và vì sao game designer chính là người thiết kế cơ chế."
color: "var(--pale-green)"
draft: false
---

# Giải câu đố Tập 6

Ở cuối [Tập 6](/blog/Game-Theory-6-Thong-Tin-Bat-Can-Xung), mình nhờ bạn chọn một số từ 0 tới 100, sao cho gần nhất với **2/3 trung bình** của mọi người. Nếu bạn chưa chọn, hãy chọn ngay bây giờ trước khi đọc tiếp.

Đây là cách một người theo lý thuyết trò chơi "chuẩn" sẽ nghĩ:

- Trung bình không thể vượt quá 100, nên 2/3 trung bình không thể vượt quá 67. Chọn số lớn hơn 67 là chọn một chiến lược bị trội.
- Nếu ai cũng hiểu điều đó, không ai chọn trên 67, nên trung bình không quá 67, và số thắng không quá 44.
- Nếu ai cũng hiểu **điều đó**, số thắng không quá 30, rồi 20, rồi 13...

Loại dần các chiến lược bị trội, giống hệt bài xe bánh mì ở [Tập 1](/blog/Game-Theory-1-Song-De-Tu-Nhan), ta đi tới đáp án duy nhất: **mọi người cùng chọn 0**. Đó là cân bằng Nash duy nhất của trò chơi.

Thế nhưng nếu bạn chọn 0, gần như chắc chắn bạn **thua**.

Trò chơi này đã được tổ chức với người thật rất nhiều lần. Năm 1997, tờ *Financial Times* mời độc giả tham gia, và số thắng là **13**. Năm 2005, tờ *Politiken* của Đan Mạch tổ chức một cuộc thi với khoảng 19.000 người tham gia, và số thắng là **21,6**. Trong các thí nghiệm của Rosemarie Nagel (1995) với sinh viên, số người chọn đúng 0 ở lượt đầu tiên rất ít.

## I. Suy luận được mấy tầng?

### 1. Mô hình cấp độ

Để giải thích kết quả trên, các nhà kinh tế học hành vi dùng **mô hình cấp độ suy luận** (level-k thinking):

- **Cấp 0**: không suy nghĩ chiến lược, chọn đại một số. Trung bình khoảng 50.
- **Cấp 1**: nghĩ rằng mọi người khác ở cấp 0, nên chọn $\frac{2}{3} \times 50 \approx 33$.
- **Cấp 2**: nghĩ rằng mọi người khác ở cấp 1, nên chọn $\frac{2}{3} \times 33 \approx 22$.
- **Cấp 3**: chọn khoảng 15. Và cứ thế, cho tới cấp vô hạn chọn 0.

Dữ liệu thực tế cho thấy phần lớn con người dừng lại ở **cấp 1 hoặc cấp 2**. Đó là lý do các số thắng thường nằm quanh 13 đến 22. Trong cuộc thi của Politiken, có những đỉnh nhỏ nhưng rất rõ quanh 33 và 22, đúng như mô hình dự đoán.

Điều quan trọng: để **thắng**, bạn không cần lý trí nhất. Bạn cần suy luận **sâu hơn mọi người đúng một tầng**. Người chọn 0 suy luận quá sâu, cũng thua như người chọn 50.

### 2. Cuộc thi sắc đẹp của Keynes

Năm 1936, John Maynard Keynes mô tả thị trường chứng khoán bằng một hình ảnh tương tự. Hãy tưởng tượng một cuộc thi trên báo: độc giả chọn 6 gương mặt đẹp nhất trong 100 tấm ảnh, và giải thưởng thuộc về người chọn giống với **lựa chọn chung của số đông** nhất.

Để thắng, bạn không chọn người bạn thấy đẹp nhất. Bạn chọn người mà bạn **nghĩ người khác sẽ thấy đẹp nhất**. Hoặc sâu hơn: người mà bạn nghĩ người khác **nghĩ** là số đông sẽ thấy đẹp nhất. Keynes cho rằng nhà đầu tư cũng vậy: họ không mua cổ phiếu mà họ nghĩ có giá trị, mà mua cổ phiếu mà họ nghĩ **người khác sẽ muốn mua**.

Bài học: cân bằng Nash mô tả những gì xảy ra khi **ai cũng lý trí và ai cũng biết ai cũng lý trí**. Trong thế giới thật, nếu bạn nghĩ người khác không suy luận sâu như vậy, thì chơi cân bằng Nash có thể là một sai lầm.

## II. Không cần lý trí: game theory tiến hóa

Nếu con người không đủ lý trí để chơi theo cân bằng, vậy lý thuyết trò chơi còn đúng ở đâu? Câu trả lời bất ngờ đến từ những sinh vật hoàn toàn không suy nghĩ: động vật.

### 1. Diều hâu và Bồ câu

Năm 1973, nhà sinh học John Maynard Smith và George Price đặt ra một câu hỏi: vì sao các con vật cùng loài khi tranh giành thức ăn hay bạn tình thường chỉ "đánh nhau theo nghi thức" (gầm gừ, phô trương, đẩy nhau), mà hiếm khi đánh đến chết?

Họ mô hình hóa bằng một trò chơi. Hai con vật tranh một nguồn lợi có giá trị $V$. Mỗi con có thể theo một trong hai kiểu:

- **Diều hâu**: luôn tấn công, đánh tới khi thắng hoặc bị thương.
- **Bồ câu**: phô trương, nhưng rút lui ngay nếu đối phương tấn công.

Khi hai diều hâu gặp nhau, chúng đánh nhau, mỗi con có một nửa cơ hội thắng, và con thua phải chịu thương tích với cái giá $C$. Hai bồ câu gặp nhau thì chia đôi. Diều hâu gặp bồ câu thì diều hâu lấy hết.

| | Gặp diều hâu | Gặp bồ câu |
|---|---|---|
| **Diều hâu** | $\frac{V - C}{2}$ | $V$ |
| **Bồ câu** | $0$ | $\frac{V}{2}$ |

Nếu bạn để ý, khi $C > V$, trò này có cùng cấu trúc với trò "con gà" ở [Tập 2](/blog/Game-Theory-2-Can-Bang-Nash): tệ nhất là khi cả hai cùng lao vào nhau.

### 2. Không ai chọn, quần thể tự cân bằng

Lần này, không con vật nào tính toán gì. Mỗi con sinh ra đã mang sẵn một kiểu hành vi trong gen. Con nào kiếm được nhiều payoff hơn thì sống khỏe hơn, sinh nhiều con hơn, và kiểu hành vi của nó lan rộng trong quần thể. Payoff ở đây không còn là "mức độ thích", mà là **khả năng sinh tồn và sinh sản**.

Điều gì xảy ra?

- Khi quần thể toàn bồ câu, một con diều hâu đột biến sẽ thắng mọi cuộc chạm trán. Diều hâu lan rộng.
- Khi quần thể toàn diều hâu, các con vật liên tục đánh nhau và bị thương. Nếu $C > V$, một con bồ câu, dù không bao giờ thắng, lại sống tốt hơn vì không bao giờ bị thương. Bồ câu lan rộng.

Quần thể sẽ dừng lại ở một tỉ lệ mà ở đó diều hâu và bồ câu sống tốt **như nhau**. Đó chính là **nguyên lý bàng quan** ở [Tập 3](/blog/Game-Theory-3-Chien-Luoc-Hon-Hop). Giải ra, tỉ lệ diều hâu ở cân bằng là

$$
\frac{V}{C}
$$

Maynard Smith gọi trạng thái này là **chiến lược ổn định tiến hóa** (evolutionarily stable strategy, ESS): một trạng thái mà nếu một nhóm nhỏ đột biến xuất hiện với hành vi khác, nhóm đó sẽ bị chọn lọc tự nhiên đào thải.

Hãy thử chỉnh $V$ và $C$ bên dưới. Năm đường biểu diễn là năm quần thể bắt đầu với tỉ lệ diều hâu khác nhau. Không con vật nào biết lý thuyết trò chơi, vậy mà cả năm quần thể đều tìm về cùng một điểm.

<hawk-dove>
</hawk-dove>

Đây có lẽ là điều đẹp nhất mà lý thuyết trò chơi tiến hóa chỉ ra: **cân bằng Nash không cần ai tính ra nó**. Chọn lọc tự nhiên, thị trường, hay đơn giản là việc con người bắt chước những ai đang thành công, đều có thể đưa một hệ thống tới cân bằng mà không ai trong đó hiểu cân bằng là gì. Các cầu thủ đá penalty ở Tập 3 và các chiến lược trong giải đấu tiến hóa ở [Tập 5](/blog/Game-Theory-5-Tro-Choi-Lap-Lai) cũng hội tụ theo cách y hệt.

## III. Bi kịch mảnh đất công

### 1. Song đề tù nhân của cả cộng đồng

Năm 1968, nhà sinh thái học Garrett Hardin viết một bài luận nổi tiếng trên tạp chí *Science*: *The Tragedy of the Commons*. Hãy tưởng tượng một đồng cỏ chung của làng. Mỗi người chăn nuôi được trọn lợi ích khi thả thêm một con bò, nhưng cái hại của việc đồng cỏ bị gặm trụi thì chia đều cho cả làng. Với từng người, thả thêm bò luôn có lợi. Khi tất cả cùng nghĩ vậy, đồng cỏ bị phá hủy.

Đó là song đề tù nhân của Tập 1, nhưng với hàng trăm người chơi. Đánh bắt cá quá mức, khai thác nước ngầm, ô nhiễm không khí, kẹt xe giờ cao điểm đều có cùng cấu trúc.

Hardin cho rằng chỉ có hai lối thoát: **nhà nước quản lý**, hoặc **tư nhân hóa**, chia đồng cỏ thành từng mảnh có chủ.

### 2. Lối thoát thứ ba của Ostrom

Nhà khoa học chính trị Elinor Ostrom dành nhiều thập kỷ đi thực địa để chứng minh Hardin đã bỏ sót một khả năng. Bà nghiên cứu những cộng đồng đã tự quản lý tài nguyên chung thành công hàng trăm năm: đồng cỏ trên núi cao ở làng Törbel (Thụy Sĩ), rừng làng ở Nhật Bản, hệ thống tưới tiêu ở Tây Ban Nha và Philippines. Những cộng đồng này không có nhà nước đứng ra quản lý, cũng không chia nhỏ tài nguyên. Họ **tự đặt luật chơi**.

Ostrom rút ra một số nguyên tắc chung của các cộng đồng thành công, có thể tóm tắt như sau:

- **Ranh giới rõ ràng**: ai được dùng tài nguyên, và tài nguyên đó gồm những gì.
- **Người dùng cùng làm luật**: những ai chịu ảnh hưởng của luật được tham gia sửa luật.
- **Có giám sát**, và người giám sát chịu trách nhiệm trước cộng đồng.
- **Phạt tăng dần**: lần vi phạm đầu bị phạt nhẹ, tái phạm mới bị phạt nặng.
- **Giải quyết tranh chấp nhanh và rẻ.**

Nếu bạn đọc Tập 5, bạn sẽ nhận ra những nguyên tắc này: giám sát để phản bội không giấu được, phạt tăng dần để hiểu lầm không biến thành thù hận, cộng đồng nhỏ và lâu dài để cái bóng của tương lai luôn hiện diện. Những cộng đồng của Ostrom đã tự khám phá ra Ăn miếng trả miếng rộng lượng từ rất lâu trước khi Axelrod tổ chức giải đấu.

Năm 2009, Ostrom trở thành người phụ nữ đầu tiên nhận giải Nobel Kinh tế.

## IV. Thiết kế cơ chế: lý thuyết trò chơi chạy ngược

### 1. Từ luật chơi tới kết cục, và ngược lại

Suốt sáu tập trước, ta luôn làm một việc: **cho trước luật chơi, tìm kết cục**. Thiết kế cơ chế (mechanism design) đặt câu hỏi ngược lại:

> **Cho trước kết cục mong muốn, hãy thiết kế luật chơi** sao cho những người chơi ích kỷ, mỗi người chỉ lo cho mình, vẫn tự đưa nhau tới kết cục đó.

Bạn đã gặp một ví dụ: đấu giá Vickrey ở Tập 6. Người thiết kế muốn mọi người **khai thật** giá trị của mình. Hỏi thẳng thì không ai khai thật. Nhưng với luật "giá cao nhất thắng, trả giá cao thứ hai", khai thật trở thành chiến lược trội. Luật chơi làm thay việc thuyết phục.

Leonid Hurwicz, Eric Maskin và Roger Myerson nhận giải Nobel năm 2007 cho việc đặt nền móng cho lĩnh vực này.

### 2. Ghép đôi ổn định

Một trong những ứng dụng đẹp nhất của thiết kế cơ chế là bài toán **ghép đôi**. Năm 1962, David Gale và Lloyd Shapley đặt ra câu hỏi: có $n$ chàng trai và $n$ cô gái, mỗi người xếp hạng tất cả những người khác giới. Có cách nào ghép đôi sao cho **không có cặp nào muốn bỏ cặp hiện tại để đến với nhau** không? Một cách ghép như vậy gọi là **ổn định**.

Họ chứng minh rằng luôn có, và đưa ra một thuật toán rất đơn giản, gọi là **thuật toán chấp nhận trì hoãn** (deferred acceptance):

1. Mỗi chàng trai còn độc thân ngỏ lời với cô gái anh thích nhất trong số những cô **chưa từng từ chối anh**.
2. Mỗi cô gái giữ lại lời ngỏ tốt nhất mình nhận được (theo xếp hạng của cô), và từ chối những người còn lại. Chữ "giữ lại" là quan trọng: cô chưa nhận lời hẳn, nên vẫn có thể đổi nếu sau này có người tốt hơn ngỏ lời.
3. Lặp lại cho tới khi không còn ai bị từ chối.

Thuật toán này ngày nay được dùng ở khắp nơi, với "chàng trai" và "cô gái" được thay bằng những thứ khác:

- **Phân bổ bác sĩ nội trú ở Mỹ**: Alvin Roth thiết kế lại hệ thống ghép bác sĩ với bệnh viện vào cuối những năm 1990 dựa trên thuật toán này.
- **Tuyển sinh**: nhiều thành phố như New York và Boston dùng nó để phân học sinh vào trường. Một tính chất quan trọng: phía "ngỏ lời" (học sinh) không có lợi gì khi khai **gian** thứ tự nguyện vọng của mình. Giống đấu giá Vickrey, khai thật là chiến lược tốt nhất.
- **Hiến thận chéo**: Roth cùng Tayfun Sönmez và Utku Ünver thiết kế hệ thống ghép những cặp người hiến và người nhận không tương thích với nhau, để họ hiến chéo cho nhau. Hệ thống này đã giúp hàng nghìn người được ghép thận.

Roth và Shapley nhận giải Nobel năm 2012.

## V. Những giới hạn

Sau bảy tập, cũng cần nói thẳng những điều lý thuyết trò chơi **không** làm được:

- **Con người không hoàn toàn lý trí.** Ta suy luận được vài tầng (phần I), quan tâm tới công bằng (trò chơi tối hậu thư ở [Tập 4](/blog/Game-Theory-4-Suy-Luan-Nguoc)), và thường không ngẫu nhiên giỏi (oẳn tù tì ở Tập 3). Kinh tế học hành vi ra đời để lấp khoảng trống này.
- **Nhiều cân bằng thì lý thuyết không chọn giúp.** Ở trò phối hợp, trò hẹn hò, trò chơi lặp lại, lý thuyết chỉ nói những gì **có thể** xảy ra. Văn hóa, lịch sử, quy ước và điểm tiêu điểm mới quyết định điều gì **thật sự** xảy ra.
- **Mô hình chỉ tốt như payoff ta viết.** Nếu ta quên rằng người ta thấy day dứt khi phản bội bạn, hay thấy bị xúc phạm khi nhận một đề xuất bất công, mô hình sẽ cho ra những dự đoán sai, và lỗi không nằm ở lý thuyết mà ở người viết payoff.

Lý thuyết trò chơi không phải là một cỗ máy dự đoán hành vi con người. Nó là một **cách đặt câu hỏi**: ai đang chơi, mỗi người có những lựa chọn gì, mỗi người thực sự muốn gì, và họ biết gì về nhau? Trả lời rõ ràng bốn câu hỏi đó đã là một nửa lời giải.

## VI. Góc Game Designer: bạn là người thiết kế cơ chế

Nếu có một điều mình muốn bạn mang theo từ series này, đó là: **game designer chính là người thiết kế cơ chế**. Mỗi luật chơi bạn viết ra là một lời đề nghị với người chơi, và người chơi sẽ tìm ra cân bằng của nó, dù bạn có tính tới cân bằng đó hay không.

Người chơi giống quần thể diều hâu và bồ câu: họ không cần đọc tài liệu thiết kế của bạn. Họ thử, họ bắt chước những người đang thắng, và sau vài tuần, meta sẽ hội tụ về một điểm. Câu hỏi duy nhất là điểm đó có phải là thứ bạn muốn hay không.

Dưới đây là bảy câu hỏi, mỗi tập một câu, mà bạn có thể dùng khi review bất kỳ hệ thống nào có nhiều người chơi hoặc có đối thủ:

| Tập | Khái niệm | Câu hỏi cho designer |
|---|---|---|
| 1 | Chiến lược trội, song đề tù nhân | Lựa chọn tốt nhất cho một người có trùng với lựa chọn tốt nhất cho cả nhóm không? |
| 2 | Cân bằng Nash, nhiều cân bằng | Meta sẽ đứng yên ở đâu? Người chơi có điểm tiêu điểm để phối hợp không? |
| 3 | Chiến lược hỗn hợp | Hệ thống khắc chế có tạo ra lựa chọn thật, và buff một thứ sẽ làm thứ gì phổ biến lên? |
| 4 | Quy nạp ngược, cam kết | Trò chơi có quá nhỏ để bị "giải"? Lợi thế đi trước được cân bằng chưa? |
| 5 | Trò chơi lặp lại | Người chơi có lý do để gặp lại nhau không? Hệ thống phạt có chừa đường cho hiểu lầm? |
| 6 | Thông tin bất cân xứng | Thông tin ẩn có đi kèm cách phát tín hiệu? Chợ đồ có bị "quả chanh" không? |
| 7 | Thiết kế cơ chế | Kết cục mình muốn là gì, và luật chơi hiện tại có tự đưa người chơi tới đó không? |

## Lời kết

Cảm ơn bạn đã đi cùng Hùng suốt bảy tập. Mình bắt đầu series bằng hai tên tù nhân chọn sai vì không tin nhau, và kết thúc bằng những cộng đồng làng tự quản được đồng cỏ chung suốt hàng trăm năm. Giữa hai điểm đó là toàn bộ câu chuyện của lý thuyết trò chơi: **luật chơi định hình hành vi**, và hợp tác không phải là phép màu, mà là thứ có thể **thiết kế được**.

Nếu muốn đi tiếp, đây là vài tài liệu mình thích:

- **Sách nhập môn, gần như không có toán:** A. Dixit, B. Nalebuff, *Thinking Strategically* (1991), và bản viết lại *The Art of Strategy* (2008).
- **Về hợp tác:** R. Axelrod, *The Evolution of Cooperation* (1984).
- **Khóa học miễn phí:** Ben Polak, *Game Theory* (ECON 159), Yale Open Courses, có đầy đủ video bài giảng.
- **Có toán, nhưng dễ đọc:** M. J. Osborne, *An Introduction to Game Theory* (2004).
- **Chơi trước, đọc sau:** Nicky Case, [The Evolution of Trust](https://ncase.me/trust/).
- **Về tài nguyên chung:** E. Ostrom, *Governing the Commons* (1990).

Hẹn gặp lại bạn ở series sau.

## Tài liệu tham khảo

- R. Nagel, "Unraveling in Guessing Games: An Experimental Study", *American Economic Review* 85(5), 1313–1326 (1995).
- J. M. Keynes, *The General Theory of Employment, Interest and Money*, chương 12, Macmillan, 1936.
- J. Maynard Smith, G. R. Price, "The Logic of Animal Conflict", *Nature* 246, 15–18 (1973).
- G. Hardin, "The Tragedy of the Commons", *Science* 162(3859), 1243–1248 (1968).
- E. Ostrom, *Governing the Commons: The Evolution of Institutions for Collective Action*, Cambridge University Press, 1990.
- D. Gale, L. S. Shapley, "College Admissions and the Stability of Marriage", *American Mathematical Monthly* 69(1), 9–15 (1962).
- A. E. Roth, T. Sönmez, M. U. Ünver, "Kidney Exchange", *Quarterly Journal of Economics* 119(2), 457–488 (2004).
- [Guess 2/3 of the average — Wikipedia](https://en.wikipedia.org/wiki/Guess_2/3_of_the_average)
- [Mechanism design — Wikipedia](https://en.wikipedia.org/wiki/Mechanism_design)
