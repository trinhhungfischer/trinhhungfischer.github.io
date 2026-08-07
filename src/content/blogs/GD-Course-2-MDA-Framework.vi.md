---
title: "[GD Course] Bài 2: Chơi game như một Game Designer (Mô hình MDA)"
date: "2026-07-03"
category: "Game Design"
tags: "Course"
excerpt: "Không chỉ là đánh giá game, MDA là công cụ mạnh mẽ để chúng ta mổ xẻ, phân tích từng yếu tố tạo nên trải nghiệm của một trò chơi."
color: "var(--pale-blue)"
draft: false
---

# Lời mở đầu

Tiếp nối bài 1, ở phần này chúng ta sẽ tìm hiểu cách nhìn nhận và phân tích một tựa game không phải với con mắt của người chơi, mà là của một Game Designer, thông qua mô hình MDA huyền thoại.

# 1. MDA - Những thứ xuất phát

![MDA Framework](/images/blogs/GD-Course-2/Untitled.png)

MDA là viết tắt của Mechanics, Dynamics và Aesthetics.

- **Mechanics (Cơ chế)**: Là bất kỳ thứ gì trong trò chơi (Cách đồ họa hiển thị, FX chạy, Sound xuất hiện...) mang lại phản hồi cho người chơi.
- **Dynamics (Động lực học)**: Cách người chơi phản ứng với Mechanics, hoặc cách họ sáng tạo ra lối chơi từ các mechanics mà game cung cấp. (Ví dụ: Game cung cấp súng và tường, người chơi nghĩ ra trò đục tường bắn lén).
- **Aesthetics (Cảm xúc/Thẩm mỹ)**: Là tất cả những cảm xúc mà game lấp đầy trong tâm trí bạn, là những cảm nhận của bạn về tựa game đó. Nghe rất nghệ nhưng không phải chỉ có mỗi "nghệ thuật" đâu nha.

## 8 kiểu Aesthetic trong Game

Mặc dù cảm xúc thì muôn màu muôn vẻ, nhưng có 8 kiểu cơ bản thường được nhắc đến:

1. **Cảm xúc**
2. **Viễn tưởng**
3. **Narrative (Tự sự/Kể chuyện)**: Có hai cách hiểu. Cách một là cốt truyện. Cách hai cao siêu hơn: là những câu chuyện riêng của người chơi tạo ra khi trải nghiệm game (VD: "Hôm qua tao clutch 1vs3 với 8 HP đỉnh vl!"). Game giúp người chơi có câu chuyện để đi kể cho người khác nghe.
4. **Thử thách**: Cảm xúc thỏa mãn khi vượt qua khó khăn, thể hiện cái tôi và vượt lên chính mình.
5. **Bằng hữu**: Sự gắn kết giữa những người chơi với nhau, hoặc giữa người chơi và nhân vật NPC.
6. **Khám phá**: Thỏa mãn tò mò.
7. **Thể hiện**: Cảm giác được customize, khoe thành tích.
8. **Tuân thủ**: Tuân theo những luật lệ nhất định.

_Lưu ý: 8 kiểu này chỉ là những ví dụ điển hình, nó không thể liệt kê hết tất cả những cảm xúc mà game có thể mang lại._

## MDA dùng để làm gì?

![Mô hình tổng quát MDA](</images/blogs/GD-Course-2/MDA.drawio_(1).png>)

MDA chỉ dùng để **phân tích Game**, không phải dùng để **đánh giá Game**.
Bạn thử tưởng tượng 2 món: **Canh chua cá lóc** và **Chè khúc bạch**.

<div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; margin: 24px 0;">
  <img src="/images/blogs/GD-Course-2/Untitled%201.png" alt="Canh chua cá lóc" style="width: 300px; height: 200px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
  <img src="/images/blogs/GD-Course-2/Untitled%202.png" alt="Chè khúc bạch" style="width: 300px; height: 200px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
</div>

Nếu đánh giá (review), bạn sẽ nói: "Cả 2 đều ngon, đều ngọt. Nhưng canh chua cá lóc hợp ăn tối, còn chè khúc bạch hợp giải khát. Cá nhân mình thích chè khúc bạch hơn." -> Đó là dùng sở thích cá nhân để nhận xét.

Nhưng nếu phân tích (analysis) bằng MDA, bạn sẽ đào sâu vào nguyên liệu (mechanics), cách nấu và cách ăn (dynamics) để tạo ra cảm nhận cuối cùng (aesthetics). Phân tích là sự thật khách quan.

# 2. Động từ (Verb)

> Động từ là việc người chơi làm có chủ ý ảnh hưởng tới Game State trong Game.

Mỗi Game có nhiều động từ khác nhau, có thể là một Action hoặc một Action chứa nhiều động từ.

> **Mechanic = Động từ + Động từ + ….**

Ví dụ kinh điển như _Super Mario Bros_ trên NES:

![Super Mario Bros](/images/blogs/GD-Course-2/Untitled%203.png)

Các động từ:

- Nhảy (Đụng đầu block, dẫm lên quái).
- Di chuyển.
- Bắn đạn.
- Thu thập vàng.

