import {
  BadgeCheck,
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardList,
  Code2,
  Compass,
  FileText,
  Handshake,
  Hotel,
  Megaphone,
  MessageCircle,
  Palette,
  RadioTower,
  Rocket,
  ScanSearch,
  Settings2,
  ShoppingBag,
  Sparkles,
  Target,
  Users,
  Video,
} from "lucide-react";

export const navItems = [
  ["Trang chủ", "home"],
  ["Về chúng tôi", "about"],
  ["Dịch vụ", "services"],
  ["Quy trình", "process"],
  ["Dự án", "projects"],
  ["Khách hàng", "clients"],
  ["Liên hệ", "contact"],
] as const;

export const stats = [
  { value: "2020", label: "Năm thành lập" },
  { value: "100+", label: "Dự án triển khai" },
  { value: "50+", label: "Doanh nghiệp đồng hành" },
  { value: "10+", label: "Nhóm dịch vụ" },
  { value: "24/7", label: "Hỗ trợ khách hàng" },
];

export const services = [
  {
    icon: Megaphone,
    title: "Digital Advertising",
    text: "Triển khai quảng cáo đa nền tảng với dữ liệu, thông điệp và tối ưu liên tục.",
    tags: ["Facebook Ads", "Google Ads", "TikTok Ads", "YouTube Ads"],
  },
  {
    icon: ShoppingBag,
    title: "TikTok Shop Partner",
    text: "Thiết lập, quản lý và tăng trưởng gian hàng TikTok Shop từ nội dung đến vận hành.",
    tags: ["Setup gian hàng", "Livestream", "KOC/KOL", "Tối ưu sản phẩm"],
  },
  {
    icon: Code2,
    title: "Design & Website",
    text: "Thiết kế website, landing page và hệ thống nhận diện có tính ứng dụng cao.",
    tags: ["Website", "Landing page", "Logo", "Profile"],
  },
  {
    icon: FileText,
    title: "Content Marketing",
    text: "Xây dựng kế hoạch nội dung, kịch bản video, bài PR và content quảng cáo.",
    tags: ["Social content", "Video script", "PR", "Content plan"],
  },
  {
    icon: Camera,
    title: "Studio & Media",
    text: "Sản xuất hình ảnh, video, TVC, livestream và tư liệu truyền thông chuyên nghiệp.",
    tags: ["TVC", "Livestream", "Chụp sản phẩm", "Sự kiện"],
  },
  {
    icon: Palette,
    title: "Branding",
    text: "Định hình chiến lược, nhận diện và truyền thông thương hiệu dài hạn.",
    tags: ["Brand strategy", "Identity", "Personal brand", "Communication"],
  },
  {
    icon: RadioTower,
    title: "Booking & PR",
    text: "Kết nối truyền thông, KOL/KOC, fanpage, báo chí và màn hình LED.",
    tags: ["Fanpage", "Báo chí", "KOL/KOC", "Review"],
  },
  {
    icon: Hotel,
    title: "Setup Restaurant - Hotel",
    text: "Tư vấn thị trường, thương hiệu, khai trương và marketing vận hành dịch vụ.",
    tags: ["Market research", "Opening plan", "Team setup", "Hospitality"],
  },
  {
    icon: Building2,
    title: "Xây dựng phòng Marketing",
    text: "Thiết lập nhân sự, quy trình, KPI và năng lực marketing nội bộ cho doanh nghiệp.",
    tags: ["Tuyển dụng", "Quy trình", "Đào tạo", "KPI"],
  },
];

export const packageGroups = [
  {
    icon: Blocks,
    title: "Fanpage & nền tảng số",
    items: ["Tạo và tối ưu fanpage", "Cập nhật thông tin", "Quản trị nội dung", "Tư vấn vận hành"],
  },
  {
    icon: Sparkles,
    title: "Thiết kế - Content - Video",
    items: ["Thiết kế logo và ấn phẩm", "Viết bài quảng cáo", "Chụp ảnh sản phẩm", "Biên tập video"],
  },
  {
    icon: BarChart3,
    title: "Quảng cáo và tối ưu",
    items: ["Triển khai đa nền tảng", "Tối ưu chi phí", "Báo cáo minh bạch", "Điều chỉnh liên tục"],
  },
  {
    icon: Settings2,
    title: "Dịch vụ chuyên sâu",
    items: ["Website và landing page", "Hồ sơ năng lực", "TVC doanh nghiệp", "App mobile"],
  },
];

