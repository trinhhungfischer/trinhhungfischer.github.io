---
title: "[Game Theory] Tập 6: Khi không ai biết hết, thông tin là vũ khí"
date: "2026-11-03"
category: "Game Design"
tags: "Game Theory"
excerpt: "Vì sao xe gần như mới bán lại bị mất giá, vì sao tấm bằng đại học có giá trị kể cả khi bạn quên hết kiến thức, và vì sao trong một kiểu đấu giá, trả đúng giá trị thật luôn là lựa chọn tốt nhất."
color: "var(--pale-green)"
draft: true
---

# Giải câu đố Tập 5

Ở cuối [Tập 5](/blog/Game-Theory-5-Tro-Choi-Lap-Lai), mình hỏi: chiếc xe máy mới mua ba tháng, chạy rất tốt, vì sao đem bán lại vẫn bị trả giá thấp hơn hẳn giá xe mới?

Năm 1970, nhà kinh tế học George Akerlof viết một bài báo trả lời đúng câu hỏi này, với cái tên rất đời thường: *The Market for "Lemons"*. Trong tiếng lóng của người Mỹ, "quả chanh" (lemon) là chiếc xe có lỗi mà người mua chỉ phát hiện ra sau khi đã trả tiền. Bài báo bị ba tạp chí từ chối, một phần vì bị cho là quá tầm thường. Ba mươi mốt năm sau, nó mang về cho Akerlof giải Nobel Kinh tế.

Lập luận của Akerlof như sau. Giả sử trên thị trường xe cũ có hai loại xe với số lượng bằng nhau:

| | Người bán chịu bán nếu được ít nhất | Người mua sẵn sàng trả tối đa |
|---|---|---|
| **Xe tốt** | 27 triệu | 30 triệu |
| **Xe lỗi** | 12 triệu | 15 triệu |

Nếu ai cũng nhìn thấy chất lượng xe, mọi chiếc xe đều bán được: xe tốt khoảng 27 đến 30 triệu, xe lỗi khoảng 12 đến 15 triệu.

Nhưng người bán biết xe mình tốt hay lỗi, còn người mua thì **không**. Người mua chỉ biết một nửa số xe ngoài kia là xe lỗi. Vậy họ chỉ sẵn lòng trả theo giá trị trung bình, tính bằng triệu đồng:

$$
\frac{1}{2} \times 30 + \frac{1}{2} \times 15 = 22{,}5
$$

Với giá 22,5 triệu, người có xe tốt (cần ít nhất 27 triệu) không bán nữa. Họ rút khỏi thị trường. Người mua cũng không ngốc: họ hiểu rằng những ai còn chịu bán ở mức giá này đều là chủ xe lỗi. Giá rơi tiếp xuống 15 triệu, và **chỉ còn xe lỗi được mua bán**.

Đó là lý do chiếc xe gần như mới của bạn bị trả giá thấp: người mua không phân biệt được bạn với một người đang muốn tống khứ chiếc xe có vấn đề. Tệ hơn, câu hỏi *"xe tốt thế, sao lại bán?"* tự nó đã là một dấu hiệu đáng ngờ.

Tập này nói về những trò chơi mà mỗi người chơi biết một điều người kia không biết.

## I. Thông tin bất cân xứng

### 1. Lựa chọn ngược

Thị trường xe cũ là ví dụ của **lựa chọn ngược** (adverse selection): khi một bên có thông tin riêng, chính mức giá sẽ "lọc" ra những người tham gia tệ nhất. Hiện tượng này xuất hiện ở rất nhiều nơi:

- **Bảo hiểm sức khỏe:** người biết mình sức khỏe kém là người hăng hái mua bảo hiểm nhất. Nếu công ty bảo hiểm tính phí theo mức trung bình, người khỏe thấy đắt và bỏ đi, phí phải tăng, rồi người khỏe vừa vừa cũng bỏ đi.
- **Cho vay:** ngân hàng tăng lãi suất để bù rủi ro, nhưng người sẵn sàng vay với lãi suất rất cao thường là người có dự án rủi ro nhất.
- **Tuyển dụng:** một công ty trả lương thấp hơn thị trường sẽ dần chỉ giữ lại những người không tìm được chỗ tốt hơn.

