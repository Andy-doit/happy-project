

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"

import {
    AudioWaveform,
    MessageSquareMore,
    UsersRound,
    Command,
    Newspaper,
    GalleryVerticalEnd,
    ChartBarStacked,
    Package,
    TicketPercent,
    FileText,
    ScanSearch,
    SquareTerminal,
} from "lucide-react"
import { NavMain } from "./navMain"
import { NavUser } from "./navUser"



const data = {
    user: {
        name: "Super Admin",
        avatar: "/avatars/shadcn.jpg",
    },

    navMain: [
        {
            title: "Static Content",
            url: "#",
            icon: SquareTerminal,
            isActive: true,

        },
        {
            title: "Accounts",
            url: "#",
            icon: UsersRound,
            items: [
                {
                    title: "Account Admin Management",
                    url: "#",
                },
                {
                    title: "Account Doula Management",
                    url: "#",
                },
                {
                    title: "Account Client Management",
                    url: "#",
                },
            ],

        },
        {
            title: "Article",
            url: "#",
            icon: MessageSquareMore,

        },
        {
            title: "PD Session",
            url: "#",
            icon: Newspaper,

        },
        {
            title: "Category",
            url: "#",
            icon: ChartBarStacked,

        },
        {
            title: "Subscriptions",
            url: "#",
            icon: Package,

        },
        {
            title: "Voucher",
            url: "#",
            icon: TicketPercent,

        },
        {
            title: "Help Documents",
            url: "#",
            icon: FileText,

        },
        {
            title: "Search Settings",
            url: "#",
            icon: ScanSearch,

        },
    ],

}

export default function SidebarAdmin({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>

            <SidebarHeader className="bg-gray-700">
                <div className="grid flex-1 text-left text-md leading-tight p-2  text-white">
                    <span className="truncate font-semibold">
                        NurtureWave
                    </span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}