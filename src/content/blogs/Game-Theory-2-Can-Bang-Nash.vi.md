---
title: "[Game Theory] Tập 2: Cân bằng Nash, khi không ai muốn đổi ý"
date: "2026-11-03"
category: "Game Design"
tags: "Game Theory"
excerpt: "Hai người quên hẹn chỗ gặp mà vẫn tìm được nhau. Từ đó đi tới khái niệm trung tâm của lý thuyết trò chơi: cân bằng Nash, và vì sao một trò chơi có thể có nhiều cân bằng, mà không cái nào là tốt nhất."
color: "var(--pale-green)"
draft: true
---

# Giải câu đố Tập 1

Ở [Tập 1](/blog/Game-Theory-1-Song-De-Tu-Nhan), mình để lại một câu đố: bạn và Hùng hẹn gặp nhau ở Hà Nội vào một ngày cụ thể, nhưng quên hẹn giờ và địa điểm, cũng không có cách nào liên lạc. Bạn sẽ đến đâu, lúc mấy giờ?

Nếu bạn trả lời kiểu "**Hồ Gươm, 12 giờ trưa**", thì bạn không cô đơn. Hỏi một nhóm người Hà Nội, phần lớn sẽ chọn Bờ Hồ, Tháp Rùa hoặc Nhà thờ Lớn, và gần như ai cũng chọn 12 giờ trưa.

Thí nghiệm này không phải mình nghĩ ra. Năm 1960, nhà kinh tế học Thomas Schelling hỏi các sinh viên của mình câu hỏi y hệt, nhưng với thành phố New York. Đa số chọn **ga Grand Central, đúng 12 giờ trưa**. Về mặt logic, mọi địa điểm và mọi giờ đều "tốt" như nhau: gặp được nhau là được. Vậy mà mọi người vẫn tìm thấy nhau, vì ai cũng tự hỏi: *"người kia sẽ nghĩ mình sẽ đi đâu?"*, và câu trả lời nổi bật nhất thắng.

Schelling gọi những lựa chọn nổi bật như vậy là **điểm tiêu điểm** (focal point, hay Schelling point). Năm 2005, ông nhận giải Nobel Kinh tế, một phần nhờ những ý tưởng như thế này.

Nhưng câu đố này còn cho thấy một điều quan trọng hơn. Ở Tập 1, ta có một công cụ rất mạnh là **chiến lược trội**. Trong trò hẹn gặp, công cụ đó vô dụng: Hồ Gươm chỉ tốt nếu Hùng cũng đến Hồ Gươm. Không có lựa chọn nào tốt **bất kể** người kia làm gì.

Ta cần một công cụ mới.

## I. Phản ứng tốt nhất

### 1. Câu hỏi "nếu... thì..."

Khi không có chiến lược trội, ta hạ yêu cầu xuống một bậc. Thay vì hỏi *"chiến lược nào tốt nhất trong mọi trường hợp?"*, ta hỏi:

> **Nếu** biết Hùng chọn $h$, **thì** mình nên chọn gì?

Câu trả lời được gọi là **phản ứng tốt nhất** (best response) của bạn với $h$. Mỗi lựa chọn của Hùng có thể có một phản ứng tốt nhất khác nhau, và có thể có nhiều hơn một nếu có hai lựa chọn hòa nhau.

Chiến lược trội ở Tập 1 thật ra là một trường hợp đặc biệt: đó là chiến lược luôn là phản ứng tốt nhất, **với mọi** $h$.

### 2. Phương pháp gạch chân

Có một cách rất cơ học để tìm phản ứng tốt nhất trên ma trận payoff. Lấy lại song đề tù nhân của Tập 1:

| | Hùng im lặng | Hùng khai |
|---|---|---|
| **Bạn im lặng** | (−1, −1) | (−10, 0) |
| **Bạn khai** | (0, −10) | (−5, −5) |

**Bước 1, cho bạn:** đứng ở từng **cột**, tìm số thứ nhất lớn nhất trong cột đó và gạch chân nó.
- Cột "Hùng im lặng": so $-1$ với $0$, gạch chân $0$ ở hàng *Khai*.
- Cột "Hùng khai": so $-10$ với $-5$, gạch chân $-5$ ở hàng *Khai*.

**Bước 2, cho Hùng:** đứng ở từng **hàng**, tìm số thứ hai lớn nhất trong hàng đó và gạch chân nó.
- Hàng "Bạn im lặng": so $-1$ với $0$, gạch chân $0$ ở cột *Khai*.
- Hàng "Bạn khai": so $-10$ với $-5$, gạch chân $-5$ ở cột *Khai*.

Kết quả:

| | Hùng im lặng | Hùng khai |
|---|---|---|
| **Bạn im lặng** | (−1, −1) | (−10, <u>0</u>) |
| **Bạn khai** | (<u>0</u>, −10) | (<u>−5</u>, <u>−5</u>) |

Có đúng **một ô được gạch chân cả hai số**: (Khai, Khai). Ô đó có một tính chất đặc biệt.

## II. Cân bằng Nash

### 1. Định nghĩa: không ai hối hận một mình

Hãy đứng ở ô (Khai, Khai) và hỏi từng người:

- Bạn: *"Biết Hùng khai rồi, mình có muốn đổi sang im lặng không?"* Không, im lặng thì từ 5 năm thành 10 năm.
- Hùng: *"Biết bạn khai rồi, mình có muốn đổi sang im lặng không?"* Cũng không.

Ở ô này, **không ai muốn đơn phương đổi ý**. Mỗi người đều đang chơi phản ứng tốt nhất với lựa chọn của người kia. Một tổ hợp chiến lược như vậy được gọi là **cân bằng Nash** (Nash equilibrium).

Viết bằng ký hiệu: cặp chiến lược $(s^*, h^*)$ là một cân bằng Nash nếu

$$
u_1(s^*, h^*) \geq u_1(s, h^*) \quad \forall s
$$

$$
u_2(s^*, h^*) \geq u_2(s^*, h) \quad \forall h
$$

trong đó $u_1$ là payoff của bạn, $u_2$ là payoff của Hùng. Dòng thứ nhất nói: khi Hùng giữ nguyên $h^*$, bạn không thể làm tốt hơn bằng cách đổi $s^*$ sang bất kỳ $s$ nào. Dòng thứ hai nói điều tương tự cho Hùng.

Trên ma trận, điều này đơn giản là: **ô có cả hai số được gạch chân**.

Có một cách nghĩ khác cũng hữu ích: cân bằng Nash là một trạng thái mà nếu cả hai **biết trước** người kia sẽ chơi gì, thì cả hai vẫn giữ nguyên lựa chọn của mình. Nó là một lời tiên đoán **tự đứng vững**: nếu ai cũng tin nó sẽ xảy ra, thì không ai có lý do để làm khác đi.

### 2. Một trang giấy đổi cả ngành kinh tế

Khái niệm này mang tên John Nash, người viết về nó trong luận án tiến sĩ năm 1950 ở Princeton, lúc mới 21 tuổi. Bài báo công bố kết quả chính dài **chưa đầy một trang**, trên tạp chí *PNAS*. Trong đó, Nash chứng minh rằng mọi trò chơi với hữu hạn người chơi và hữu hạn chiến lược đều có ít nhất một cân bằng, miễn là ta cho phép người chơi chọn ngẫu nhiên. Vế "chọn ngẫu nhiên" này sẽ là chủ đề của Tập 3.

Năm 1994, Nash nhận giải Nobel Kinh tế. Cuộc đời ông, bao gồm cả quãng thời gian dài vật lộn với bệnh tâm thần phân liệt, được kể lại trong bộ phim *A Beautiful Mind* (2001).

Một chi tiết vui: cảnh nổi tiếng nhất trong phim, khi nhân vật Nash "phát hiện ra" lý thuyết của mình trong một quán bar, lại mô tả một kết cục **không phải** cân bằng Nash. Trong cảnh đó, Nash đề xuất cả nhóm bạn cùng lờ cô gái tóc vàng đi và tán tỉnh những người bạn của cô. Nhưng nếu ai cũng làm vậy, thì bất kỳ một chàng trai nào cũng có lợi nếu lén đổi ý và quay sang cô gái tóc vàng, vì giờ không còn ai cạnh tranh. Đó đúng là kiểu "hối hận một mình" mà cân bằng Nash không cho phép.

### 3. Cân bằng Nash và chiến lược trội

Bạn có thể tự kiểm tra hai điều sau:

- Nếu cả hai người chơi đều có chiến lược trội nghiêm ngặt, thì cặp chiến lược đó là cân bằng Nash **duy nhất**. Song đề tù nhân là ví dụ.
- Nếu loại dần các chiến lược bị trội nghiêm ngặt mà chỉ còn lại một ô, thì ô đó cũng là cân bằng Nash duy nhất. Hai xe bánh mì cùng đỗ ở giữa phố trong Tập 1 là ví dụ.

Vậy cân bằng Nash **mở rộng** những gì ta đã học, chứ không thay thế. Khác biệt là nó vẫn hoạt động khi không có chiến lược nào trội. Cái giá phải trả: nó không còn hứa hẹn một đáp án duy nhất nữa.

