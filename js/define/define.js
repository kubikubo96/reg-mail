var apiKey = "72c1e93b";
var netWork = "Mobi,Vina,ITelecom"; //Viettel,Mobi,Vina,VNMB,ITelecom

var dUrlGetNumber = "https://chothuesimcode.com/api?act=number&apik=" + apiKey + "&appId=1005&carrier=" + netWork;
var dUrlGetCode = "https://chothuesimcode.com/api?act=code&apik=" + apiKey + "&id=";

//dFirstName: Họ
var dFirstName = ['Nguyễn', 'Cung', 'Trần', 'Pham', 'Phan', 'Cầu', 'Tạnh', 'Bùi', 'Lệ', 'Lê', 'Nguyễn', 'Trần', 'Lê', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý', 'An', 'Ánh', 'Ân', 'Âu', 'Ao', 'Ánh', 'Ân', 'Âu Dương', 'Ấu', 'Bá', 'Bạc', 'Bạch', 'Bàn', 'Bàng', 'Bành', 'Bảo', 'Bế', 'Bì', 'Biện', 'Bình', 'Bồ', 'Ca', 'An', 'Anh', 'Ao', 'Ánh', 'Ân', 'Âu Dương', 'Ấu', 'Bá', 'Bạc', 'Bạch', 'Bàn', 'Bàng', 'Bành', 'Bảo', 'Bế', 'Bì', 'Biện', 'Bình', 'Bồ', 'Chriêng', 'Ca', 'Cà', 'Cái', 'Cai', 'Cam', 'Cảnh', 'Cao', 'Cáp', 'Cát', 'Cầm', 'Cấn', 'Chế', 'Chiêm', 'Chu', 'Châu', 'Chung', 'Chúng', 'Chương', 'Chử', 'Cồ', 'Cổ', 'Công', 'Cống', 'Cung', 'Cù', 'Cự', 'Dã', 'Danh', 'Diêm', 'Diệp', 'Doãn', 'Duy', 'Dư', 'Đái', 'Điều', 'Đan', 'Đàm', 'Đào', 'Đầu', 'Đậu', 'Đèo', 'Điền', 'Đinh', 'Điêu', 'Đoàn', 'Đoạn', 'Đôn', 'Đống', 'Đồ', 'Đồng', 'Đổng', 'Đới', 'Đương', 'Đường', 'Đức', 'Đăng', 'Giả', 'Giao', 'Giang', 'Giảng', 'Giáp', 'Hma', 'nia', 'Hầu', 'Hà', 'Hạ', 'Hàn', 'Hàng', 'Hán', 'Hề', 'Hi', 'Hình', 'Hoa', 'Hoà', 'Hồng', 'Hùng', 'Hứa', 'Hướng', 'Kông', 'Kiểu', 'Kha', 'Khà', 'Khương', 'Khâu', 'Khiếu', 'Khoa', 'Khổng', 'Khu', 'Khuất', 'Khúc', 'Khưu', 'Kiều', 'Kim', 'Khai', 'Lyly', 'La', 'Lã', 'Lãnh', 'Lạc', 'Lại', 'Lăng', 'Lâm', 'Lèng', 'Lều', 'Liên', 'Liêu', 'Liễu', 'Linh', 'Lò', 'Lô', 'Lỗ', 'Lộ', 'Luyện', 'Lục', 'Lư', 'Lương', 'Lường', 'Lưu', 'Lý', 'Mùa', 'Ma', 'Mai', 'Mang', 'Mã', 'Mạc', 'Mạch', 'Mạnh', 'Mâu', 'Mầu', 'Mẫn', 'Mộc', 'Mục', 'Ngạc', 'Nhan', 'Ninh', 'Nhâm', 'Ngân', 'Nghiêm', 'Nghị', 'Ngọ', 'Ngọc', 'Ngôn', 'Ngũ', 'Ngụy', 'Nhữ', 'Nông', 'Ong', 'Ông', 'Phi', 'Phí', 'Phó', 'Phong', 'Phù', 'Phú', 'Phùng', 'Phương', 'Quản', 'Quán', 'Quang', 'Quàng', 'Quảng', 'Quách', 'Sái', 'Sầm', 'Sơn', 'Sử', 'Sùng', 'Tán', 'Tào', 'Tạ', 'Tăng', 'Tấn', 'Tề', 'Thang', 'Thái', 'Thành', 'Thào', 'Thạch', 'Thân', 'Thẩm', 'Thập', 'Thế', 'Thi', 'Thiều', 'Thịnh', 'Thoa', 'Thôi', 'Thục', 'Tiêu', 'Tiếp', 'Tinh', 'Tòng', 'Tô', 'Tôn', 'Tôn Thất', 'Tông', 'Tống', 'Trang', 'Trác', 'Trà', 'Tri', 'Triệu', 'Trình', 'Trịnh', 'Trưng', 'Trương', 'Tuấn', 'Từ', 'Ty', 'Uông', 'Ung', 'Ưng', 'Ứng', 'Vạn', 'Văn', 'Vi', 'Viêm', 'Viên'];
//dLastName: Tên
var dLastName = ['Cẩm Hạnh', 'Diễm Hạnh', 'Hiếu Hạnh', 'Hồng Hạnh', 'Kiều Hạnh', 'Minh Hạnh', 'Mỹ Hạnh', 'Phương Hạnh', 'Thúy Hạnh', 'Bích Hảo', 'Thanh Hảo', 'Bích Hậu', 'Thu Hậu', 'Bích Hiền', 'Diệu Hiền', 'Mai Hiền', 'Minh Hiền', 'Ngọc Hiền', 'Phương Hiền', 'Tâm Hiền', 'Thanh Hiền', 'Thu Hiền', 'Thúy Hiền', 'Xuân Hiền', 'Ánh Hoa', 'Bạch Hoa', 'Diệu Hoa', 'Hồng Hoa', 'Kiều Hoa', 'Kim Hoa', 'Lệ Hoa', 'Liên Hoa', 'Mộng Hoa', 'Ngọc Hoa', 'Như Hoa', 'Phương Hoa', 'Quỳnh Hoa', 'Thanh Hoa', 'Tuyết Hoa', 'Xuân Hoa', 'Kim Hòa', 'Thu Hoài', 'Ngọc Hoan', 'Mỹ Hoàn', 'Ngọc Hoàn', 'Ái Hồng', 'Ánh Hồng', 'Bích Hồng', 'Diệu Hồng', 'Minh Hồng', 'Nguyên Hồng', 'Nguyệt Hồng', 'Nhã Hồng', 'Như Hồng', 'Thái Hồng', 'Thanh Hồng', 'Thảo Hồng', 'Thu Hồng', 'Tuyết Hồng', 'Vũ Hồng', 'Yến Hồng', 'Bích Hợp', 'Bảo Huệ', 'Bích Huệ', 'Minh Huệ', 'Mỹ Huệ', 'Ngọc Huệ', 'Thu Huệ', 'Anh Hương', 'Dạ Hương', 'Diễm Hương', 'Diệu Hương', 'Ðinh Hương', 'Hoài Hương', 'Huệ Hương', 'Kim Hương', 'Lan Hương', 'Liên Hương', 'Mai Hương', 'Minh Hương', 'Mộng Hương', 'Nhã Hương', 'Quỳnh Hương', 'Thanh Hương', 'Thảo Hương', 'Thiên Hương', 'Thúy Hương', 'Thu Hương', 'Tuyết Hương', 'Vân Hương', 'Việt Hương', 'Xuân Hương', 'Cẩm Hường', 'Thu Hường', 'Thanh Hường', 'Thúy Hường', 'Diệu Huyền', 'Khánh Huyền', 'Lệ Huyền', 'Minh Huyền', 'Mỹ Huyền', 'Ngọc Huyền', 'Thanh Huyền', 'Thu Huyền', 'Thúy Huyền', 'Minh Khai', 'Ái Khanh', 'Ðan Khanh', 'Gia Khanh', 'Hiếu Khanh', 'Hồng Khanh', 'Kiều Khanh', 'Lệ Khanh', 'Mai Khanh', 'Ngọc Khanh', 'Nhã Khanh', 'Phi Khanh', 'Thụy Khanh', 'Uyển Khanh', 'Vân Khanh', 'Kim Khánh', 'Ngọc Khánh', 'Thiên Khánh', 'Vân Khánh', 'Mai Khôi', 'Diễm Khuê', 'Hồng Khuê', 'Lan Khuê', 'Minh Khuê', 'Ngọc Khuê', 'Thục Khuê', 'Việt Khuê', 'Kim Khuyên', 'Mỹ Khuyên', 'Diễm Kiều', 'Mỹ Kiều', 'Thanh Kiều', 'Thúy Kiều', 'Thiên Kim', 'Bích Lam', 'Ngọc Lam', 'Quỳnh Lam', 'Thanh Lam', 'Thiên Lam', 'Trúc Lam', 'Vy Lam', 'Hồng Lâm', 'Huệ Lâm', 'Hương Lâm', 'Ngọc Lâm', 'Quế Lâm', 'Quỳnh Lâm', 'Thanh Lâm', 'Thư Lâm', 'Thụy Lâm', 'Tịnh Lâm', 'Trúc Lâm', 'Tuệ Lâm', 'Tuyết Lâm', 'Xuân Lâm', 'Bảo Lan', 'Chi Lan', 'Dạ Lan', 'Diệu Lan', 'Hoàng Lan', 'Huệ Lan', 'Hương Lan', 'Khúc Lan', 'Kim Lan', 'Linh Lan', 'Mai Lan', 'Mộng Lan', 'Mỹ Lan', 'Ngọc Lan', 'Nguyệt Lan', 'Nhật Lan', 'Phong Lan', 'Phương Lan', 'Thanh Lan', 'Thiên Lan', 'Trúc Lan', 'Tuyết Lan', 'Vy Lan', 'Xuân Lan', 'Ý Lan', 'Ánh Lệ', 'Mỹ Lệ', 'Ngọc Lệ', 'Diễm Lệ', 'Bích Liên', 'Cẩm Liên', 'Diễm Liên', 'Hà Liên', 'Hoa Liên', 'Hồng Liên', 'Hương Liên', 'Kim Liên', 'Mai Liên', 'Ngọc Liên', 'Phương Liên', 'Mộng Liễu', 'Thúy Liễu', 'Xuân Liễu', 'Ái Linh', 'Quỳnh Liên', 'Thu Liên', 'Thúy Liên', 'Trúc Liên', 'Ánh Linh', 'Bội Linh', 'Cẩm Linh', 'Đan Linh', 'Diệu Linh', 'Gia Linh', 'Hạnh Linh', 'Hồng Linh', 'Huệ Linh', 'Huyền Linh', 'Khánh Linh', 'Mai Linh', 'Ngọc Linh', 'Phương Linh', 'Quế Linh', 'Thảo Linh', 'Thu Linh', 'Thùy Linh', 'Trang Linh', 'Trúc Linh', 'Vân Linh', 'Xuân Linh', 'Bạch Loan', 'Bích Loan', 'Diệu Loan', 'Kiều Loan', 'Kim Loan', 'Mai Loan', 'Minh Loan', 'Mỹ Loan', 'Ngọc Loan', 'Như Loan', 'Phượng Loan', 'Phương Loan', 'Thanh Loan', 'Thu Loan', 'Thúy Loan', 'Tố Loan', 'Trúc Loan', 'Tuyết Loan', 'Xuân Loan', 'Yến Loan', 'Cẩm Ly', 'Hương Ly', 'Khánh Ly', 'Kim Ly', 'Lưu Ly', 'Mai Ly', 'Ngọc Ly', 'Thảo Ly', 'Trúc Ly', 'Tú Ly', 'Ngọc Lý', 'Nhã Lý', 'Ánh Mai', 'Ban Mai', 'Chi Mai', 'Hiền Mai', 'Hồng Mai', 'Hương Mai', 'Khánh Mai', 'Kiều Mai', 'Kim Mai', 'Ngọc Mai', 'Nhã Mai', 'Như Mai', 'Phương Mai', 'Thanh Mai', 'Thu Mai', 'Thủy Mai', 'Thúy Mai', 'Trúc Mai', 'Tuyết Mai', 'Xuân Mai', 'Yến Mai', 'Tuệ Mẫn', 'Hà Mi', 'Thùy Mi', 'Kiều Minh', 'Nguyệt Minh', 'Thu Minh', 'Thủy Minh', 'Thúy Minh', 'Uyên Minh', 'Diễm My', 'Duyên My', 'Hà My', 'Hải My', 'Hạnh My', 'Huệ My', 'Khánh My', 'Thảo My', 'Thúy My', 'Thùy My', 'Trà My', 'Uyên My', 'Uyển My', 'Yến My', 'Duyên Mỹ', 'Kiều Mỹ', 'Thiên Mỹ', 'Bích Nga', 'Diệu Nga', 'Hạnh Nga', 'Hồng Nga', 'Kiều Nga', 'Lệ Nga', 'Mỹ Nga', 'Nguyệt Nga', 'Quỳnh Nga', 'Thanh Nga', 'Thiên Nga', 'Thu Nga', 'Thúy Nga', 'Tố Nga', 'Tuyết Nga', 'Việt Nga', 'Bích Ngà', 'Thu Ngà', 'Thúy Ngà', 'Bích Ngân', 'Hồng Ngân', 'Khánh Ngân', 'Kim Ngân', 'Quỳnh Ngân', 'Thanh Ngân', 'Thu Ngân', 'Thúy Ngân', 'Ðông Nghi', 'Phương Nghi', 'Thảo Nghi', 'Uyển Nghi', 'Xuân Nghi', 'Ánh Ngọc', 'Bảo Ngọc', 'Bích Ngọc', 'Diệu Ngọc', 'Giáng Ngọc', 'Hồng Ngọc', 'Huyền Ngọc', 'Khánh Ngọc', 'Kim Ngọc', 'Lam Ngọc', 'Lan Ngọc', 'Minh Ngọc', 'Mỹ Ngọc', 'Như Ngọc', 'Phương Ngọc', 'Thanh Ngọc', 'Thu Ngọc', 'Thúy Ngọc', 'Vân Ngọc', 'Xuân Ngọc', 'Tâm Nguyên', 'Thanh Nguyên', 'Thảo Nguyên', 'Ánh Nguyệt', 'Dạ Nguyệt', 'Kiều Nguyệt', 'Minh Nguyệt', 'Mộng Nguyệt', 'Tâm Nguyệt', 'Thu Nguyệt', 'Triều Nguyệt', 'Tú Nguyệt', 'Thanh Nhã', 'Trang Nhã', 'Uyển Nhã', 'An Nhàn', 'Thanh Nhàn', 'Ái Nhi', 'Cẩm Nhi', 'Ðông Nhi', 'Gia Nhi', 'Hà Nhi', 'Hải Nhi', 'Hảo Nhi', 'Hiền Nhi', 'Hương Nhi', 'Huyền Nhi', 'Lâm Nhi', 'Lan Nhi', 'Lệ Nhi', 'Linh Nhi', 'Mai Nhi', 'Minh Nhi', 'Mộng Nhi', 'Mỹ Nhi', 'Ngọc Nhi', 'Phương Nhi', 'Quỳnh Nhi', 'Tâm Nhi', 'Thảo Nhi', 'Thục Nhi', 'Thùy Nhi', 'Tịnh Nhi', 'Tố Nhi', 'Tuệ Nhi', 'Tuyết Nhi', 'Uyên Nhi', 'Uyển Nhi', 'Vân Nhi', 'Xuân Nhi', 'Ý Nhi', 'Yên Nhi', 'Yến Nhi', 'An Nhiên', 'Thu Nhiên', 'Xuân Nhiên', 'Bích Như', 'Hồng Như', 'Quỳnh Như', 'Tâm Như', 'Thùy Như', 'Uyển Như', 'Cẩm Nhung', 'Hồng Nhung', 'Phi Nhung', 'Phương Nhung', 'Quỳnh Nhung', 'Thanh Nhung', 'Tuyết Nhung', 'Ngọc Nữ', 'Diệu Nương', 'Kiều Nương', 'Mỹ Nương', 'Thiên Nương', 'Thụy Nương', 'Xuân Nương', 'Hoàng Oanh', 'Hồng Oanh', 'Kim Oanh', 'Ngọc Oanh', 'Thu Oanh', 'Thục Oanh', 'Thùy Oanh', 'Trâm Oanh', 'Tuyết Oanh', 'Yến Oanh', 'Thu Phong', 'Diễm Phúc', 'Hồng Phúc', 'Mỹ Phụng', 'Ngọc Phụng', 'Diễm Phước', 'Bảo Phương', 'Diễm Phương', 'Hà Phương', 'Hạnh Phương', 'Hoài Phương', 'Hồng Phương', 'Huệ Phương', 'Lan Phương', 'Liên Phương', 'Linh Phương', 'Mai Phương', 'Minh Phương', 'Mỹ Phương', 'Như Phương', 'Quế Phương', 'Quỳnh Phương', 'Thanh Phương', 'Thiên Phương', 'Thu Phương', 'Trúc Phương', 'Uyên Phương', 'Vân Phương', 'Xuân Phương', 'Yến Phương', 'Bích Phượng', 'Diễm Phượng', 'Hải Phượng', 'Kim Phượng', 'Linh Phượng', 'Minh Phượng', 'Mỹ Phượng', 'Thu Phượng', 'Thúy Phượng', 'Xuân Phượng', 'Yến Phượng', 'Bích Quân', 'Lệ Quân', 'Như Quân', 'Phương Quân', 'Trúc Quân', 'Tùng Quân', 'Hồng Quế', 'Ngọc Quế', 'Nguyệt Quế', 'Phương Quế', 'Bảo Quyên', 'Bích Quyên', 'Diễm Quyên', 'Khánh Quyên', 'Lệ Quyên', 'Mai Quyên', 'Ngọc Quyên', 'Phương Quyên', 'Thảo Quyên', 'Thục Quyên', 'Tố Quyên', 'Tú Quyên', 'Vân Quyên', 'Vi Quyên', 'Bảo Quỳnh', 'Diễm Quỳnh', 'Gia Quỳnh', 'Khánh Quỳnh', 'Lê Quỳnh', 'Mộng Quỳnh', 'Ngọc Quỳnh', 'Như Quỳnh', 'Phương Quỳnh', 'Thúy Quỳnh', 'Trúc Quỳnh', 'Tú Quỳnh', 'Kim Sa', 'Quỳnh Sa', 'Bích San', 'Linh San', 'Ngọc San', 'San San', 'Ngọc Sương', 'Nhã Sương', 'Sương Sương', 'Thu Sương', 'Tú Sương', 'Bảo Uyên', 'Diễm Uyên', 'Duy Uyên', 'Giáng Uyên', 'Hạ Uyên', 'Hải Uyên', 'Lâm Uyên', 'Minh Uyên', 'Mỹ Uyên', 'Ngọc Uyên', 'Nhã Uyên', 'Phương Uyên', 'Phượng Uyên', 'Thanh Uyên', 'Thảo Uyên', 'Thục Uyên', 'Thùy Uyên', 'Thụy Uyên', 'Tố Uyên', 'Tú Uyên', 'Xuân Uyên', 'Ngọc Uyển', 'Nguyệt Uyển', 'Băng Tâm', 'Minh Tâm', 'Mỹ Tâm', 'Ngọc Tâm', 'Như Tâm', 'Phương Tâm', 'Thanh Tâm', 'Thục Tâm', 'Bảo Tiên', 'Cát Tiên', 'Giáng Tiên', 'Hà Tiên', 'Hạ Tiên', 'Hoa Tiên', 'Hương Tiên', 'Phượng Tiên', 'Quỳnh Tiên', 'Thiện Tiên', 'Thủy Tiên', 'Vân Tiên', 'Bạch Trà', 'Hương Trà', 'Phương Trà', 'Bảo Trâm', 'Bích Trâm', 'Huyền Trâm', 'Mỹ Trâm', 'Ngọc Trâm', 'Phương Trâm', 'Quỳnh Trâm', 'Thụy Trâm', 'Uyên Trâm', 'Yến Trâm', 'Hương Trầm', 'Bảo Trân', 'Huyền Trân', 'Ánh Trang', 'Bích Trang', 'Ðài Trang', 'Diễm Trang', 'Ðoan Trang', 'Hạnh Trang', 'Hoài Trang', 'Hương Trang', 'Huyền Trang', 'Khánh Trang', 'Kiều Trang', 'Kim Trang', 'Linh Trang', 'Minh Trang', 'Mỹ Trang', 'Nhã Trang', 'Phương Trang', 'Quỳnh Trang', 'Tâm Trang', 'Thanh Trang', 'Thảo Trang', 'Thiên Trang', 'Thu Trang', 'Thục Trang', 'Thủy Trang', 'Vân Trang', 'Xuân Trang', 'Yến Trang', 'Diễm Trinh', 'Kiết Trinh', 'Kiều Trinh', 'Mai Trinh', 'Ngọc Trinh', 'Phương Trinh', 'Thục Trinh', 'Thụy Trinh', 'Tú Trinh', 'Tuyết Trinh', 'Vân Trinh', 'Việt Trinh', 'Yến Trinh', 'Bảo Trúc', 'Hồng Trúc', 'Lan Trúc', 'Ngân Trúc', 'Nhã Trúc', 'Thanh Trúc', 'Khuê Trúc', 'Cẩm Tú', 'Khả Tú', 'Minh Tú', 'Ngọc Tú', 'Minh Tuệ', 'Kim Tuyến', 'Ðông Tuyền', 'Kim Tuyền', 'Lam Tuyền', 'Lâm Tuyền', 'Mộng Tuyền', 'Sơn Tuyền', 'Thanh Tuyền', 'Thiên Tuyền', 'Ánh Tuyết', 'Bạch Tuyết', 'Kim Tuyết', 'Minh Tuyết', 'Ngọc Tuyết', 'Thanh Tuyết', 'Cát Tường', 'Hồng Thắm', 'Ðoan Thanh', 'Giang Thanh', 'Hà Thanh', 'Kim Thanh', 'Lệ Thanh', 'Mai Thanh', 'Ngân Thanh', 'Nhã Thanh', 'Phương Thanh', 'Quỳnh Thanh', 'Thanh Thanh', 'Thiên Thanh', 'Vân Thanh', 'Xuân Thanh', 'Yến Thanh', 'Anh Thảo', 'Bích Thảo', 'Diễm Thảo', 'Hương Thảo', 'Kim Thảo', 'Mai Thảo', 'Minh Thảo', 'Nguyên Thảo', 'Như Thảo', 'Phương Thảo', 'Thạch Thảo', 'Thanh Thảo', 'Thiên Thảo', 'Thu Thảo', 'Xuân Thảo', 'Ái Thi Thy', 'Dạ Thi Thy', 'Mộng Thi Thy', 'Ngọc Thi Thy', 'Phương Thi Thy', 'Khánh Thi Thy', 'Uyên Thi Thy', 'Tuệ Thi', 'Hoa Thiên', 'Anh Thơ', 'Ánh Thơ', 'Ngọc Thơ', 'Quỳnh Thơ', 'Uyên Thơ', 'Bảo Thoa', 'Bích Thoa', 'Kim Thoa', 'Bích Thu', 'Hồng Thu', 'Hương Thu', 'Kiều Thu', 'Kim Thu', 'Lệ Thu', 'Mai Thu', 'Minh Thu', 'Mộng Thu', 'Quế Thu', 'Thanh Thu', 'Xuân Thu', 'Anh Thư', 'Diễm Thư', 'Hồng Thư', 'Huyền Thư', 'Kim Thư', 'Minh Thư', 'Thanh Thư', 'Thiên Thư', 'Hiền Thục', 'Hoài Thương', 'Huệ Thương', 'Lan Thương', 'Minh Thương', 'Thương Thương', 'Bảo Thúy', 'Cẩm Thúy', 'Diễm Thúy', 'Diệu Thúy', 'Hồng Thúy', 'Minh Thúy', 'Thanh Thúy'];
var dDay = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27'];
var dEmailRecovery = [
    'kubikubo01@gmail.com',
    'kubikubo02@gmail.com',
    'kubikubo03@gmail.com',
    'kubikubo05@gmail.com',
    'kubikubo07@gmail.com',
    'kubikubo09@gmail.com',
    'kubikubo12@gmail.com',
    'kubikubo96.4@gmail.com',
    'kubikubo16@gmail.com',
    'kubikubo17@gmail.com',
    'kubikubo18@gmail.com',
    'kubikubo19@gmail.com',
    'kubikubo13@gmail.com',
    'chuancau9118@gmail.com',
    'lovansuongsung15893@gmail.com',
    'kubikubo20@gmail.com',
    'buithilan23498@gmail.com',
    'donganvui2959232@gmail.com',
    'suphasong28359243@gmail.com',
    'buicungthi@gmail.com',
    'kubikubo14@gmail.com',
    'akuradio0001@gmail.com',
    'akuradio0002@gmail.com',
    'akuradio0003@gmail.com',
    'akuradio0004@gmail.com',
    'akuradio0005@gmail.com',
    'akuradio0006@gmail.com',
    'akuradio0007@gmail.com',
    'akuradio0008@gmail.com',
    'akuradio0009@gmail.com',
    'akuradio0010@gmail.com',
    'akuradio0011@gmail.com',
    'akuradio0012@gmail.com',
    'akuradio0013@gmail.com',
    'akuradio0014@gmail.com',
    'saophaixoan5238492387@gmail.com',
    'akuradio0015@gmail.com',
    'akuradio0017@gmail.com',
    'akuradio0018@gmail.com',
    'akuradio0019@gmail.com'
];

var data_name = [];
for (let i = 0; i < 10; i++) {
    var gName = {
        first_name: random_item(dFirstName),
        last_name: random_item(dLastName)
    };
    data_name.push(gName);
}

var dPhoneDie1 = ["813144225", "818199075", "918096733", "816628311", "817602391", "813673848", "812489622", "837292085", "879680350", "879039081", "879039073", "879833257", "879805350", "879817758", "879819054", "879817940", "879673980", "879681373", "879781053", "879808151", "879807275", "879781571", "879781002", "879030841", "879807971", "879032981", "879030827", "879031030", "877733995", "879039332", "879028795", "877735262", "879806857", "879809005", "879808465", "879808462", "879801391", "879781004", "879704337", "879783470", "837285770", "818196763", "827069788", "813787539", "817474510", "836085692", "877727579", "877727163", "917809832", "877728508", "877728039", "877723835", "877725008"];
var dPhoneDie2 = ["877691323", "879816725", "877233504", "877690109", "877701370", "877688594", "877201622", '877724541', '877721950', '877723678', '877726937', '877730140', '877730158', '949919610'];

dPhoneDieOrigin = dPhoneDie1.concat(dPhoneDie2);


var initConfigDefine = {
    'start': 'yes',
    'account': window.dfAccounts,
    'position': 0,
    'total': 0,
    'data_name': data_name,
    'email_using': '',
    'email_success': '',
    'phone_die': []
};


//Random Item
function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}

//Random Array
function random_arr(arr, n) {
    var newArr = [];
    var i = 0;
    if (n > arr.length) n = arr.length;
    while (i < n) {
        let item = arr[Math.floor(Math.random() * arr.length)];
        if (!newArr.includes(item)) {
            newArr.push(item);
            i++;
        }
    }
    return newArr;
}