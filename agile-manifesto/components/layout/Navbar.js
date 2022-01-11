import Search from "./utils/Search";

export default function Navbar() {
  return (
    <div className="w-full text-xl sm:text-2xl md:text-3xl flex top-0 items-center justify-around bg-sky-600 p-4 shadow-lg z-50 fixed shadow-sky-500/50 text-sky-100">
      <div>Agile Manifesto</div>
      <div></div>
      <div>
        <Search></Search>
      </div>
    </div>
  );
}
