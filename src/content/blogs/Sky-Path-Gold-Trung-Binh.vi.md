---
title: "Sky Path và hũ gold: ba cách tính, một cái bẫy tên Jensen"
date: "2026-11-06"
category: "Game Design"
tags: "Math, Short"
series: "Chiêm nghiệm xác suất"
seriesOrder: "2"
excerpt: "Event Sky Path chia đều một hũ gold cho những người còn trụ lại. Mình, một đồng nghiệp và một cách thứ ba cùng tính gold trung bình, và hai cách đầu đều hụt vì cùng một lý do."
color: "var(--pale-blue)"
---

Bài này tiếp nối [viên kẹo hồng ở lượt cuối](/blog/Keo-Hong-Luot-Cuoi). Lần này bài toán đến từ công việc.

Nhiều game puzzle có một kiểu event tên **Sky Path**: bạn cùng một nhóm người chơi (thường là bot) leo qua nhiều chặng, ai thua thì rơi khỏi đường. Cuối event, **một hũ gold $G$ được chia đều cho những người còn trụ lại**. Nếu còn $k$ bot sống sót cùng bạn, bạn nhận:

$$
\text{gold} = \frac{G}{k+1}
$$

Bảng phân phối số bot còn lại trông như sau:

| Bot còn lại | 0 | 1 | 2-3 | 4-6 | 7-10 | 11-25 |
|---|---|---|---|---|---|---|
| Xác suất | 0,01% | 0,05% | 0,10% | 0,50% | 5,00% | 94,34% |

Câu hỏi: **trung bình mỗi lần qua event, mình nhận được bao nhiêu gold?**

Ba người tính theo ba kiểu, ra ba con số.

## Cách 1: Tính số người trung bình, rồi chia

Cách đầu tiên mình nghĩ ra: tính xem trung bình có bao nhiêu người còn lại, rồi lấy $G$ chia cho con số đó.

Lấy điểm giữa mỗi khoảng (2-3 → 2,5; 11-25 → 18…), số bot trung bình là khoảng $17{,}43$. Cộng thêm mình là $18{,}43$ người:

$$
E[\text{gold}] \approx \frac{G}{18{,}43} \approx 0{,}0543\,G
$$

Lúc đó mình thấy hơi lấn cấn vì "18,43 người" nghe vô lý, người đâu có lẻ được. Nhưng hóa ra con số lẻ không phải vấn đề. Vấn đề nằm ở chỗ khác.

## Cách 2: Tính theo từng khoảng

Một đồng nghiệp làm kỹ hơn: với mỗi khoảng, lấy điểm giữa, tính phần gold ở khoảng đó, rồi nhân với xác suất của khoảng.

$$
E[\text{gold}] \approx G \sum_{\text{khoảng}} P(\text{khoảng}) \cdot \frac{1}{\bar{k}+1}
$$

Ví dụ khoảng 2-3 được tính là $\frac{1}{2{,}5+1} = 0{,}2857$. Cộng hết lại ra khoảng $0{,}0564\,G$.

Cách này đúng hướng hơn, vì nó đã lấy kỳ vọng *bên ngoài* phép chia. Nhưng bên trong mỗi khoảng, nó vẫn mắc lại đúng lỗi của cách 1.

## Cái bẫy: trung bình của phép chia khác phép chia của trung bình

Thứ chúng ta cần là:

$$
E\left[\frac{1}{k+1}\right]
$$

còn cách 1 tính:

$$
\frac{1}{E[k+1]}
$$

Hai thứ này **không bằng nhau**. Hàm $f(x) = \frac{1}{x}$ là hàm lồi, và bất đẳng thức Jensen nói rằng với hàm lồi:

$$
E\left[\frac{1}{X}\right] \ge \frac{1}{E[X]}
$$

Tức là cách 1 **luôn luôn tính hụt**, bất kể bảng số trông thế nào.

Trực giác cho chuyện này khá dễ chịu: những ván chỉ còn vài người, bạn ôm một phần rất lớn của hũ. Những ván đông người thì phần của bạn chỉ nhỏ đi một chút. Khi lấy trung bình số người *trước* rồi mới chia, mấy ván trúng lớn kia bị san phẳng mất.

