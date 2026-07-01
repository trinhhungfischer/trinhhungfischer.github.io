---
title: "Nguyên lý Bao hàm – Loại trừ (Inclusion–Exclusion)"
date: "2026-07-01"
category: "Game Design"
tags: "Math"
excerpt: "Nguyên lý Bao hàm – Loại trừ và ứng dụng trong bài toán thu thập bộ vật phẩm. Tính xác suất để hoàn thành ít nhất một bộ sau N lần mở rương."
color: "var(--pale-blue)"
---

## I. Giới thiệu bài toán và Lý thuyết

### 1. Bài toán

Giả sử có:
* 3 bộ vật phẩm (A, B, C).
* Mỗi bộ gồm 3 món.
* Tổng cộng có 9 món khác nhau.
* Mỗi lần mở rương sẽ nhận ngẫu nhiên 1 trong 9 món với xác suất bằng nhau.
* Sau khi nhận, món đồ được **bỏ lại vào rương** (sampling with replacement).

Mục tiêu là tính:
> **Sau N lần mở, xác suất để hoàn thành ít nhất một bộ là bao nhiêu?**

---

### 2. Chia bài toán thành các sự kiện

Gọi:
* $A$: hoàn thành bộ A.
* $B$: hoàn thành bộ B.
* $C$: hoàn thành bộ C.

Điều cần tìm là:
$$P(A \cup B \cup C)$$

Tức là xác suất **ít nhất một trong ba bộ được hoàn thành**.

---

### 3. Vì sao không thể cộng trực tiếp?

Một cách nghĩ đầu tiên là:
$$P(A) + P(B) + P(C)$$

Nhưng điều này sai. Ví dụ:
* Người chơi có thể hoàn thành cả bộ A và bộ B.
* Trường hợp đó sẽ bị tính hai lần.

Tương tự, nếu hoàn thành cả ba bộ thì sẽ bị tính ba lần. Do đó cần một phương pháp loại bỏ phần bị đếm trùng.

---

### 4. Nguyên lý Bao hàm – Loại trừ (Inclusion–Exclusion)

Hãy bắt đầu với một ví dụ trực quan hơn: **Hợp của 2 sự kiện A và B**.

Khi chúng ta muốn tính xác suất xảy ra ít nhất một trong hai sự kiện, cách tự nhiên nhất là cộng xác suất của từng sự kiện lại: $P(A) + P(B)$.
Tuy nhiên, nếu hai sự kiện này có thể xảy ra đồng thời, phần giao nhau $P(A \cap B)$ đã bị tính **hai lần** (một lần nằm trong $A$ và một lần nằm trong $B$). Để có kết quả chính xác, ta phải trừ đi phần giao này một lần.

Công thức cho 2 sự kiện:
$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

Bạn có thể thử kéo các thanh trượt trong biểu đồ tương tác dưới đây để quan sát sự thay đổi:

<interactive-venn></interactive-venn>

Từ nguyên lý cơ bản đó, ta có thể mở rộng logic cho bài toán **ba sự kiện (ba bộ vật phẩm)** của chúng ta:

$$P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$$

Ý nghĩa đối với 3 sự kiện:
* Cộng xác suất của từng sự kiện riêng lẻ ($A, B, C$).
* Trừ đi các phần giao đôi vì chúng đã bị đếm hai lần ở bước trên.
* Tuy nhiên, sau khi trừ đi các phần giao đôi, vùng lõi trung tâm ($A \cap B \cap C$) lại bị trừ đi quá nhiều (mất hoàn toàn). Do đó, ta phải **cộng lại một lần** ở cuối cùng.

Đây chính là nguyên lý cốt lõi của **Bao hàm – Loại trừ (Inclusion–Exclusion Principle)**. Nó "bao hàm" tất cả các phần tử trước, sau đó "loại trừ" đi những phần tử đếm dư, và lặp lại quá trình này cho đến khi cân bằng.

---

## II. Giải toán

### 5. Công thức hoàn thành một bộ

Xét riêng bộ A gồm 3 món: $A_1$, $A_2$, $A_3$. Muốn hoàn thành bộ A thì cả ba món phải xuất hiện ít nhất một lần. Thay vì tính trực tiếp, ta xét sự kiện ngược lại (phần bù).

Đặt $E_1, E_2, E_3$ lần lượt là các sự kiện "chưa từng nhận $A_1$", "chưa từng nhận $A_2$", và "chưa từng nhận $A_3$". Khi đó:
$$P(A) = 1 - P(E_1 \cup E_2 \cup E_3)$$

Theo nguyên lý Bao hàm – Loại trừ, ta phân tích xác suất của các trường hợp thiếu:
$$P(E_1 \cup E_2 \cup E_3) = P(E_1) + P(E_2) + P(E_3) - P(E_1E_2) - P(E_1E_3) - P(E_2E_3) + P(E_1E_2E_3)$$

Tiến hành tính từng thành phần trong $N$ lần mở rương:
* **Thiếu một món (VD: thiếu $A_1$):** Xác suất quay ra 8 món còn lại là $\frac{8}{9}$. Lũy thừa lên $N$ lần và nhân cho 3 món khác nhau: $3 \times \left(\frac{8}{9}\right)^N$.
* **Thiếu hai món (VD: thiếu $A_1$ và $A_2$):** Xác suất quay ra 7 món còn lại là $\frac{7}{9}$. Có $\binom{3}{2} = 3$ cặp món khác nhau: $3 \times \left(\frac{7}{9}\right)^N$.
* **Thiếu cả ba món:** Không quay ra món nào của bộ A (chỉ quay ra 6 món của B và C): $\left(\frac{6}{9}\right)^N$.

