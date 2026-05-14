import Scorecard from "@/components/Scorecard"
import TrafficSplit from "@/components/TrafficSplit"
import UitgaveOmzet from "@/components/UitgaveOmzet"
import SocialFunnel from "@/components/SocialFunnel"

const UserPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col overflow-x-hidden overflow-y-visible">

            {/* Time selector */}
      <div className="flex justify-begin">
        <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm">
          <button className="px-4 py-2 rounded-lg bg-[#91579A] text-white text-sm font-medium">Deze week</button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">Deze maand</button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">Dit jaar</button>
        </div>
      </div>

      {/* Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <Scorecard type="Omzet" />
        <Scorecard type="ROAS" />
        <Scorecard type="Conversie" />
        <Scorecard type="Actieve leerlingen" />
      </div>

      {/* Grafieken */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full pb-3">
        <div className="lg:col-span-6 min-w-0">
          <UitgaveOmzet data={[]} />        
        </div>
        <div className="lg:col-span-3 min-w-0">
          <SocialFunnel />
        </div>

        <div className="lg:col-span-3 min-w-0">
          <TrafficSplit />
        </div>
      </div>
    </div>
  )
}

export default UserPage