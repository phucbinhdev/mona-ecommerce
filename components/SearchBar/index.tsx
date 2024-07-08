import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  search: string;
};

export const SearchBar = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.search.trim() !== "") {
      router.push({
        pathname: "/",
        query: { search: data.search.trim() },
      });
    } else {
      const { search, ...otherQueries } = router.query;
      router.push({
        pathname: "/",
        query: { ...otherQueries },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative w-full">
        <input
          {...register("search")}
          type="search"
          id="search-dropdown"
          className="block p-2.5 w-[200px] z-20 text-sm text-gray-900 bg-gray-100 rounded-md focus:ring-1 focus:outline-none"
          placeholder="Tìm kiếm"
        />
        <button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#f3f4f6] rounded-e-lg hover:bg-gray-200 group"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              // className="group-hover:stroke-white"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