### 4. Tự tìm cân bằng

Dưới đây là một ma trận 2×2 mà bạn có thể sửa tùy ý. Các số **được gạch chân** là phản ứng tốt nhất, ô **viền cam** là cân bằng Nash. Hãy thử các trò chơi có sẵn, rồi sửa vài con số để xem cân bằng dịch chuyển thế nào.

<nash-finder>
</nash-finder>

## III. Khi có nhiều cân bằng

Song đề tù nhân có đúng một cân bằng. Nhưng nếu bạn đã thử các trò khác trong ô tương tác, bạn sẽ thấy nhiều trò có **hai** ô viền cam. Mỗi trò như vậy kể một câu chuyện khác nhau về việc vì sao có nhiều cân bằng lại là một vấn đề.

### 1. Trò phối hợp thuần túy: bên trái hay bên phải?

Mỗi người lái xe chọn đi bên trái hay bên phải đường. Đi cùng phía với người đối diện thì an toàn, khác phía thì đâm nhau:

| | Hùng đi bên trái | Hùng đi bên phải |
|---|---|---|
| **Bạn đi bên trái** | (<u>1</u>, <u>1</u>) | (0, 0) |
| **Bạn đi bên phải** | (0, 0) | (<u>1</u>, <u>1</u>) |

Hai cân bằng, và chúng **tốt như nhau**. Lý thuyết không thể nói nên chọn bên nào. Người Việt đi bên phải, người Anh và người Nhật đi bên trái, và cả hai đều đúng. Thứ quyết định không phải là payoff mà là **lịch sử và quy ước**. Khi đã có quy ước, không ai muốn là người đầu tiên đi ngược lại.

Trò hẹn gặp ở Hà Nội chính là trò phối hợp với hàng nghìn cân bằng. Điểm tiêu điểm của Schelling là cách con người chọn một cân bằng khi lý thuyết không chọn giúp.

### 2. Hẹn hò: cùng muốn đi chơi, khác nhau ở chỗ đi đâu

Bạn và Hùng muốn đi chơi tối nay. Bạn thích đi xem bóng đá, Hùng thích đi xem phim. Nhưng cả hai đều thấy đi riêng thì chán hơn hẳn so với đi cùng nhau, kể cả đi xem thứ mình không thích:

| | Hùng xem bóng đá | Hùng xem phim |
|---|---|---|
| **Bạn xem bóng đá** | (<u>2</u>, <u>1</u>) | (0, 0) |
| **Bạn xem phim** | (0, 0) | (<u>1</u>, <u>2</u>) |

Trò này trong sách giáo khoa thường được gọi là *Battle of the Sexes*. Vẫn có hai cân bằng, nhưng lần này mỗi người **thích một cân bằng khác nhau**. Không có điểm tiêu điểm hiển nhiên, và nếu mỗi người cứ cố kéo về cân bằng mình thích, cả hai có thể đi lạc mỗi người một nơi, nhận về $(0, 0)$.

Đây là cấu trúc của rất nhiều cuộc đàm phán: hai công ty cùng muốn hợp tác ra một chuẩn chung, nhưng mỗi bên muốn chuẩn của mình được chọn. Ai **cam kết trước** thường thắng: nếu bạn mua vé bóng đá trước rồi báo Hùng, Hùng sẽ đi theo. Ta sẽ trở lại sức mạnh của cam kết ở Tập 4.

### 3. Săn hươu: cân bằng tốt cần niềm tin

Ví dụ này đến từ triết gia Jean-Jacques Rousseau. Bạn và Hùng đi săn. Nếu cả hai cùng phối hợp săn **hươu**, mỗi người được một phần thịt lớn. Nhưng săn hươu cần đủ hai người: nếu một người bỏ đi săn **thỏ**, người còn lại về tay trắng. Săn thỏ thì một mình cũng làm được, nhưng phần thịt nhỏ hơn:

| | Hùng săn hươu | Hùng săn thỏ |
|---|---|---|
| **Bạn săn hươu** | (<u>4</u>, <u>4</u>) | (0, 3) |
| **Bạn săn thỏ** | (3, 0) | (<u>3</u>, <u>3</u>) |

Hai cân bằng: (Hươu, Hươu) và (Thỏ, Thỏ). Lần này cả hai người **đều thích** cân bằng (Hươu, Hươu) hơn. Vậy thì có gì khó?

