# **Nguyên lý hoạt động**

###### _10 tháng 12, 2022 bởi [Admin](https://www.facebook.com/kilkuwu)_

Thiết bị PaWatch hoạt động dưới sự điều khiển của trang web Pamonitor qua internet và SIM GMS.

Thiết bị có các tính năng:

- Theo dõi chính xác vị trí bệnh nhân nhằm cấp cứu kịp thời;
- Thông báo nhắc nhở uống thuốc từ chuyên viên y tế;
- Có thể gọi điện thông qua SIM;
- Tự động cập nhật chỉ số sức khỏe của bệnh nhân theo thời gian thực;
- Gửi thông số sức khỏe thông qua internet;
- Điều khiển, giám sát qua trang web Pamonitor;
- Thông báo thời lượng pin và tiết kiệm pin khi năng lượng bị giảm sút;
- Hiển thị thông số sức khỏe thông qua màn hình trên thiết bị;

Module WiFi ESP32 dùng để kết nối với trang web Pamonitor và nhận thông tin từ cảm biến của thiết bị.

Cảm biến nhiệt GY-906-DCI MLX90614 Medical Accuracy Non-Contact IR Thermal Sensor sử dụng cảm biến mã MLX90614ESF-DCI với độ chính xác cao (sai số 0.3 độ C) có thể sử dụng trong y tế (Medical Accuracy) giúp đo nhiệt độ từ xa với khoảng cách tối đa 1m, cảm biến có chất lượng tốt, độ bền cao, thích hợp với các ứng dụng đo thân nhiệt, nhiệt độ từ xa sử dụng điện áp 3.3V-5V.

MAX30100 là một giải pháp cảm biến đo nhịp tim và đo nhịp tim tích hợp. Nó kết hợp hai đèn LED, bộ tách sóng quang, quang học được tối ưu hóa và xử lý tín hiệu tương tự nhiễu thấp để phát hiện tín hiệu oxy hóa nhịp tim và nhịp tim. Cảm biến nhịp tim và oxy trong máu MAX30100 hoạt động từ các bộ nguồn 1.8V và 3.3V và có thể được cấp nguồn thông qua phần mềm với dòng điện chờ không đáng kể, cho phép nguồn điện luôn được kết nối mọi lúc.

Hai cảm biến này sử dụng chung giao thức I2C và đều cho ra kết quả rất chính xác và tốc độ phản hồi nhanh.

Để dễ dàng kết nối mạng, thiết bị sử dụng chế độ AP for Web Server và GMS để dễ dàng kết nối với mạng WiFi, hoặc mạng 4G để kết nối với hệ thống điều khiển trên website Pamonitor.

Thiết bị sử dụng màn hình OLED GC9A01 và ILI9341, dễ dàng xem các thông số sức khỏe. Công nghệ OLED giúp thiết bị tiết kiệm thời gian sử dụng pin, kết nối với mạch chính bằng giao tiếp SPI và I2C.

Thiết bị được trang bị module GPS và GMS A9G sử dụng tín hiệu vệ tinh cho chúng ta thông tin chính xác vị trí người đang đeo thiết bị, đồng thời cung cấp khả năng liên lạc thông qua SIM.

Thiết bị được trang bị 2 cell Pin 105568 Li-ion với tổng dung lượng là 10000mAh cho hiệu năng của thiết bị được ổn định và có thời hạn sử dụng rất dài.

Thiết bị có tính năng phát hiện người đeo tháo thiết bị nếu chưa hết thời gian điều trị hay chữa bệnh.
