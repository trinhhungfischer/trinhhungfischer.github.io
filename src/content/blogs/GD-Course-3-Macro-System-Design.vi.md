---
title: "[GD Course] Bài 3: Macro System Design - Xây dựng Chuỗi giá trị"
date: "2026-07-03"
category: "Course"
excerpt: "Khi nhắc tới Balance Game, chúng ta cần nghĩ ngay tới những con số. Bài này sẽ hướng dẫn cách thiết kế một nền kinh tế vĩ mô trong game thông qua Chuỗi giá trị."
color: "var(--pale-blue)"
draft: false
---

# Lời mở đầu

Khi nhắc tới Balance (cân bằng) Game, bạn nghĩ tới điều gì? Tại sao Game lại cần Balance?
Đơn giản thôi, cân bằng Game là để tạo ra **cảm xúc** cho người chơi (hồi hộp, vui, buồn...) sao cho phù hợp với Problem Statement ban đầu của bạn.

Và để cân bằng được, ngôn từ là không đủ. Nếu chúng ta dùng ngôn ngữ như "nhanh, rất nhanh, siêu nhanh" thì rất khó để đánh giá và so sánh. 

![Đồ thị](/images/blogs/GD-Course-3/Untitled.png)

Nhưng nếu chúng ta gán vào đó những con số, mọi thứ sẽ dễ dàng hơn rất nhiều.
> Chúng ta cần những con số để cân bằng Game.

Có 2 phạm trù cân bằng:
- **Macro Balancing (Vĩ mô)**: Thiết kế hệ thống tổng quan, thiết kế nền kinh tế và các chuỗi giá trị tương tác với nhau.
- **Micro Balancing (Vi mô)**: Tập trung vào từng con số cụ thể, làm việc chủ yếu với các file config. (Sẽ nói ở bài sau nha).

Hôm nay chúng ta sẽ bàn về **Economy System Design** ở tầng vĩ mô.

# 1. Thiết kế nền kinh tế (Economy System Design)

![Vòng lặp kinh tế](/images/blogs/GD-Course-3/Untitled%201.png)

Nền kinh tế trong game sinh ra để tạo động lực cho người chơi. Chúng ta muốn người chơi chạy mãi trong nền kinh tế đó như chú chuột trên guồng quay, liên tục tìm kiếm và cày cuốc để đạt được thứ họ muốn.

Lấy ví dụ về tựa game nổi tiếng **Animal Crossing: New Horizon**. 

![Animal Crossing](/images/blogs/GD-Course-3/Untitled%202.png)

Các động từ (hành động) trong game rất đơn giản, thậm chí có thể nói là nhàm chán nếu lặp đi lặp lại: Chặt cây 🪓, Đào đá 🪨, Câu cá 🎣, Rung cây 🌳. Chỉ cần chạy tới và bấm phím A. Nhưng tại sao nó lại cuốn?

Hãy nhìn vào chuỗi chuyển đổi để tạo ra một cái xô trang trí nhà:

![Chuỗi chuyển đổi](/images/blogs/GD-Course-3/Untitled%203.png)

| Gỗ, Sắt ⇒ | Xô gỗ ⇒ | Xô gỗ trang trí ⇒ | Thể hiện bản thân |
| --- | --- | --- | --- |
| **Đầu vào:**<br>+ Thời gian<br>+ Rìu<br>+ Cây gỗ / Mỏ đá | **Đầu vào:**<br>+ Công thức<br>+ Gỗ / Sắt | **Đầu vào:**<br>+ Xô gỗ<br>+ Khoảng trống | **Đầu vào:**<br>+ Xô gỗ trang trí |
| **Hành động:**<br>+ Ấn A | **Hành động:**<br>+ Craft | **Hành động:**<br>+ Đặt xô | **Hành động:**<br>+ Ngắm nghía khoe bạn bè |
| **Đầu ra:**<br>+ Gỗ<br>+ Sắt | **Đầu ra:**<br>+ Xô gỗ | **Đầu ra:**<br>+ Không gian đẹp | **Đầu ra:**<br>+ Thể hiện bản thân |

## Các thành phần trong chuỗi giá trị (Value Chain)

