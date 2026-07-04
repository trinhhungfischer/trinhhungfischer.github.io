---
title: "[GD Course] Bài 1: Nhập môn Game Design - Thế nào là một quyết định thú vị?"
date: "2026-07-03"
category: "Course"
excerpt: "Khởi đầu chuỗi bài học Game Design, chúng ta cùng bàn về câu hỏi cốt lõi: Game là gì? Và làm thế nào để tạo ra một 'Meaningful Choice' cho người chơi."
color: "var(--pale-blue)"
draft: false
---

# Lời mở đầu

Xin chào, đây là bài viết đầu tiên trong series tổng hợp lại chương trình đào tạo Game Design do Mr. Nhật dạy và công ty Zitga tổ chức nha. Dĩ nhiên, nội dung trong này cũng có pha trộn thêm quan điểm và góc nhìn của chính bản thân mình sau một thời gian làm nghề thực tế nữa. 

Vào việc luôn nhé!

# 1. Game là gì?

![Game là gì?](/images/blogs/GD-Course-1/download.jpg)

## Quan điểm của mình?

> Game là bao gồm hệ thống cơ chế (mechanic) nhằm đem lại trải nghiệm cho người chơi - HungTQ.

Vậy Game Mechanic là bất kỳ thứ gì trong trò chơi (Cách đồ họa hiển thị, FX chạy, Sound xuất hiện như thế nào) mang lại phản hồi tích cực cho người chơi. Phản hồi tích cực không phải lúc nào cũng là những cảm xúc vui vẻ. Nó có nghĩa là những phản hồi có tác động mạnh, nhiều tác động tới cảm xúc và trải nghiệm của người chơi trong suốt quá trình chơi.

## Một số quan điểm khác

> Game are series of interesting decisions - Sid Meier

Theo bác Sid Meier (cha đẻ của franchise game chiến thuật theo lượt nổi tiếng Civilization - mà tôi rất thích nha), Game là một chuỗi các quyết định thú vị. Tuy không cần phải tất cả đều là "fun decision" nhưng bắt buộc phải có.

Game mục đích là gì? Game mang lại niềm vui hay **Game ⇒ Vui**.
Nhưng vui là gì? Vui được định nghĩa như thế nào? Thật sự niềm vui rất khó để định nghĩa, cũng như cách tạo ra niềm vui cũng thế.

Koster, Raph có trích một quan điểm về niềm vui trong cuốn sách Theory of Fun của ông: 
> *"Fun is an emotional response to learning"*. 

Niềm vui là cảm giác được học, tìm tòi những thứ mới mẻ. Con người chúng ta có lẽ luôn thích thú tìm hiểu, thách thức bản thân để học hỏi thêm.

## Thiết kế game sẽ làm gì?

Bạn hãy so sánh 3 khái niệm này thử xem:
1. **Viết**: Bạn ngồi vào bàn phím, hoặc trên bàn với cây viết, ghi ra những thứ cần phải ghi. Đó là viết, đến một con khỉ cũng có thể viết nếu được hướng dẫn.
2. **Sáng tạo**: Bạn ngồi và nghĩ những thứ không giống ai, có thể là những ý tưởng khùng điên cũng có thể gọi là sáng tạo. Những ý nghĩ đấy thật sự có thể chả có mục đích gì, đơn giản vì bạn thích... Ví dụ: Nghĩ cảnh con khỉ đánh bom hạt nhân vào New York chả hạn. 
3. **Thiết kế**: Bạn cần suy nghĩ, sáng tạo, tạo ra những mảnh ghép cho một thứ gì đó với **mục đích cụ thể**. Ví dụ: bạn thiết kế ra cái cửa để có thể đi ra đi vô. 

Do đó, không ai gọi công việc này là Viết Game hay Sáng tạo Game cả, mà họ gọi là Thiết kế game. Chúng ta nghĩ ra những mechanic trong Game đảm bảo chúng được đưa vào game với mục đích cụ thể. 

Theo như chúng ta nói ở trên, có lẽ Thiết kế game là thiết kế những Mechanic trong Game để chúng có thể mang lại niềm vui!

# 2. Meaningful Choice (Lựa chọn ý nghĩa)

Tôi muốn nhắc lại quan điểm của Sid Meier:
> Game are series of interesting decisions

Nếu suy nghĩ theo cách này thì:
> Your life just is a long game.

