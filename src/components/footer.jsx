export default function Footer() {
  return (
    <footer className="w-full h-[20vh] bg-[#563A92]  flex flex-col justify-center items-center shadow-inner">
      <div className="flex items-center gap-4 mb-2">
        <img src="../../public/LOGO.png" alt="Logo" className="w-12 h-12 rounded-full shadow-lg  bg-white" />
        <span className="text-3xl font-extrabold text-[#fff] tracking-wide drop-shadow">MIND SCAP</span>
      </div>
      <div className="text-amber-100 text-sm mb-1 font-medium">
        © {new Date().getFullYear()} MIND SCAP. All rights reserved.
      </div>
      <div className="flex gap-6 mt-2">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-amber-100 hover:text-[#4e4e4e] transition font-semibold"
        >
          <svg width="20" height="20" fill="currentColor" className="inline" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.8 1.09.8 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
          GitHub
        </a>
        <a
          href="mailto:contact@mernblog.com"
          className="flex items-center gap-2 text-amber-100 hover:text-[#4e4e4e] transition font-semibold"
        >
          <svg width="20" height="20" fill="currentColor" className="inline" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 6.99 8-6.99V18z"/></svg>
          Contact
        </a>
      </div>
    </footer>
  );
}