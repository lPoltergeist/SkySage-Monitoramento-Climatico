import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router";

function Navbar() {
    return (
        <nav className="w-full h-20 flex items-center justify-between px-6 shadow">

            <div className="text-4xl text-[#F5D10D] font-semibold">
                SkySage
            </div>

            <NavigationMenu>
                <NavigationMenuList className="flex gap-6">

                    <NavigationMenuItem>

                        <Link className="
                   !text-white 
                text-xl font-medium
                hover:!text-[#F5D10D]
                cursor-pointer
              " to="/weather">
                            Weather</Link>

                    </NavigationMenuItem>

                    <NavigationMenuItem>

                        <Link className="
                   !text-white 
                text-xl font-medium
                hover:!text-[#F5D10D]
                cursor-pointer
              " to="/quotable">
                            Quotable</Link>

                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>

        </nav>
    );
}

export default Navbar