const Footer = () => {
  return (
    <footer className="w-full h-auto shadow-inner text-sm">
      <div className="container p-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 space-y-4 sm:space-y-0">
          <div>
            <h4 className="mb-2 font-semibold">Liên hệ qua các kênh</h4>
            <div>
              <ul className="flex items-center space-x-4">
                <li>
                  <a href="/" target="_blank">
                    <img
                      src={require("../images/fb.png")}
                      alt=""
                      className="w-8"
                    />
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank">
                    <img
                      src={require("../images/ins.png")}
                      alt=""
                      className="w-8"
                    />
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank">
                    <img
                      src={require("../images/tw.png")}
                      alt=""
                      className="w-8"
                    />
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank">
                    <img
                      src={require("../images/zl.png")}
                      alt=""
                      className="w-8"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Tải úng dụng</h4>
            <div>
              <ul className="flex items-center space-x-4">
                <li>
                  <a href="/" target="_blank">
                    <img src={require("../images/googleplay.png")} alt="" />
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank">
                    <img src={require("../images/googleplay.png")} alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-bold border-b border-black text-blue-800 mt-2 md:mt-0">
              Trường Đại Học Khoa Học Tự Nhiên
            </h4>
            <div className="space-y-2">
              <p className="font-bold italic">
                Đồ án môn học Thiết kế phần mềm
              </p>
              <p className="font-bold">GVHD: Trần Văn Quý</p>
              <p>SV: 21880030 - Đinh Hoàng Giang</p>
              <p>Email: dhgiang85@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
