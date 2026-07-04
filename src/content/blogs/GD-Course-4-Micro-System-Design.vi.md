---
title: "[GD Course] Bài 4: Micro System Design - Toán học cho Game Designer"
date: "2026-07-03"
category: "Course"
excerpt: "Đằng sau những cảm xúc bùng nổ của người chơi là những hàm số khô khan. Hãy cùng tìm hiểu cách áp dụng toán học vào Micro System Design."
color: "var(--pale-blue)"
draft: false
---

# Lời mở đầu

Ở bài trước, chúng ta đã học cách xây dựng Chuỗi giá trị (Macro) - bộ khung xương của hệ thống kinh tế. Nhưng cái khung đó sẽ trống rỗng và vô hồn nếu thiếu đi các con số. 

> Chúng ta luôn mong muốn sinh ra cảm xúc cho người chơi bằng những con số. Những con số khô khan nhưng đặt chúng vào game lại tạo ra những cảm xúc thật tuyệt vời!

Micro System Design chính là lúc chúng ta thổi hồn vào game thông qua việc định lượng các hệ số, biến số.

# 1. Goal Gradient Effect (Hiệu ứng tiệm cận mục tiêu)

Khoa học tâm lý có một sự thật cực kỳ thú vị được gọi là **Goal Gradient Effect** (nghiên cứu bởi nhà hành vi học Clark Hull năm 1932):
> *"People are motivated by how much is left to reach their target, not how far they’ve gone."*
(Con người được thúc đẩy bởi khoảng cách còn lại để tới đích, chứ không phải quãng đường họ đã đi qua).

Trong nghiên cứu gốc, ông Hull viết: *"Rats in a maze run faster as they near the food box than at the beginning of the path"* (Chuột trong mê cung chạy nhanh hơn khi chúng tới gần hộp thức ăn so với lúc mới bắt đầu).

![Carrot and Stick](/images/blogs/GD-Course-4/download.jpg)

Đây chính là mô hình "Củ cà rốt và cây gậy". Làm sao để tạo động lực cho người chơi? Bằng cách đưa cho họ một thanh tiến trình (Progress Bar).

Hãy xem ví dụ thực tế này:
Một cửa hàng cà phê tung ra 2 loại thẻ tích điểm.
1. Thẻ cần tích 8 điểm (trống không).
2. Thẻ cần tích 10 điểm (nhưng đã đóng sẵn 2 mộc tặng kèm).

![Thẻ tích điểm](/images/blogs/GD-Course-4/Untitled.png)

Thực chất cả 2 thẻ đều cần mua 8 ly cà phê nữa mới được nhận thưởng. Nhưng **Thẻ số 2 có tỷ lệ hoàn thành vượt trội hoàn toàn**, vì người dùng có cảm giác họ đã đi được một phần chặng đường, họ có động lực lớn hơn để "lấp đầy" phần còn lại!

# 2. Khung tham chiếu con số

Cái chúng ta cần trong game là sự tương quan giữa các con số. Một con số đứng một mình thì vô nghĩa. Sát thương 1.000.000 là to hay nhỏ? Nó sẽ là siêu to nếu quái chỉ có 100 máu, nhưng sẽ chả bõ bèn gì nếu quái có 1 tỷ máu.

> Chúng ta luôn cần 2 con số để đặt lên bàn cân, tạo ra các khung tham chiếu. Ví dụ: Sát thương vs Lượng máu, Thời gian vs Vàng, Thời gian vs Kinh nghiệm (EXP).

# 3. Các kiểu quan hệ (Hàm số) hay gặp

## A. Kiểu Đầu vào (Source Type)

### 1. Cố định (Constant)

![Mối quan hệ Cố định](/images/blogs/GD-Course-4/imageLikeEmbed.png)

Cố định một lượng nhất định, người chơi hoàn thành action thì nhận tài nguyên. Sau đó tài nguyên không sinh thêm hoặc bớt đi.
- *Ưu điểm*: Dễ thiết kế vì biết trước lượng tối đa.
- *Nhược điểm*: Dễ vỡ hệ thống khi phát sinh yêu cầu mới (muốn tăng/giảm giới hạn).

### 2. Tuyến tính (Linear)

![Mối quan hệ Tuyến tính](/images/blogs/GD-Course-4/Untitled%201.png)