Cùng họ với lựa chọn ngược là **rủi ro đạo đức** (moral hazard): thông tin bất cân xứng xuất hiện **sau** khi giao dịch, khi một bên không quan sát được hành động của bên kia. Ví dụ người đã mua bảo hiểm xe thì lái ẩu hơn một chút, vì đằng nào cũng có bảo hiểm.

### 2. Thông tin trong ngôn ngữ trò chơi

Ở các tập trước, mọi người chơi đều biết đầy đủ payoff của nhau. Giờ ta cho phép mỗi người có một **loại** (type) mà chỉ mình họ biết: xe tốt hay xe lỗi, người khỏe hay người yếu, ứng viên giỏi hay ứng viên trung bình. Người chơi khác không thấy loại, chỉ thấy **hành động**, và phải đoán loại từ hành động.

Những trò chơi như vậy gọi là **trò chơi thông tin không đầy đủ** (games of incomplete information). John Harsanyi là người xây dựng cách phân tích chúng vào cuối những năm 1960, và ông chia giải Nobel năm 1994 với Nash và Selten. Hai câu hỏi trung tâm:

- Bên **có** thông tin làm sao để chứng minh mình thuộc loại tốt? Đó là **phát tín hiệu**.
- Bên **không có** thông tin làm sao để buộc bên kia bộc lộ mình? Đó là **sàng lọc**.

## II. Phát tín hiệu và sàng lọc

### 1. Lời nói thì rẻ

Người bán xe tốt có thể nói: *"Xe tôi tốt lắm."* Nhưng người bán xe lỗi cũng nói y hệt. Một lời tuyên bố mà ai cũng nói được, không tốn gì, thì không mang thông tin. Trong lý thuyết trò chơi, những lời như vậy được gọi là **cheap talk**.

Để một tín hiệu có giá trị, nó phải **tốn kém**, và quan trọng hơn: **tốn kém với loại xấu hơn nhiều so với loại tốt**. Khi đó loại xấu không đủ sức bắt chước.

Đây là lời giải cho người bán xe tốt trong câu đố: hãy đề nghị **bảo hành 6 tháng**. Với xe tốt, bảo hành gần như không tốn gì, vì xe sẽ không hỏng. Với xe lỗi, bảo hành nghĩa là phải trả tiền sửa chữa, rất đắt. Người bán xe lỗi không dám đưa ra lời đề nghị đó, nên người mua hiểu rằng ai dám bảo hành thì xe tốt thật. Hóa đơn bảo dưỡng định kỳ, hay sẵn lòng mang xe đi kiểm định ở một gara do người mua chọn, cũng là những tín hiệu cùng loại.

### 2. Tấm bằng đại học

Năm 1973, Michael Spence (chia giải Nobel 2001 với Akerlof và Joseph Stiglitz) đưa ra một mô hình gây tranh cãi về giáo dục. Giả sử, để đơn giản hóa tối đa, việc học đại học **không làm ai giỏi lên cả**. Liệu tấm bằng có còn giá trị không?

Có, nếu việc lấy bằng **dễ hơn** với người vốn đã có năng lực cao: họ học nhanh hơn, ít vất vả hơn, ít phải thi lại hơn. Khi đó:

- Người năng lực cao thấy bỏ ra 4 năm để lấy bằng là đáng, vì được trả lương cao hơn.
- Người năng lực thấp thấy chi phí lấy bằng quá lớn so với phần lương tăng thêm, nên không theo.

Nhà tuyển dụng không cần biết sinh viên học được gì. Họ chỉ cần biết ai **đủ sức** lấy được tấm bằng. Tấm bằng hoạt động như một tín hiệu, giống bảo hành của người bán xe.

