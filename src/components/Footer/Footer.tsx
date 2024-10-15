import { navLink } from '@/utils/constants'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className=" h-full custom-page w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h5 className="text-lg md:text-xl font-bold mb-2">Cuồng Phim</h5>
          <p className="text-sm md:text-base">
            Tất cả nội dung của trang web này được thu thập từ các trang web video chính thống trên Internet, và không
            cung cấp phát trực tuyến chính hãng. Nếu quyền lợi của bạn bị vi phạm, vui lòng thông báo cho chúng tôi,
            chúng tôi sẽ xóa nội dung vi phạm kịp thời, cảm ơn sự hợp tác của bạn!
          </p>
        </div>
        <div>
          <h5 className="text-lg md:text-xl font-bold mb-2">SẢN PHẨM</h5>
          <ul className="list-none flex flex-wrap gap-3 leading-2">
            {navLink.map((nav) => (
              <li key={nav.id} className="underline cursor-pointer hover:text-[#ff8a00]">
                <Link to={`${nav.path}`}>
                  <span className="whitespace-normal">{nav.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-lg md:text-xl font-bold mb-2">LIÊN HỆ</h5>
          <p>Địa chỉ: 123 Đường Phim, Thành phố, Việt Nam</p>
          <p>Email: info@cuongphim.com</p>
          <p>Điện thoại: +84 123 456 789</p>
          <p>Fax: +84 123 456 790</p>
        </div>
      </div>
      <div className="text-center mt-4">
        <small>© 2024 Copyright: CuongPhim.vercel.app</small>
      </div>
    </div>
  )
}

export default Footer
