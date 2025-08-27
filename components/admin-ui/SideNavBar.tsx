import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiChartPie, HiChip, HiDocumentText } from "react-icons/hi";

export const SideNavBar = () => {
  return (
    <div>
      <Sidebar className="fixed top-0 bottom-0 left-0 z-40 pt-15">
        <SidebarItems className="">
          <SidebarItemGroup>
            <SidebarItem href="#" icon={HiChartPie}>
              Dashboard
            </SidebarItem>
            <SidebarCollapse icon={HiDocumentText} label="Add Embedding">
              <SidebarItem href="#">Add Text</SidebarItem>
              <SidebarItem href="#">Upload Document</SidebarItem>
            </SidebarCollapse>
            <SidebarItem href="#" icon={HiChip}>
              Finetune Model
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
};

{
  /* export const SideNavBar = () => (<li><ahref="#"className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"><svgaria-hidden="true"className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"fill="currentColor"viewBox="0 0 20 20"xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg><span className="ml-3">Overview</span></a></li><li><buttontype="button"className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"aria-controls="dropdown-pages"data-collapse-toggle="dropdown-pages"><svgaria-hidden="true"className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"fill="currentColor"viewBox="0 0 20 20"xmlns="http://www.w3.org/2000/svg"><pathfillRule="evenodd"d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"clipRule="evenodd"></path></svg><span className="ml-3 flex-1 text-left whitespace-nowrap">Upload Documnet</span><svgaria-hidden="true"className="h-6 w-6"fill="currentColor"viewBox="0 0 20 20"xmlns="http://www.w3.org/2000/svg"><pathfillRule="evenodd"d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"clipRule="evenodd"></path></svg></button></li></ul></div></aside>); */
}
