---
title: "“Ngẫu nhiên” trên không gian mẫu nào? Chiêm nghiệm từ nghịch lý Bertrand"
date: "2026-10-28"
category: "Game Design"
tags: "Math"
excerpt: "Một bài toán có ba đáp án, một câu hỏi về người ngoài hành tinh và một nhà máy làm khối lập phương. Tất cả cùng hỏi một điều: khi nói “ngẫu nhiên”, ta đang ngẫu nhiên trên cái gì?"
color: "var(--pale-blue)"
draft: true
---

## I. Nghịch lý Bertrand và câu hỏi đằng sau nó

### 1. Bài toán trong một phút

Năm 1889, nhà toán học Joseph Bertrand đặt ra câu hỏi sau trong cuốn *Calcul des probabilités*:

> Cho một hình tròn và một tam giác đều nội tiếp trong nó. Kẻ **ngẫu nhiên** một dây cung. Xác suất để dây cung đó **dài hơn cạnh tam giác** là bao nhiêu?

Gọi bán kính là $R$, cạnh tam giác dài $R\sqrt{3}$. Một dây cung cách tâm một khoảng $d$ có độ dài $2\sqrt{R^2 - d^2}$, nên dây dài hơn cạnh tam giác khi và chỉ khi:

$$
d < \frac{R}{2}
$$

Đến đây mọi thứ vẫn rõ ràng. Rắc rối nằm ở chữ "ngẫu nhiên". Có ít nhất ba cách kẻ một dây cung "ngẫu nhiên", và chúng cho ra ba đáp án khác nhau:

| Cách kẻ dây | Lập luận | Đáp án |
|---|---|---|
| Chọn ngẫu nhiên **hai đầu mút** trên đường tròn | Cố định một đầu ở đỉnh tam giác, đầu kia phải rơi vào cung đối diện $120°$ | $\frac{1}{3}$ |
| Chọn ngẫu nhiên **một điểm trên bán kính**, kẻ dây vuông góc qua điểm đó | $d$ phân bố đều trên $[0, R]$, cần $d < \frac{R}{2}$ | $\frac{1}{2}$ |
| Chọn ngẫu nhiên **trung điểm** của dây trong hình tròn | Trung điểm phải nằm trong hình tròn bán kính $\frac{R}{2}$ | $\frac{1}{4}$ |

Bạn có thể tự ném dây và xem tỉ lệ hội tụ về đâu. Dây **màu cam** là dây dài hơn cạnh tam giác. Tạm thời bỏ qua chế độ "Ném que rơm", mình sẽ quay lại nó ở cuối bài.

<bertrand-chords>
</bertrand-chords>

### 2. Câu hỏi thật sự: ngẫu nhiên trên cái gì?

Ba lời giải trên không mâu thuẫn nhau. Chúng chỉ đang trả lời ba câu hỏi khác nhau, vì mỗi cách đã ngầm chọn một **không gian mẫu** và một cách "chia đều" khác nhau trên đó:

- Cách 1 chia đều theo **góc** trên vành tròn.
- Cách 2 chia đều theo **khoảng cách** từ tâm.
- Cách 3 chia đều theo **diện tích** bên trong hình tròn.

Trong lý thuyết xác suất hiện đại (Kolmogorov, 1933), một mô hình xác suất luôn gồm ba thứ: tập các kết cục có thể xảy ra (không gian mẫu), các biến cố mà ta quan tâm, và **cách gán xác suất** cho chúng. Chữ "ngẫu nhiên" trong câu nói hằng ngày thường chỉ nói về thứ thứ nhất, và lặng lẽ bỏ qua thứ thứ ba.

Mà thứ thứ ba mới là thứ quyết định đáp án.

### 3. Có sự sống ngoài Trái Đất không? 50/50!

Bạn chắc đã từng nghe kiểu lập luận này:

> "Có sự sống ngoài Trái Đất hay không? Chỉ có hai khả năng: có hoặc không. Vậy xác suất là 50%."

Lập luận này nghe buồn cười, nhưng nó có cùng một lỗi với nghịch lý Bertrand. Nó dựa trên **nguyên lý bất định** (principle of indifference): khi không biết gì, hãy chia đều xác suất cho các khả năng. Vấn đề là "các khả năng" phụ thuộc vào việc ta **cắt không gian mẫu như thế nào**.

Thử cắt lại theo cách khác:

- Không có sự sống
- Chỉ có vi sinh vật
- Có sinh vật đa bào phức tạp
- Có nền văn minh

Áp dụng đúng nguyên lý cũ, mỗi khả năng nhận 25%. Bây giờ xác suất "có sự sống" thành **75%**. Cắt nhỏ thêm nữa, con số còn tăng tiếp. Không có gì thay đổi về vũ trụ, chỉ có cách chúng ta đặt tên cho các khả năng đã thay đổi.