Mô hình này không nói giáo dục vô ích. Nó chỉ chỉ ra rằng **một phần** giá trị của tấm bằng có thể đến từ việc phát tín hiệu, chứ không phải từ kiến thức. Điều đó giải thích vì sao nhiều người vẫn đi học thêm một tấm bằng mà họ biết sẽ không dùng tới trong công việc.

### 3. Cái đuôi công

Tự nhiên đã dùng tín hiệu tốn kém từ lâu trước khi các nhà kinh tế phát hiện ra. Con công trống mang một cái đuôi khổng lồ, nặng nề, sặc sỡ, khiến nó chậm chạp và dễ bị thú săn mồi phát hiện. Vì sao chọn lọc tự nhiên lại giữ lại một thứ bất lợi như vậy?

Năm 1975, nhà sinh học Amotz Zahavi đề xuất **nguyên lý khuyết tật** (handicap principle): chính vì cái đuôi gây bất lợi, nên chỉ những con công thật sự khỏe mạnh mới có thể mang nó mà vẫn sống sót. Cái đuôi đẹp là một tín hiệu đáng tin về sức khỏe, đúng vì nó **đắt**. Một con công yếu không thể "làm giả" tín hiệu này.

### 4. Sàng lọc: để người khác tự khai

Bây giờ đứng ở phía không có thông tin. Công ty bảo hiểm không biết khách hàng nào hay ốm. Hỏi thẳng thì ai cũng khai mình khỏe. Họ làm gì?

Họ thiết kế **nhiều gói** để khách hàng **tự chọn**:

- Gói A: phí thấp, nhưng mức khấu trừ cao (bạn tự chịu phần lớn chi phí của những lần khám nhỏ).
- Gói B: phí cao, nhưng gần như mọi chi phí đều được chi trả.

Người biết mình khỏe sẽ chọn gói A, vì họ ít khi phải đi khám. Người biết mình hay ốm sẽ chọn gói B. Bằng việc chọn gói, khách hàng **tự tiết lộ** loại của mình. Đây là ý tưởng **sàng lọc** (screening) của Michael Rothschild và Joseph Stiglitz (1976).

Bạn gặp sàng lọc hằng ngày: vé máy bay giá rẻ không được hoàn, không được đổi, để tách khách du lịch (lên kế hoạch sớm, nhạy cảm với giá) ra khỏi khách công tác (cần linh hoạt, công ty trả tiền). Gói thuê bao theo năm rẻ hơn theo tháng, để tách người dùng trung thành ra khỏi người dùng thử.

## III. Đấu giá

Đấu giá là trò chơi thông tin bất cân xứng thuần khiết nhất: mỗi người biết mình sẵn sàng trả bao nhiêu, nhưng không biết người khác sẵn sàng trả bao nhiêu.

### 1. Bốn kiểu đấu giá

Có bốn kiểu đấu giá kinh điển:

| Kiểu | Cách chơi | Người thắng trả |
|---|---|---|
| **Kiểu Anh** | Công khai, giá tăng dần, ai còn trụ lại cuối cùng thì thắng | Mức giá lúc người thứ hai bỏ cuộc |
| **Kiểu Hà Lan** | Công khai, giá giảm dần, ai hô "lấy" đầu tiên thì thắng | Mức giá lúc hô |
| **Kín, giá thứ nhất** | Mỗi người bỏ một phong bì, giá cao nhất thắng | Giá của chính mình |
| **Kín, giá thứ hai** | Mỗi người bỏ một phong bì, giá cao nhất thắng | Giá cao **thứ hai** |

Kiểu cuối cùng nghe rất lạ: tại sao người thắng lại chỉ phải trả giá của người về nhì? Nhưng nó có một tính chất tuyệt vời mà William Vickrey chỉ ra năm 1961, và là một trong những lý do ông nhận giải Nobel năm 1996.

### 2. Đấu giá Vickrey: trả đúng giá trị thật