Cách 2 chỉ áp dụng Jensen ở quy mô nhỏ hơn. Trong khoảng 2-3, trung bình thật của $\frac{1}{3}$ và $\frac{1}{4}$ là $0{,}2917$, lớn hơn $0{,}2857$. Khoảng càng rộng thì sai càng nhiều. Khoảng 11-25 vừa rộng nhất (15 giá trị) vừa chiếm tới 94% xác suất, nên gần như toàn bộ sai số đến từ đây.

## Cách 3: Lấy trung bình của $\frac{1}{k+1}$

Bảng chỉ cho xác suất theo khoảng, nên phải giả định cách phân bố bên trong mỗi khoảng. Giả định đơn giản nhất là **đều**: khoảng 2-3 thì $k=2$ và $k=3$ mỗi giá trị chiếm một nửa.

Với mỗi khoảng $[a, b]$, ta lấy trung bình của các giá trị $\frac{1}{k+1}$:

$$
E[\text{gold}] = G \sum_{\text{khoảng}} P(\text{khoảng}) \cdot \frac{1}{b-a+1}\sum_{k=a}^{b} \frac{1}{k+1}
$$

| Bot còn lại | Xác suất | Trung bình $\frac{1}{k+1}$ | Đóng góp |
|---|---|---|---|
| 0 | 0,01% | $1$ | 0,000100 |
| 1 | 0,05% | $\frac{1}{2}$ | 0,000250 |
| 2-3 | 0,10% | $\frac{1}{2}\left(\frac{1}{3}+\frac{1}{4}\right) = 0{,}2917$ | 0,000292 |
| 4-6 | 0,50% | $\frac{1}{3}\left(\frac{1}{5}+\frac{1}{6}+\frac{1}{7}\right) = 0{,}1698$ | 0,000849 |
| 7-10 | 5,00% | $\frac{1}{4}\left(\frac{1}{8}+\dots+\frac{1}{11}\right) = 0{,}1068$ | 0,005338 |
| 11-25 | 94,34% | $\frac{1}{15}\left(\frac{1}{12}+\dots+\frac{1}{26}\right) = 0{,}0556$ | 0,052487 |
| **Tổng** | | | **0,0593** |

$$
E[\text{gold}] \approx 0{,}0593\,G \approx \frac{G}{16{,}86}
$$

Với hũ 10.000 gold, trung bình mỗi lần bạn nhận khoảng **593 gold**, chứ không phải 543 như cách 1.

## So sánh

| Cách | Kết quả | Sai lệch |
|---|---|---|
| 1. $G$ chia số người trung bình | $0{,}0543\,G$ | −8,5% |
| 2. Điểm giữa từng khoảng | $0{,}0564\,G$ | −4,9% |
| 3. Trung bình của $\frac{1}{k+1}$ | $0{,}0593\,G$ | chuẩn* |

\*Chuẩn theo giả định phân bố đều trong mỗi khoảng. Nếu config game có xác suất cho **từng giá trị $k$**, chỉ cần thay vào công thức là ra con số chính xác.

## Chiêm nghiệm

Nhìn bảng, 8,5% nghe có vẻ không nhiều. Nhưng với người làm game, đó là chênh lệch giữa "event phát ra bao nhiêu gold mỗi ngày" theo bảng tính và theo thực tế. Nhân lên hàng triệu người chơi thì nền kinh tế trong game sẽ lệch khỏi kế hoạch theo một hướng rất cố định: **luôn phát ra nhiều hơn dự tính**.

Bài học mình rút ra gọn trong một câu: **khi kết quả là một phép chia, đừng chia cho trung bình. Hãy lấy trung bình của phép chia.** Nó cũng áp dụng cho rất nhiều chỗ khác: thời gian trung bình để qua màn khi biết tốc độ, giá trung bình mỗi item khi mua theo gói, hay ARPU khi số người chơi dao động.

Và câu hỏi "người có thể là số lẻ không" mà mình lấn cấn lúc đầu hóa ra lại là một tín hiệu tốt. Nó không phải lỗi, nhưng nó là cái gợn nhỏ báo rằng mình đang tính một thứ không thật sự tồn tại.