Ví dụ: 1 ATK = 10 HP. Tăng đều theo một đường thẳng.
Hoặc trò tích EXP bằng cách bấm nút. Bạn cần bấm 5 lần để được 1 EXP. Đủ 5 EXP thì lên 1 Level.

![Ví dụ Bấm EXP](/images/blogs/GD-Course-4/Untitled%202.png)

- *Ưu điểm*: Đơn giản, dễ tính, tạo sự kỳ vọng chuẩn xác.
- *Nhược điểm*: Đơn điệu, dễ đoán, khó tạo cảm xúc bùng nổ theo giai đoạn.

### 3. Nhỏ giọt (Trickle)
Là một biến thể của mối quan hệ tuyến tính, tài nguyên được nhả ra từng chút một theo thời gian.

### 4. Cấp số mũ (Exponential)

![Mối quan hệ Cấp số mũ](/images/blogs/GD-Course-4/Untitled%203.png)

Loại phổ biến nhất là "số sau gấp đôi số trước". Đường cong sẽ dốc ngược lên.
- *Thường sử dụng ở đầu game*: Nhằm tạo cảm giác tiến bộ thần tốc, lôi cuốn người chơi mới.
- *Áp dụng*: Dùng để cân bằng giữa thời gian đầu tư và lợi ích, kiềm chế "người cày trâu" (vì càng về sau cày càng chua).

## B. Nguồn thoát (Sink)

Ngoài các dạng Tĩnh (Constant), Tuyến tính (Linear), Cấp số mũ (Exponential), nguồn thoát có một loại cực kỳ đặc biệt:
**Thi đấu (Versus)**

Đây là một loại nguồn thoát *thích nghi*, không thể mô tả qua hàm số cố định. Lượng tài nguyên bạn "đốt" đi phụ thuộc vào đối thủ của bạn là ai. Thường áp dụng rất mạnh trong các chế độ PvP (Như *Clash Of Clan*).

# 4. Tương tác và Vòng lặp phản hồi (Feedback Loop)

Trong game, các mối quan hệ này không đứng một mình mà tương tác qua lại:
1. **Rule 1**: Hai hàm tuyến tính kết hợp -> Vẫn là tuyến tính (nhưng chỉ số to lên, VD: A->2B, B->2C => A->4C).
2. **Rule 2**: Tuyến tính x Cấp số mũ -> Độ cong thay đổi, chỉ số tăng vọt.
3. **Rule 3**: 2 cấp số mũ kết hợp -> Độ cong tăng khủng khiếp.
4. **Rule 4**: 2 cấp số mũ đối đầu (khử nhau) -> Giảm độ cong, có thể biến thành đường tuyến tính.

## Vòng lặp phản hồi (Feedback Loop)

Hãy tưởng tượng bạn chĩa chiếc Micro về phía cái Loa (Amplifier). Tiếng thu vào mic phát ra loa, âm thanh từ loa lại chui vào mic... và hú lên!

![Feedback Loop](/images/blogs/GD-Course-4/Untitled%204.png)

- **Positive Feedback Loop (Vòng lặp tích cực)**: Đầu ra củng cố đầu vào, làm hệ thống ngày càng khuếch đại. (Ví dụ: Bạn giàu -> Đầu tư đẻ ra tiền -> Càng giàu hơn -> Lại đẻ nhiều tiền hơn). Dùng để đẩy nhanh nhịp độ game.
- **Negative Feedback Loop (Vòng lặp tiêu cực)**: Đầu ra kìm hãm đầu vào, kéo mọi thứ về mức cân bằng. (Ví dụ: Thuế thu nhập, người càng giàu đóng thuế càng nhiều). Dùng để ghìm sự bá đạo của người chơi lại.

*Một quy tắc xương máu của thiết kế hệ thống là: Luôn balance giữa tài nguyên thực (thời gian, tiền ngoài đời) và tài nguyên ảo trong Game!*

# Kết luận

Toán học không chỉ khô khan trên giấy nháp. Khi áp vào game, nó là công cụ để điều khiển nhịp tim của người chơi. Bài tiếp theo, chúng ta sẽ bước sang một khía cạnh đầy thú vị: Tâm lý học hành vi người chơi. Cùng đón chờ nhé!
