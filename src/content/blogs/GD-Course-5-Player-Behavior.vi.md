---
title: "[GD Course] Bài 5: Hành vi Người chơi (Player Behavior)"
date: "2026-07-03"
category: "Course"
excerpt: "Hệ thống vĩ mô và vi mô đã có, nhưng chúng ta còn thiếu một biến số quan trọng nhất: Con người. Cùng khám phá tâm lý học hành vi đằng sau những cú click chuột."
color: "var(--pale-blue)"
draft: false
---

# Lời mở đầu

Trong những bài trước, chúng ta đã nhắc tới Game Mechanic, phân tích game qua mô hình MDA. Sau đó, chúng ta học cách thiết kế nền kinh tế (Macro) và gắn cảm xúc vào những con số (Micro).

Nhưng hình như hệ thống của chúng ta vẫn đang thiếu một mảnh ghép quan trọng nhất: **Người chơi** – những sinh vật bằng xương bằng thịt sẽ trực tiếp trải nghiệm game.

Cảm xúc và hành vi của người chơi nhiều khi giống như một chiếc hộp đen. Làm sao để "thao túng" (hoặc nói mỹ miều hơn là "dẫn dắt") họ đi đúng hướng ta muốn? Tâm lý học hành vi chính là câu trả lời.

# 1. Tâm lý học hành vi: Chó của Pavlov

![Thí nghiệm chó của Pavlov](/images/blogs/GD-Course-5/Untitled.png)

Câu chuyện kinh điển: Pavlov - một nhà sinh vật học - đang thí nghiệm đo lượng nước bọt của chó. Ban đầu, ông chỉ muốn kiểm tra nước bọt thôi. Nhưng rồi sau nhiều lần, ông phát hiện ra con chó bắt đầu chảy dãi ngay từ khi nghe thấy tiếng bước chân của nhân viên phòng lab, dù đồ ăn chưa hề xuất hiện!

Ông thử nghiệm tiếp bằng cách rung chuông trước khi cho ăn (tạo kích thích trung tính). Lâu dần, chỉ cần nghe tiếng chuông, con chó đã chảy dãi. Từ một nhà sinh học vô danh, Pavlov có một pha "quay xe" khét lẹt ở tuổi xế chiều để trở thành huyền thoại của ngành tâm lý học hành vi.

> **Hạn chế:** Phản xạ của con chó hoàn toàn là bị động do ngoại cảnh, không xuất phát từ tự nhận thức. Trong khi đó, người chơi của chúng ta cần **tự nhận thức** và hiểu biết được thứ chúng ta muốn họ làm trong vòng lặp cốt lõi (core loop) của game.

# 2. Skinner Box (Chiếc hộp của Skinner)

Để khắc phục điểm yếu của thí nghiệm Pavlov, Skinner tạo ra phòng thí nghiệm điều khiển (Skinner Box).

![Skinner Box](/images/blogs/GD-Course-5/Untitled%204.png)

Ông nhốt chuột vào một cái hộp có nút bấm (màu xanh). Thay vì dùng kích thích trung tính, ông dùng hệ thống **thưởng và phạt** trực tiếp. Bấm nút -> rớt đồ ăn. Lâu dần, chuột tự ý thức được hành vi bấm nút sẽ mang lại phần thưởng.

Từ đây, nhóm nghiên cứu đã đẻ ra khái niệm **Schedules of Reinforcement (Lịch trình tăng cường hành vi)** để phân tích tần suất rơi đồ ăn ảnh hưởng thế nào đến độ "nghiện" bấm nút của chuột.

![Schedules of Reinforcement](/images/blogs/GD-Course-5/Untitled%205.png)

Có 4 kiểu lịch trình đáng chú ý:

## A. Tỷ lệ cố định (Fixed Ratio)
Chuột phải bấm đúng N lần mới rớt đồ ăn.
- *Trong Game*: Dòng game Clicker (bấm mỏi tay mới nổ tiền), hoặc game MMORPG (Giết đúng 10 con quái để lên 1 Level). Lịch trình này dễ đoán, ổn định.

![Earth Clicker](/images/blogs/GD-Course-5/Untitled%206.png)

## B. Tỷ lệ thay đổi (Variable Ratio)
Số lần bấm để rớt đồ ăn là ngẫu nhiên, nhưng trung bình lại thì vẫn bằng Fixed Ratio (Kỳ vọng toán học không đổi).
- *Thực tế*: Xin chào cờ bạc, **Slot Machine** và **Gacha**! Thỉnh thoảng người chơi sẽ trúng quả đậm (SSR). Việc không biết trước khi nào trúng thưởng khiến não tiết ra dopamine cực mạnh.

![Slot Machine](/images/blogs/GD-Course-5/download.jpg)