Giả sử bạn thấy món đồ đáng giá $v$ với mình. Trong đấu giá kín giá thứ hai, **đặt giá đúng bằng $v$** là chiến lược trội yếu (nhắc lại từ Tập 1: không bao giờ tệ hơn, và có lúc tốt hơn hẳn). Gọi $b$ là giá cao nhất của những người khác.

- **Nếu $b < v$:** đặt giá $v$ thì bạn thắng và trả $b$, lãi $v - b > 0$. Đặt thấp hơn có thể làm bạn thua mất phần lãi đó. Đặt cao hơn cũng chẳng được thêm gì, vì bạn vẫn chỉ trả $b$.
- **Nếu $b > v$:** đặt giá $v$ thì bạn thua, lãi 0. Đặt cao hơn $b$ để thắng thì phải trả $b > v$, tức là lỗ.

Trong cả hai trường hợp, giá bạn đặt chỉ quyết định **bạn có thắng hay không**, chứ không quyết định **bạn trả bao nhiêu**. Vì vậy hãy để nó thắng đúng những lúc thắng là có lãi: đặt đúng $v$. Không cần đoán ai, không cần chiến thuật.

### 3. Giá thứ nhất: phải "co giá"

Đấu giá kín giá thứ nhất thì khác hẳn. Nếu đặt đúng $v$, thắng thì bạn trả đúng $v$ và lãi bằng 0. Muốn có lãi, bạn phải đặt **thấp hơn** giá trị thật, và đánh đổi: đặt càng thấp thì thắng càng lãi, nhưng càng ít khi thắng.

Với $n$ người chơi, mỗi người có giá trị ngẫu nhiên đều trong khoảng từ 0 tới 100, cân bằng Nash là mỗi người đặt

$$
b = \frac{n - 1}{n} \times v
$$

Với 4 người, mỗi người đặt ba phần tư giá trị thật của mình. Càng nhiều đối thủ, bạn càng phải đặt sát giá trị thật.

Có một kết quả bất ngờ: dưới những giả định khá tổng quát, **người bán thu được số tiền kỳ vọng như nhau** ở cả hai kiểu đấu giá. Ở giá thứ nhất, người thắng tự co giá của mình. Ở giá thứ hai, người thắng đặt đúng giá trị nhưng chỉ trả giá của người về nhì. Hai hiệu ứng triệt tiêu nhau một cách hoàn hảo. Đây là **định lý tương đương doanh thu** (revenue equivalence), do Vickrey phát hiện và Roger Myerson tổng quát hóa.

### 4. Tự đấu giá

Bạn đấu giá với 3 bot. Mỗi ván, mỗi người được một giá trị ngẫu nhiên từ 0 tới 100 cho món đồ, và chỉ biết giá trị của mình. Các bot chơi đúng cân bằng: ở luật giá thứ nhất, chúng đặt 3/4 giá trị, ở luật giá thứ hai, chúng đặt đúng giá trị.

Chơi vài chục ván ở mỗi luật. Bên dưới, widget tính luôn bạn sẽ lãi bao nhiêu nếu với **cùng những ván đó** bạn luôn đặt đúng giá trị, hoặc luôn đặt 3/4 giá trị. Hãy so sánh.

<auction-sim>
</auction-sim>

Ở luật giá thứ hai, bạn sẽ thấy không cách nào lãi hơn chiến lược "đặt đúng giá trị", dù bạn cố tình đặt cao hay thấp. Ở luật giá thứ nhất, "đặt đúng giá trị" lại cho lãi bằng 0, và chiến lược 3/4 thường dẫn đầu.

### 5. Lời nguyền người thắng

Cho tới đây, mỗi người có một giá trị **riêng** cho món đồ. Nhưng có những món đồ có giá trị **chung**, chỉ là không ai biết chính xác: một mỏ dầu, một công ty sắp bị thâu tóm, hay một hũ đầy tiền xu.

