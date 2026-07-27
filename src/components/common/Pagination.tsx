import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

interface Props {
  page: number;
  pages: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  pages,
  total,
  onChange,
}: Props) {
  const getPages = (): (number | "...")[] => {
  if (pages <= 7) {
    return Array.from({ length: pages }, (_, i) => i + 1);
  }

  const result: (number | "...")[] = [];

  // Luôn có trang đầu
  result.push(1);

  let start = Math.max(page - 1, 2);
  let end = Math.min(page + 1, pages - 1);

  // Nếu gần đầu
  if (page <= 3) {
    start = 2;
    end = 4;
  }

  // Nếu gần cuối
  if (page >= pages - 2) {
    start = pages - 3;
    end = pages - 1;
  }

  if (start > 2) {
    result.push("...");
  }

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  if (end < pages - 1) {
    result.push("...");
  }

  // Luôn có trang cuối
  result.push(pages);

  return result;
};

  const pageList = getPages();

  return (
    <div
      className="
mt-6
flex
flex-col
gap-4
rounded-2xl
border
border-stroke
bg-white
p-5
shadow-sm

dark:border-gray-700
dark:bg-gray-900

md:flex-row
md:items-center
md:justify-between
"
    >
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Tổng cộng{" "}
          <span className="font-semibold text-brand-500">
            {total}
          </span>{" "}
          bản ghi
        </p>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          Trang {page} / {pages}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* First */}

        <button
          disabled={page === 1}
          onClick={() => onChange(1)}
          className="
flex
h-10
w-10
items-center
justify-center
rounded-lg
border
border-gray-300
transition

hover:bg-brand-50

disabled:cursor-not-allowed
disabled:opacity-40

dark:border-gray-700
dark:text-white
dark:hover:bg-gray-800
"
        >
          <ChevronsLeft size={18} />
        </button>

        {/* Prev */}

        <button
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className="
flex
h-10
w-10
items-center
justify-center
rounded-lg
border
border-gray-300
transition

hover:bg-brand-50

disabled:cursor-not-allowed
disabled:opacity-40

dark:border-gray-700
dark:text-white
dark:hover:bg-gray-800
"
        >
          <ChevronLeft size={18} />
        </button>

        {pageList.map((item, index) =>
          item === "..." ? (
            <span
              key={index}
              className="px-2 text-gray-500 dark:text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onChange(item)}
              className={`
h-10
min-w-[40px]
rounded-lg
px-3
font-medium
transition

${
  page === item
    ? "bg-brand-500 text-white shadow-md"
    : `
border border-gray-300
bg-white
text-gray-700
hover:bg-brand-50

dark:border-gray-700
dark:bg-gray-900
dark:text-white
dark:hover:bg-gray-800
`
}
`}
            >
              {item}
            </button>
          ),
        )}

        {/* Next */}

        <button
          disabled={page === pages}
          onClick={() => onChange(page + 1)}
          className="
flex
h-10
w-10
items-center
justify-center
rounded-lg
border
border-gray-300
transition

hover:bg-brand-50

disabled:cursor-not-allowed
disabled:opacity-40

dark:border-gray-700
dark:text-white
dark:hover:bg-gray-800
"
        >
          <ChevronRight size={18} />
        </button>

        {/* Last */}

        <button
          disabled={page === pages}
          onClick={() => onChange(pages)}
          className="
flex
h-10
w-10
items-center
justify-center
rounded-lg
border
border-gray-300
transition

hover:bg-brand-50

disabled:cursor-not-allowed
disabled:opacity-40

dark:border-gray-700
dark:text-white
dark:hover:bg-gray-800
"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
}