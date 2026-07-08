import Link from "next/link";


const Footer=()=>{
    return(
      <footer className="bg-gray-100 dark:bg-zinc-900 pt-16 pb-6 font-sans mt-50 md:mt-5">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 border-b border-zinc-800 pb-16 ml-4">
    
    <div className="space-y-4 hidden md:block">
      <h2 className="text-2xl font-bold">Exclusive</h2>
      <h3 className="text-xl font-medium">Subscribe</h3>
      <p className=" text-sm">Get 10% off your first order</p>
      <div className="relative max-w-240px">
  
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-zinc-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="=" />
          </svg>
        </button>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-md md:text-xl font-bold md:font-medium">Support</h3>
      <p className="text-sm leading-relaxed max-w-200px">
        111 Nepal Hospital,Jorpati, DH 1515, kathmandu.
      </p>
      <p className="text-sm">exclusive@gmail.com</p>
      <p className=" text-sm">+88015-88888-9999</p>
    </div>

    <div className="space-y-4">
      <h3 className="text-md md:text-xl font-bold md:font-medium">Shop and Categories</h3>
      <ul className="space-y-3 text-sm">
        <li><a href="#" className="hover:underline">Mobile</a></li>
        <li><a href="#" className="hover:underline">Sports</a></li>
        <li><a href="#" className="hover:underline">Clothing</a></li>
      </ul>
    </div>

    <div className="space-y-4">
      <h3 className="text-md md:text-xl font-bold md:font-medium">Quick Link</h3>
      <ul className="space-y-3 text-sm">
        <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
        <li><Link href="/contact" className="hover:underline">Contact</Link></li>
      </ul>
    </div>

    <div className="space-y-4">
      <h3 className="text-md md:text-xl font-bold md:font-medium">Download App</h3>
      <p className="text-xs font-medium">Save $3 with App New User Only</p>
      
      <div className="flex items-center gap-3">
        <div className="bg-white p-1 rounded w-20 h-20 flex items-center justify-center">
          <div className="text-black text-[10px] font-bold text-center border border-dashed border-black p-1">QR Code</div>
        </div>
        
        <div className="flex flex-col gap-2">
          <a href="#" className="block border border-zinc-600 rounded bg-black px-2 py-1 w-28 hover:border-white transition-colors">
            <div className="flex items-center gap-1">
              <span className="text-[8px] uppercase block text-zinc-400 leading-none">Get it on</span>
              <span className="text-xs font-semibold block text-white leading-none">Google Play</span>
            </div>
          </a>
          <a href="#" className="block border border-zinc-600 rounded bg-black px-2 py-1 w-28 hover:border-white transition-colors">
            <div className="flex items-center gap-1">
              <span className="text-[8px] uppercase block text-zinc-400 leading-none">Download on the</span>
              <span className="text-xs font-semibold block text-white leading-none">App Store</span>
            </div>
          </a>
        </div>
      </div>

      <div className="flex items-center gap-6 pt-2 text-white">
        <a href="#" className="hover:text-zinc-400"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="hover:text-zinc-400"><i className="fab fa-twitter"></i></a>
        <a href="#" className="hover:text-zinc-400"><i className="fab fa-instagram"></i></a>
        <a href="#" className="hover:text-zinc-400"><i className="fab fa-linkedin-in"></i></a>
      </div>
    </div>

  </div>

  <div className="text-center pt-6 text-zinc-600 text-sm">
    <p className="text-sm">&copy; Copyright exclusive {new Date().getFullYear()}. All right reserved</p>
  </div>
</footer>
    )
}
export default Footer;