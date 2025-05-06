import AttactCard from "@/components/AttactCard";

const AttacksPage = () => {
  return (
    <div className="py-4">
      <div className="flex items-center gap-3 flex-col md:flex-row px-2">
        {Array.from({ length: 4 })?.map((item) => {
          return (
            <AttactCard
              type={"First card"}
              description="Welcome in first card"
              key={String(item)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AttacksPage;
