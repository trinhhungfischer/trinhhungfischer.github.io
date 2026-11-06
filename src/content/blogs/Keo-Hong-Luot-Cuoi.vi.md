---
title: "Viên kẹo hồng ở lượt cuối: một bài toán, hai cách tính"
date: "2026-11-05"
category: "Game Design"
tags: "Math, Short"
series: "Chơi số lành mạnh"
seriesOrder: "1"
excerpt: "Ba viên kẹo xanh, một viên kẹo hồng, và mình bốc trúng viên hồng ở lượt cuối. Cảm giác thật đặc biệt, cho đến khi mình tính xác suất theo hai cách và cả hai cùng trả về 1/4."
color: "var(--pale-blue)"
---

Hôm nay mình bỏ vào túi kẹo **3 viên kẹo xanh** và **1 viên kẹo hồng**, rồi bốc lần lượt từng viên, không bỏ lại. Viên hồng ra đúng ở **lượt cuối cùng**.

Lúc đó mình thấy mình khá đặc biệt. Nhưng đặc biệt đến mức nào? Mình thử tính.

## Cách 1: Xác suất chuỗi

Để viên hồng nằm ở lượt cuối, ba lượt đầu đều phải ra kẹo xanh:

- Lượt 1 ra xanh: $\frac{3}{4}$
- Lượt 2 ra xanh (còn 2 xanh trong 3 viên): $\frac{2}{3}$
- Lượt 3 ra xanh (còn 1 xanh trong 2 viên): $\frac{1}{2}$
- Lượt 4 chỉ còn viên hồng: $1$

Nhân lại:

$$
P = \frac{3}{4} \cdot \frac{2}{3} \cdot \frac{1}{2} \cdot 1 = \frac{1}{4}
$$

Vậy là 25%. Không hiếm như mình tưởng.

## Thử tổng quát: N viên kẹo, 1 viên hồng

Mình tự hỏi: nếu túi có $N$ viên, chỉ 1 viên hồng, thì đáp án có phải là $\frac{1}{N}$ không?

Viết chuỗi ra:

$$
P = \frac{N-1}{N} \cdot \frac{N-2}{N-1} \cdot \frac{N-3}{N-2} \cdots \frac{1}{2} \cdot 1
$$

Tử số của phân số này triệt tiêu mẫu số của phân số kế tiếp, cả chuỗi rút gọn chỉ còn:

$$
P = \frac{1}{N}
$$

Đúng thật. Nhưng phép tính này giống như đi đường vòng rồi mới thấy nó thẳng. Phải có cách nhìn gọn hơn.

## Cách 2: Đối xứng

Bốc hết túi kẹo cũng giống như **xếp $N$ viên kẹo thành một hàng ngẫu nhiên**. Viên hồng phải nằm ở một trong $N$ vị trí, và không có lý do gì để nó ưu tiên vị trí nào hơn vị trí nào. Mọi vị trí đều có khả năng như nhau.

Nên xác suất nó nằm ở vị trí cuối là:

$$
P = \frac{1}{N}
$$

Không cần nhân phân số nào cả.

## Chiêm nghiệm

Hai cách cho cùng một đáp án, nhưng kể hai câu chuyện khác nhau:

- **Xác suất chuỗi** kể câu chuyện *theo thời gian*: từng lượt bốc, từng lần hồi hộp, từng lần may mắn né được viên hồng.
- **Đối xứng** nhìn *toàn cục*: thứ tự đã được định sẵn từ lúc tay mình thò vào túi, mình chỉ đang lật dần từng lá bài.

Và điều làm mình bật cười: lượt cuối có xác suất $\frac{1}{4}$, nhưng lượt đầu, lượt hai, lượt ba **cũng đều là $\frac{1}{4}$**. Viên hồng ra ở lượt nào thì mình cũng sẽ thấy lượt đó "đặc biệt". Cái cảm giác đặc biệt không đến từ con số, mà đến từ việc kết quả xảy ra với chính mình.

Một lưu ý nhỏ: $\frac{1}{N}$ là xác suất tính **trước khi bốc**. Nếu đã bốc ra $k$ viên xanh rồi, thì xác suất viên hồng nằm ở lượt cuối trong số còn lại sẽ là $\frac{1}{N-k}$, vì không gian mẫu đã thu hẹp. Đứng ở lượt áp chót với hai viên còn trong túi, cơ hội là 50/50, và lúc đó tim đập nhanh là hoàn toàn chính đáng.
