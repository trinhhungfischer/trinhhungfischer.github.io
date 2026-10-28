---
title: "Ba ảo tưởng xác suất: trùng ngày sinh, đồng xu giả và chữ số đầu tiên"
date: "2026-10-28"
category: "Game Design"
tags: "Math"
excerpt: "23 người là đủ để có một cặp trùng ngày sinh, một giáo sư nhìn bài tập là biết ai tung đồng xu giả, và chữ số 1 đứng đầu gần một phần ba mọi con số. Ba ảo tưởng, ba cách trực giác của chúng ta đếm sai."
color: "var(--pale-blue)"
---

Ở [bài trước](/blog/Bertrand-Paradox), mình nói về chuyện chữ "ngẫu nhiên" cần đi kèm một không gian mẫu. Bài này đi theo hướng ngược lại: ngay cả khi không gian mẫu đã rõ ràng, trực giác của chúng ta vẫn đoán sai, và sai theo những cách **rất có hệ thống**.

Dưới đây là ba ví dụ, mỗi cái sai theo một kiểu:

- **Trùng ngày sinh:** ta đếm sai thứ cần đếm.
- **Đồng xu giả:** ta tưởng tượng sai ngẫu nhiên trông như thế nào.
- **Định luật Benford:** ta nghĩ theo đường thẳng, còn thế giới tăng theo cấp số nhân.

## I. Nghịch lý ngày sinh: trực giác đếm sai

### 1. Câu hỏi

> Cần bao nhiêu người trong một căn phòng để xác suất **có hai người trùng ngày sinh** vượt quá 50%?

Hầu hết mọi người đoán một con số quanh 180, tức khoảng một nửa của 365. Đáp án thật là **23**.

| Số người | Xác suất có ít nhất một cặp trùng |
|---|---|
| 10 | 11,7% |
| 23 | **50,7%** |
| 30 | 70,6% |
| 50 | 97,0% |
| 70 | 99,9% |

Muốn **chắc chắn 100%** thì cần 366 người (nguyên lý chuồng bồ câu). Nhưng chỉ với 70 người, khả năng *không* có ai trùng đã nhỏ hơn 1 phần nghìn.

### 2. Vì sao lại ít thế?

Vì ta đếm nhầm thứ cần đếm. Trực giác nghĩ theo **số người**, nhưng sự trùng lặp xảy ra giữa **các cặp**. Với 23 người, số cặp là:

$$
\binom{23}{2} = \frac{23 \cdot 22}{2} = 253
$$

253 cặp, mỗi cặp có $\frac{1}{365}$ khả năng trùng. Nhiều cơ hội như vậy thì việc có ít nhất một cặp trùng không còn bất ngờ nữa.

Cách tính chính xác là đi qua **biến cố bù**: tính xác suất *không ai trùng ai*. Người thứ nhất chọn ngày tùy ý, người thứ hai phải tránh 1 ngày, người thứ ba tránh 2 ngày, và cứ thế:

$$
P(\text{không ai trùng}) = \frac{365}{365} \cdot \frac{364}{365} \cdot \frac{363}{365} \cdots \frac{365 - n + 1}{365}
$$

$$
P(\text{có cặp trùng}) = 1 - P(\text{không ai trùng})
$$

Với $n = 23$, tích trên bằng khoảng $0{,}493$, nên xác suất có cặp trùng là $0{,}507$.

### 3. Hai câu hỏi trông giống nhau

Có một giai thoại thường được kể về Johnny Carson, người dẫn chương trình *The Tonight Show*. Khi nghe khách mời giải thích nghịch lý này, ông quay xuống hỏi khán giả xem có ai sinh **cùng ngày với ông** không. Không có ai, và ông kết luận lý thuyết sai.

Thật ra ông đã đổi câu hỏi:

- *"Có hai người **bất kỳ** trùng ngày sinh không?"* Mọi cặp đều được tính, nên 23 người là đủ cho 50%.
- *"Có ai trùng ngày sinh **với tôi** không?"* Chỉ có $n - 1$ cặp có liên quan tới bạn. Để đạt 50% cần tới **253 người khác** trong phòng.

Cùng một chữ "trùng", hai câu hỏi khác nhau hơn mười lần.

### 4. Một thí nghiệm có sẵn: World Cup

Mỗi đội tuyển ở World Cup đăng ký đúng **23 cầu thủ**, nên mỗi giải là một thí nghiệm nghịch lý ngày sinh với 32 nhóm. Năm 2014, BBC lấy danh sách chính thức của FIFA và đếm: **16 trên 32 đội** có ít nhất một cặp cầu thủ trùng ngày sinh, đúng một nửa. Năm đội trong số đó còn có tới hai cặp trùng.

### 5. Trong làm game: mã phòng và ID ngẫu nhiên

Nghịch lý này không chỉ để đố vui. Trong mật mã học có hẳn một kỹ thuật tên là **birthday attack**: tìm hai dữ liệu khác nhau có cùng mã băm. Với một hàm băm có $N$ giá trị, chỉ cần khoảng $\sqrt{N}$ lần thử là đã có 50% khả năng va chạm, chứ không phải $N/2$ như trực giác.

Với dev game, phiên bản gần gũi nhất là **mã phòng**. Giả sử game sinh mã phòng ngẫu nhiên gồm 4 chữ cái in hoa. Số mã có thể có là $26^4 = 456.976$, nghe rất nhiều. Nhưng theo nghịch lý ngày sinh, chỉ cần khoảng

$$
1{,}18 \cdot \sqrt{456.976} \approx 800
$$

phòng đang mở cùng lúc là đã có 50% khả năng hai phòng trùng mã. Một tựa game nhỏ cũng dễ dàng có 800 phòng mở vào giờ cao điểm. Vì vậy, ID ngẫu nhiên lúc nào cũng cần một bước kiểm tra trùng, hoặc phải đủ dài để $\sqrt{N}$ vẫn là một con số khổng lồ.

## II. "Tôi biết bạn gian lận khi tung đồng xu"

### 1. Thí nghiệm của giáo sư Hill

Theodore Hill, giáo sư toán ở Georgia Tech, hay giao cho sinh viên một bài tập về nhà: hoặc tung một đồng xu **200 lần** và ghi lại kết quả, hoặc **tự bịa** ra 200 kết quả. Hôm sau, ông lướt qua các bài nộp và chỉ ra gần như chính xác ai đã bịa.

Theo những gì thường được kể lại, mẹo của ông rất đơn giản: tìm một **chuỗi 6 lần liên tiếp cùng một mặt**. Người bịa kết quả gần như không bao giờ dám viết 6 mặt ngửa liền nhau, vì "trông nó không ngẫu nhiên". Trong khi đó, với 200 lần tung thật, xác suất xuất hiện một chuỗi như vậy là khoảng **96,5%**.

### 2. Ngẫu nhiên thật thì "vón cục"

Khi tự viết một chuỗi ngẫu nhiên, ta thường mắc hai lỗi:

- **Tránh chuỗi dài.** Viết được ba chữ S liền nhau là ta bắt đầu thấy bất an và vội đổi sang N.
- **Đổi mặt quá nhiều.** Với đồng xu thật, mỗi lần tung có đúng 50% khả năng đổi mặt so với lần trước. Người bịa thường đổi tới 60–70%, vì họ muốn chuỗi trông "đều đặn".

Nói cách khác, chúng ta không viết ra một chuỗi ngẫu nhiên, mà viết ra một chuỗi **trông có vẻ cân bằng**. Hai thứ đó khác nhau.

### 3. Đến lượt bạn

Hãy thử đánh lừa máy. Gõ **50 kết quả** tung đồng xu do bạn tự nghĩ ra (S = sấp, N = ngửa) vào ô dưới đây, cố gắng viết cho thật "ngẫu nhiên". Máy sẽ nhìn ba thứ:

- **Chuỗi dài nhất.** Với 50 lần tung thật, có 98% khả năng xuất hiện một chuỗi từ 4 trở lên và 82% khả năng có chuỗi từ 5 trở lên.
- **Số lần đổi mặt** trên 49 cặp liền nhau. Trung bình là 24,5. Đổi từ 33 lần trở lên chỉ xảy ra với khoảng 1% chuỗi thật.
- **Số mặt S và N** có lệch quá xa nhau không.

Sau đó, bấm "Tung thật 50 lần" vài lần để xem một chuỗi ngẫu nhiên thật trông "vô lý" đến mức nào.

<coin-faker>
</coin-faker>

Máy không đọc được suy nghĩ. Nó chỉ biết rằng một số đặc điểm rất hiếm khi xuất hiện ở đồng xu thật, và rất thường gặp ở người. Vì là xác suất, máy cũng có lúc nghi oan: cứ khoảng 25 chuỗi tung thật thì có 1 chuỗi bị gắn nhãn "tự viết". Một người hiểu rõ những đặc điểm này hoàn toàn có thể qua mặt nó. Nhưng chính việc *phải cố tình* viết ra chuỗi 5–6 mặt liền nhau mới thấy trực giác của chúng ta lệch xa ngẫu nhiên đến đâu.

### 4. Mặt trái: ngụy biện con bạc