export const processSteps = [
  ["01", "Tiếp nhận yêu cầu và đặt lịch hẹn", MessageCircle],
  ["02", "Tư vấn mục tiêu kinh doanh", Target],
  ["03", "Khảo sát thị trường và đối thủ", ScanSearch],
  ["04", "Thống nhất phương án và báo giá", ClipboardList],
  ["05", "Xây dựng kế hoạch triển khai", Compass],
  ["06", "Ký kết hợp đồng", Handshake],
  ["07", "Triển khai, theo dõi và tối ưu", Rocket],
  ["08", "Báo cáo, nghiệm thu và đồng hành", BadgeCheck],
] as const;

export const reasons = [
  "Đội ngũ trẻ, sáng tạo và giàu kinh nghiệm.",
  "Giải pháp thiết kế riêng theo từng doanh nghiệp.",
  "Báo cáo tiến độ rõ ràng và minh bạch.",
  "Đồng hành xuyên suốt trước, trong và sau dự án.",
  "Hệ sinh thái dịch vụ Marketing toàn diện.",
  "Tập trung vào hiệu quả thực tế và tăng trưởng dài hạn.",
];

export const projects = [
  {
    title: "Marketing nhà hàng",
    type: "Hospitality Growth",
    img: "/assets/13-restaurant-food-project.jpg",
    goal: "Tăng nhận diện và lượng đặt bàn.",
    result: "+42% lượt tương tác trong 8 tuần",
  },
  {
    title: "Marketing khách sạn",
    type: "Hotel Campaign",
    img: "/assets/10-hotel-lobby-project.jpg",
    goal: "Nâng chuẩn hình ảnh thương hiệu lưu trú.",
    result: "Bộ nội dung đặt phòng đồng bộ",
  },
  {
    title: "Thương hiệu nội thất",
    type: "Branding",
    img: "/assets/09-branding-workshop.jpg",
    goal: "Tạo hệ thống nhận diện và thông điệp bán hàng.",
    result: "Ra mắt bộ nhận diện mới",
  },
  {
    title: "TikTok Shop",
    type: "Commerce",
    img: "/assets/03-studio-content-creator.jpg",
    goal: "Tối ưu gian hàng và nội dung bán hàng.",
    result: "Quy trình livestream ổn định",
  },
  {
    title: "Quay TVC doanh nghiệp",
    type: "Media Production",
    img: "/assets/06-media-commercial-production.jpg",
    goal: "Sản xuất phim thương hiệu chuyên nghiệp.",
    result: "Tư liệu dùng đa kênh",
  },
  {
    title: "Truyền thông sự kiện",
    type: "PR & Booking",
    img: "/assets/07-media-event-production.jpg",
    goal: "Tăng độ phủ cho chiến dịch ra mắt.",
    result: "Kịch bản truyền thông trọn gói",
  },
];

export const clientLogos = ["HALONG BAY", "AURA SPA", "NOVA HOTEL", "LUX FOOD", "OCEAN GROUP", "KAIROS", "MIRA HOME"];

export const testimonials = [
  {
    name: "Nguyễn Minh Anh",
    role: "Founder, Mira Home",
    img: "/assets/12-spa-client-team.jpg",
    quote:
      "DST giúp chúng tôi chuyển từ làm nội dung rời rạc sang một kế hoạch thương hiệu rõ ràng, có số liệu và có nhịp triển khai.",
  },
  {
    name: "Trần Hoàng Nam",
    role: "Marketing Manager, Nova Hotel",
    img: "/assets/02-team-celebration.jpg",
    quote:
      "Điểm mạnh nhất là sự chủ động. Đội ngũ theo sát từng giai đoạn, báo cáo minh bạch và tối ưu chiến dịch rất nhanh.",
  },
  {
    name: "Lê Quỳnh Trang",
    role: "COO, Lux Food",
    img: "/assets/14-restaurant-client-experience.jpg",
    quote:
      "Hình ảnh, video và quảng cáo đồng bộ hơn hẳn. Thương hiệu của chúng tôi nhìn chuyên nghiệp và dễ thuyết phục khách hàng hơn.",
  },
];

export const quickLinks = [
  "Digital Advertising",
  "TikTok Shop",
  "Design & Website",
  "Content Marketing",
  "Studio & Media",
  "Branding",
];

export const CheckIcon = CheckCircle2;
export const UsersIcon = Users;
export const VideoIcon = Video;
