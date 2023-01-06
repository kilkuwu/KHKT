import * as React from "react";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import MainFeaturedPost from "../components/Blog/MainFeaturedPost";
import Main from "../components/Blog/Main";
import Sidebar from "../components/Blog/Sidebar";

const mainFeaturedPost = {
  title:
    "PaWatch - Thiết bị hỗ trợ theo dõi sức khỏe, cấp cứu cho bệnh nhân điều trị tại nhà",
  description:
    "Nếu ý tưởng tạo ra “Thiết bị hỗ trợ theo dõi sức khỏe, cấp cứu cho bệnh nhân điều trị tại nhà” đảm bảo được các yêu cầu thiết yếu về kĩ thuật và tiêu chuẩn thì thiết bị này sẽ một phần nào đó giúp các y bác sĩ dễ dàng trong việc kiểm soát, đưa ra các pháp đồ điều trị thích hợp, giúp các bác sĩ tiết kiệm nhân lực, hạn chế quá tải ở các bệnh viện và giúp các chuyên viên y tế định vị bệnh nhân nhằm cấp cứu kịp thời cho các bệnh nhân đang gặp nguy hiểm.",
  image: "/medical-background.jpg",
  imageText: "main image description",
};

const posts = [
  {
    id: "ly-do-chon-de-tai",
    title: "Lý do chọn đề tài",
    description:
      "Truyền thông, internet phát triển, mọi thứ chúng ta cần biết bây giờ chỉ đơn giản là một cú nhấp chuột. Bị bệnh, tự chẩn đoán, tự kê đơn và tự dùng thuốc là một thực tế rất phổ biến, dễ dàng, ít tốn kém nhưng việc làm này có thể gây ra nhiều hậu quả hơn là lợi ích.",
  },
  {
    id: "anh-huong-tieu-cuc-cua-viec-tu-chua-benh-tai-nha-den-benh-nhan",
    title: "Ảnh hưởng tiêu cực của việc tự chữa bệnh tại nhà đến bệnh nhân",
    description:
      "Hiện nay, thực trạng nhiều người có triệu chứng đau ốm tự đoán bệnh và tự điều trị tại nhà rất phổ biến; hoặc các trường hợp khác hỏi ý kiến những người không có chuyên môn hay dược sĩ tại hiệu thuốc thay vì đi khám ở các cơ sở y tế.",
  },
  {
    id: "khai-quat-ve-thiet-bi-ho-tro-theo-doi-suc-khoe-cap-cuu-cho-benh-nhan-dieu-tri-tai-nha",
    title:
      "Khái quát về “Thiết bị hỗ trợ theo dõi sức khỏe, cấp cứu cho bệnh nhân điều trị tại nhà”",
    description:
      "Thiết bị “Thiết bị hỗ trợ theo dõi sức khỏe, cấp cứu cho bệnh nhân điều trị tại nhà” được chế tạo từ những Module cảm biến như: Module WiFi ESP32; cảm biến nhiệt không chạm MLX9060; cảm biến nhịp tim và oxi trong máu MAX30100; mạch GPS; cảm biến điện nhịp ECG AD8232 và các linh kiện khác.",
  },
  {
    id: "nguyen-ly-hoat-dong",
    title: "Nguyên lý hoạt động",
    description:
      "Thiết bị PaWatch hoạt động dưới sự điều khiển của trang web Pamonitor qua internet và SIM GMS.",
  },
];

const sidebar = {
  title: "Pamonitor là gì?",
  description:
    "Pamonitor là trang web mã nguồn mở được chúng tôi thiết kế dành riêng cho PaWatch – “Thiết bị hỗ trợ theo dõi sức khỏe, cấp cứu cho bệnh nhân điều trị tại nhà”, với mục tiêu tạo ra một giao diện thân thiện, dễ dàng cho việc quản lý thiết bị từ xa; thu thập, xử lý và trực quan hóa dữ liệu y tế.",
  social: [
    {
      name: "GitHub",
      icon: GitHubIcon,
      link: "https://github.com/kilkuwu/KHKT",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      link: "https://www.facebook.com/profile.php?id=100036601175238",
    },
  ],
};

export default function Blog() {
  return (
    <>
      <MainFeaturedPost post={mainFeaturedPost} />
      <Grid container spacing={5} sx={{ my: 3 }}>
        <Main title="Các blog nổi bật" posts={posts} />
        <Sidebar
          title={sidebar.title}
          description={sidebar.description}
          social={sidebar.social}
        />
      </Grid>
    </>
  );
}