Ảo tưởng "ngẫu nhiên thì phải đổi mặt" có một người anh em nổi tiếng hơn: **ngụy biện con bạc** (gambler's fallacy), niềm tin rằng sau một chuỗi dài, kết quả ngược lại "sắp phải đến".

Ngày 18 tháng 8 năm 1913, ở sòng bạc Monte Carlo, viên bi roulette rơi vào ô **đen 26 lần liên tiếp**. Từ khoảng lần thứ 15, người chơi bắt đầu dồn tiền vào màu đỏ, càng lúc càng nhiều, vì tin rằng "không thể ra đen mãi được". Sòng bạc thu về hàng triệu franc đêm đó.

Viên bi không có trí nhớ. Lần quay thứ 27 vẫn có xác suất ra đen như mọi lần quay khác.

Cũng cần nói thêm: xác suất để có 26 lần đen liên tiếp *bắt đầu từ một lần quay cụ thể* là cực nhỏ. Nhưng trên hàng triệu lượt quay ở mọi sòng bạc trong hàng trăm năm, chuyện như vậy *sẽ* xảy ra ở đâu đó. Chuỗi dài không phải là dấu hiệu bất thường, mà là một phần bình thường của ngẫu nhiên.

### 5. Khi ngẫu nhiên thật bị chê là "không ngẫu nhiên"

Chuyện ngược lại cũng xảy ra. Khi iPod mới ra, người dùng liên tục phàn nàn rằng chế độ shuffle "bị lỗi", vì nó hay phát hai bài cùng một ca sĩ liền nhau. Nó không lỗi gì cả: đó là ngẫu nhiên thật, và ngẫu nhiên thật thì có cụm. Năm 2005, Apple thêm vào iTunes tính năng *Smart Shuffle* để giảm khả năng các bài cùng ca sĩ hay cùng album đứng cạnh nhau. Tức là họ phải làm cho nó **bớt ngẫu nhiên đi** thì người dùng mới thấy nó ngẫu nhiên.

Spotify gặp đúng vấn đề này. Năm 2014, đội kỹ sư của họ viết một bài blog giải thích cách họ đổi thuật toán shuffle: rải đều các bài của cùng một nghệ sĩ ra khắp danh sách, thay vì xáo trộn hoàn toàn ngẫu nhiên.

### 6. Bài học cho game designer: "1% thì quay 100 lần chắc ra"

Người chơi mang đúng những ảo tưởng này vào game. Câu hay gặp nhất là: *"Tỉ lệ ra là 1%, vậy quay 100 lần là chắc chắn có."*

Không phải vậy. Xác suất ra **ít nhất một lần** sau 100 lượt quay là:

$$
1 - 0{,}99^{100} \approx 63{,}4\%
$$

Cứ khoảng 3 người quay 100 lần thì có hơn 1 người tay trắng. Sau **300 lượt**, vẫn còn khoảng **5%** người chơi chưa ra gì. Trong một game có một triệu người chơi, đó là năm mươi nghìn người cảm thấy bị lừa, và họ sẽ viết review.

Đây là lý do nhiều game có **pity system**: sau N lượt quay không trúng, lượt tiếp theo được đảm bảo trúng. Hay như Dota 2 dùng **phân phối giả ngẫu nhiên** (pseudo-random distribution) cho các kỹ năng chí mạng: mỗi lần đánh trượt, tỉ lệ ra chí mạng của lần sau tăng lên một chút, và trở về mức thấp sau khi ra. Tỉ lệ trung bình vẫn đúng như công bố, nhưng chuỗi trượt dài và chuỗi trúng liên tiếp đều hiếm hơn nhiều.

Sid Meier, cha đẻ của Civilization, từng kể trong một bài nói ở GDC 2010 rằng người chơi cảm thấy bị "ăn gian" khi tỉ lệ thắng 3:1 mà họ vẫn thua. Đội làm game cuối cùng phải ngầm chỉnh cho kết quả nghiêng về phía người chơi.

Nhiệm vụ của game designer không phải là tạo ra ngẫu nhiên đúng nghĩa toán học, mà là tạo ra ngẫu nhiên **mà người chơi cảm thấy công bằng**. Hai thứ đó, như cả phần này đã cho thấy, không giống nhau.

## III. Định luật Benford: chữ số 1 ở khắp nơi

### 1. Những trang sách bị mòn

Năm 1881, nhà thiên văn Simon Newcomb để ý một chuyện lạ trong thư viện: ở những cuốn bảng logarit (thứ các nhà khoa học dùng để tính toán trước khi có máy tính), **những trang đầu bị mòn và bẩn hơn hẳn những trang sau**. Những trang đầu là trang tra các số bắt đầu bằng chữ số 1. Có vẻ như người ta tra các số bắt đầu bằng 1 nhiều hơn các số bắt đầu bằng 9.

Newcomb viết một bài báo ngắn và đưa ra công thức, nhưng không ai để ý. Năm 1938, kỹ sư Frank Benford ở General Electric phát hiện lại hiện tượng này và kiểm chứng nó trên hơn **20.000 con số** từ 20 nguồn khác nhau: diện tích sông hồ, dân số các thành phố, hằng số vật lý, số nhà trên đường phố... Định luật mang tên ông từ đó.

### 2. Định luật

Trong rất nhiều tập số liệu thực tế, xác suất để một con số bắt đầu bằng chữ số $d$ là:

$$
P(d) = \log_{10}\left(1 + \frac{1}{d}\right)
$$

| Chữ số đầu | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|
| Tỉ lệ | **30,1%** | 17,6% | 12,5% | 9,7% | 7,9% | 6,7% | 5,8% | 5,1% | 4,6% |

Chữ số 1 đứng đầu gần **một phần ba** mọi con số, nhiều gấp hơn sáu lần chữ số 9. Trực giác thì nói mỗi chữ số phải chiếm khoảng 11%.

### 3. Vì sao?

Có hai cách nhìn, và cả hai đều đẹp.

**Cách thứ nhất: tăng trưởng theo cấp số nhân.** Hãy tưởng tượng một thị trấn có 1.000 dân, mỗi năm tăng 10%. Để đi từ 1.000 lên 2.000 (chữ số đầu là 1), dân số phải **tăng gấp đôi**, mất khoảng 7 năm. Nhưng để đi từ 9.000 lên 10.000 (chữ số đầu là 9), chỉ cần tăng thêm khoảng 11%, mất chưa đến 1,5 năm. Thứ gì tăng theo tỉ lệ phần trăm sẽ "dừng chân" ở chữ số 1 lâu hơn rất nhiều.

**Cách thứ hai: không phụ thuộc đơn vị.** Nếu có một quy luật chung cho chữ số đầu của, ví dụ, diện tích các con sông, thì quy luật đó không được phép thay đổi khi ta đổi từ km² sang dặm vuông. Năm 1961, Roger Pinkham chứng minh rằng phân phối duy nhất thỏa mãn điều này chính là phân phối Benford.

Nghe quen không? Đây đúng là tinh thần của lời giải Jaynes cho nghịch lý Bertrand ở bài trước: khi đáp án không được phép phụ thuộc vào một thứ ta không biết (vị trí hình tròn, hay đơn vị đo), tính đối xứng sẽ tự chọn ra một phân phối duy nhất.

### 4. Tự thử

Chọn một tập dữ liệu và so sánh với đường lý thuyết màu cam. Lũy thừa của 2, dãy Fibonacci hay dân số thị trấn tăng trưởng ngẫu nhiên đều khớp gần như hoàn hảo. Số chọn đều từ 1 đến 9999 thì không.

Ở tab **"Số của bạn"**, hãy dán vào bất kỳ dãy số nào bạn có: lịch sử giao dịch ngân hàng, giá sản phẩm trong một cửa hàng, số vàng của người chơi trong game của bạn... Chỉ số MAD dùng thang đánh giá của Mark Nigrini, người đã đưa Benford vào kiểm toán.

<benford-law>
</benford-law>

### 5. Bắt kẻ gian bằng chữ số đầu

Vì con người không tự nhiên nghĩ ra số theo Benford, định luật này trở thành công cụ của các kiểm toán viên.

**Vụ Wayne Nelson ở Arizona (1993).** Nelson, một quản lý trong văn phòng Thủ quỹ bang Arizona, viết 23 tấm séc chuyển gần **2 triệu đô** cho một nhà cung cấp không có thật. Khi bị phát hiện, ông ta biện hộ rằng mình chỉ đang thử nghiệm xem hệ thống máy tính mới có lỗ hổng không. Mark Nigrini phân tích 23 tấm séc và thấy hơn **90%** số tiền bắt đầu bằng 7, 8 hoặc 9. Phần lớn là những con số ngay dưới mức 100.000 đô, ngưỡng cần thêm người duyệt. Đó là dấu vân tay của một người cố tình chọn số, và Nelson bị kết án.

**Số liệu kinh tế của Hy Lạp.** Năm 2011, nhóm của Bernhard Rauch kiểm tra số liệu kinh tế vĩ mô mà các nước EU báo cáo cho Eurostat (những con số liên quan tới trần thâm hụt ngân sách). Trong cả khối euro, số liệu của **Hy Lạp lệch khỏi Benford nhiều nhất**. Đây cũng chính là quốc gia sau đó thừa nhận đã báo cáo sai số liệu thâm hụt trong nhiều năm.

### 6. Khi nào Benford *không* dùng được

Benford rất mạnh, nhưng cũng rất hay bị dùng sai. Nó chỉ áp dụng cho dữ liệu trải dài qua **nhiều bậc độ lớn** và hình thành một cách "tự nhiên":

- **Số trong một khoảng hẹp** thì không theo Benford: chiều cao người lớn (gần như toàn bắt đầu bằng 1), điểm thi, tuổi.
- **Số do con người đặt ra** thì không theo Benford: giá kiểu 99.000đ, số điện thoại, mã bưu chính.
- **Số phiếu bầu theo từng điểm bỏ phiếu** cũng không đáng tin. Các điểm bỏ phiếu thường được chia sao cho có quy mô tương đương nhau, nên số phiếu nằm trong một khoảng hẹp. Mỗi kỳ bầu cử lại có người dùng Benford để "chứng minh" gian lận, nhưng các nhà khoa học chính trị (như Deckert, Myagkov và Ordeshook, 2011) đã chỉ ra rằng phép thử này cho kết quả sai cả theo hai chiều: báo gian lận khi không có, và bỏ sót khi có.

Lệch khỏi Benford là một **lý do để nhìn kỹ hơn**, không phải bằng chứng.

### 7. Trong làm game

Với game có nền kinh tế tăng trưởng (số vàng, sát thương, máu quái theo cấp, giá vật phẩm ở chợ người chơi), các con số thường trải qua nhiều bậc độ lớn và tăng theo cấp số nhân, đúng điều kiện của Benford. Đây là một cách sanity-check rẻ cho dữ liệu analytics: nếu phân phối chữ số đầu của số vàng người chơi đột nhiên lệch hẳn khỏi Benford, có thể có thứ gì đó đáng xem, từ một lỗi trong pipeline dữ liệu đến một nhóm tài khoản đang can thiệp vào nền kinh tế. Tất nhiên, nó chỉ chỉ ra *chỗ cần nhìn*, chứ không thay được việc điều tra.

## IV. Lời kết

Ba ảo tưởng, nhưng có chung một gốc: trực giác của chúng ta được huấn luyện cho một thế giới **tuyến tính và đều đặn**.

- Ta đếm người, trong khi sự trùng lặp đếm theo **cặp**.
- Ta nghĩ ngẫu nhiên là **đều đặn**, trong khi ngẫu nhiên thật thì vón cục.
- Ta nghĩ các chữ số **bình đẳng**, trong khi thế giới tăng trưởng theo **cấp số nhân**.

Tin tốt là những lỗi này có hệ thống, nên có thể học được. Và với người làm game, biết người chơi sẽ cảm nhận sai ở đâu cũng là biết mình cần thiết kế ở đâu.

## Tài liệu tham khảo

- T. P. Hill, "The First Digit Phenomenon", *American Scientist* 86, 358–363 (1998).
- S. Newcomb, "Note on the Frequency of Use of the Different Digits in Natural Numbers", *American Journal of Mathematics* 4, 39–40 (1881).
- F. Benford, "The Law of Anomalous Numbers", *Proceedings of the American Philosophical Society* 78, 551–572 (1938).
- R. S. Pinkham, "On the Distribution of First Significant Digits", *Annals of Mathematical Statistics* 32, 1223–1230 (1961).
- M. J. Nigrini, ["I've Got Your Number"](https://www.journalofaccountancy.com/issues/1999/may/nigrini.html), *Journal of Accountancy* (1999).
- B. Rauch, M. Göttsche, G. Brähler, S. Engel, ["Fact and Fiction in EU-Governmental Economic Data"](https://ideas.repec.org/a/bpj/germec/v12y2011i3p243-255.html), *German Economic Review* 12(3), 243–255 (2011).
- J. Deckert, M. Myagkov, P. C. Ordeshook, "Benford's Law and the Detection of Election Fraud", *Political Analysis* 19(3), 245–268 (2011).
- [Why so many teams at the World Cup have players who share a birthday — Longreads (tóm tắt bài của BBC, 2014)](https://longreads.com/2014/06/16/why-so-many-teams-at-the-world-cup-have-players-who-share-a-birthday/)
- [How to shuffle songs? — Spotify Engineering (2014)](https://engineering.atspotify.com/2014/02/how-to-shuffle-songs)
- [Birthday problem — Wikipedia](https://en.wikipedia.org/wiki/Birthday_problem)
- [Gambler's fallacy — Wikipedia](https://en.wikipedia.org/wiki/Gambler%27s_fallacy)
- [Benford's law — Wikipedia](https://en.wikipedia.org/wiki/Benford%27s_law)