Bất kỳ chuỗi giá trị nào cũng bao gồm các phần:
- **Đầu vào (Input)**: Trong các game Mobile, đầu vào đắt giá nhất thường chính là *thời gian* của người chơi.
- **Phần chuyển đổi (Converter)**: Quá trình hô biến từ Đầu vào thành Đầu ra. *Lưu ý: Chuỗi chuyển đổi không nên quá dài cũng không nên quá ngắn.*
- **Đầu ra (Output)**: Kết quả thu được.
- **Phần neo (Anchor)**: Động lực cuối cùng. Phải làm rõ thứ này cho người chơi ngay từ đầu! (Trong Animal Crossing, phần neo chính là làm đẹp nhà cửa để thể hiện bản thân).

> Mô hình chuỗi giá trị này cực kỳ phù hợp với các game Mobile mang tính chất High Retention - Low Action (Giữ chân cao, Kỹ năng thấp).

# 2. Khái niệm cốt lõi theo mô hình Machination

Để thiết kế nền kinh tế hiệu quả, chúng ta làm quen với hệ thống thuật ngữ "Faucet-and-Drain" (Vòi nước và Lỗ thoát) do Joris Dorman đề xuất:

- **Tokens**: Tiền tệ/Tài nguyên di chuyển trong mạng lưới kinh tế.
- **Sources (Nguồn sinh / Vòi nước)**: Nơi tạo ra Token từ hư không. Luôn có tốc độ sinh nhất định.
- **Sink (Nguồn thoát / Lỗ thoát)**: Cơ chế loại bỏ Token hoàn toàn khỏi hệ thống (VD: Tiêu vàng để nâng cấp, nâng xong là lượng vàng đó biến mất vĩnh viễn).
- **Pool (Bể chứa)**: Túi đồ, kho chứa tài nguyên.
- **Converter**: Đổi từ tài nguyên này sang tài nguyên khác.

# 3. Các cấu trúc Multiple Chains (Chuỗi giá trị phức hợp)

Game hiếm khi chỉ có 1 chuỗi, mà là nhiều chuỗi lồng ghép. Chúng ta có các kiểu sau:

## A. Chuỗi giá trị song song (Parallel)
Nhiều chuỗi chạy song song độc lập.
- *Nhược điểm*: Sinh ra quá nhiều loại tài nguyên (mỗi chuỗi cần 1 loại). Ít tương tác chéo, người chơi dễ thấy một màu. Nặng content (Team dev phải liên tục đẻ ra content mới để nuôi các chuỗi này).

## B. Chuỗi giá trị bổ trợ (Buff)

![Chuỗi bổ trợ](/images/blogs/GD-Course-3/Untitled%204.png)

Chuỗi B sinh ra chỉ để tạo ra một "buff" giúp Chuỗi A hoạt động hiệu quả hơn.
- *Ví dụ*: Chuỗi A là cày tiền bằng cách đánh quái. Chuỗi B là đập lò rèn chế vũ khí. Đập xong vũ khí xịn thì đánh quái ở Chuỗi A nhanh hơn.
- *Phần neo của Chuỗi B* chính là **Độ hiệu quả**:
  - Tiết kiệm thời gian, tài nguyên.
  - Làm mọi thứ dễ hơn, người chơi có thể phạm sai lầm nhiều hơn mà không chết.

## C. Chuỗi giá trị chéo (Cross)

![Chuỗi chéo 1](/images/blogs/GD-Course-3/Untitled%205.png)
![Chuỗi chéo 2](/images/blogs/GD-Course-3/Untitled%206.png)

Tài nguyên của chuỗi này là đầu vào của chuỗi kia và ngược lại, đan xen phức tạp.
- *Nhược điểm*: Cực kỳ khó cân bằng. Rất dễ xảy ra tình trạng "Obvious Choice" hoặc "Dominant Strategy" (Người chơi chỉ chăm chăm cày 1 chuỗi vì nó tối ưu, bỏ phế các chuỗi còn lại).

# Kết luận

Cân bằng vĩ mô là vẽ ra một bản đồ lưu thông dòng chảy tài nguyên. Khi dòng chảy mượt mà, không bị ứ đọng hay cạn kiệt, người chơi sẽ có lý do để tiếp tục "cày". Bài sau chúng ta sẽ đi sâu vào Micro System Design - nơi những con số khô khan biến thành cảm xúc!
