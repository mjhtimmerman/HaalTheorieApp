const data = [
  { name: "Views", value: 15421, percentage: 100 },
  { name: "Clicks", value: 12421, percentage: 66 },
  { name: "Account gemaakt", value: 8221, percentage: 42 },
  { name: "Examen gemaakt", value: 5231, percentage: 18 },
  { name: "Aankoop", value: 301, percentage: 2 },
];

const SocialFunnel = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <h1 className="text-lg font-bold mb-6">Socials funnel</h1>

      <div className="flex flex-col gap-3">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-500">{item.value}</span>
            </div>

            <div className="w-full h-3 bg-[#F3EAF5] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#91579A]"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    <div className="mt-4 pt-5 border-t border-[#F3EAF5]">
      <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm font-semibold">Aankopen per pakket</h2>
      <span className="text-xs text-gray-500">301 totaal</span>
    </div>

    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-xl bg-[#F7F8FA] p-3">
      <div className="text-xs text-gray-500">Deluxe</div>
      <div className="text-lg font-bold">186</div>
    </div>

    <div className="rounded-xl bg-[#F7F8FA] p-3">
      <div className="text-xs text-gray-500">Plus</div>
      <div className="text-lg font-bold">82</div>
    </div>

    <div className="rounded-xl bg-[#F7F8FA] p-3">
      <div className="text-xs text-gray-500">Examens</div>
      <div className="text-lg font-bold">24</div>
    </div>
  </div>
</div>
    </div>
  );
};

export default SocialFunnel;