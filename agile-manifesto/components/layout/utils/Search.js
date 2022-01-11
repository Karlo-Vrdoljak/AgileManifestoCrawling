export default function Search() {
  const onSearch = ({ target: { value } }) => {
    console.log({ value });
  };
  return (
    <>
      <div className="pt-2 relative mx-auto text-gray-600">
        <input
          className="border-2 border-gray-300 w-40 sm:w-auto bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="text"
          name="search"
          placeholder="Search"
          onChange={(e) => onSearch(e)}
        />
        <button type="submit" className="absolute right-0 top-0 mt-4 mr-2">
          <span className="material-icons">search</span>
        </button>
      </div>
    </>
  );
}
