import { AlertCircle, Clock, Folder, Home, Star, Trash2 } from "react-feather";

export const FileSidebarButton = [
  {
    id: 1,
    icon: <Home />,
    text: "Home",
  },
  {
    id: 2,
    icon: <Folder />,
    text: "All",
  },
  {
    id: 3,
    icon: <Clock />,
    text: "Recent",
  },
  {
    id: 4,
    icon: <Star />,
    text: "Starred",
  },
  {
    id: 5,
    icon: <AlertCircle />,
    text: "Recovery",
  },
  {
    id: 6,
    icon: <Trash2 />,
    text: "Deleted",
  },
];

export const QuickAccessData = [
  {
    id: 1,
    quickClass: <i className="fa fa-youtube-play font-danger" />,
    quickTitle: "Videos",
  },
  {
    id: 2,
    quickClass: <i className="fa fa-th font-info"></i>,
    quickTitle: "Apps",
  },
  {
    id: 3,
    quickClass: <i className="fa fa-file-text-o font-secondary"></i>,
    quickTitle: "Document",
  },
  {
    id: 4,
    quickClass: <i className="fa fa-music font-warning"></i>,
    quickTitle: "Music",
  },
  {
    id: 5,
    quickClass: <i className="fa fa-download font-primary"></i>,
    quickTitle: "Download",
  },
  {
    id: 6,
    quickClass: <i className="fa fa-folder font-info"></i>,
    quickTitle: "Folder",
  },
  {
    id: 7,
    quickClass: <i className="fa fa-file-archive-o font-secondary"></i>,
    quickTitle: "Zip",
  },
  {
    id: 8,
    quickClass: <i className="fa fa-trash font-danger"></i>,
    quickTitle: "Trash",
  },
];

export const FileListData = [
  {
    id: 1,
    name: "Logo.psd",
    size: "2.0 MB",
    modify: "7 hour ago",
    icon: "f-22 fa fa-folder font-info",
    folderClass: "f-44 fa fa-file-archive-o txt-warning",
    title: "Tivo admin",
    folderFiles: "20 files",
    folderTime: "2 Hour ago",
  },
  {
    id: 2,
    name: "Backend.xls",
    size: "3.0 GB",
    modify: "2 Day ago",
    icon: "f-22 fa fa-file-excel-o font-success",
    folderClass: "f-44 fa fa-folder txt-warning",
    title: "Viho admin",
    folderFiles: "14 files",
    folderTime: "3 Hour ago",
  },
  {
    id: 3,
    name: "Project.zip",
    size: "1.9 GB",
    modify: "1 Day ago",
    icon: "f-22 fa fa-file-archive-o font-warningy",
    folderClass: "f-44 fa fa-file-archive-o txt-warning",
    title: "Unice admin",
    folderFiles: "15 files",
    folderTime: "3 Day ago",
  },
  {
    id: 4,
    name: "Report.font",
    size: "0.9 KB",
    modify: "1 Day ago",
    icon: "f-22 fa fa-folder font-primary",
    folderClass: "f-44 fa fa-folder txt-warning",
    title: "koho admin",
    folderFiles: "10 files",
    folderTime: "1 Day ago",
  },
];