Ghép tất cả lại, ta có xác suất hoàn thành **một bộ cụ thể (bộ A)** là:
$$P(A) = 1 - \left[ 3\left(\frac{8}{9}\right)^N - 3\left(\frac{7}{9}\right)^N + \left(\frac{6}{9}\right)^N \right]$$

---

### 6. Xác suất hoàn thành ít nhất một bộ

Khi đã tính được $P(A)$, để tìm xác suất "hoàn thành ít nhất một trong ba bộ", ta tiếp tục áp dụng Inclusion–Exclusion ở quy mô lớn hơn:
$$P(\text{ít nhất một bộ}) = 3P(A) - 3P(A \cap B) + P(A \cap B \cap C)$$

Trong đó:
* $P(A)$: hoàn thành một bộ.
* $P(A \cap B)$: đồng thời hoàn thành hai bộ.
* $P(A \cap B \cap C)$: hoàn thành cả ba bộ.

Các xác suất giao (ví dụ: $P(A \cap B)$ - hoàn thành cùng lúc bộ A và B, tổng cộng 6 món) cũng được tính bằng đúng nguyên lý Bao hàm – Loại trừ, chỉ khác ở tổng số lượng vật phẩm cần thu thập.

Để viết gọn lại, gọi $P_k$ là xác suất thu thập đủ $k$ món vật phẩm cụ thể, ta có công thức tổng quát cho một tập hợp $k$ món:
$$P_k = \sum_{i=0}^k (-1)^i \binom{k}{i} \left(\frac{9-i}{9}\right)^N$$

Khi đó, công thức cuối cùng cho toàn bộ bài toán rút gọn một cách đẹp mắt thành:
$$P(\text{ít nhất 1 bộ}) = 3P_3 - 3P_6 + P_9$$

Để thấy rõ sức mạnh của nguyên lý này, chúng ta hãy thử tính toán xác suất **hoàn thành ít nhất một bộ bất kỳ** ($P(A \cup B \cup C)$) ở các mốc $N$ khác nhau:

| Số lần mở ($N$) | Xác suất hoàn thành ít nhất 1 bộ |
| :---: | :--- |
| **3** | $\approx 2.5\%$ *(Trường hợp hoàn hảo nhất: 3 lần ra đúng 3 món cùng 1 bộ)* |
| **5** | $\approx 17.2\%$ |
| **10** | $\approx 73.1\%$ |
| **15** | $\approx 95.0\%$ |
| **20** | $\approx 99.4\%$ |

> [!NOTE]  
> **Sự ảo giác về xác suất (Ảo giác nhận thức)**  
> Khi nhìn vào 9 vật phẩm và tỷ lệ rớt ngẫu nhiên chia đều, trực giác con người thường cho rằng cần phải mở rất, rất nhiều lần mới vô tình gom đủ 3 món của một bộ nhất định. 
> Tuy nhiên, khi xét trên việc hoàn thành **ít nhất một bộ bất kỳ**, tốc độ tăng của xác suất này diễn ra cực kỳ nhanh giống như **Bài toán trùng ngày sinh nhật (Birthday Paradox)**. Chỉ với 10 lần mở rương, tỷ lệ trúng đã vượt mốc 73%, và nếu mở 15 lần, bạn gần như chắc chắn (95%) sở hữu ít nhất một bộ hoàn chỉnh! 

---

## III. Kết luận và Mở rộng

### 7. Quy luật tổng quát

Giả sử có:
* $m$ bộ.
* Mỗi bộ có $k$ món.

Xác suất hoàn thành một bộ luôn tuân theo quy luật:
$$P(\text{đủ bộ}) = \sum_{i=0}^{k} (-1)^i \binom{k}{i} \left(\frac{mk-i}{mk}\right)^N$$

Các hệ số đan dấu ở phía trước (ví dụ 1, 3, 3, 1 đối với $k=3$) không phải ngẫu nhiên mà chính là các **hệ số tổ hợp** $\binom{k}{i}$, xuất hiện vô cùng tự nhiên từ nguyên lý Bao hàm – Loại trừ.

---

### 8. Ý tưởng cốt lõi cần nhớ

* **Không tính trực tiếp** xác suất "đủ tất cả". Thay vào đó, hãy chuyển sang tính xác suất phần bù: "thiếu ít nhất một".
* Các trường hợp thiếu thường bị chồng lấn nhau nên không thể cộng lại một cách đơn giản.
* Dùng nguyên lý **Bao hàm – Loại trừ** để cộng trừ luân phiên, triệt tiêu đi các phần đếm trùng.
* Sau khi tính được xác suất thiếu, lấy **1 trừ đi** sẽ thu được xác suất hoàn thành trọn bộ.
* Việc áp dụng công thức này vào thực tiễn (như gacha) cho chúng ta thấy những **ảo giác nhận thức**: tốc độ đạt được một bộ đủ sẽ nhanh hơn nhiều so với cảm giác chủ quan của người chơi.

Đây là một trong những kỹ thuật nền tảng cực kỳ mạnh mẽ, được sử dụng rộng rãi trong **Coupon Collector Problem**, thiết kế hệ thống gacha, loot box, sưu tập vật phẩm và nhiều bài toán thống kê khác trong Game Design.