Bạn thử nghĩ xem, từ lúc thức dậy tới giờ bạn đã đưa ra bao nhiêu quyết định rồi? Và quyết định nào đã đưa bạn tới dòng đọc này? Cuộc đời là một chuỗi các quyết định và một quyết định tình cờ nào đó đã đưa tôi tới công việc này.

Vậy quyết định là gì? Một quyết định được tạo thành bởi các yếu tố sau:
- **Before**: Ngữ cảnh trước khi người chơi đưa ra lựa chọn (Game state) hay trạng thái hiện tại là gì?
- **Communication**: Người chơi biết cách tương tác với Game State. Người chơi biết lựa chọn của mình sẽ ảnh hưởng những gì.
- **Action**: Hành động người chơi thực hiện.
- **Consequence (Hệ quả)**: Hệ quả ngay lập tức của hành động tác động lên Game State.
- **Feedback (Phản hồi)**: Làm cho người chơi nhận biết và cảm thấy được consequence trên. Kết quả ảnh hưởng thế nào lên nhận thức của người chơi?

Các định nghĩa trên nghe khá khó hiểu, nhưng hãy đến với một ví dụ:

![Cá sấu cắn tay](/images/blogs/GD-Course-1/Untitled.png)

Chắc bạn biết trò chơi trên rồi nhỉ, đơn giản thì nhóm bạn cùng nhau bấm vào răng con cá sấu nếu bị nó cắn tức bạn thua.
Chúng ta cùng phân tích một quyết định của trò chơi này:
- **Before**: Giả sử hiện tại cá sấu chỉ còn 2 răng nữa. Game state ở đây chính là cá sấu còn hai răng.
- **Communication**: Người chơi thấy được trạng thái này rất kịch tính và hồi hộp vì thắng thua giờ là 50%. Người chơi đã kết nối với Game State và biết cách tương tác bằng cách bấm 1 trong 2 chiếc răng.
- **Action**: Người chơi bấm 1 chiếc răng.
- **Consequence**: Hệ quả ngay lập tức có thể là con cá sấu sẽ không cắn xuống.
- **Feedback**: Răng cá sấu lún xuống. Phản hồi tới người chơi là vui vẻ, hạnh phúc vì may mắn không thua. Đồng thời biết mình chắc chắn thắng do chỉ còn một chiếc răng cho người kế tiếp bấm.

**Possibility Space (Không gian khả năng/lựa chọn)**: là những lựa chọn của người chơi có thể làm trong một trường hợp cụ thể. Trong thiết kế game, chúng ta luôn mong muốn không gian lựa chọn này luôn lớn hơn hoặc bằng 2.

Từ đây chúng ta bắt đầu nói về những lựa chọn như thế nào là thú vị? 
Cũng khó để định nghĩa chính xác thế nào là một lựa chọn thú vị. Nhưng sẽ có những lựa chọn không thú vị mà chúng ta không muốn có trong Game của mình.

## Những lựa chọn kém thú vị ???

### 1. Obvious Decision (Lựa chọn hiển nhiên)
Lựa chọn hiển nhiên là những lựa chọn mà người chơi buộc phải thực hiện nếu không muốn một kết quả tồi tệ. 

![Tic Tac Toe](/images/blogs/GD-Course-1/Untitled%201.png)

Ví dụ trong Game Tic Tac Toe, tôi là người chơi X và đi trước. 

![Nước đi chính giữa là lựa chọn hiển nhiên](/images/blogs/GD-Course-1/Untitled%202.png)

Ở nước đi đầu tiên, đi X tại chính giữa là cách duy nhất giúp Game không đi đến kết quả hòa (Có thể thắng nhờ đi trước). Quyết định này tưởng gồm 9 lựa chọn (Không gian lựa chọn là 9) nhưng thật sự chỉ có nước đi chính giữa là tối ưu. Hiển nhiên người đi trước sẽ luôn chọn nước đi này. Điều đó dẫn tới một lựa chọn không thú vị.

**Nguyên nhân do đâu?**
- Không gian lựa chọn quá ít? -> Tăng lên (chơi 5x5 thay vì 3x3).
- Lựa chọn tốt quá ít? -> Tăng lựa chọn tốt lên.