Cái khó nằm ở **rủi ro**. Săn thỏ đảm bảo 3, bất kể Hùng làm gì. Săn hươu có thể được 4, nhưng cũng có thể được 0 nếu Hùng không đáng tin. Nếu bạn chỉ hơi nghi ngờ Hùng thôi, cụ thể là nếu bạn nghĩ khả năng Hùng săn thỏ lớn hơn $\frac{1}{4}$, thì săn thỏ đã là lựa chọn tốt hơn cho bạn. Và Hùng cũng nghĩ y như vậy về bạn.

Khác với song đề tù nhân, ở đây không ai **muốn** phản bội. Vấn đề không phải lòng tham mà là **niềm tin**. Một nhóm làm bài tập lớn mà ai cũng sợ người khác không làm phần mình sẽ tự làm hết một bản "an toàn" của riêng mình, và cả nhóm nộp một bài tầm thường.

### 4. Trò "con gà": ai né trước?

Hai tay lái lao xe thẳng vào nhau. Ai bẻ lái trước là "con gà" và mất mặt. Nếu không ai bẻ lái, cả hai cùng gặp tai nạn:

| | Hùng né | Hùng lao thẳng |
|---|---|---|
| **Bạn né** | (0, 0) | (<u>−1</u>, <u>1</u>) |
| **Bạn lao thẳng** | (<u>1</u>, <u>−1</u>) | (−10, −10) |

Hai cân bằng: một người né, người kia lao thẳng. Không có cân bằng nào mà cả hai cùng làm giống nhau. Trò chơi này hay được dùng để mô tả **khủng hoảng tên lửa Cuba** năm 1962: hai siêu cường cùng tiến sát bờ vực, và câu hỏi duy nhất là ai lùi trước.

Mẹo "chiến thắng" trò con gà rất kỳ lạ: hãy làm cho mình **không thể né được**, chẳng hạn tháo vô lăng ra và ném qua cửa sổ cho đối thủ thấy. Lúc đó, phản ứng tốt nhất của đối thủ chỉ còn là né. Đây lại là sức mạnh của cam kết, và là một gợi ý cho Tập 4.

## IV. Cân bằng không có nghĩa là tốt nhất

Đến đây cần nhấn mạnh một điều mà rất nhiều người hiểu nhầm: **cân bằng Nash không phải là kết cục tốt nhất**. Nó chỉ là một kết cục **ổn định**.

- Trong song đề tù nhân, cân bằng duy nhất (Khai, Khai) tệ hơn (Im lặng, Im lặng) **với cả hai người**.
- Trong săn hươu, cân bằng (Thỏ, Thỏ) tệ hơn cân bằng (Hươu, Hươu) với cả hai người, nhưng vẫn là một cân bằng, và vẫn có thể là cái xảy ra.

Các nhà kinh tế có một từ cho khái niệm "tốt hơn cho tất cả": kết cục $X$ được gọi là **tốt hơn theo Pareto** so với kết cục $Y$ nếu ở $X$ không ai tệ đi và có ít nhất một người khá hơn. Song đề tù nhân là ví dụ kinh điển cho thấy cân bằng Nash có thể bị một kết cục khác tốt hơn theo Pareto. Cá nhân lý trí không đảm bảo tập thể hạnh phúc.

Vậy cân bằng Nash hữu ích ở chỗ nào? Nó trả lời câu hỏi: *"Nếu một trạng thái đã hình thành, nó có tự duy trì được không?"* Một kết cục **không phải** cân bằng Nash sẽ không bền: sớm muộn cũng có người nhận ra mình có thể làm tốt hơn bằng cách đổi ý. Một cân bằng Nash, dù tệ đến đâu, sẽ đứng yên ở đó cho tới khi luật chơi thay đổi.

## V. Góc Game Designer

### 1. Meta game là một cân bằng

Bất kỳ ai chơi game cạnh tranh đều biết khái niệm **meta**: tập hợp những tướng, bộ bài, chiến thuật mà "ai cũng chơi". Nhìn bằng lăng kính hôm nay, meta là một cân bằng Nash (gần đúng) của trò chơi chọn chiến thuật: khi mọi người chơi theo meta, không ai có lợi nếu đơn phương chọn thứ khác.

Điều này giải thích hai hiện tượng mà designer gặp liên tục:

- **Meta đứng yên rất lâu**, kể cả khi nó nhàm chán. Một cân bằng tệ vẫn là cân bằng, giống như săn thỏ. Người chơi không đổi vì không ai muốn là người đầu tiên thử thứ mới và thua.
- **Bản cân bằng (patch) làm meta dịch chuyển**. Mỗi lần bạn buff hay nerf, bạn đang **sửa payoff** trong ma trận, giống như khi bạn sửa số trong ô tương tác ở trên. Cân bằng cũ biến mất, người chơi đi tìm cân bằng mới. Một patch tốt không chỉ hỏi *"con số này có quá mạnh không?"* mà hỏi *"sau thay đổi này, cân bằng mới sẽ nằm ở đâu?"*

