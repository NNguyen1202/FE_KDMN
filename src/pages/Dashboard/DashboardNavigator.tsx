import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  BarChart3,
  Users,
  Trophy,
} from "lucide-react";

const sections = [
  {
    id: "dashboard-filter",
    name: "Bộ lọc",
    icon: LayoutDashboard,
  },
  {
    id: "revenue-cards",
    name: "KPI",
    icon: BarChart3,
  },
  {
    id: "revenue-chart",
    name: "Doanh thu",
    icon: BarChart3,
  },
  {
    id: "employee-chart",
    name: "Nhân viên",
    icon: Users,
  },
  {
    id: "top-employees",
    name: "Top nhân viên",
    icon: Trophy,
  },
];

export default function DashboardNavigator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      let activeIndex = 0;

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);

        if (element && element.offsetTop <= scrollPosition) {
          activeIndex = index;
        }
      });

      setCurrentIndex(activeIndex);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (index: number) => {
    if (index < 0 || index >= sections.length) return;

    const element = document.getElementById(sections[index].id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setCurrentIndex(index);
  };

  return (
    <div className="fixed top-20 right-6 z-40 flex items-center gap-1 rounded-xl border border-gray-200 bg-white/95 p-1.5 shadow-lg backdrop-blur dark:border-gray-500 dark:bg-gray-800/95">
      {/* Previous */}
      <button
        type="button"
        onClick={() => scrollToSection(currentIndex - 1)}
        disabled={currentIndex === 0}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:bg-gray-800"
        title="Lên phần trước"
      >
        <ChevronUp size={20} />
      </button>

      {/* Current section */}
      <button
        type="button"
        className="flex w-40 h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {(() => {
          const Icon = sections[currentIndex].icon;

          return <Icon size={16} />;
        })()}

        <span className="hidden sm:block">
          {sections[currentIndex].name}
        </span>

        <span className="text-xs text-gray-400">
          {currentIndex + 1}/{sections.length}
        </span>
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={() => scrollToSection(currentIndex + 1)}
        disabled={currentIndex === sections.length - 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:bg-gray-800"
        title="Xuống phần tiếp theo"
      >
        <ChevronDown size={20} />
      </button>
    </div>
  );
}