Năm 1983, Max Bazerman và William Samuelson mang những hũ đựng đầy xu vào lớp học và cho sinh viên đấu giá. Mỗi hũ có giá trị thật khoảng 8 đô la. Trung bình, các sinh viên **đoán thấp hơn** giá trị thật. Vậy mà giá thắng trung bình lại **cao hơn** giá trị thật đáng kể, và người thắng trung bình bị lỗ.

Lý do: người thắng là người **đoán cao nhất**. Ngay cả khi mọi người đoán đúng trung bình, người lạc quan nhất vẫn là người thắng. Việc thắng tự nó là một tin xấu: nó cho bạn biết rằng tất cả những người khác đều đánh giá món đồ thấp hơn bạn. Hiện tượng này gọi là **lời nguyền người thắng** (winner's curse). Các kỹ sư của công ty dầu Atlantic Richfield đã mô tả nó từ năm 1971, khi giải thích vì sao các công ty thắng đấu giá quyền khai thác dầu ngoài khơi vịnh Mexico lại có lợi nhuận thấp đến bất ngờ.

Cách tránh: khi đấu giá một thứ có giá trị chung, hãy tự hỏi *"nếu mình thắng, điều đó nói gì về ước lượng của mình?"*, và hạ giá xuống tương ứng.

### 6. Đấu giá ngoài đời

Đấu giá không chỉ có ở phòng tranh:

- **Quảng cáo tìm kiếm:** mỗi lần bạn tìm kiếm trên Google, một phiên đấu giá diễn ra trong vài phần nghìn giây để quyết định quảng cáo nào hiện ra. Trong nhiều năm, Google dùng một biến thể của đấu giá giá thứ hai cho nhiều vị trí, gọi là *generalized second-price auction*.
- **Tần số viễn thông:** năm 1994, Ủy ban Truyền thông Liên bang Mỹ (FCC) tổ chức đấu giá tần số theo một thiết kế mới của Paul Milgrom và Robert Wilson. Các cuộc đấu giá kiểu này đã thu về hàng trăm tỷ đô la trên toàn thế giới. Hai ông nhận giải Nobel năm 2020.
- **eBay:** cơ chế "đặt giá tối đa, hệ thống tự trả giá thay bạn" thực chất vận hành gần giống đấu giá giá thứ hai: người thắng trả giá tối đa của người về nhì cộng thêm một bước giá.

## IV. Góc Game Designer

### 1. Thông tin ẩn là nguyên liệu của bluff

Nhắc lại ý ở Tập 4: trò chơi có thông tin đầy đủ thì về nguyên tắc đã có đáp án. Thông tin ẩn là một trong những cách mạnh nhất để giữ cho trò chơi luôn có quyết định thú vị. Nhưng thông tin ẩn chỉ tạo ra chiều sâu khi người chơi có **công cụ để phát tín hiệu và đọc tín hiệu**:

- Trong poker, lá bài là thông tin ẩn, còn **mức cược** là tín hiệu tốn kém. Đặt cược lớn thì đắt nếu bạn đang cầm bài yếu và bị theo, nên một cú cược lớn mang thông tin. Bluff là việc cố ý phát một tín hiệu đắt mà bạn không có loại tương ứng, và chỉ hiệu quả vì đôi khi nó là thật.
- Một game có thông tin ẩn mà không có hành động nào tốn kém để tiết lộ một phần thông tin đó thường chỉ là trò đoán mò.

Khi thiết kế một cơ chế ẩn thông tin, hãy tự hỏi: *người chơi có thể làm gì để chứng minh mình mạnh, và cái giá của hành động đó có khác nhau giữa người mạnh và người yếu không?*

### 2. Chợ đồ trong game và những quả chanh

Nếu game của bạn có trao đổi vật phẩm giữa người chơi, và vật phẩm có **chỉ số ẩn** (chỉ số ngẫu nhiên không hiển thị, độ bền không rõ, tài khoản có lịch sử không minh bạch), bạn vừa tạo ra một thị trường xe cũ. Người có đồ tốt không bán được giá, và chợ dần chỉ còn đồ kém.

Cách chữa của game designer giống hệt cách chữa ngoài đời:

- **Làm thông tin minh bạch:** cho người mua xem đầy đủ chỉ số trước khi giao dịch, giống như kiểm định xe.
- **Cho người bán phát tín hiệu:** điểm uy tín của người bán, lịch sử giao dịch, đánh giá. Đây cũng là cách kéo dài cái bóng của tương lai ở Tập 5.
- **Trung gian đảm bảo:** hệ thống giao dịch qua nhà đấu giá trong game, giữ đồ và tiền cho tới khi cả hai bên xác nhận.

### 3. Nếu bạn thiết kế một nhà đấu giá

Nhiều game có nhà đấu giá cho người chơi. Lựa chọn luật đấu giá thay đổi hoàn toàn trải nghiệm:

- Đấu giá công khai tăng dần với thời hạn cố định khuyến khích **chờ tới giây cuối** mới đặt giá (sniping), biến việc mua đồ thành một cuộc canh me căng thẳng.
- Đấu giá kín giá thứ hai cho phép người chơi đặt đúng giá trị mình thấy món đồ đáng, rồi **đi làm việc khác**. Không cần canh, không cần đoán.

Không có lựa chọn nào đúng tuyệt đối. Nhưng khi bạn biết mỗi luật chơi khuyến khích hành vi nào, bạn đang chọn cảm xúc cho người chơi, chứ không chỉ chọn một con số.

## V. Tóm tắt

1. Khi một bên biết nhiều hơn bên kia, thị trường có thể bị **lựa chọn ngược**: chính mức giá đẩy những người tốt nhất ra ngoài.
2. Bên có thông tin dùng **tín hiệu tốn kém** để chứng minh mình (bảo hành, bằng cấp, đuôi công). Bên không có thông tin dùng **sàng lọc** để người kia tự khai (gói bảo hiểm, vé máy bay).
3. Trong **đấu giá kín giá thứ hai**, đặt đúng giá trị thật là chiến lược trội. Ở giá thứ nhất, phải co giá. Khi món đồ có giá trị chung, hãy cẩn thận với **lời nguyền người thắng**.

## Câu đố cho Tập 7

Tập cuối, mình muốn bạn tham gia một trò chơi thật. **Hãy làm trước khi đọc Tập 7.**

Mỗi người chơi chọn một số nguyên từ **0 tới 100**. Người thắng là người chọn số **gần nhất với 2/3 trung bình** của tất cả các số được chọn.

Ví dụ, nếu trung bình của mọi người là 60, thì số thắng là 40.

Bạn chọn số nào? Hãy ghi lại, cùng lý do vì sao bạn chọn số đó, rồi mở [Tập 7](/blog/Game-Theory-7-Ngoai-Doi-Thuc).

## Tài liệu tham khảo

- G. A. Akerlof, "The Market for 'Lemons': Quality Uncertainty and the Market Mechanism", *Quarterly Journal of Economics* 84(3), 488–500 (1970).
- M. Spence, "Job Market Signaling", *Quarterly Journal of Economics* 87(3), 355–374 (1973).
- M. Rothschild, J. Stiglitz, "Equilibrium in Competitive Insurance Markets", *Quarterly Journal of Economics* 90(4), 629–649 (1976).
- A. Zahavi, "Mate selection: a selection for a handicap", *Journal of Theoretical Biology* 53(1), 205–214 (1975).
- W. Vickrey, "Counterspeculation, Auctions, and Competitive Sealed Tenders", *Journal of Finance* 16(1), 8–37 (1961).
- M. H. Bazerman, W. F. Samuelson, "I Won the Auction But Don't Want the Prize", *Journal of Conflict Resolution* 27(4), 618–634 (1983).
- E. C. Capen, R. V. Clapp, W. M. Campbell, "Competitive Bidding in High-Risk Situations", *Journal of Petroleum Technology* 23(6), 641–653 (1971).
- [Auction theory — Wikipedia](https://en.wikipedia.org/wiki/Auction_theory)