- *Ngoài lề*: App hẹn hò **Tinder** cũng dùng cơ chế này. Việc quẹt trái quẹt phải rất dễ, bạn quẹt liên tục vì không biết profile thú vị (người match) tiếp theo khi nào sẽ xuất hiện. Cực kỳ gây nghiện!

![Tinder](/images/blogs/GD-Course-5/download%201.jpg)

## C. Thời gian cố định (Fixed Interval) & Thay đổi (Variable Interval)
Phần thưởng không phụ thuộc vào số lần bấm, mà phụ thuộc vào khoảng nghỉ thời gian (đợi 5 phút mới được bấm nút tiếp). Thường áp dụng trong các cơ chế chờ hồi thể lực, thu hoạch nông sản. (Lưu ý là con người hay con vật đều không có đồng hồ chính xác trong não, thói quen hình thành nhờ cảm giác về thời gian).

*Việc lạm dụng Skinner Box trong game có thể khiến người chơi bị phụ thuộc vào phần thưởng ảo (Extrinsic), làm mất đi niềm vui thuần túy (Intrinsic).*

# 3. Động lực của người chơi (Player Motivation)

Tại sao người ta lại chơi game? Dựa trên nền tảng MUD (Multi User Dungeon), nhà nghiên cứu Richard Bartle đã chia người chơi làm 4 loại (Mô hình Bartle):

![Mô hình Bartle](/images/blogs/GD-Course-5/Untitled%207.png)

1. **Achievers (Người chinh phục)**: Tương tác với thế giới game để hoàn thành nhiệm vụ, thu thập danh hiệu, cày top.
2. **Explorers (Người khám phá)**: Thích khám phá ngóc ngách, tìm easter eggs, bẻ khóa cơ chế.
3. **Socialisers (Người giao tiếp)**: Tương tác với người khác, kết bạn, chat chit, thả thính.
4. **Killers (Sát thủ)**: Tương tác lên người khác theo kiểu... tiêu diệt họ. Tìm kiếm niềm vui qua việc hạ gục đối thủ (PvP).

Ngoài Bartle (vốn có điểm yếu là không áp dụng được cho game Single Player), chúng ta còn có các mô hình khác:

- **Quantic Foundation**:
![Quantic](/images/blogs/GD-Course-5/Untitled%208.png)

- **Big 5 OCEAN (CANOE)**: Xếp người chơi trên một phân bố xác suất chứ không phân cực rõ ràng.
![Big 5 OCEAN](/images/blogs/GD-Course-5/Untitled%209.png)

# 4. Thuyết Tự Quyết (Self Determination Theory - SDT)

![SDT](/images/blogs/GD-Course-5/maxresdefault.jpg)

Đây là thuyết giải thích động lực mạnh mẽ nhất khiến con người đưa ra quyết định. Thuyết này chia giá trị hành động làm 2 loại:
- **Intrinsic (Giá trị nội tại)**: Tự nguyện làm vì thấy vui, thỏa mãn, làm chủ.
- **Extrinsic (Giá trị bên ngoài)**: Bị ép làm vì có thưởng hoặc sợ bị phạt.

Trong game, mục tiêu của Game Designer là dùng một chút Extrinsic ban đầu (nhử mồi bằng phần thưởng) để mồi chài, rồi dần dần chuyển hóa hành động đó thành Intrinsic. Khi đó hành động chơi game sẽ bền vững hơn rất nhiều!

Để kích hoạt Intrinsic, game cần đáp ứng đủ 3 yếu tố:
- **Autonomy (Quyền tự quyết)**: Người chơi cảm thấy họ làm chủ quyết định của mình và quyết định đó ảnh hưởng lớn tới kết quả (Meaningful Choice ở Bài 1).
- **Competence (Năng lực)**: Người chơi cảm thấy mình đang học được kỹ năng mới (không chỉ là thông số nhân vật tăng lên, mà là kỹ năng timing, phản xạ ngoài đời thực của họ cũng tốt lên). Game phải ghi nhận điều đó.
- **Relatedness (Sự kết nối)**: Quyết định phải có tác động rõ rệt tới thế giới game và tiến trình của bản thân họ.

# Kết luận

Làm game thực chất là làm tâm lý học. Hiểu được lúc nào nên "nhử mồi" bằng phần thưởng, lúc nào nên trao "quyền tự quyết" sẽ giúp bạn tạo ra một tựa game sống mãi trong lòng người chơi. 

Và sau khi làm xong một hệ thống hoàn hảo (trong suy nghĩ của bạn), bạn phải mang nó đi cho người khác chơi thử để kiểm chứng... Hẹn gặp lại ở bài sau - cơn ác mộng mang tên: Playtest!