Hay trong _Archero.io_:

![Archero.io](/images/blogs/GD-Course-2/Untitled%204.png)
Các động từ:

- Di chuyển (Tự động bắn đạn).
- Né tránh.
- Nâng cấp sức mạnh.

Chuyện gì xảy ra nếu Archero thêm một verb "Thu thập vàng" như Mario? Chắc chắn sẽ sinh ra các Dynamic mới: người chơi gần hết máu có thể quyết định liều đi ăn máu/kinh nghiệm thay vì cố gắng giữ khoảng cách an toàn. Điều đó thay đổi hẳn Aesthetic của trò chơi (người chơi không còn chỉ cố gắng né tránh một cách cẩn trọng nữa).

# 3. Thể loại (Genre)

Game có vô vàn thể loại: RPG, RTS, FPS, Platformer, Roguelike...

> Thể loại game thật ra chính là **những lời cam kết** của nhà phát triển về trải nghiệm mà họ hứa hẹn sẽ mang tới cho người chơi. Người chơi tìm đến một thể loại vì họ thèm khát trải nghiệm quen thuộc đó.

Ví dụ dòng game _Roguelike_ từng được định nghĩa bởi rất nhiều luật lệ khắt khe ở hội nghị Berlin:

1. Dungeon random.
2. Permadeath (chết là mất hết cày lại từ đầu).
3. Turn-based.
4. Non-modal.
5. Chiều sâu để sáng tạo lối chơi.
6. Quản lý tài nguyên.
7. Hack and slash.
8. Khám phá map mù.

Nhưng thật ra hiện nay, người ta chỉ cần vài yếu tố cốt lõi (1, 2, 5, 6) là đã gắn mác Roguelike rồi, không bắt buộc phải turn-based nữa.

**Sáng tạo từ thể loại cũ:**
Bạn có thể loại bỏ hẳn một mechanic đặc trưng để tạo ra sự sáng tạo. Chẳng hạn, _VVVVVV_ là game Platformer nhưng không hề có nút nhảy, thay vào đó là cơ chế đảo trọng lực!
Hoặc đôi khi chỉ cần đổi góc camera (từ First Person sang Third Person) là FPS biến thành TPS.

# 4. Problem Statements (Đặt vấn đề)

Trong cùng một thể loại có hằng hà sa số game, làm sao để game của bạn nổi bật? Tất cả phụ thuộc vào cách bạn đặt vấn đề (Problem Statement) trước khi bắt tay thiết kế.

- **Problem Statement tồi**: Tôi muốn làm một game bắn súng kết hợp CSGO và Overwatch. (Quá chung chung, không rõ ràng).
- **Problem Statement tốt (như cách Valorant làm)**: Chúng ta muốn làm một Game bắn súng có 2 phe đối lập, có hệ thống quản lý kinh tế phần thưởng như CSGO, nhưng mỗi nhân vật lại có kỹ năng đặc trưng tác động mạnh mẽ lên cục diện trận đấu.

# 5. Hệ thống Mục tiêu

Mục tiêu là những thứ Designer đặt ra và dụ dỗ người chơi đi theo. Có 3 loại:

## A. Mục tiêu ngắn hạn

Thường diễn ra trong 3-5 giây. Người chơi phải hoàn thành nó nhanh chóng.
Ví dụ: Tránh con Goomba.
![Né Goomba](/images/blogs/GD-Course-2/Untitled%205.png)

## B. Mục tiêu trung hạn

Yêu cầu hoàn thành nhiều mục tiêu ngắn hạn.
Ví dụ: Hoàn thành World 1-1.
![Hoàn thành màn 1-1](/images/blogs/GD-Course-2/Untitled%206.png)

## C. Mục tiêu Game (Dài hạn)

Đích đến cuối cùng.
Ví dụ: Cứu công chúa Peach khỏi Bowser.
![Cứu công chúa](/images/blogs/GD-Course-2/Untitled%207.png)

> **Mục tiêu Game nên được giới thiệu ngay từ đầu để người chơi biết họ đang chiến đấu vì cái gì!** Problem Statement bạn đặt ra lúc thiết kế sẽ quyết định các mục tiêu này.

# Kết luận

Việc phân tách game bằng MDA giúp bạn hiểu rõ từng lớp vỏ của nó, từ cơ chế cốt lõi đến cảm xúc đọng lại. Để thử sức, bạn có thể chọn một game mình đang chơi và tập bóc tách các Mechanics, Dynamics và Aesthetics của nó xem sao nhé!

Hẹn gặp lại anh em ở bài sau về Balance và Economy Game.

---

# 📚 Phụ lục & Nguồn tham khảo

- Toàn bộ nội dung cốt lõi được đúc kết từ khóa học **Zitga Game Design Course** nội bộ do **Mr. Nhật** đứng lớp.
- Trình bày và tinh chỉnh bởi **HungTQ** dựa trên góc nhìn thực chiến cá nhân.
- Mô hình MDA: **MDA: A Formal Approach to Game Design and Game Research** (Robin Hunicke, Marc LeBlanc, Robert Zubek, 2004).