Con số 1/2 ở đây không nói gì về thế giới. Nó chỉ phản ánh việc ta đã **làm mờ không gian mẫu** thành hai cái nhãn "có" và "không". Muốn trả lời nghiêm túc, các nhà khoa học phải mở cái hộp đó ra: bao nhiêu ngôi sao có hành tinh, bao nhiêu hành tinh nằm trong vùng có thể sống được, sự sống xuất hiện dễ hay khó... Đó chính là tinh thần của phương trình Drake. Mỗi nhân tố là một cách làm rõ không gian mẫu.

Những câu hỏi cùng kiểu thì nhiều vô kể: *"Mua vé số thì hoặc trúng hoặc trượt, vậy là 50%"*. *"Đi thi thì hoặc đỗ hoặc trượt"*. Hai kết cục **không có nghĩa là** hai kết cục có khả năng như nhau.

Trong làm game cũng vậy. Một spec ghi *"Mở rương nhận 1 item ngẫu nhiên"*, với rương có 10 item Common, 5 Rare, 1 Epic:

- Chia đều theo **item**: tỉ lệ ra Epic là $\frac{1}{16} \approx 6\%$.
- Chia đều theo **độ hiếm** trước, rồi mới chọn item: tỉ lệ ra Epic là $\frac{1}{3} \approx 33\%$.

Cùng một câu chữ, khác nhau hơn năm lần. Không gian mẫu không được viết ra thì người code sẽ tự chọn giúp bạn.

## II. Một ví dụ còn đơn giản hơn: nhà máy khối lập phương

Nghịch lý Bertrand cần một chút hình học. Triết gia Bas van Fraassen (1989) đưa ra một phiên bản gọn hơn nhiều, không cần vẽ hình:

> Một nhà máy sản xuất các khối lập phương có **cạnh ngẫu nhiên** từ 0 đến 1 mét. Xác suất để một khối có cạnh nhỏ hơn 0,5 mét là bao nhiêu?

Câu trả lời tự nhiên là $\frac{1}{2}$. Nhưng hãy nhìn cùng nhà máy đó qua các con mắt khác nhau:

| "Ngẫu nhiên" theo | Khoảng giá trị | Biến cố "cạnh < 0,5m" tương đương với | Xác suất |
|---|---|---|---|
| Độ dài cạnh | $[0, 1]$ m | cạnh $< 0{,}5$ | $\frac{1}{2}$ |
| Diện tích một mặt | $[0, 1]$ m² | diện tích $< 0{,}25$ | $\frac{1}{4}$ |
| Thể tích | $[0, 1]$ m³ | thể tích $< 0{,}125$ | $\frac{1}{8}$ |

Ba người cùng đứng nhìn một dây chuyền, cùng dùng chữ "ngẫu nhiên", và cùng hỏi về một biến cố. Vậy mà ra ba con số.

Người quản lý kho chỉ quan tâm khối lập phương chiếm bao nhiêu chỗ, nên sẽ nghĩ theo thể tích. Người sơn chỉ quan tâm diện tích bề mặt. Người cắt gỗ nghĩ theo độ dài cạnh. Không ai sai, chỉ là **mỗi người có một không gian mẫu "tự nhiên" của riêng mình**.

Điểm khác biệt quan trọng so với Bertrand: ở bài toán nhà máy, đề bài **thực sự không cho đủ thông tin** để chọn. Trừ khi biết cái máy hoạt động thế nào (nó cắt theo chiều dài, hay đổ khuôn theo lượng vật liệu?), câu hỏi này không có đáp án duy nhất.

Thế còn Bertrand thì sao? Có phải nó cũng "vô nghiệm" như vậy?

## III. Thật ra nghịch lý Bertrand có đáp án: 1/2

Suốt gần một thế kỷ, nghịch lý Bertrand được trích dẫn như bằng chứng rằng câu hỏi "kẻ ngẫu nhiên một dây cung" là vô nghĩa. Năm 1973, nhà vật lý E. T. Jaynes viết bài *The Well-Posed Problem* và cho thấy điều ngược lại: đề bài của Bertrand **chứa đủ thông tin**, chỉ là thông tin đó nằm ở chỗ đề bài **không nói gì**.

### 1. Không biết gì cũng là một thông tin

Hãy đọc lại đề bài. Bertrand không nói hình tròn **to bao nhiêu**, **đặt ở đâu**, hay **xoay theo hướng nào**. Nếu ta thật sự không biết gì về những điều đó, thì đáp án **không được phép phụ thuộc** vào chúng. Nghĩa là phân phối của dây cung phải giữ nguyên khi ta:

- **Xoay** hình tròn quanh tâm,
- **Phóng to hoặc thu nhỏ** hình tròn,
- **Tịnh tiến** hình tròn đi một chút.

