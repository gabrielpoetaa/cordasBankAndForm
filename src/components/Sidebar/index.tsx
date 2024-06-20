import { AudioWaveform, BoxIcon, CandlestickChart, DatabaseBackup, Library, MessageSquareCode, Monitor, Network, PieChart, Search, SquareDashedBottom, Webhook } from 'lucide-react'
import logo from '../../assets/logoCordas.png'

export function Sidebar() {
  return (
    <div className="border-r border-zinc-200 px-5 py-8 space-y-6">
    <header className="flex items-center gap-5">    
    <Webhook className="h-8 w-8 text-goldCordas_400" />
    <p className="font-medium text-xl text-goldCordas_500">Cordas Admin</p>
    </header>

    <div className="flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm"> 
    <Search className="h-5 w-5 text-zinc-500" />
    <input className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 " placeholder='Search' />
    </div>
    </div>
  
  )
}