### 2. Thiết kế điểm tiêu điểm

Rất nhiều tình huống trong game nhiều người là trò phối hợp: ai đi đường nào trong MOBA, cả đội tập trung đánh mục tiêu nào, gặp nhau ở đâu sau khi nhảy dù. Trong các trò này không có gì để tranh giành, chỉ cần mọi người **chọn giống nhau**. Khó khăn duy nhất là giao tiếp.

Nhiều cơ chế quen thuộc thật ra là công cụ tạo điểm tiêu điểm:

- **Hệ thống ping**, như trong *Apex Legends*: một cú click biến một vị trí bất kỳ thành điểm nổi bật mà cả đội cùng thấy.
- **Chọn vai trò trước khi vào trận** (role queue): biến một trò phối hợp nhiều cân bằng thành một trò đã có sẵn quy ước.
- **Bản đồ có điểm mốc nổi bật**: một tòa tháp cao giữa bản đồ tự nhiên sẽ trở thành nơi mọi người hẹn gặp, giống ga Grand Central.

Khi người chơi trong một chế độ team hay cãi nhau, hãy tự hỏi: họ đang tranh giành (trò hẹn hò, con gà) hay chỉ đang không phối hợp được (trò phối hợp thuần túy)? Với loại thứ hai, cách sửa thường không phải là đổi luật mà là **cho người chơi một điểm tiêu điểm**.

### 3. Săn hươu và nỗi sợ bị bỏ rơi

Các hoạt động cần cả nhóm cùng cam kết, như raid trong MMO hay một pha giao tranh tổng, có cấu trúc săn hươu. Phần thưởng lớn nhất đến khi ai cũng tham gia, nhưng tham gia một mình là thảm họa. Nếu bạn thấy người chơi luôn chọn phương án "an toàn", có thể không phải vì họ ích kỷ hay nhát, mà vì họ không tin đồng đội.

Những công cụ giúp người chơi **tin nhau hơn** sẽ đẩy cả nhóm về cân bằng tốt: nút *ready check* trước khi vào trận, hiển thị rõ ai đã cam kết, giảm phạt khi thất bại lúc mọi người đã cùng cố gắng. Bạn không cần đổi phần thưởng của con hươu, chỉ cần làm cho việc đi săn bớt rủi ro.

## VI. Tóm tắt

1. **Phản ứng tốt nhất** là lựa chọn tốt nhất của bạn, **giả sử** đã biết đối thủ chọn gì. Trên ma trận, tìm nó bằng cách gạch chân.
2. **Cân bằng Nash** là tổ hợp mà mỗi người đều đang chơi phản ứng tốt nhất với người kia: không ai muốn đơn phương đổi ý. Trên ma trận, đó là ô có cả hai số được gạch chân.
3. Một trò chơi có thể có **nhiều cân bằng**, và cân bằng không nhất thiết là tốt. Chọn cân bằng nào phụ thuộc vào quy ước, niềm tin và cam kết, những thứ nằm ngoài ma trận.

## Câu đố cho Tập 3

Trong ô tương tác ở trên, hãy chọn trò **"Chẵn lẻ"**: bạn và Hùng cùng lúc ngửa một đồng xu. Nếu hai mặt giống nhau, bạn thắng một đồng của Hùng. Nếu khác nhau, Hùng thắng một đồng của bạn.

Bạn sẽ thấy **không có ô nào** viền cam. Ở mọi ô, luôn có một người muốn đổi ý. Oẳn tù tì cũng y như vậy.

Thế nhưng Nash đã chứng minh rằng mọi trò chơi đều có cân bằng. Vậy cân bằng của trò Chẵn lẻ nằm ở đâu? Và nếu bạn phải chơi oẳn tù tì 100 ván với một người rất giỏi đoán, bạn sẽ chơi thế nào?

## Tài liệu tham khảo

- T. C. Schelling, *The Strategy of Conflict*, Harvard University Press, 1960.
- J. F. Nash, "Equilibrium Points in n-Person Games", *PNAS* 36(1), 48–49 (1950).
- B. Skyrms, *The Stag Hunt and the Evolution of Social Structure*, Cambridge University Press, 2004.
- M. J. Osborne, *An Introduction to Game Theory*, Oxford University Press, 2004.
- [Nash equilibrium — Wikipedia](https://en.wikipedia.org/wiki/Nash_equilibrium)
- [Focal point (game theory) — Wikipedia](https://en.wikipedia.org/wiki/Focal_point_(game_theory))