*Nghịch lý: Con người luôn muốn kiểm soát kết quả của lựa chọn, nhưng lại không thích những kết quả quá dễ hay quá hiển nhiên.* Kiểu bạn đánh bạc mà lúc nào cũng biết mình thắng thì sẽ nhanh chán thôi.

### 2. Blind Decision (Quyết định mù quáng)
Người đưa ra lựa chọn không có bất kỳ cơ sở nào, hoặc không hiểu hệ quả có thể xảy ra là gì.
**Nguyên nhân:** Before và Communication quá tệ, hoặc không gian quyết định quá lớn.
> Khi người chơi nói rằng: “Tôi chọn bừa” tức đó là một quyết định mù - Mr. Nhật.

### 3. Meaningless Decision (Quyết định vô nghĩa)
Lựa chọn không có ý nghĩa. Người ta gọi đó là **"But Thou Must"** trong các dòng game RPG.

![But Thou Must](/images/blogs/GD-Course-1/Untitled%203.png)

*Will you take the princess with you?*
*Yes: Wonderful, you must leave right away!*
*No: But thou must!*

Cách giải quyết cho mấy cái lựa chọn vô tri này là bỏ luôn đi cho rảnh nợ =))

### 4. Handcuffing Mechanics
Đây là cơ chế làm giảm bớt lựa chọn của người chơi.
Ví dụ: Lá bài Cấm trong UNO, hay bị Chiếu tướng trong Cờ Vua. Người chơi bị chiếu sẽ bị giảm đi rất nhiều lựa chọn về các nước đi tiếp theo vì phải lo cứu Vua trước.

## Vậy thế nào là lựa chọn thú vị hơn?

### Trade-off (Sự đánh đổi)

![Trò chơi Reign](/images/blogs/GD-Course-1/Untitled%204.png)

Người chơi chọn đánh đổi một thứ trong Game để đạt được một thứ khác. (Như trong trò Reign).

### Risk/Reward (Push your luck)
> Liều thì ăn nhiều.

Bạn phải chịu một rủi ro nào đó tương đương với phần thưởng nhận được.
Ví dụ: Cầm khẩu Operator (AWP) trong Valorant, trượt là toang nhưng trúng là one-hit.

Cơ chế "Push your luck" cực kỳ phổ biến trong board game casual vì tính đơn giản và fun. Người chơi có thể đi tiếp để tích điểm hoặc dừng lại. Nhưng lỡ đi tiếp mà dính rủi ro là mất trắng. Cơ chế này tạo ra sự căng thẳng và cân bằng giữa may rủi và quyết định của người chơi.

# 3. Meaningful Action & Flow

Hành động ý nghĩa là hành động có thể ảnh hưởng tới Game State. Người chơi cảm thấy ý nghĩa của việc học thêm hành động mới mang lại niềm vui.

Khi thiết kế Game, chúng ta cần xác định **Core Action** là gì. 
Ví dụ: Game khủng long mất mạng, Core action chỉ là "Nhảy lên" (và cúi xuống). Game muốn thử thách kỹ năng timing và phản xạ. Nếu kĩ năng đã đủ tốt, game sẽ tăng tốc độ để duy trì thử thách.

Khi mức độ tương quan giữa kĩ năng và độ khó của game đạt mức cân bằng, chúng ta đạt được **trạng thái Flow**.

![Trạng thái Flow](/images/blogs/GD-Course-1/Untitled%205.png)

> Flow là trạng thái người chơi nhập tâm vào game đến mức gần như quên đi thời gian - Mr.Nhật.

Làm sao để đưa người chơi vào Flow?
1. Người chơi cần tham gia với mục tiêu rõ ràng và cụ thể.
2. Phản hồi phải rõ ràng và ngay lập tức.
3. Việc cần làm không quá khó cũng không quá dễ (Nói thì dễ làm mới khó lmao).

# 4. Random vs Skill

![Cân bằng Random và Skill](/images/blogs/GD-Course-1/Untitled%206.png)

Chúng ta làm Game luôn mong muốn thả được con lắc thăng bằng tại điểm gần chính giữa nhất nhằm cân bằng giữa yếu tố ngẫu nhiên (Random) và Kỹ năng (Skill) trong Game.

Hy vọng bài viết đầu tiên này đã giúp bạn hình dung được giá trị của một quyết định trong việc thiết kế trải nghiệm. Hẹn gặp lại ở bài viết sau, chúng ta sẽ phân tích game qua lăng kính của mô hình MDA nhé!