Hãy hình dung một thí nghiệm cụ thể. Ta đứng từ xa ném những que rơm lên sàn nhà, trên sàn có vẽ một hình tròn. Que nào cắt qua hình tròn thì phần nằm trong hình tròn là một dây cung. Người ném không nhắm, không biết hình tròn ở đâu. Nếu có ai lén dịch hình tròn sang trái vài phân, những que rơm rơi xuống cũng chẳng hay biết gì. Phân phối của dây cung buộc phải giữ nguyên.

### 2. Chỉ một cách vượt qua được bài kiểm tra

Xoay thì cả ba cách đều qua, vì cả ba đều đối xứng quanh tâm. Phép thử khó nhất là **tịnh tiến**.

Một đường thẳng trên mặt phẳng có thể mô tả bằng hai con số: góc $\theta$ của nó và khoảng cách $p$ từ nó tới một điểm gốc. Hình học tích phân (công trình của Crofton và Poincaré) đã chứng minh rằng chỉ có **một cách duy nhất** (sai khác một hằng số) để "chia đều" các đường thẳng sao cho phép xoay và phép tịnh tiến không làm thay đổi gì:

$$
\text{chia đều theo } \theta \text{ và chia đều theo } p
$$

Với hình tròn, điều đó có nghĩa là khoảng cách $d$ từ tâm tới dây cung phân bố **đều** trên $[0, R]$. Đây đúng là cách 2. Phóng to hay thu nhỏ hình tròn thì $d$ vẫn phân bố đều, nên cách này cũng vượt qua phép thử thứ ba.

Cách 1 và cách 3 thì không: chúng ưu tiên một số vị trí của dây cung so với vị trí khác theo cách phụ thuộc vào việc hình tròn đang đặt ở đâu. Dịch hình tròn đi là phân phối bị lệch.

Vậy với bài toán đúng như Bertrand phát biểu:

$$
P = \frac{1}{2}
$$

### 3. Ném que thật

Jaynes không dừng ở lý thuyết. Ông cùng đồng nghiệp đã thật sự ném que rơm lên một hình tròn vẽ trên sàn, và tỉ lệ thu được khớp với $\frac{1}{2}$, không khớp với $\frac{1}{3}$ hay $\frac{1}{4}$.

Bạn có thể làm lại thí nghiệm đó: kéo lên mô phỏng ở đầu bài, chọn chế độ **"Ném que rơm"**. Mô phỏng thả que với vị trí và hướng hoàn toàn ngẫu nhiên xuống một vùng sàn rộng gấp nhiều lần hình tròn, rồi chỉ giữ lại những que cắt qua hình tròn. Không có dòng code nào "chọn khoảng cách $d$ đều", vậy mà tỉ lệ vẫn hội tụ về $0{,}5$.

Tất nhiên, nếu cơ chế tạo dây cung được mô tả cụ thể (ví dụ một cây kim luôn quay quanh một điểm cố định trên vành tròn), thì không gian mẫu đã khác và đáp án cũng khác. Nhưng khi "ngẫu nhiên" có nghĩa là **thật sự không biết gì**, đáp án là $\frac{1}{2}$.

## IV. Lời kết: hai con số 1/2

Bài viết này có hai con số $\frac{1}{2}$, và chúng khác nhau hoàn toàn.

- Con số $\frac{1}{2}$ của câu hỏi về người ngoài hành tinh đến từ việc **làm mờ** không gian mẫu thành hai cái nhãn. Nó phản ánh sự lười suy nghĩ, không phải sự hiểu biết.
- Con số $\frac{1}{2}$ của Bertrand đến từ việc **tôn trọng đúng** những gì ta không biết, rồi để tính đối xứng chọn giúp không gian mẫu duy nhất hợp lý.

Thiếu thông tin không phải là cái cớ để chia đôi mọi thứ. Thiếu thông tin cũng là một thông tin, và nếu dùng nó cẩn thận, nó có thể dẫn ta tới một đáp án chính xác.

Lần tới, mỗi khi bạn (hoặc spec của bạn) nói "ngẫu nhiên", hãy hỏi thêm một câu: **ngẫu nhiên trên cái gì?**

## Tài liệu tham khảo

- J. Bertrand, *Calcul des probabilités*, Gauthier-Villars, 1889.
- E. T. Jaynes, "The Well-Posed Problem", *Foundations of Physics* 3, 477–492 (1973).
- B. C. van Fraassen, *Laws and Symmetry*, Oxford University Press, 1989.
- [Bertrand paradox (probability) — Wikipedia](https://en.wikipedia.org/wiki/Bertrand_paradox_(probability))
- [Principle of indifference — Wikipedia](https://en.wikipedia.org/wiki/Principle_of_indifference)
